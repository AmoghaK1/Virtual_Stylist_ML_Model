import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // Redirect to login if no user data
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-amber-800">Loading...</div>
      </div>
    );
  }

  const isComplete = Boolean(user?.isComplete);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Navbar */}
      <nav className="bg-brown-dark shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-white">
                Virtual Stylist
              </h1>
            </div>

            {/* User Profile Section */}
            <div className="flex items-center space-x-3">
              <span className="text-white font-medium">
                {user.name}
              </span>
              <div className="relative group">
                <img
                  src={`https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&q=80`}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-amber-600 object-cover hover:border-amber-400 transition-colors cursor-pointer"
                />
                {/* Dropdown menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <div className="py-1">
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-amber-800 hover:bg-stone-50 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-amber-800 mb-4">
            Welcome to your Dashboard
          </h2>
        </div>

        {/* Complete Profile Card */}
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
              
              {/* Progress Bar */}
              <div className="mb-2">
                <div className="flex justify-between text-sm text-amber-700 mb-1">
                  <span>Profile Completion</span>
                  <span>{isComplete ? '100%' : '20%'}</span>
                </div>
                <div className="w-full bg-amber-100 rounded-full h-2">
                  <div className="bg-amber-600 h-2 rounded-full transition-all duration-300" style={{width: isComplete ? '100%' : '20%'}}></div>
                </div>
              </div>
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
                  onClick={() => navigate('/complete-profile')}
                  className="bg-amber-800 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Complete Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Additional content can go here */}
      </main>
    </div>
  );
};

export default Dashboard;
