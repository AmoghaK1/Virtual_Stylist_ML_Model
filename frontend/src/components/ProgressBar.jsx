import React from 'react';

const ProgressBar = ({ percentage, label = "Progress" }) => {
  return (
    <div className="mb-2">
      <div className="flex justify-between text-sm text-amber-700 mb-1">
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full bg-amber-100 rounded-full h-2">
        <div 
          className="bg-amber-600 h-2 rounded-full transition-all duration-300" 
          style={{width: `${percentage}%`}}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;