
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ChatMessages from '../components/ChatMessages';
import ChatInput from '../components/ChatInput';
import AnalysisSidebar from '../components/AnalysisSidebar';
import { useChat } from '../hooks/useChat';

const DemandForecasting = () => {
  const navigate = useNavigate();
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
    <div className="h-screen gradient-bg">
      <div className="flex h-full">
        <div className="flex flex-col flex-1 relative gradient-content min-w-0">
          {/* Header with Go Back button */}
          <div className="flex items-center justify-between p-4 border-b border-white/20 bg-slate-900/30 backdrop-blur-sm">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-white" />
              <span className="text-white">Go Back to Main Menu</span>
            </button>
            <h1 className="text-2xl font-bold text-white">Demand Forecasting</h1>
            <div className="w-48"></div> {/* Spacer for center alignment */}
          </div>

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
    </div>
  );
};

export default DemandForecasting;
