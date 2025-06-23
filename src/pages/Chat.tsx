
import React from 'react';
import ChatHeader from '../components/ChatHeader';
import ChatMessages from '../components/ChatMessages';
import ChatInput from '../components/ChatInput';
import AnalysisSidebar from '../components/AnalysisSidebar';
import { useChat } from '../hooks/useChat';

const Chat = () => {
  const {
    messages,
    isTyping,
    uploadedFile,
    isProcessingFile,
    showAnalysisFlow,
    messagesEndRef,
    handleSendMessage,
    handleFileUpload,
    handleRemoveFile,
    handleAnalysisComplete
  } = useChat();

  return (
    <div className="flex h-screen gradient-bg">
      {/* Main Content Area */}
      <div className="flex flex-col flex-1 relative gradient-content min-w-0">
        {/* Header */}
        <ChatHeader />

        {/* Messages Area */}
        <ChatMessages
          messages={messages}
          isTyping={isTyping}
          uploadedFile={uploadedFile}
          isProcessingFile={isProcessingFile}
          onRemoveFile={handleRemoveFile}
          messagesEndRef={messagesEndRef}
        />

        {/* Chat Input */}
        <ChatInput
          onSendMessage={handleSendMessage}
          onFileUpload={handleFileUpload}
          disabled={isTyping || showAnalysisFlow}
        />
      </div>

      {/* Analysis Flow Sidebar */}
      <AnalysisSidebar
        showAnalysisFlow={showAnalysisFlow}
        hasUploadedFile={!!uploadedFile}
        onComplete={handleAnalysisComplete}
      />
    </div>
  );
};

export default Chat;
