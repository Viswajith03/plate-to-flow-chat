
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import ChatInput from '../components/ChatInput';

const Landing = () => {
  const navigate = useNavigate();

  const handleSuggestionClick = (question: string) => {
    navigate('/chat', { state: { initialQuestion: question } });
  };

  const handleSendMessage = (message: string) => {
    navigate('/chat', { state: { initialMessage: message } });
  };

  const handleFileUpload = (file: File) => {
    navigate('/chat', { state: { uploadedFile: file } });
  };

  return (
    <div className="h-screen gradient-bg">
      <div className="flex flex-col h-full items-center justify-center px-8 gradient-content">
        <div className="w-full max-w-4xl mx-auto">
          {/* Centered Header Section with title and chatbar */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-6xl font-bold text-white mb-4">SCM AI Engine</h1>
            <p className="text-xl text-blue-200 mb-8">Anticipate. Adapt. Accelerate</p>
            
            {/* Centered Chatbar */}
            <div className="flex justify-center mb-12">
              <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                <ChatInput
                  onSendMessage={handleSendMessage}
                  onFileUpload={handleFileUpload}
                  disabled={false}
                />
              </div>
            </div>
          </div>
          
          {/* Landing Page Content - Suggestion Cards */}
          <LandingPage onSuggestionClick={handleSuggestionClick} />
        </div>
      </div>
    </div>
  );
};

export default Landing;
