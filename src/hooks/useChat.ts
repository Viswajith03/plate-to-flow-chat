
import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Message } from '../types/message';
import { generateSupplyChainResponse } from '../utils/supplyChainResponses';

export const useChat = () => {
  const location = useLocation();
  const [showAnalysisFlow, setShowAnalysisFlow] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessingFile, setIsProcessingFile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Handle initial data from navigation state
    const state = location.state as any;
    if (state?.initialQuestion) {
      handleInitialQuestion(state.initialQuestion);
    } else if (state?.initialMessage) {
      handleInitialMessage(state.initialMessage);
    } else if (state?.uploadedFile) {
      handleInitialFileUpload(state.uploadedFile);
    }
  }, [location.state]);

  const handleInitialQuestion = (question: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: question,
      isBot: false,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setMessages([userMessage]);
    setShowAnalysisFlow(true);
  };

  const handleInitialMessage = (message: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isBot: false,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setMessages([userMessage]);
    setShowAnalysisFlow(true);
  };

  const handleInitialFileUpload = (file: File) => {
    setUploadedFile(file);
    setIsProcessingFile(true);
    setShowAnalysisFlow(true);
  };

  const handleAnalysisComplete = () => {
    setShowAnalysisFlow(false);
    setIsTyping(true);

    setTimeout(() => {
      const lastUserMessage = messages[messages.length - 1];
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateSupplyChainResponse(lastUserMessage.text),
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    setIsProcessingFile(true);
    setShowAnalysisFlow(true);

    setTimeout(() => {
      setShowAnalysisFlow(false);
      setIsProcessingFile(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          text: `File "${file.name}" has been analyzed successfully! I've processed your data and can now provide demand forecasting insights, trend analysis, and inventory optimization recommendations based on your uploaded data.`,
          isBot: true,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        },
      ]);
    }, 8000);
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setIsProcessingFile(false);
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: 'File removed. You can upload a new file or continue chatting about supply chain topics.',
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
    ]);
  };

  const handleSendMessage = async (messageText: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isBot: false,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setMessages((prev) => [...prev, userMessage]);
    setShowAnalysisFlow(true);

    setTimeout(() => {
      setShowAnalysisFlow(false);
      setIsTyping(true);

      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: generateSupplyChainResponse(messageText),
          isBot: true,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };
        setMessages((prev) => [...prev, botResponse]);
        setIsTyping(false);
      }, 1500);
    }, 6000);
  };

  return {
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
  };
};
