

import React, { useState } from 'react';

const WardrobeFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    color: '',
    type: '',
    weather: ''
  });

  const colorOptions = [
    'Red', 'Blue', 'Green', 'Yellow', 'Black', 'White', 'Gray', 'Brown', 'Pink', 'Purple'
  ];

  const typeOptions = [
    'T-Shirt', 'Shirt', 'Jeans', 'Jacket', 'Hoodie', 'Shorts', 'Sweater', 'Coat', 'Track Pants', 'Skirt', 'Cargo', 'Sleeveless'
  ];

  const weatherOptions = [
    'Summer','Monsoon','Winter','All Season'
  ];

  const handleFilterChange = (filterType, value) => {
    const newFilters = {
      ...filters,
      [filterType]: value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = { color: '', type: '', weather: '' };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-amber-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-amber-800">Filter Clothes</h2>
        <button
          onClick={clearFilters}
          className="text-sm text-amber-600 hover:text-amber-800 transition-colors"
        >
          Clear All
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Color Filter */}
        <div>
          <label className="block text-sm font-medium text-amber-700 mb-2">
            Color
          </label>
          <select
            value={filters.color}
            onChange={(e) => handleFilterChange('color', e.target.value)}
            className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="">All Colors</option>
            {colorOptions.map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        </div>

        {/* Type Filter */}
        <div>
          <label className="block text-sm font-medium text-amber-700 mb-2">
            Type
          </label>
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="">All Types</option>
            {typeOptions.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Weather Filter */}
        <div>
          <label className="block text-sm font-medium text-amber-700 mb-2">
            Weather
          </label>
          <select
            value={filters.weather}
            onChange={(e) => handleFilterChange('weather', e.target.value)}
            className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          >
            <option value="">All Weather</option>
            {weatherOptions.map(weather => (
              <option key={weather} value={weather}>{weather}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default WardrobeFilter;