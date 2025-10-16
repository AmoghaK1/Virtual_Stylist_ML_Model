import React from 'react';
import ProgressBar from './ProgressBar';

const ProfileCompletionCard = ({ isComplete, onCompleteProfile }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-amber-100">
      <div className="flex items-center justify-between">
        {/* Left side - Content and Progress */}
        <div className="flex-1 mr-6">
          <h3 className="text-xl font-semibold text-amber-800 mb-2">
            Complete Your Profile
          </h3>
          <p className="text-amber-700 mb-4">
            Add more details to get personalized styling recommendations
          </p>
          
          <ProgressBar 
            percentage={isComplete ? 100 : 20} 
            label="Profile Completion" 
          />
        </div>

        {/* Right side - Button */}
        <div className="flex-shrink-0">
          {isComplete ? (
            <button
              disabled
              className="bg-brown-dark text-white font-semibold py-3 px-6 rounded-lg opacity-70 cursor-not-allowed"
            >
              Completed
            </button>
          ) : (
            <button 
              onClick={onCompleteProfile}
              className="bg-amber-800 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Complete Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletionCard;