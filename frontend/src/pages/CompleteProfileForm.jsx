import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StepIndicator from '../components/StepIndicator';
import FormStep from '../components/FormStep';

const CompleteProfileForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    // Step 1 - Basic Information
    height: '',
    weight: '',
    body_type: '',
    skin_tone: '',
    hair_color: '',
    // Step 2 - Preferences
    favourite_colors: '',
    disliked_colors: ''
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
    if (formData.height && formData.weight && formData.body_type && formData.skin_tone && formData.hair_color) {
      setCurrentStep(2);
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate step 2 fields
    if (!formData.favourite_colors || !formData.disliked_colors) {
      alert('Please fill in all preference fields');
      return;
    }

    setSubmitting(true);
    try {
      // Get user data from localStorage
      const userData = localStorage.getItem('user');
      if (!userData) {
        alert('Please login first');
        navigate('/login');
        return;
      }
      
      const user = JSON.parse(userData);
      console.log('User data from localStorage:', user);
      console.log('User ID being sent:', user.id);
      
      const res = await fetch('http://localhost:3000/api/profile/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          height: Number(formData.height),
          weight: Number(formData.weight),
          body_type: formData.body_type,
          skin_tone: formData.skin_tone,
          hair_color: formData.hair_color,
          favourite_colors: formData.favourite_colors.split(',').map(color => color.trim()),
          disliked_colors: formData.disliked_colors.split(',').map(color => color.trim())
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.detail || 'Profile completion failed');
      }
      
      // Update user in localStorage with isComplete true
      try {
        const userStr = localStorage.getItem('user');
        if (userStr) {
          const u = JSON.parse(userStr);
          u.isComplete = true;
          localStorage.setItem('user', JSON.stringify(u));
        }
      } catch {}
      alert('Profile completed successfully!');
      navigate('/dashboard');
      
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Skin tone options (10 levels from dark to light)
  const skinToneOptions = [
    { value: 'very_dark', label: 'Very Dark' },
    { value: 'dark', label: 'Dark' },
    { value: 'medium_dark', label: 'Medium Dark' },
    { value: 'medium', label: 'Medium' },
    { value: 'medium_light', label: 'Medium Light' },
    { value: 'light', label: 'Light' },
    { value: 'fair', label: 'Fair' },
    { value: 'very_fair', label: 'Very Fair' },
    { value: 'pale', label: 'Pale' },
    { value: 'very_pale', label: 'Very Pale' }
  ];

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="bg-white p-6">
              <div className="flex justify-between items-start mb-4">
                <Link 
                  to="/dashboard" 
                  className="text-amber-800 hover:text-opacity-70 transition-colors text-sm font-medium"
                >
                  ← Back to Dashboard
                </Link>
                {/* Progress Indicator */}
                <StepIndicator currentStep={currentStep} totalSteps={2} />
              </div>
              <div className="text-center">
                <h1 className="text-2xl font-bold text-amber-800 mb-2">Complete Your Profile</h1>
                <p className="text-amber-800 opacity-90">
                  {currentStep === 1 ? 'Tell us about your physical attributes' : 'Share your style preferences'}
                </p>
              </div>
            </div>

            {/* Form Container with sliding effect */}
            <div className="relative overflow-hidden flex-1">
              <div 
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${(currentStep - 1) * 100}%)` }}
              >
                {/* Step 1: Basic Information */}
                <FormStep isActive={currentStep === 1}>
                  <form onSubmit={handleNext} className="h-full flex flex-col justify-center">
                      <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-6">
                        <div>
                          <label htmlFor="height" className="block text-sm font-semibold text-amber-800 mb-2">
                            Height (cm)
                          </label>
                          <input
                            type="number"
                            id="height"
                            name="height"
                            value={formData.height}
                            onChange={handleChange}
                            required
                            min="120"
                            max="250"
                            placeholder="Enter your height in cm"
                            className="w-full px-4 py-3 border-2  rounded-lg focus:border-amber-600 focus:outline-none transition-colors bg-white text-amber-800 placeholder-gray-600"
                          />
                        </div>

                        <div>
                          <label htmlFor="weight" className="block text-sm font-semibold text-amber-800 mb-2">
                            Weight (kg)
                          </label>
                          <input
                            type="number"
                            id="weight"
                            name="weight"
                            value={formData.weight}
                            onChange={handleChange}
                            required
                            min="30"
                            max="200"
                            placeholder="Enter your weight in kg"
                            className="w-full px-4 py-3 border-2 rounded-lg focus:border-amber-600 focus:outline-none transition-colors bg-white text-amber-800 placeholder-gray-600"
                          />
                        </div>

                        <div>
                          <label htmlFor="body_type" className="block text-sm font-semibold text-amber-800 mb-2">
                            Body Type
                          </label>
                          <select
                            id="body_type"
                            name="body_type"
                            value={formData.body_type}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-amber-800 rounded-lg focus:border-amber-600 focus:outline-none transition-colors bg-white text-gray-600"
                          >
                            <option value="">Select your body type</option>
                            <option value="slim">Slim</option>
                            <option value="average">Average</option>
                            <option value="broad">Broad</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="skin_tone" className="block text-sm font-semibold text-amber-800 mb-2">
                            Skin Tone
                          </label>
                          <select
                            id="skin_tone"
                            name="skin_tone"
                            value={formData.skin_tone}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-amber-800 rounded-lg focus:border-amber-600 focus:outline-none transition-colors bg-white text-gray-600"
                          >
                            <option value="">Select your skin tone</option>
                            {skinToneOptions.map(option => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="col-span-2">
                          <label htmlFor="hair_color" className="block text-sm font-semibold text-amber-800 mb-2">
                            Hair Color
                          </label>
                          <select
                            id="hair_color"
                            name="hair_color"
                            value={formData.hair_color}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-amber-800 rounded-lg focus:border-amber-600 focus:outline-none transition-colors bg-white text-gray-600"
                          >
                            <option value="">Select your hair color</option>
                            <option value="black">Black</option>
                            <option value="brown">Brown</option>
                            <option value="blonde">Blonde</option>
                            <option value="red">Red</option>
                            <option value="gray">Gray</option>
                            <option value="white">White</option>
                          </select>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-amber-800 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        Next
                      </button>
                    </form>
                </FormStep>

                {/* Step 2: Preferences */}
                <FormStep isActive={currentStep === 2}>
                  <form onSubmit={handleSubmit} className="h-full flex flex-col justify-center">
                      <div className="grid grid-cols-1 gap-y-6 mb-8">
                        <div>
                          <label htmlFor="favourite_colors" className="block text-sm font-semibold text-amber-800 mb-2">
                            Favourite Colors
                          </label>
                          <input
                            type="text"
                            id="favourite_colors"
                            name="favourite_colors"
                            value={formData.favourite_colors}
                            onChange={handleChange}
                            required
                            placeholder="e.g., blue, red, green, black"
                            className="w-full px-4 py-3 border-2 rounded-lg focus:border-amber-600 focus:outline-none transition-colors bg-white text-amber-800 placeholder-gray-600"
                          />
                          <p className="text-xs text-amber-900 mt-1">Separate colors with commas</p>
                        </div>

                        <div>
                          <label htmlFor="disliked_colors" className="block text-sm font-semibold text-amber-800 mb-2">
                            Disliked Colors
                          </label>
                          <input
                            type="text"
                            id="disliked_colors"
                            name="disliked_colors"
                            value={formData.disliked_colors}
                            onChange={handleChange}
                            required
                            placeholder="e.g., yellow, pink, orange"
                            className="w-full px-4 py-3 border-2 rounded-lg focus:border-amber-600 focus:outline-none transition-colors bg-white text-amber-800 placeholder-gray-600"
                          />
                          <p className="text-xs text-amber-900 mt-1">Separate colors with commas</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={handleBack}
                          className="flex-1 bg-transparent border-2 border-amber-800 text-amber-800 hover:bg-amber-800 hover:text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={submitting}
                          className={`flex-1 bg-amber-800 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 ${submitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                          {submitting ? 'Completing...' : 'Complete Profile'}
                        </button>
                      </div>
                    </form>
                </FormStep>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-amber-100 p-4 text-center">
              <p className="text-amber-800">
                Complete your profile to get personalized styling recommendations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfileForm;
