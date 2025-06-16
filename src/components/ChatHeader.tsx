
import React from 'react';
import { Leaf, MoreVertical } from 'lucide-react';

const ChatHeader: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Leaf className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Farm to Plate FlowIQ</h1>
            <p className="text-sm text-green-100">AI-powered supply chain assistant</p>
          </div>
        </div>
        <button className="w-8 h-8 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-200">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
