import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS, FEATURES, HOW_IT_WORKS_STEPS, TESTIMONIALS, FOOTER_LINKS } from '../constants';
import homeImage from '../assets/home-image.jpg';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-warm-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-gradient-to-r from-ivory to-beige backdrop-blur-sm border-b border-khaki-dark z-50">
        <div className="container-custom">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-brown-dark">
              Virtual Stylist
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-brown-dark hover:text-opacity-70 transition-colors duration-300 relative group font-medium"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brown-dark transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
              <Link to="/login" className="btn-primary">
                Login
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-ivory via-beige to-tan">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-brown-dark leading-tight">
                Virtual Stylist
              </h1>
              <p className="text-xl text-brown-dark opacity-90 leading-relaxed font-medium">
                Discover your perfect style with AI-powered fashion recommendations
              </p>
              <p className="text-lg text-brown-dark opacity-80 leading-relaxed">
                Transform your wardrobe with personalized styling advice tailored just for you. 
                Our advanced AI technology analyzes your preferences, body type, and lifestyle 
                to create the perfect look for every occasion.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/get-started" className="btn-primary text-center">
                  Get Started
                </Link>
                <Link to="/learn-more" className="btn-secondary text-center">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-80 h-80 rounded-full overflow-hidden shadow-2xl border-4 border-khaki-dark">
                <img 
                  src={homeImage} 
                  alt="Virtual Stylist Home" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center text-brown-dark mb-12">
            Why Choose Virtual Stylist?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, index) => (
              <div key={index} className="card text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-khaki to-tan rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-brown-dark" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-brown-dark mb-3">
                  {feature.title}
                </h3>
                <p className="text-brown-dark opacity-80 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding bg-gradient-to-r from-beige to-ivory">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center text-chamoisee mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {HOW_IT_WORKS_STEPS.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-chamoisee text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-chamoisee mb-4">
                  {step.title}
                </h3>
                <p className="text-chamoisee opacity-70 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-4xl font-bold text-center text-chamoisee mb-12">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <div key={index} className="card">
                <p className="text-chamoisee italic mb-4 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="text-chamoisee font-semibold">
                  {testimonial.author}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-tan to-khaki">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold text-chamoisee mb-4">
            Ready to Transform Your Style?
          </h2>
          <p className="text-xl text-chamoisee opacity-80 mb-8 max-w-2xl mx-auto">
            Join thousands of fashion-forward individuals who trust Virtual Stylist for their daily outfit inspiration.
          </p>
          <Link to="/signup" className="btn-primary inline-block text-lg px-8 py-4">
            Start Your Style Journey
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-chamoisee text-ivory">
        <div className="container-custom section-padding">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Virtual Stylist</h3>
              <p className="opacity-80 leading-relaxed">
                Your AI-powered fashion companion for every occasion.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {FOOTER_LINKS.quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="opacity-80 hover:opacity-100 transition-opacity">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                {FOOTER_LINKS.support.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="opacity-80 hover:opacity-100 transition-opacity">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                {FOOTER_LINKS.social.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-ivory bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all"
                  >
                    <span className="sr-only">{social.label}</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10"/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-ivory border-opacity-20 mt-12 pt-8 text-center">
            <p className="opacity-80">&copy; 2025 Virtual Stylist. All rights reserved.</p>
            <p className="mt-2 font-medium text-tan">Made with ♥ by Amogha</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;