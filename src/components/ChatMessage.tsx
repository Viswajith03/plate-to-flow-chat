
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
        <div className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm border ${
          isBot 
            ? 'bg-blue-600/80 border-blue-400/30' 
            : 'bg-slate-700/80 border-slate-500/30'
        }`}>
          {isBot ? (
            <Bot className="w-4 h-4 text-blue-200" />
          ) : (
            <User className="w-4 h-4 text-slate-200" />
          )}
        </div>
        <div className="flex flex-col">
          <div className={`px-4 py-3 rounded-2xl shadow-lg backdrop-blur-sm border ${
            isBot 
              ? 'bg-blue-800/60 border-blue-600/40 text-blue-100' 
              : 'bg-blue-600/80 border-blue-400/30 text-white'
          }`}>
            <p className="text-sm leading-relaxed">{message}</p>
          </div>
          <span className={`text-xs text-slate-400 mt-1 ${
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
