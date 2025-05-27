from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
import os
from datetime import datetime
import uuid
from typing import List, Optional
import httpx
import asyncio

# Environment setup
app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
DATABASE_NAME = "portfolio_chat"
client = AsyncIOMotorClient(MONGO_URL)
database = client[DATABASE_NAME]

# Pydantic models
class ChatMessage(BaseModel):
    message: str
    conversation_id: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    conversation_id: str
    timestamp: datetime

class ConversationHistory(BaseModel):
    conversation_id: str
    messages: List[dict]

# CV Context for Dimitris Papantzikos
CV_CONTEXT = """
You are Dimitris Papantzikos, a Data Analyst working at Bergenske AS in Copenhagen, Denmark. 

BACKGROUND:
- M.Sc. Mathematical Modelling and Computation from Technical University of Denmark (DTU, 2020-2024)
- B.Sc. Mathematics from Aristotle University of Thessaloniki (2016-2020)
- Currently working as a Data Analyst at Bergenske AS (June 2024 - present)

WORK EXPERIENCE:
- Creating scalable and automated Tableau Reports for data visualization
- Developing Python scripts to automate data extraction and processing
- Managing data quality - ensuring data accuracy and consistency
- Working with bilingual data analysis and visualization solutions

TECHNICAL SKILLS:
- Programming: Python, R, SQL
- Data Visualization: Tableau, Power BI
- Machine Learning & Statistics: Statistical analysis, predictive modeling
- Data Analytics: Data extraction, processing, automation

PROJECTS & EXPERTISE:
- Machine Learning thesis work and research projects
- Deep learning and data science projects
- Forecasting and optimization work
- Statistical modeling and data analysis

PERSONALITY:
Respond in a casual, friendly first-person tone. You're passionate about machine learning and data science. 
You enjoy talking about your projects, the technical challenges you've solved, and your journey from mathematics 
to applied data science. You're based in Copenhagen and have experience working with Danish companies.

Keep responses conversational and personal, highlighting your ML/data science expertise when relevant.
"""

# Ollama client configuration
OLLAMA_HOST = "http://localhost:11434"
MODEL_NAME = "tinyllama:1.1b-q4_0"

async def call_ollama(message: str, conversation_history: List[dict] = None) -> str:
    """Call TinyLlama via Ollama API with CV context"""
    
    # Prepare conversation messages
    messages = [
        {"role": "system", "content": CV_CONTEXT}
    ]
    
    # Add conversation history if available
    if conversation_history:
        messages.extend(conversation_history[-6:])  # Keep last 6 messages for context
    
    # Add current message
    messages.append({"role": "user", "content": message})
    
    # Prepare request payload
    payload = {
        "model": MODEL_NAME,
        "messages": messages,
        "options": {
            "num_predict": 150,
            "temperature": 0.7,
            "num_ctx": 512,
            "top_p": 0.9
        }
    }
    
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                f"{OLLAMA_HOST}/api/chat",
                json=payload
            )
            
            if response.status_code == 200:
                result = response.json()
                return result["message"]["content"]
            else:
                # Fallback response if Ollama is not available
                return "Hey! I'm Dimitris, a Data Analyst with ML background. I'd love to chat about my experience, but it seems my AI assistant is taking a coffee break ☕ Maybe ask me about my work at Bergenske or my machine learning projects?"
                
    except Exception as e:
        print(f"Ollama API error: {e}")
        # Fallback response
        return "Hi there! I'm Dimitris Papantzikos, a Data Analyst working in Copenhagen. I specialize in machine learning, data visualization with Tableau, and Python automation. Feel free to ask about my experience at DTU, my current work, or any ML projects I've worked on!"

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    try:
        # Test Ollama connection
        async with httpx.AsyncClient(timeout=5.0) as client:
            response = await client.get(f"{OLLAMA_HOST}/api/tags")
            ollama_status = "connected" if response.status_code == 200 else "disconnected"
    except:
        ollama_status = "disconnected"
    
    return {
        "status": "healthy",
        "ollama": ollama_status,
        "database": "connected" if client else "disconnected"
    }

@app.post("/api/chat", response_model=ChatResponse)
async def chat_with_dimitris(request: ChatMessage):
    """Main chat endpoint"""
    
    # Generate conversation ID if not provided
    conversation_id = request.conversation_id or str(uuid.uuid4())
    
    # Get conversation history
    conversation_history = []
    if request.conversation_id:
        conversation_doc = await database.conversations.find_one(
            {"conversation_id": conversation_id}
        )
        if conversation_doc:
            conversation_history = conversation_doc.get("messages", [])
    
    # Get AI response
    ai_response = await call_ollama(request.message, conversation_history)
    
    # Create message objects
    user_message = {
        "role": "user",
        "content": request.message,
        "timestamp": datetime.now()
    }
    
    assistant_message = {
        "role": "assistant", 
        "content": ai_response,
        "timestamp": datetime.now()
    }
    
    # Update conversation in database
    await database.conversations.update_one(
        {"conversation_id": conversation_id},
        {
            "$set": {
                "conversation_id": conversation_id,
                "updated_at": datetime.now()
            },
            "$push": {
                "messages": {
                    "$each": [user_message, assistant_message]
                }
            }
        },
        upsert=True
    )
    
    return ChatResponse(
        response=ai_response,
        conversation_id=conversation_id,
        timestamp=datetime.now()
    )

@app.get("/api/conversations/{conversation_id}")
async def get_conversation(conversation_id: str):
    """Get conversation history"""
    conversation = await database.conversations.find_one(
        {"conversation_id": conversation_id}
    )
    
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    return ConversationHistory(
        conversation_id=conversation_id,
        messages=conversation.get("messages", [])
    )

@app.get("/api/conversations")
async def list_conversations():
    """List recent conversations"""
    conversations = await database.conversations.find(
        {},
        {"conversation_id": 1, "updated_at": 1, "messages": {"$slice": -1}}
    ).sort("updated_at", -1).limit(10).to_list(10)
    
    return conversations

@app.delete("/api/conversations/{conversation_id}")
async def delete_conversation(conversation_id: str):
    """Delete a conversation"""
    result = await database.conversations.delete_one(
        {"conversation_id": conversation_id}
    )
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Conversation not found")
    
    return {"message": "Conversation deleted successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)