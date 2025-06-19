
import React from 'react';
import { File, X } from 'lucide-react';

interface UploadedFileProps {
  file: File;
  onRemove: () => void;
  processing?: boolean;
}

const UploadedFile: React.FC<UploadedFileProps> = ({ file, onRemove, processing = false }) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="flex items-center justify-between bg-blue-950/60 backdrop-blur-sm border border-blue-700/30 rounded-lg p-3 mb-3">
      <div className="flex items-center space-x-3">
        <File className="w-5 h-5 text-blue-300" />
        <div>
          <p className="text-sm font-medium text-slate-100">{file.name}</p>
          <p className="text-xs text-slate-400">{formatFileSize(file.size)}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        {processing && (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-xs text-blue-300">Processing...</span>
          </div>
        )}
        <button
          onClick={onRemove}
          disabled={processing}
          className="text-slate-400 hover:text-red-400 transition-colors disabled:opacity-50"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default UploadedFile;
