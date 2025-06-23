import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ChatHeader from '../components/ChatHeader';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import TypingIndicator from '../components/TypingIndicator';
import UploadedFile from '../components/UploadedFile';
import AnalysisFlow from '../components/AnalysisFlow';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: string;
}

const Chat = () => {
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

  const generateSupplyChainResponse = (userMessage: string): string => {
    const lower = userMessage.toLowerCase();
    
    if (lower.includes('supplier') && lower.includes('analysis')) {
      return "Based on the supplier analysis request, I've identified key performance metrics including delivery reliability (94.2%), cost efficiency (87.5%), and quality scores (96.8%). Top-performing suppliers show consistent lead times and competitive pricing. I recommend consolidating orders with suppliers achieving >90% reliability scores while developing backup options for critical materials.";
    }
    
    if (lower.includes('inventory') && lower.includes('planning')) {
      return "For inventory planning optimization, I've analyzed demand patterns showing seasonal peaks in Q2 and Q4. Recommended safety stock levels: 15% for Class A items, 25% for Class B, and 35% for Class C. Implementation of ABC analysis suggests focusing 80% of inventory management efforts on your top 20% revenue-generating SKUs.";
    }
    
    if (lower.includes('capacity') && lower.includes('planning')) {
      return "Capacity analysis reveals current utilization at 78% with bottlenecks in packaging operations. To handle projected 25% demand increase, consider: 1) Adding second shift in packaging (immediate), 2) Equipment upgrade for 30% throughput improvement, 3) Cross-training workforce for flexibility. ROI analysis shows payback period of 14 months for recommended investments.";
    }
    
    if (lower.includes('sourcing') && (lower.includes('optimization') || lower.includes('option'))) {
      return "Sourcing optimization analysis identified 3 alternative suppliers with 15-20% cost savings potential. Risk assessment shows geographical diversification reduces supply chain vulnerability by 35%. Recommended strategy: 70% primary supplier, 20% secondary, 10% spot market for flexibility. Implementing vendor scorecards will improve performance monitoring.";
    }
    
    if (lower.includes('warehouse') && lower.includes('optimization')) {
      return "Warehouse optimization study reveals 23% efficiency improvement potential through layout restructuring. Key recommendations: 1) Implement zone picking reducing travel time by 35%, 2) ABC positioning placing fast-movers within 50ft of shipping, 3) Automated sorting system for 40% throughput increase. Expected ROI: 18 months with 28% operational cost reduction.";
    }
    
    if (lower.includes('logistics') || lower.includes('distribution')) {
      return "Distribution network analysis suggests hub consolidation reducing transportation costs by 22%. Optimal strategy combines regional distribution centers with last-mile delivery partnerships. Route optimization algorithms show 18% reduction in delivery times and 15% fuel cost savings. Consider implementing dynamic routing based on real-time traffic and demand patterns.";
    }
    
    return "That's an insightful supply chain question! Based on current industry best practices and data analytics, I can help you optimize your operations through strategic planning, risk mitigation, and performance improvements. Would you like me to dive deeper into any specific aspect of your supply chain operations?";
  };

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

  return (
    <div className="flex h-screen gradient-bg">
      {/* Main Content Area */}
      <div className="flex flex-col flex-1 relative gradient-content">
        {/* Header */}
        <ChatHeader />

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {uploadedFile && (
            <UploadedFile
              file={uploadedFile}
              onRemove={handleRemoveFile}
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

        {/* Chat Input */}
        <ChatInput
          onSendMessage={handleSendMessage}
          onFileUpload={handleFileUpload}
          disabled={isTyping || showAnalysisFlow}
        />
      </div>

      {/* Analysis Flow Sidebar */}
      <div className={`transition-all duration-500 ease-in-out ${
        showAnalysisFlow 
          ? 'w-96 opacity-100 translate-x-0' 
          : 'w-0 opacity-0 translate-x-full overflow-hidden'
      } bg-slate-900/50 backdrop-blur-sm border-l border-slate-700/50`}>
        <div className="p-4 h-full">
          <AnalysisFlow
            isVisible={showAnalysisFlow}
            onComplete={handleAnalysisComplete}
            hasUploadedFile={!!uploadedFile}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;
