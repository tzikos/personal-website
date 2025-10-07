import React from 'react';
import { ChatMessageProps } from './chatbot.types';

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser }) => {
  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`flex mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[85%] sm:max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
        isUser 
          ? 'bg-blue-600 text-white ml-auto' 
          : 'bg-gray-100 text-gray-900 mr-auto'
      }`}>
        <div className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </div>
        <div className={`text-xs mt-1 ${
          isUser ? 'text-blue-100' : 'text-gray-500'
        }`}>
          {formatTimestamp(message.timestamp)}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;