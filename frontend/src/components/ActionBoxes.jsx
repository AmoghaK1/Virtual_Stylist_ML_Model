import React from 'react';

const ActionBox = ({ title, onClick, className = "" }) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-gray-400 shadow-md p-6 border border-amber-100 h-24 flex items-center justify-center transition-all duration-300 hover:rounded-[40px] cursor-pointer ${className}`}
    >
      <h3 className="text-lg font-semibold text-white">{title}</h3>
    </div>
  );
};

const ActionBoxes = ({ onWardrobeClick, onNotesClick }) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-8 max-w-2xl mx-auto">
      <ActionBox 
        title="Wardrobe" 
        onClick={onWardrobeClick}
      />
      <ActionBox 
        title="Notes" 
        onClick={onNotesClick}
      />
    </div>
  );
};

export default ActionBoxes;