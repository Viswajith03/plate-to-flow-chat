
import React from 'react';
import { BarChart3, Truck, Factory, Users, ShoppingCart, Warehouse } from 'lucide-react';

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
      icon: <Users className="w-5 h-5" />,
      sampleQuestion: "Analyze supplier performance metrics and identify top-performing suppliers for our key product categories"
    },
    {
      title: "Inventory Planning",
      icon: <BarChart3 className="w-5 h-5" />,
      sampleQuestion: "Create an optimal inventory plan for the next quarter based on historical demand patterns"
    },
    {
      title: "Capacity Planning",
      icon: <Factory className="w-5 h-5" />,
      sampleQuestion: "Assess current production capacity and recommend expansion strategies for peak seasons"
    },
    {
      title: "Sourcing Optimization",
      icon: <ShoppingCart className="w-5 h-5" />,
      sampleQuestion: "Identify cost-effective sourcing alternatives for our high-volume raw materials"
    },
    {
      title: "Warehouse Optimization",
      icon: <Warehouse className="w-5 h-5" />,
      sampleQuestion: "Optimize warehouse layout and storage allocation to improve picking efficiency"
    },
    {
      title: "Logistics Planning",
      icon: <Truck className="w-5 h-5" />,
      sampleQuestion: "Design an efficient distribution network to minimize transportation costs and delivery times"
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-24">
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-6xl font-bold text-white mb-4">Farm to Plate SCM Engine</h1>
        <p className="text-xl text-blue-200">Your intelligent supply chain management assistant.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 max-w-4xl">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            onClick={() => onSuggestionClick(suggestion.sampleQuestion)}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 hover:bg-white/20 hover:scale-105 transition-all duration-300 cursor-pointer group animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="text-blue-300 group-hover:text-white transition-colors">
                {suggestion.icon}
              </div>
              <h3 className="text-sm font-semibold text-white">{suggestion.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
