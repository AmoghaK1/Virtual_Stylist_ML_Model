import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory via-beige to-tan flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-warm-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-khaki to-tan p-8 text-center">
            <Link 
              to="/" 
              className="inline-block text-brown-dark hover:text-opacity-70 transition-colors mb-4 text-sm font-medium"
            >
              ← Back to Home
            </Link>
            <h1 className="text-2xl font-bold text-brown-dark mb-2">Welcome Back</h1>
            <p className="text-brown-dark opacity-90">Sign in to your Virtual Stylist account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-brown-dark mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="w-full px-4 py-3 border-2 border-khaki-dark rounded-lg focus:border-brown-dark focus:outline-none transition-colors  text-brown-dark placeholder-brown-light"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-brown-dark mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-3 border-2 border-khaki-dark rounded-lg focus:border-brown-dark focus:outline-none transition-colors text-brown-dark placeholder-brown-light"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 text-brown-dark border-2 border-khaki-dark rounded focus:ring-brown-dark"
                />
                <span className="ml-2 text-sm text-brown-dark">Remember me</span>
              </label>
              <Link 
                to="/forgot-password" 
                className="text-sm text-brown-dark hover:text-opacity-70 transition-colors font-medium"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full hover:bg-opacity-90 text-shadow-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Sign In
            </button>
          </form>

          {/* Footer */}
          <div className="bg-beige p-6 text-center">
            <p className="text-brown-dark">
              Don't have an account?{' '}
              <Link to="/signup" className="font-semibold hover:text-opacity-70 transition-colors text-brown-dark">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;