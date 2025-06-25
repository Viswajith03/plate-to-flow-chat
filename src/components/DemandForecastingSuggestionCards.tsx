
import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface SuggestionCard {
  title: string;
  icon: string;
  questions: string[];
}

interface DemandForecastingSuggestionCardsProps {
  onQuestionClick: (question: string) => void;
}

const DemandForecastingSuggestionCards: React.FC<DemandForecastingSuggestionCardsProps> = ({ onQuestionClick }) => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const suggestionCards: SuggestionCard[] = [
    {
      title: "Multi-Granular Forecasting",
      icon: "📈",
      questions: [
        "Forecast for SKU-ABC in Delhi next 30 days",
        "Weekly demand for fruits by store",
        "Channel-wise demand breakdown"
      ]
    },
    {
      title: "Feature Impact Analysis",
      icon: "🧠",
      questions: [
        "What are the top 3 factors affecting demand for bread?",
        "How much does temperature influence bottled water sales?"
      ]
    },
    {
      title: "Promotion / Event Effect Modeling",
      icon: "💹",
      questions: [
        "How did Diwali affect snack sales?",
        "Impact of end-of-season sale on apparel demand"
      ]
    },
    {
      title: "Causal Impact / What-if Analysis",
      icon: "🔮",
      questions: [
        "If price drops by 10%, how will demand change?",
        "What if we reduce delivery time by 2 days?"
      ]
    },
    {
      title: "Rolling Forecast + Drift Detection",
      icon: "⏱️",
      questions: [
        "Show rolling weekly forecast for dairy",
        "Alert if prediction error crosses 20%"
      ]
    },
    {
      title: "External Factor Forecasting",
      icon: "🌦️",
      questions: [
        "How will rainy weather affect vegetable demand?",
        "Forecast considering holiday calendar"
      ]
    },
    {
      title: "Forecast Accuracy & Model Comparison",
      icon: "📉",
      questions: [
        "Show forecast accuracy by region",
        "Compare Prophet vs XGBoost for cereal SKUs"
      ]
    },
    {
      title: "Forecast Visualization with Confidence",
      icon: "📊",
      questions: [
        "Display 95% confidence interval for monthly meat sales",
        "Show high-risk forecast periods"
      ]
    },
    {
      title: "Natural Language Forecasting",
      icon: "🗣️",
      questions: [
        "Tell me expected milk demand next week in Bangalore",
        "Will baby food demand grow next quarter?"
      ]
    },
    {
      title: "Inventory & Procurement Recommendations",
      icon: "📦",
      questions: [
        "How much wheat to reorder for July?",
        "Procurement plan for top 10 SKUs"
      ]
    }
  ];

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-white mb-4">
        Suggested Demand Forecasting Questions
      </h3>
      <div className="grid grid-cols-5 grid-rows-2 gap-4">
        {suggestionCards.map((card, index) => (
          <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleCard(index)}
              className="w-full p-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="text-lg">{card.icon}</span>
                <h4 className="text-sm font-medium text-white">{card.title}</h4>
              </div>
              {expandedCard === index ? (
                <ChevronDown className="w-4 h-4 text-white flex-shrink-0" />
              ) : (
                <ChevronRight className="w-4 h-4 text-white flex-shrink-0" />
              )}
            </button>
            
            {expandedCard === index && (
              <div className="px-4 pb-4 space-y-2">
                {card.questions.map((question, qIndex) => (
                  <button
                    key={qIndex}
                    onClick={() => onQuestionClick(question)}
                    className="w-full text-left p-2 text-sm text-blue-200 hover:text-white hover:bg-white/10 rounded transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemandForecastingSuggestionCards;
