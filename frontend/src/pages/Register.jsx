import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1 fields
    name: '',
    email: '',
    age: '',
    gender: '',
    location: '',
    // Step 2 fields
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    // Validate step 1 fields
    if (formData.name && formData.email && formData.age && formData.gender && formData.location) {
      setCurrentStep(2);
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate step 2 fields
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    console.log('Registration submitted:', formData);
    // Handle registration logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory via-beige to-tan flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="bg-warm-white rounded-3xl shadow-2xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-khaki to-tan p-6">
              <div className="flex justify-between items-start mb-4">
                <Link 
                  to="/" 
                  className="text-brown-dark hover:text-opacity-70 transition-colors text-sm font-medium"
                >
                  ← Back to Home
                </Link>
                {/* Progress Indicator */}
                <div className="flex items-center space-x-2">
                  <div className={`w-8 h-2 rounded-full transition-all duration-300 ${
                    currentStep >= 1 ? 'bg-brown-dark' : 'bg-brown-light'
                  }`}></div>
                  <div className={`w-8 h-2 rounded-full transition-all duration-300 ${
                    currentStep >= 2 ? 'bg-brown-dark' : 'bg-brown-light'
                  }`}></div>
                </div>
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-bold text-brown-dark mb-2">Create Account</h1>
                <p className="text-brown-dark opacity-90">
                  {currentStep === 1 ? 'Tell us about yourself' : 'Secure your account'}
                </p>
              </div>
            </div>

            {/* Form Container with sliding effect */}
            <div className="relative overflow-hidden flex-1">
              <div 
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${(currentStep - 1) * 100}%)` }}
              >
                {/* Step 1: Personal Information */}
                <div className="w-full flex-shrink-0 p-6 flex items-center">
                  <div className="w-full">
                    <form onSubmit={handleNext} className="h-full flex flex-col justify-center">
                      <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-semibold text-brown-dark mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your full name"
                            className="w-full px-4 py-3 border-2 border-khaki-dark rounded-lg focus:border-brown-dark focus:outline-none transition-colors bg-white text-brown-dark placeholder-brown-light"
                          />
                        </div>

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
                            className="w-full px-4 py-3 border-2 border-khaki-dark rounded-lg focus:border-brown-dark focus:outline-none transition-colors bg-white text-brown-dark placeholder-brown-light"
                          />
                        </div>

                        <div>
                          <label htmlFor="age" className="block text-sm font-semibold text-brown-dark mb-2">
                            Age
                          </label>
                          <input
                            type="number"
                            id="age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                            min="13"
                            max="120"
                            placeholder="Enter your age"
                            className="w-full px-4 py-3 border-2 border-khaki-dark rounded-lg focus:border-brown-dark focus:outline-none transition-colors bg-white text-brown-dark placeholder-brown-light"
                          />
                        </div>

                        <div>
                          <label htmlFor="gender" className="block text-sm font-semibold text-brown-dark mb-2">
                            Gender
                          </label>
                          <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-khaki-dark rounded-lg focus:border-brown-dark focus:outline-none transition-colors bg-white text-brown-dark"
                          >
                            <option value="">Select your gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="non-binary">Non-binary</option>
                            <option value="prefer-not-to-say">Prefer not to say</option>
                          </select>
                        </div>

                        <div className="col-span-2">
                          <label htmlFor="location" className="block text-sm font-semibold text-brown-dark mb-2">
                            Location
                          </label>
                          <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            placeholder="City, Country"
                            className="w-full px-4 py-3 border-2 border-khaki-dark rounded-lg focus:border-brown-dark focus:outline-none transition-colors bg-white text-brown-dark placeholder-brown-light"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-brown-dark hover:bg-opacity-90 text-ivory font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        Next
                      </button>
                    </form>
                  </div>
                </div>

                {/* Step 2: Password Setup */}
                <div className="w-full flex-shrink-0 p-6 flex items-center">
                  <div className="w-full">
                    <form onSubmit={handleSubmit} className="h-full flex flex-col justify-center">
                      <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-8">
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
                            minLength="6"
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 border-2 border-khaki-dark rounded-lg focus:border-brown-dark focus:outline-none transition-colors bg-white text-brown-dark placeholder-brown-light"
                          />
                          <p className="text-xs text-brown-light mt-1">Password must be at least 6 characters</p>
                        </div>

                        <div>
                          <label htmlFor="confirmPassword" className="block text-sm font-semibold text-brown-dark mb-2">
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            minLength="6"
                            placeholder="Confirm your password"
                            className="w-full px-4 py-3 border-2 border-khaki-dark rounded-lg focus:border-brown-dark focus:outline-none transition-colors bg-white text-brown-dark placeholder-brown-light"
                          />
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={handleBack}
                          className="flex-1 bg-transparent border-2 border-brown-dark text-brown-dark hover:bg-brown-dark hover:text-ivory font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="flex-1 bg-brown-dark hover:bg-opacity-90 text-ivory font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-beige p-4 text-center">
              <p className="text-brown-dark">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold hover:text-opacity-70 transition-colors text-brown-dark">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;