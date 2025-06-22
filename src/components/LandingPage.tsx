
import React, { useState } from 'react';
import { BarChart3, Truck, Factory, Users, ShoppingCart, Warehouse, ArrowLeft } from 'lucide-react';

interface SuggestionCard {
  title: string;
  icon: React.ReactNode;
  sampleQuestion: string;
  questions: string[];
}

interface LandingPageProps {
  onSuggestionClick: (question: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSuggestionClick }) => {
  const [selectedCard, setSelectedCard] = useState<SuggestionCard | null>(null);

  const suggestions: SuggestionCard[] = [
    {
      title: "Supplier Analysis",
      icon: <Users className="w-5 h-5" />,
      sampleQuestion: "Analyze supplier performance metrics and identify top-performing suppliers for our key product categories",
      questions: [
        "Analyze supplier performance metrics and identify top-performing suppliers for our key product categories",
        "Compare delivery reliability across different suppliers for Q4 2024",
        "Identify suppliers with the best cost-to-quality ratio",
        "Which suppliers have the shortest lead times for critical components?",
        "Evaluate supplier risk factors and recommend diversification strategies"
      ]
    },
    {
      title: "Inventory Planning",
      icon: <BarChart3 className="w-5 h-5" />,
      sampleQuestion: "Create an optimal inventory plan for the next quarter based on historical demand patterns",
      questions: [
        "Create an optimal inventory plan for the next quarter based on historical demand patterns",
        "Calculate safety stock levels for all product categories",
        "Identify slow-moving inventory and suggest clearance strategies",
        "Forecast inventory requirements for peak season",
        "Optimize reorder points and quantities for key SKUs"
      ]
    },
    {
      title: "Capacity Planning",
      icon: <Factory className="w-5 h-5" />,
      sampleQuestion: "Assess current production capacity and recommend expansion strategies for peak seasons",
      questions: [
        "Assess current production capacity and recommend expansion strategies for peak seasons",
        "Analyze bottlenecks in our current production process",
        "Calculate required workforce for 30% demand increase",
        "Evaluate equipment utilization rates across all facilities",
        "Plan capacity allocation for new product launches"
      ]
    },
    {
      title: "Sourcing Optimization",
      icon: <ShoppingCart className="w-5 h-5" />,
      sampleQuestion: "Identify cost-effective sourcing alternatives for our high-volume raw materials",
      questions: [
        "Identify cost-effective sourcing alternatives for our high-volume raw materials",
        "Compare local vs international sourcing options",
        "Analyze total cost of ownership for different suppliers",
        "Evaluate sustainable sourcing opportunities",
        "Optimize sourcing mix to reduce supply chain risks"
      ]
    },
    {
      title: "Warehouse Optimization",
      icon: <Warehouse className="w-5 h-5" />,
      sampleQuestion: "Optimize warehouse layout and storage allocation to improve picking efficiency",
      questions: [
        "Optimize warehouse layout and storage allocation to improve picking efficiency",
        "Analyze warehouse space utilization and suggest improvements",
        "Design optimal picking routes to reduce travel time",
        "Evaluate automation opportunities in warehouse operations",
        "Calculate ROI for warehouse management system upgrade"
      ]
    },
    {
      title: "Logistics Planning",
      icon: <Truck className="w-5 h-5" />,
      sampleQuestion: "Design an efficient distribution network to minimize transportation costs and delivery times",
      questions: [
        "Design an efficient distribution network to minimize transportation costs and delivery times",
        "Optimize delivery routes for last-mile efficiency",
        "Analyze transportation mode options for different regions",
        "Calculate the impact of hub consolidation on costs",
        "Evaluate 3PL partnerships vs in-house logistics"
      ]
    }
  ];

  const handleCardClick = (card: SuggestionCard) => {
    setSelectedCard(card);
  };

  const handleQuestionClick = (question: string) => {
    onSuggestionClick(question);
  };

  const handleBackClick = () => {
    setSelectedCard(null);
  };

  return (
    <div className="flex flex-col min-h-screen p-8">
      {/* Header Section */}
      <div className="text-center mb-12 animate-fade-in">
        <h1 className="text-6xl font-bold text-white mb-4">Farm to Plate SCM Engine</h1>
        <p className="text-xl text-blue-200">Your intelligent supply chain management assistant.</p>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-6xl mx-auto w-full">
        {!selectedCard ? (
          /* Suggestion Cards Grid */
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(suggestion)}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer group animate-fade-in w-full max-w-xs"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="text-blue-300 group-hover:text-white transition-colors">
                    {suggestion.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-white">{suggestion.title}</h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Questions List */
          <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="flex items-center mb-8">
              <button
                onClick={handleBackClick}
                className="mr-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-md border border-white/20"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="text-blue-300">
                  {selectedCard.icon}
                </div>
                <h2 className="text-2xl font-bold text-white">{selectedCard.title}</h2>
              </div>
            </div>
            
            <div className="space-y-4">
              {selectedCard.questions.map((question, index) => (
                <div
                  key={index}
                  onClick={() => handleQuestionClick(question)}
                  className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 hover:bg-white/20 hover:scale-[1.02] transition-all duration-300 cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <p className="text-white text-sm leading-relaxed">{question}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
