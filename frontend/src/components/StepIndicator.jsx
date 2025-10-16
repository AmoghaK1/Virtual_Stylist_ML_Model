import React from 'react';

const StepIndicator = ({ currentStep, totalSteps = 2 }) => {
  return (
    <div className="flex items-center space-x-2">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index + 1}
          className={`w-8 h-2 rounded-full transition-all duration-300 ${
            currentStep >= index + 1 ? 'bg-amber-800' : 'bg-amber-400'
          }`}
        ></div>
      ))}
    </div>
  );
};

export default StepIndicator;