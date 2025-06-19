
import React from 'react';
import { BarChart3, Truck, Factory, Users, ShoppingCart, Warehouse, ArrowRight } from 'lucide-react';

interface SuggestionCard {
  title: string;
  icon: React.ReactNode;
  sampleQuestion: string;
}

interface LandingPageProps {
  onSuggestionClick: (question: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSuggestionClick }) => {
  const suggestions: SuggestionCard[] = [
    {
      title: "Supplier Analysis",
      icon: <Users className="w-6 h-6" />,
      sampleQuestion: "Analyze supplier performance metrics and identify top-performing suppliers for our key product categories"
    },
    {
      title: "Inventory Planning",
      icon: <BarChart3 className="w-6 h-6" />,
      sampleQuestion: "Create an optimal inventory plan for the next quarter based on historical demand patterns"
    },
    {
      title: "Capacity Planning",
      icon: <Factory className="w-6 h-6" />,
      sampleQuestion: "Assess current production capacity and recommend expansion strategies for peak seasons"
    },
    {
      title: "Sourcing Optimization",
      icon: <ShoppingCart className="w-6 h-6" />,
      sampleQuestion: "Identify cost-effective sourcing alternatives for our high-volume raw materials"
    },
    {
      title: "Warehouse Optimization",
      icon: <Warehouse className="w-6 h-6" />,
      sampleQuestion: "Optimize warehouse layout and storage allocation to improve picking efficiency"
    },
    {
      title: "Logistics Planning",
      icon: <Truck className="w-6 h-6" />,
      sampleQuestion: "Design an efficient distribution network to minimize transportation costs and delivery times"
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-blue-800 p-8">
      <div className="text-center mb-12">
        <h1 className="text-6xl font-bold text-white mb-4">SCM AI</h1>
        <p className="text-xl text-blue-200">Your intelligent supply chain management assistant.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 max-w-6xl">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            onClick={() => onSuggestionClick(suggestion.sampleQuestion)}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/20 transition-all duration-300 cursor-pointer group"
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className="text-blue-300 group-hover:text-white transition-colors">
                {suggestion.icon}
              </div>
              <h3 className="text-lg font-semibold text-white">{suggestion.title}</h3>
            </div>
            <p className="text-blue-200 text-sm group-hover:text-white transition-colors">
              Click to analyze {suggestion.title.toLowerCase()}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-8 py-4 max-w-2xl w-full">
        <div className="flex items-center justify-between">
          <input
            type="text"
            placeholder="Ask me anything about your projects"
            className="bg-transparent text-white placeholder-blue-200 flex-1 outline-none text-lg"
            readOnly
          />
          <ArrowRight className="w-6 h-6 text-blue-300" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
