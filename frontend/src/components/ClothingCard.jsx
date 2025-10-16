import React from 'react';

const ClothingCard = ({ image, type, weather, color, onClick }) => {
  // Color mapping for better display
  const getColorHex = (colorName) => {
    const colorMap = {
      'red': '#ef4444',
      'blue': '#3b82f6',
      'green': '#10b981',
      'yellow': '#f59e0b',
      'black': '#1f2937',
      'white': '#f3f4f6',
      'gray': '#6b7280',
      'brown': '#92400e',
      'pink': '#ec4899',
      'purple': '#8b5cf6'
    };
    return colorMap[colorName.toLowerCase()] || '#6b7280';
  };

  return (
    <div 
      onClick={onClick}
      className="bg-white shadow-md border border-amber-100 cursor-pointer transition-all duration-300 hover:rounded-[40px] hover:shadow-lg overflow-hidden group"
    >
      {/* Image Thumbnail */}
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={`${type} - ${color}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop';
          }}
        />
      </div>
      
      {/* Card Content */}
      <div className="p-3">
        <h3 className="text-sm font-semibold text-amber-800 mb-1 truncate">
          {type}
        </h3>
        <p className="text-xs text-amber-600 mb-2">
          {weather}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-amber-700 font-medium">
            {color}
          </span>
          <div 
            className="w-4 h-4 rounded-full border-2 border-amber-200 shadow-sm"
            style={{ backgroundColor: getColorHex(color) }}
            title={color}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ClothingCard;