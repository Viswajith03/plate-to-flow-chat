
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ChatMessages from '../components/ChatMessages';
import ChatInput from '../components/ChatInput';
import AnalysisSidebar from '../components/AnalysisSidebar';
import SuggestionCards from '../components/SuggestionCards';
import { useChat } from '../hooks/useChat';

const DataAnalysis = () => {
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
    handleAnalysisComplete,
  } = useChat();

  const handleQuestionClick = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <div className="h-screen flex bg-gradient-to-br from-[#1E1F38] to-[#2E2649]">
      {/* Main chat column */}
      <div className="flex flex-col flex-1 gradient-content min-w-0">
        
        {/* 1) Header */}
        <header className="flex items-center justify-between px-6 py-6 bg-transparent">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-white" />
            <span className="text-white text-sm">Go Back</span>
          </button>
          <h1 className="text-2xl font-semibold text-white">Data Analysis</h1>
          <div className="w-12" /> {/* spacer */}
        </header>

        {/* 2) Messages (scrollable) */}
        <main className="flex-1 overflow-y-auto px-6">
          {messages.length === 0 && !uploadedFile && (
            <SuggestionCards onQuestionClick={handleQuestionClick} />
          )}
          <ChatMessages
            messages={messages}
            isTyping={isTyping}
            uploadedFile={uploadedFile}
            isProcessingFile={isProcessingFile}
            onRemoveFile={handleRemoveFile}
            messagesEndRef={messagesEndRef}
          />
        </main>

        {/* 3) Input bar */}
        <footer className="px-6 py-4 bg-transparent">
          <ChatInput
            onSendMessage={handleSendMessage}
            onFileUpload={handleFileUpload}
            disabled={isTyping || showAnalysisFlow}
          />
        </footer>
      </div>

      {/* Analysis-flow sidebar */}
      <AnalysisSidebar
        showAnalysisFlow={showAnalysisFlow}
        hasUploadedFile={!!uploadedFile}
        onComplete={handleAnalysisComplete}
      />
    </div>
  );
};

export default DataAnalysis;
