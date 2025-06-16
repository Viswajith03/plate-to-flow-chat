
import React, { useState, useRef, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: string;
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm Farm to Plate FlowIQ, your AI assistant for agricultural supply chain management. I can help you with farm operations, logistics, quality control, and traceability. How can I assist you today?",
      isBot: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('farm') || lowerMessage.includes('agriculture')) {
      return "I can help you optimize your farm operations! This includes crop planning, soil management, irrigation scheduling, and pest control strategies. What specific farming challenge are you facing?";
    } else if (lowerMessage.includes('supply chain') || lowerMessage.includes('logistics')) {
      return "Supply chain optimization is crucial for farm-to-plate efficiency. I can assist with inventory management, transportation planning, cold chain logistics, and distribution strategies. What area would you like to focus on?";
    } else if (lowerMessage.includes('quality') || lowerMessage.includes('safety')) {
      return "Food quality and safety are paramount in the farm-to-plate journey. I can help with quality control protocols, food safety compliance, HACCP implementation, and traceability systems. What quality aspects concern you most?";
    } else if (lowerMessage.includes('trace') || lowerMessage.includes('track')) {
      return "Traceability is essential for food safety and transparency. I can help you implement blockchain-based tracking, QR code systems, and digital documentation for complete farm-to-plate visibility. What products do you need to trace?";
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! I'm here to help with all aspects of your farm-to-plate operations. Whether you need assistance with farming practices, supply chain optimization, quality control, or traceability, I'm ready to help!";
    } else {
      return "That's an interesting question about farm-to-plate operations! I can provide insights on sustainable farming, efficient logistics, quality assurance, and supply chain transparency. Could you provide more details about what you'd like to know?";
    }
  };

  const handleSendMessage = async (messageText: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isBot: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(messageText),
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <ChatHeader />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.text}
            isBot={message.isBot}
            timestamp={message.timestamp}
          />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
    </div>
  );
};

export default Chatbot;
