
import React from 'react';
import { Leaf, MoreVertical } from 'lucide-react';

const ChatHeader: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white p-4 shadow-lg backdrop-blur-sm bg-opacity-95">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500/30 backdrop-blur-sm rounded-full flex items-center justify-center border border-blue-400/20">
            <Leaf className="w-6 h-6 text-blue-300" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-blue-100">Farm to Plate SCM Engine</h1>
            <p className="text-sm text-blue-200">AI-powered supply chain assistant</p>
          </div>
        </div>
        <button className="w-8 h-8 hover:bg-blue-500/20 rounded-full flex items-center justify-center transition-colors duration-200 backdrop-blur-sm">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
