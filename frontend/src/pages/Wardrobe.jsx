import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ClothingCard from '../components/ClothingCard';
import WardrobeFilter from '../components/WardrobeFilter';

const Wardrobe = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  });

  const [items, setItems] = useState([]);
  const [filteredClothes, setFilteredClothes] = useState([]);
  const [filters, setFilters] = useState({
    color: '',
    type: '',
    weather: ''
  });

  const fetchItems = async (f = {}) => {
    if (!user) return;
    const params = new URLSearchParams({ userId: user.id });
    if (f.color) params.append('color', f.color);
    if (f.type) params.append('type', f.type);
    if (f.weather) params.append('weather', f.weather);
    try {
      const res = await fetch(`http://localhost:3000/api/wardrobe?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch wardrobe');
      const data = await res.json();
      if (data.ok) {
        setItems(data.items);
        setFilteredClothes(data.items.map(i => ({
          id: i.id,
          image: i.imageUrl,
          type: i.type,
          weather: i.weather,
          color: i.color
        })));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleAddClothing = () => {
    navigate('/wardrobe/add');
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    fetchItems(newFilters);
  };

  // Initialize filtered clothes
  useEffect(() => {
    fetchItems(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar user={user} onLogout={handleLogout} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-amber-800">Wardrobe</h1>
          <button
            onClick={handleAddClothing}
            className="bg-amber-800 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Add New Clothing
          </button>
        </div>

        {/* Filter Section */}
        <WardrobeFilter onFilterChange={handleFilterChange} />

        {/* Clothing Grid */}
        <div className="grid grid-cols-5 gap-4 mt-8">
          {filteredClothes.map((item) => (
            <ClothingCard
              key={item.id}
              image={item.image}
              type={item.type}
              weather={item.weather}
              color={item.color}
              onDelete={async () => {
                try {
                  const res = await fetch(`http://localhost:3000/api/wardrobe/${item.id}?userId=${user.id}`, { method: 'DELETE' });
                  if (!res.ok) throw new Error('Failed to delete');
                  const data = await res.json();
                  if (data.ok) {
                    // Refresh list
                    fetchItems(filters);
                  }
                } catch (e) {
                  console.error(e);
                  alert('Failed to delete item');
                }
              }}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredClothes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-amber-600 mb-4">
              <svg className="mx-auto h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-amber-800 mb-2">Your wardrobe is empty</h3>
            <p className="text-amber-700 mb-6">Start building your digital wardrobe by adding your clothing items.</p>
            <button
              onClick={handleAddClothing}
              className="bg-amber-800 hover:bg-amber-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Add Your First Item
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Wardrobe;
