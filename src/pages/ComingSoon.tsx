
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ComingSoon = () => {
  const navigate = useNavigate();
  const { feature } = useParams();
  
  const getFeatureName = () => {
    switch (feature) {
      case 'spoilage-protection':
        return 'Spoilage Protection';
      case 'eta-prediction':
        return 'ETA Prediction';
      case 'anomaly-detection':
        return 'Anomaly Detection';
      case 'smart-warehouse-management':
        return 'Smart Warehouse Management';
      default:
        return 'Feature';
    }
  };

  return (
    <div className="h-screen gradient-bg">
      <div className="flex flex-col h-full gradient-content">
        {/* Header with Go Back button - moved down with padding */}
        <div className="flex items-center justify-between p-8 pb-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-white" />
            <span className="text-white">Go Back to Main Menu</span>
          </button>
          <h1 className="text-3xl font-bold text-white">{getFeatureName()}</h1>
          <div className="w-48"></div> {/* Spacer for center alignment */}
        </div>

        {/* Coming Soon Content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-12">
              <h2 className="text-4xl font-bold text-white mb-4">Coming Soon</h2>
              <p className="text-xl text-blue-200 mb-6">{getFeatureName()} feature is under development</p>
              <p className="text-blue-200">Stay tuned for exciting updates!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
