import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProfileCompletionCard from '../components/ProfileCompletionCard';
import ActionBoxes from '../components/ActionBoxes';

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

  const handleCompleteProfile = () => {
    navigate('/complete-profile');
  };

  const handleWardrobeClick = () => {
    // TODO: Navigate to wardrobe page
    console.log('Wardrobe clicked');
  };

  const handleNotesClick = () => {
    // TODO: Navigate to notes page
    console.log('Notes clicked');
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
      <Navbar user={user} onLogout={handleLogout} />

      {/* Main Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-amber-800 mb-4">
            Welcome to your Dashboard
          </h2>
        </div>

        <ProfileCompletionCard 
          isComplete={isComplete} 
          onCompleteProfile={handleCompleteProfile}
        />

        <ActionBoxes 
          onWardrobeClick={handleWardrobeClick}
          onNotesClick={handleNotesClick}
        />

        {/* Additional content can go here */}
      </main>
    </div>
  );
};

export default Dashboard;
