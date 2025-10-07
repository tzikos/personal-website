import React from 'react';
import ReactMarkdown from 'react-markdown';
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
        <div className="text-sm leading-relaxed">
          {isUser ? (
            <div className="whitespace-pre-wrap">{message.content}</div>
          ) : (
            <ReactMarkdown 
              className="prose prose-sm max-w-none prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-1 text-left"
              components={{
                // Custom styling for markdown elements with left alignment
                p: ({ children }) => <p className="mb-2 last:mb-0 text-left">{children}</p>,
                ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1 text-left">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1 text-left">{children}</ol>,
                li: ({ children }) => <li className="text-sm text-left">{children}</li>,
                strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                em: ({ children }) => <em className="italic">{children}</em>,
                code: ({ children }) => (
                  <code className="bg-gray-200 text-gray-800 px-1 py-0.5 rounded text-xs font-mono">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-gray-200 text-gray-800 p-2 rounded text-xs font-mono overflow-x-auto mb-2 text-left">
                    {children}
                  </pre>
                ),
                h1: ({ children }) => <h1 className="text-base font-bold mb-2 text-left">{children}</h1>,
                h2: ({ children }) => <h2 className="text-sm font-bold mb-2 text-left">{children}</h2>,
                h3: ({ children }) => <h3 className="text-sm font-semibold mb-1 text-left">{children}</h3>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-gray-300 pl-2 italic mb-2 text-left">
                    {children}
                  </blockquote>
                ),
                a: ({ children, href }) => (
                  <a 
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
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