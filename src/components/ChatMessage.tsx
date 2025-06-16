
import React from 'react';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isBot, timestamp }) => {
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4 animate-fade-in`}>
      <div className={`flex max-w-[80%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isBot ? 'bg-green-600 mr-3' : 'bg-blue-600 ml-3'
        }`}>
          {isBot ? (
            <Bot className="w-4 h-4 text-white" />
          ) : (
            <User className="w-4 h-4 text-white" />
          )}
        </div>
        <div className="flex flex-col">
          <div className={`px-4 py-3 rounded-2xl shadow-sm ${
            isBot 
              ? 'bg-white border border-gray-200 text-gray-800' 
              : 'bg-green-600 text-white'
          }`}>
            <p className="text-sm leading-relaxed">{message}</p>
          </div>
          <span className={`text-xs text-gray-500 mt-1 ${
            isBot ? 'text-left' : 'text-right'
          }`}>
            {timestamp}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
