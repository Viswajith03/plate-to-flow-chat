
import React from 'react';
import { Bot } from 'lucide-react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start mb-4 animate-fade-in">
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-blue-600/80 backdrop-blur-sm border border-blue-400/30 flex items-center justify-center mr-3">
          <Bot className="w-4 h-4 text-blue-200" />
        </div>
        <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-600/30 px-4 py-3 rounded-2xl shadow-lg">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
