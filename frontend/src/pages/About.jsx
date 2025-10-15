import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory to-beige">
      {/* Header */}
      <div className="pt-16 pb-8">
        <div className="container-custom">
          <Link 
            to="/" 
            className="inline-block text-chamoisee hover:text-opacity-70 transition-colors mb-8"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pb-16">
        <div className="container-custom text-center">
          <h1 className="text-5xl font-bold text-chamoisee mb-6">About Virtual Stylist</h1>
          <div className="max-w-4xl mx-auto space-y-8">
            <p className="text-xl text-chamoisee opacity-80 leading-relaxed">
              Virtual Stylist is an innovative AI-powered fashion platform that revolutionizes 
              the way you discover and express your personal style. Our advanced machine learning 
              algorithms analyze your preferences, lifestyle, and body type to provide personalized 
              fashion recommendations that make you look and feel your best.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-chamoisee mb-6">Our Mission</h2>
              <p className="text-chamoisee opacity-80 leading-relaxed mb-6">
                Founded with the mission to democratize fashion and make styling accessible to everyone, 
                we believe that great style should be effortless and personalized to you.
              </p>
              <p className="text-chamoisee opacity-80 leading-relaxed">
                We're committed to helping individuals express their unique personality through fashion, 
                regardless of their budget, experience, or geographical location.
              </p>
            </div>
            <div className="bg-gradient-to-br from-tan to-khaki rounded-2xl p-8 text-center">
              <div className="w-32 h-32 bg-chamoisee rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-16 h-16 text-ivory" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-chamoisee">Excellence in AI Fashion</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-gradient-to-r from-khaki to-tan">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center text-chamoisee mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <h3 className="text-xl font-semibold text-chamoisee mb-4">Innovation</h3>
              <p className="text-chamoisee opacity-70">
                Continuously advancing AI technology to provide the most accurate and personalized styling recommendations.
              </p>
            </div>
            <div className="card text-center">
              <h3 className="text-xl font-semibold text-chamoisee mb-4">Inclusivity</h3>
              <p className="text-chamoisee opacity-70">
                Fashion for everyone, regardless of body type, budget, or personal style preferences.
              </p>
            </div>
            <div className="card text-center">
              <h3 className="text-xl font-semibold text-chamoisee mb-4">Sustainability</h3>
              <p className="text-chamoisee opacity-70">
                Promoting conscious fashion choices and helping users maximize their existing wardrobe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center text-chamoisee mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-khaki to-tan rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-chamoisee mb-2">Sarah Johnson</h3>
              <p className="text-chamoisee opacity-70 mb-2">CEO & Founder</p>
              <p className="text-sm text-chamoisee opacity-60">
                Fashion industry veteran with 15+ years of experience in retail and styling.
              </p>
            </div>
            <div className="card text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-tan to-chamoisee rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-chamoisee mb-2">Dr. Michael Chen</h3>
              <p className="text-chamoisee opacity-70 mb-2">CTO</p>
              <p className="text-sm text-chamoisee opacity-60">
                AI researcher specializing in computer vision and machine learning applications.
              </p>
            </div>
            <div className="card text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-beige to-khaki rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold text-chamoisee mb-2">Emma Rodriguez</h3>
              <p className="text-chamoisee opacity-70 mb-2">Head of Design</p>
              <p className="text-sm text-chamoisee opacity-60">
                Award-winning designer focused on creating inclusive and intuitive user experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-chamoisee">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-ivory mb-4">Ready to Get Started?</h2>
          <p className="text-ivory opacity-80 mb-8 max-w-2xl mx-auto">
            Join our community and discover your perfect style with AI-powered recommendations.
          </p>
          <Link to="/signup" className="bg-ivory text-chamoisee hover:bg-opacity-90 font-semibold py-3 px-8 rounded-full transition-all duration-300 inline-block">
            Start Your Style Journey
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;