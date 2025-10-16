import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const WardrobeEntryForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  });

  const [formData, setFormData] = useState({
    image: null,
    type: '',
    color: '',
    weather: ''
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const clothingTypes = [
    'Shirt',
    'T-Shirt', 'Shirt', 'Jeans', 'Jacket', 'Hoodie', 'Shorts', 'Sweater', 'Coat', 'Track Pants', 'Skirt', 'Cargo', 'Sleeveless'
  ];

  const weatherOptions = [
    'Summer',
    'Monsoon', 
    'Winter',
    'All Season'
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.image || !formData.type || !formData.color || !formData.weather) {
      alert('Please fill in all fields and select an image');
      return;
    }

    setSubmitting(true);
    
    try {
      const fd = new FormData();
      fd.append('userId', user.id);
      fd.append('type', formData.type);
      fd.append('color', formData.color);
      fd.append('weather', formData.weather);
      fd.append('image', formData.image);

      const res = await fetch('http://localhost:3000/api/wardrobe', {
        method: 'POST',
        body: fd
      });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(`Upload failed: ${res.status} ${t}`);
      }
      const data = await res.json();
      if (!data.ok) throw new Error('Upload failed');
      
      alert('Clothing item added successfully!');
      navigate('/wardrobe');
      
    } catch (error) {
      console.error('Error adding clothing item:', error);
      alert('Failed to add clothing item. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar user={user} onLogout={handleLogout} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/wardrobe" 
            className="text-amber-800 hover:text-opacity-70 transition-colors text-sm font-medium mb-4 inline-block"
          >
            ← Back to Wardrobe
          </Link>
          <h1 className="text-3xl font-bold text-amber-800">Add New Clothing</h1>
          <p className="text-amber-700 mt-2">Add a new item to your digital wardrobe</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-brown-dark">
          <form onSubmit={handleSubmit}>
            {/* Horizontal Layout Container */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              
              {/* Left Side - Image Picker */}
              <div>
                <label className="block text-sm font-semibold text-amber-800 mb-3">
                  Clothing Image
                </label>
                <div className="flex flex-col items-center">
                  {/* Image Preview or Upload Box */}
                  <div className="w-full aspect-square border-2 border-dashed border-brown-dark rounded-lg flex items-center justify-center bg-amber-50 hover:bg-neutral-50 transition-colors cursor-pointer relative overflow-hidden">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="text-center p-4">
                        <svg className="mx-auto h-12 w-12 text-amber-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <p className="text-amber-600 text-sm">Click to upload image</p>
                        <p className="text-amber-500 text-xs mt-1">PNG, JPG up to 10MB</p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      required
                    />
                  </div>
                  {imagePreview && (
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setFormData(prev => ({ ...prev, image: null }));
                      }}
                      className="mt-2 text-sm text-amber-600 hover:text-amber-800 transition-colors"
                    >
                      Remove Image
                    </button>
                  )}
                </div>
              </div>

              {/* Right Side - Form Fields */}
              <div className="flex flex-col justify-evenly h-full">
                {/* Type of Clothing */}
                <div>
                  <label htmlFor="type" className="block text-sm font-semibold text-amber-800 mb-2">
                    Type of Clothing
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-brown-dark rounded-lg focus:border-amber-600 focus:outline-none transition-colors bg-white text-amber-800"
                  >
                    <option value="">Select clothing type</option>
                    {clothingTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Color */}
                <div>
                  <label htmlFor="color" className="block text-sm font-semibold text-amber-800 mb-2">
                    Color
                  </label>
                  <input
                    type="text"
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Blue, Red, Black, etc."
                    className="w-full px-4 py-3 border-2 border-brown-dark rounded-lg focus:border-amber-600 focus:outline-none transition-colors bg-white text-amber-800 placeholder-amber-800"
                  />
                </div>

                {/* Suitable Weather */}
                <div>
                  <label htmlFor="weather" className="block text-sm font-semibold text-amber-800 mb-2">
                    Suitable Weather
                  </label>
                  <select
                    id="weather"
                    name="weather"
                    value={formData.weather}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-brown-dark rounded-lg focus:border-amber-600 focus:outline-none transition-colors bg-white text-amber-800"
                  >
                    <option value="">Select suitable weather</option>
                    {weatherOptions.map(weather => (
                      <option key={weather} value={weather}>{weather}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Button - Bottom Center */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={submitting}
                className={`bg-amber-800 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${
                  submitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {submitting ? 'Adding Item...' : 'Add to Wardrobe'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default WardrobeEntryForm;
