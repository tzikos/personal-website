import React, { useState, KeyboardEvent, useEffect } from 'react';
import { ChatInputProps } from './chatbot.types';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Send, Clock } from 'lucide-react';
import { chatbotService } from '../../services/chatbot-service';

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  disabled, 
  placeholder = "Ask me about Dimitris's experience..." 
}) => {
  const [message, setMessage] = useState('');
  const [rateLimitState, setRateLimitState] = useState<any>(null);
  const [cooldownTimer, setCooldownTimer] = useState<number>(0);
  const maxLength = 200; // Updated character limit

  // Subscribe to rate limit changes
  useEffect(() => {
    const unsubscribe = chatbotService.subscribeToRateLimit(setRateLimitState);
    
    // Get initial state
    setRateLimitState(chatbotService.getRateLimitState());
    
    return unsubscribe;
  }, []);

  // Cooldown timer effect
  useEffect(() => {
    if (rateLimitState?.remainingCooldown > 0) {
      setCooldownTimer(Math.ceil(rateLimitState.remainingCooldown / 1000));
      
      const interval = setInterval(() => {
        setCooldownTimer(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setCooldownTimer(0);
    }
  }, [rateLimitState?.remainingCooldown]);

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (trimmedMessage && !disabled && canSendMessage) {
      onSendMessage(trimmedMessage);
      setMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setMessage(value);
    }
  };

  const isMessageValid = message.trim().length > 0 && message.trim().length <= maxLength;
  const canSendMessage = rateLimitState?.canSendMessage !== false && isMessageValid;

  return (
    <div className="border-t bg-white p-4">
      <div className="flex space-x-2">
        <div className="flex-1 relative">
          <Input
            type="text"
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled || !rateLimitState?.canSendMessage}
            className="pr-12"
            maxLength={maxLength}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
            {message.length}/{maxLength}
          </div>
        </div>
        <Button
          onClick={handleSend}
          disabled={disabled || !canSendMessage}
          size="sm"
          className="px-3"
        >
          {cooldownTimer > 0 ? (
            <>
              <Clock className="h-4 w-4 mr-1" />
              {cooldownTimer}
            </>
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      {/* Rate limiting feedback */}
      {rateLimitState?.reason && (
        <div className="text-xs text-amber-600 mt-1 flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          {rateLimitState.reason}
        </div>
      )}
      
      {/* Character limit warning */}
      {message.length > maxLength * 0.8 && (
        <div className="text-xs text-gray-500 mt-1">
          {message.length}/{maxLength} characters
        </div>
      )}
      
      {/* Messages per minute indicator */}
      {rateLimitState?.messagesInLastMinute > 0 && (
        <div className="text-xs text-gray-400 mt-1">
          {rateLimitState.messagesInLastMinute}/10 messages this minute
        </div>
      )}
    </div>
  );
};

export default ChatInput;