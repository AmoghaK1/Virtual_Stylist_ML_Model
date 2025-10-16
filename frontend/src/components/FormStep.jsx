import React from 'react';

const FormStep = ({ children, isActive, className = "" }) => {
  return (
    <div className={`w-full flex-shrink-0 p-6 flex items-center ${className}`}>
      <div className="w-full">
        {children}
      </div>
    </div>
  );
};

export default FormStep;