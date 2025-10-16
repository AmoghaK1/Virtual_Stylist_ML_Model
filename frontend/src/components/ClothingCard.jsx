import React from 'react';

const ClothingCard = ({ image, type, weather, color, onClick, onDelete }) => {
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
      className="relative bg-white shadow-md border border-amber-100 cursor-pointer transition-all duration-300 hover:rounded-[40px] hover:shadow-lg overflow-hidden group"
    >
      {/* Delete (bin) button */}
        {onDelete && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
              className="absolute top-2 right-2 z-20 p-1.5 rounded-md bg-white/90 text-red-600 hover:text-red-700 hover:bg-white shadow-sm border border-red-100 transition"
          aria-label="Delete item"
          title="Delete item"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L19.5 19.5A2.25 2.25 0 0117.25 21h-10.5A2.25 2.25 0 014.5 19.5L5.772 5.79m13.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </button>
      )}
      {/* Image Thumbnail */}
      <div className="aspect-square overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={`${type} - ${color}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 relative z-0"
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