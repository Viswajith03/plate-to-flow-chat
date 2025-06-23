
import React from 'react';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';
import UploadedFile from './UploadedFile';
import { Message } from '../types/message';

interface ChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
  uploadedFile: File | null;
  isProcessingFile: boolean;
  onRemoveFile: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  isTyping,
  uploadedFile,
  isProcessingFile,
  onRemoveFile,
  messagesEndRef
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {uploadedFile && (
        <UploadedFile
          file={uploadedFile}
          onRemove={onRemoveFile}
          processing={isProcessingFile}
        />
      )}

      {messages.map((msg) => (
        <ChatMessage
          key={msg.id}
          message={msg.text}
          isBot={msg.isBot}
          timestamp={msg.timestamp}
        />
      ))}

      {isTyping && <TypingIndicator />}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
