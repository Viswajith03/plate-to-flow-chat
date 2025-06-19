
import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle, Loader2 } from 'lucide-react';

interface AnalysisStep {
  title: string;
  description: string;
  duration: number;
}

interface AnalysisFlowProps {
  isVisible: boolean;
  onComplete: () => void;
}

const AnalysisFlow: React.FC<AnalysisFlowProps> = ({ isVisible, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const steps: AnalysisStep[] = [
    {
      title: "Analysis Request Received",
      description: "Processing your supply chain query",
      duration: 1000
    },
    {
      title: "Analyzing Data",
      description: "Examining historical patterns and trends",
      duration: 2000
    },
    {
      title: "Generating Code",
      description: "Creating analytical algorithms",
      duration: 1500
    },
    {
      title: "Training Model",
      description: "Optimizing predictive models",
      duration: 2500
    },
    {
      title: "Generating Response",
      description: "Compiling insights and recommendations",
      duration: 1500
    }
  ];

  useEffect(() => {
    if (!isVisible) {
      setCurrentStep(0);
      setCompletedSteps([]);
      return;
    }

    let stepIndex = 0;
    const processSteps = () => {
      if (stepIndex < steps.length) {
        setCurrentStep(stepIndex);
        
        setTimeout(() => {
          setCompletedSteps(prev => [...prev, stepIndex]);
          stepIndex++;
          
          if (stepIndex >= steps.length) {
            setTimeout(() => {
              onComplete();
            }, 500);
          } else {
            processSteps();
          }
        }, steps[stepIndex].duration);
      }
    };

    processSteps();
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="bg-slate-900/95 backdrop-blur-sm border border-slate-700/50 rounded-lg p-6 mb-4">
      <h3 className="text-lg font-semibold text-white mb-4">Analysis in Progress</h3>
      <div className="space-y-4">
        {steps.map((step, index) => {
          const isCompleted = completedSteps.includes(index);
          const isCurrent = currentStep === index && !isCompleted;
          
          return (
            <div key={index} className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                {isCompleted ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : isCurrent ? (
                  <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-500" />
                )}
              </div>
              <div className="flex-1">
                <div className={`font-medium ${
                  isCompleted ? 'text-green-400' : 
                  isCurrent ? 'text-blue-400' : 'text-slate-500'
                }`}>
                  {step.title}
                </div>
                <div className={`text-sm ${
                  isCompleted ? 'text-green-300' : 
                  isCurrent ? 'text-blue-300' : 'text-slate-600'
                }`}>
                  {step.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnalysisFlow;
