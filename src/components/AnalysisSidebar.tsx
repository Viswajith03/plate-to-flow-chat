
import React from 'react';
import AnalysisFlow from './AnalysisFlow';

interface AnalysisSidebarProps {
  showAnalysisFlow: boolean;
  hasUploadedFile: boolean;
  onComplete: () => void;
}

const AnalysisSidebar: React.FC<AnalysisSidebarProps> = ({
  showAnalysisFlow,
  hasUploadedFile,
  onComplete
}) => {
  return (
    <div className={`transition-all duration-500 ease-in-out ${
      showAnalysisFlow 
        ? 'w-96 opacity-100 translate-x-0' 
        : 'w-0 opacity-0 translate-x-full overflow-hidden'
    } bg-slate-900/50 backdrop-blur-sm border-l border-slate-700/50`}>
      <div className="p-4 h-full">
        <AnalysisFlow
          isVisible={showAnalysisFlow}
          onComplete={onComplete}
          hasUploadedFile={hasUploadedFile}
        />
      </div>
    </div>
  );
};

export default AnalysisSidebar;
