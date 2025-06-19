
import React, { useState, useRef } from 'react';
import { Send, Paperclip } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onFileUpload?: (file: File) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, onFileUpload, disabled = false }) => {
  const [message, setMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && onFileUpload) {
      const file = e.target.files[0];
      const validTypes = [
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/csv'
      ];
      
      if (validTypes.includes(file.type) || file.name.endsWith('.csv') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
        onFileUpload(file);
      }
    }
  };

  return (
    <div className="border-t border-slate-700/50 bg-slate-900/80 backdrop-blur-sm p-4">
      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about supply chain processes..."
            disabled={disabled}
            className="w-full px-4 py-3 rounded-full bg-slate-800/60 backdrop-blur-sm border border-slate-600/30 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        
        {onFileUpload && (
          <button
            type="button"
            onClick={handleFileClick}
            disabled={disabled}
            className="w-12 h-12 bg-slate-700/60 hover:bg-slate-600/60 disabled:bg-slate-800/60 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors duration-200 border border-slate-600/30"
            title="Upload Excel or CSV file"
          >
            <Paperclip className="w-5 h-5 text-slate-300" />
          </button>
        )}
        
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className="w-12 h-12 bg-blue-600/80 hover:bg-blue-500/80 disabled:bg-slate-700/60 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors duration-200 border border-blue-500/30"
        >
          <Send className="w-5 h-5 text-white" />
        </button>
      </form>
      
      {onFileUpload && (
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleFileChange}
          className="hidden"
          disabled={disabled}
        />
      )}
    </div>
  );
};

export default ChatInput;
