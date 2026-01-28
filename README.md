# Personal Website

## Quick Start
```bash
npm i
npm run dev
```

## Tech Stack
- Vite + React + TypeScript
- shadcn-ui + Tailwind CSS
- AWS Lambda (chatbot backend)

## Architecture

### Frontend
Deployed via [Render](https://render.com). Build: `npm i && npm run build`, Deploy: `npm run preview`

### Chatbot Backend (AWS Lambda)
The chatbot uses an AWS Lambda function that:
- **System prompt is stored server-side** in `lambda/chat-handler.js`
- Frontend only sends user/assistant messages (no prompt in network requests)
- Includes rate limiting and TTS (ElevenLabs) support

**To update the chatbot prompt:**
1. Edit `SYSTEM_PROMPT` in `lambda/chat-handler.js` (lines 7-186)
2. Optionally sync `src/config/chatbot-prompt.ts` for reference
3. Deploy to AWS (see below)

**To deploy Lambda:**
```bash
cd lambda
./deploy.sh
# Then upload chatbot-lambda.zip to AWS Lambda console
```

## Environment Variables

### Frontend (.env)
```
VITE_SUPABASE_URL=<your_url>           # Contact form (optional)
VITE_SUPABASE_ANON_KEY=<your_key>      # Contact form (optional)
VITE_BACKEND_API_URL=<aws_api_url>     # AWS API Gateway URL
```

### AWS Lambda
```
OPENAI_API_KEY=<your_key>              # Required
ELEVENLABS_API_KEY=<your_key>          # Required for TTS
```

## Key Files
| File | Purpose |
|------|---------|
| `lambda/chat-handler.js` | Lambda function with system prompt |
| `src/services/backend-openai-service.ts` | Frontend chatbot service |
| `src/config/chatbot-prompt.ts` | Prompt reference (not used at runtime) |

---
