import React, { useState, useRef, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import UploadedFile from './UploadedFile';

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
      text: "Hello! I'm Farm to Plate SCM Engine, your AI supply chain assistant. I can help you with supply chain optimization, demand forecasting, inventory management, and logistics planning. Upload an Excel or CSV file for demand forecasting analysis, or ask me any supply chain questions!",
      isBot: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
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

  const generateSupplyChainResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // File-related responses
    if (uploadedFile && (lowerMessage.includes('forecast') || lowerMessage.includes('predict') || lowerMessage.includes('demand'))) {
      return `Great! I've analyzed your uploaded file "${uploadedFile.name}". Based on the historical data, I can help you with demand forecasting. Here are some key insights I can provide:

📊 **Demand Patterns**: Historical trends and seasonality analysis
📈 **Forecast Models**: Statistical forecasting using moving averages, exponential smoothing, and trend analysis
📅 **Time Series Analysis**: Weekly, monthly, and seasonal demand predictions
⚠️ **Risk Factors**: Potential supply chain disruptions and mitigation strategies

Would you like me to focus on a specific aspect of the demand forecast, such as seasonal trends or inventory planning recommendations?`;
    }

    // Demand forecasting
    if (lowerMessage.includes('demand') && (lowerMessage.includes('forecast') || lowerMessage.includes('predict'))) {
      return "Demand forecasting is crucial for supply chain optimization! I can help you with various forecasting methods:\n\n📊 **Time Series Analysis**: Moving averages, exponential smoothing\n📈 **Causal Models**: Regression analysis with external factors\n🔄 **Machine Learning**: Advanced predictive models\n📅 **Seasonal Adjustments**: Handling seasonal variations\n\nUpload your historical sales/demand data (Excel/CSV) and I'll provide specific forecasting insights for your business!";
    }

    // Inventory management
    if (lowerMessage.includes('inventory') || lowerMessage.includes('stock')) {
      return "Inventory management is key to supply chain efficiency! Here's how I can help:\n\n📦 **Optimal Stock Levels**: Calculate safety stock and reorder points\n🔄 **ABC Analysis**: Categorize items by importance\n📊 **EOQ Models**: Economic Order Quantity optimization\n⚡ **Just-in-Time**: Lean inventory strategies\n📈 **Turnover Ratios**: Measure inventory performance\n\nWhat specific inventory challenges are you facing?";
    }

    // Supply chain optimization
    if (lowerMessage.includes('optimize') || lowerMessage.includes('efficiency')) {
      return "Supply chain optimization involves multiple strategies:\n\n🚚 **Logistics Optimization**: Route planning and transportation efficiency\n🏭 **Supplier Management**: Vendor selection and relationship optimization\n📊 **Process Improvement**: Lean methodologies and waste reduction\n🔄 **Technology Integration**: Automation and digital transformation\n📈 **Performance Metrics**: KPIs and continuous improvement\n\nWhich area would you like to focus on first?";
    }

    // Logistics and transportation
    if (lowerMessage.includes('logistics') || lowerMessage.includes('transport') || lowerMessage.includes('shipping')) {
      return "Logistics and transportation are critical supply chain components:\n\n🚛 **Route Optimization**: Minimize transportation costs and delivery times\n📦 **Warehouse Management**: Efficient storage and picking strategies\n🌐 **Multi-modal Transport**: Combining different transportation modes\n📱 **Track & Trace**: Real-time shipment visibility\n🔄 **Last-Mile Delivery**: Final delivery optimization\n\nWhat logistics challenges are you currently facing?";
    }

    // Risk management
    if (lowerMessage.includes('risk') || lowerMessage.includes('disruption')) {
      return "Supply chain risk management is essential for business continuity:\n\n⚠️ **Risk Assessment**: Identify potential disruption sources\n🛡️ **Mitigation Strategies**: Develop contingency plans\n🔄 **Supplier Diversification**: Reduce single-source dependencies\n📊 **Scenario Planning**: Prepare for various disruption scenarios\n🚨 **Crisis Management**: Rapid response protocols\n\nWhat types of supply chain risks are you most concerned about?";
    }

    // Sustainability
    if (lowerMessage.includes('sustain') || lowerMessage.includes('green') || lowerMessage.includes('environment')) {
      return "Sustainable supply chain practices are increasingly important:\n\n🌱 **Green Logistics**: Eco-friendly transportation options\n♻️ **Circular Economy**: Waste reduction and recycling\n🔋 **Carbon Footprint**: Emissions tracking and reduction\n🏭 **Sustainable Sourcing**: Ethical and environmental supplier selection\n📊 **ESG Reporting**: Environmental, Social, and Governance metrics\n\nHow can I help you implement more sustainable supply chain practices?";
    }

    // Technology and digitization
    if (lowerMessage.includes('technology') || lowerMessage.includes('digital') || lowerMessage.includes('automation')) {
      return "Digital transformation is revolutionizing supply chains:\n\n🤖 **Automation**: Robotic process automation and AI\n📊 **IoT Integration**: Real-time monitoring and data collection\n🔗 **Blockchain**: Enhanced traceability and transparency\n📱 **Mobile Solutions**: On-the-go supply chain management\n☁️ **Cloud Platforms**: Scalable and integrated systems\n\nWhich technology areas are you looking to implement or improve?";
    }

    // Supplier management
    if (lowerMessage.includes('supplier') || lowerMessage.includes('vendor')) {
      return "Effective supplier management is crucial for supply chain success:\n\n👥 **Supplier Selection**: Evaluation criteria and assessment\n📊 **Performance Monitoring**: KPIs and scorecards\n🤝 **Relationship Management**: Strategic partnerships\n💰 **Cost Negotiation**: Total cost of ownership analysis\n🔄 **Contract Management**: Terms and SLA monitoring\n\nWhat supplier management challenges can I help you address?";
    }

    // Quality control
    if (lowerMessage.includes('quality') || lowerMessage.includes('inspection')) {
      return "Quality control in supply chains ensures product excellence:\n\n✅ **Quality Standards**: Define and implement quality criteria\n🔍 **Inspection Processes**: Incoming and outgoing quality checks\n📊 **Statistical Quality Control**: Data-driven quality monitoring\n🏭 **Supplier Quality**: Vendor quality assurance programs\n🔄 **Continuous Improvement**: Quality enhancement initiatives\n\nHow can I assist with your quality control processes?";
    }

    // General greeting
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('help')) {
      return "Hello! I'm here to help with all your supply chain needs. I can assist with:\n\n📊 **Demand Forecasting** (upload data files for analysis)\n📦 **Inventory Management**\n🚚 **Logistics & Transportation**\n⚠️ **Risk Management**\n🌱 **Sustainability**\n🤖 **Technology Integration**\n\nWhat supply chain topic would you like to explore, or do you have data to upload for analysis?";
    }

    // Default response
    return "That's an interesting supply chain question! I can provide insights on demand forecasting, inventory optimization, logistics planning, risk management, supplier relations, and sustainability practices.\n\nFor demand forecasting analysis, feel free to upload your historical data (Excel/CSV format). Otherwise, could you provide more specific details about what aspect of supply chain management you'd like to discuss?";
  };

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    setIsProcessingFile(true);
    console.log('File uploaded:', file.name, file.type, file.size);

    // Simulate file processing
    setTimeout(() => {
      setIsProcessingFile(false);
      
      const fileMessage: Message = {
        id: Date.now().toString(),
        text: `File "${file.name}" has been uploaded successfully! I can now analyze your data for demand forecasting. Ask me about demand patterns, seasonal trends, or forecast predictions.`,
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, fileMessage]);
    }, 2000);
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setIsProcessingFile(false);
    
    const removeMessage: Message = {
      id: Date.now().toString(),
      text: "File removed. You can upload a new file for demand forecasting analysis, or continue asking general supply chain questions.",
      isBot: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, removeMessage]);
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
        text: generateSupplyChainResponse(messageText),
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
      <ChatHeader />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {uploadedFile && (
          <UploadedFile
            file={uploadedFile}
            onRemove={handleRemoveFile}
            processing={isProcessingFile}
          />
        )}
        
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

      <ChatInput 
        onSendMessage={handleSendMessage} 
        onFileUpload={handleFileUpload}
        disabled={isTyping} 
      />
    </div>
  );
};

export default Chatbot;
