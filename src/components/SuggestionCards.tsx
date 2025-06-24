
import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';

interface SuggestionCard {
  title: string;
  questions: string[];
}

interface SuggestionCardsProps {
  onQuestionClick: (question: string) => void;
}

const SuggestionCards: React.FC<SuggestionCardsProps> = ({ onQuestionClick }) => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const suggestionCards: SuggestionCard[] = [
    {
      title: "Stock-out & Overstock Analysis",
      questions: [
        "Which SKUs are at risk of stockout?",
        "Which SKUs are overstocked?",
        "What is the current inventory turnover rate?",
        "Which products have the highest carrying costs?"
      ]
    },
    {
      title: "Lead Time Variability",
      questions: [
        "What is the average lead time for each supplier?",
        "Which suppliers have the most variable lead times?",
        "How does lead time variability affect stock levels?",
        "What is the impact of lead time on customer satisfaction?"
      ]
    },
    {
      title: "ABC/XYZ Classification",
      questions: [
        "Which products fall into ABC categories?",
        "What is the XYZ classification of our inventory?",
        "How should we prioritize inventory management by category?",
        "Which high-value items need closer monitoring?"
      ]
    },
    {
      title: "Logistics Route Optimization",
      questions: [
        "What are the most efficient delivery routes?",
        "How can we reduce transportation costs?",
        "Which routes have the longest delivery times?",
        "What is the optimal vehicle utilization rate?"
      ]
    },
    {
      title: "Safety Stock Calculator",
      questions: [
        "What is the optimal safety stock level?",
        "How much safety stock do we need for seasonal items?",
        "What factors should influence safety stock calculations?",
        "How does demand variability affect safety stock requirements?"
      ]
    },
    {
      title: "What-If Scenario Simulation",
      questions: [
        "What if demand increases by 20%?",
        "How would a supplier delay affect operations?",
        "What is the impact of changing order quantities?",
        "How would price changes affect demand patterns?"
      ]
    }
  ];

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold text-white mb-4">
        Suggested Analysis Questions
      </h3>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {suggestionCards.map((card, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden h-full">
                <button
                  onClick={() => toggleCard(index)}
                  className="w-full p-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <h4 className="text-sm font-medium text-white">{card.title}</h4>
                  {expandedCard === index ? (
                    <ChevronDown className="w-4 h-4 text-white" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-white" />
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
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default SuggestionCards;
