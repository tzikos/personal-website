// TypeScript interfaces and types for the CV Chatbot

// Message interface for chat messages
export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

// Chatbot configuration interface
export interface ChatbotConfig {
  systemPrompt: string;
  maxTokens: number;
  temperature: number;
  model: string;
  maxMessages: number;
  apiTimeout: number;
}

// OpenAI API request interface
export interface OpenAIRequest {
  model: string;
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  max_tokens: number;
  temperature: number;
}

// OpenAI API response interface
export interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// Error handling types
export type ErrorType = 'network' | 'auth' | 'rate_limit' | 'content' | 'server' | 'timeout';

export interface ErrorState {
  type: ErrorType;
  message: string;
  retryable: boolean;
}

// Chatbot state interface
export interface ChatbotState {
  messages: Message[];
  isLoading: boolean;
  error: ErrorState | null;
}

// Component prop interfaces
export interface ChatbotContainerProps {
  className?: string;
  maxHeight?: string;
}

export interface ChatMessageProps {
  message: Message;
  isUser: boolean;
}

export interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
  placeholder?: string;
}

export interface TypingIndicatorProps {
  visible: boolean;
}

// API service types
export interface ApiServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: ErrorState;
}

// Session storage types
export interface ChatSession {
  messages: Message[];
  timestamp: Date;
}

// Storage information interface
export interface StorageInfo {
  used: number;
  available: number;
  percentage: number;
}

// Utility types
export type MessageRole = Message['role'];
export type ChatbotStatus = 'idle' | 'loading' | 'error' | 'success';