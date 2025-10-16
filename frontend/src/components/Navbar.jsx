import React from 'react';

const Navbar = ({ user, onLogout }) => {
  return (
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
                    onClick={onLogout}
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
  );
};

export default Navbar;