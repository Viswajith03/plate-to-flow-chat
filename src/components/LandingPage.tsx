
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, BarChart3, Shield, Clock, Search, Warehouse, Info } from 'lucide-react';

interface SuggestionCard {
  title: string;
  icon: React.ReactNode;
  route: string;
  disabled: boolean;
}

interface LandingPageProps {
  onSuggestionClick: (question: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSuggestionClick }) => {
  const navigate = useNavigate();

  const suggestions: SuggestionCard[] = [
    {
      title: "Demand Forecasting",
      icon: <TrendingUp className="w-6 h-6" />,
      route: "/demand-forecasting",
      disabled: false
    },
    {
      title: "Data Analysis",
      icon: <BarChart3 className="w-6 h-6" />,
      route: "/data-analysis",
      disabled: false
    },
    {
      title: "Spoilage Protection",
      icon: <Shield className="w-6 h-6" />,
      route: "/spoilage-protection",
      disabled: true
    },
    {
      title: "ETA prediction",
      icon: <Clock className="w-6 h-6" />,
      route: "/eta-prediction",
      disabled: true
    },
    {
      title: "anomaly detection",
      icon: <Search className="w-6 h-6" />,
      route: "/anomaly-detection",
      disabled: true
    },
    {
      title: "Smart warehouse management",
      icon: <Warehouse className="w-6 h-6" />,
      route: "/smart-warehouse-management",
      disabled: true
    },
    {
      title: "Latest Information",
      icon: <Info className="w-6 h-6" />,
      route: "/latest-information",
      disabled: false
    }
  ];

  const handleCardClick = (card: SuggestionCard) => {
    if (!card.disabled) {
      navigate(card.route);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Example prompt section */}
      <div className="mb-8">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center">
          <p className="text-white text-lg">
            Ex: Can you forecast demand for Alphonso Mangoes for the month of July for Mumbai? , Upload your data
          </p>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(suggestion)}
            className={`
              bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center transition-all duration-300 
              ${suggestion.disabled 
                ? 'opacity-50 cursor-not-allowed grayscale' 
                : 'hover:bg-white/20 hover:scale-105 cursor-pointer group'
              }
              animate-fade-in
            `}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex flex-col items-center space-y-3">
              <div className={`${suggestion.disabled ? 'text-gray-400' : 'text-blue-300 group-hover:text-white'} transition-colors`}>
                {suggestion.icon}
              </div>
              <h3 className="text-sm font-semibold text-white">{suggestion.title}</h3>
              {suggestion.disabled && (
                <span className="text-xs text-gray-400">Coming Soon</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
