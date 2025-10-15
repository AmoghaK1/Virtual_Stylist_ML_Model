import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      title: 'AI Style Analysis',
      description: 'Advanced algorithms analyze your style preferences, body type, and lifestyle to suggest outfits tailored specifically to your taste and needs.',
      features: ['Personalized recommendations', 'Body type analysis', 'Color palette suggestions', 'Style preference learning']
    },
    {
      title: 'Virtual Wardrobe',
      description: 'Digitize your existing wardrobe and get smart recommendations on how to mix and match pieces for maximum versatility and style.',
      features: ['Digital closet organization', 'Outfit combinations', 'Usage tracking', 'Shopping gap analysis']
    },
    {
      title: 'Personal Shopping Assistant',
      description: 'Get curated shopping recommendations based on your style profile, budget preferences, and current wardrobe needs.',
      features: ['Budget-conscious suggestions', 'Brand recommendations', 'Seasonal updates', 'Trend integration']
    },
    {
      title: 'Style Consultation',
      description: 'One-on-one virtual consultations with professional stylists to refine your personal style and address specific fashion challenges.',
      features: ['Professional guidance', 'Custom style boards', 'Event styling', 'Wardrobe planning']
    },
    {
      title: 'Occasion Styling',
      description: 'Specialized outfit recommendations for specific events, seasons, or occasions, ensuring you always dress appropriately and stylishly.',
      features: ['Event-specific looks', 'Seasonal styling', 'Professional attire', 'Casual wear guidance']
    },
    {
      title: 'Trend Integration',
      description: 'Stay current with fashion trends while maintaining your personal style through our intelligent trend analysis and adaptation system.',
      features: ['Trend analysis', 'Personal adaptation', 'Timeless pieces', 'Style evolution']
    }
  ];

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Header */}
      <div className="pt-16 pb-8 bg-gradient-to-r from-ivory to-beige">
        <div className="container-custom">
          <Link 
            to="/" 
            className="inline-block text-chamoisee hover:text-opacity-70 transition-colors mb-8"
          >
            ← Back to Home
          </Link>
          <h1 className="text-5xl font-bold text-chamoisee mb-6">Our Services</h1>
          <p className="text-xl text-chamoisee opacity-80 max-w-3xl">
            Discover our comprehensive suite of AI-powered styling services designed to transform 
            your fashion experience and help you express your unique style with confidence.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="card">
                <h3 className="text-2xl font-bold text-chamoisee mb-4">{service.title}</h3>
                <p className="text-chamoisee opacity-80 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-chamoisee">Key Features:</h4>
                  <ul className="space-y-1">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-chamoisee opacity-70">
                        <span className="w-2 h-2 bg-chamoisee rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section-padding bg-gradient-to-r from-beige to-tan">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center text-chamoisee mb-12">Choose Your Plan</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-chamoisee mb-2">Basic</h3>
              <div className="text-3xl font-bold text-chamoisee mb-4">$9.99<span className="text-base font-normal">/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-chamoisee opacity-80">
                  <span className="w-2 h-2 bg-chamoisee rounded-full mr-3"></span>
                  AI Style Analysis
                </li>
                <li className="flex items-center text-chamoisee opacity-80">
                  <span className="w-2 h-2 bg-chamoisee rounded-full mr-3"></span>
                  Basic Wardrobe Management
                </li>
                <li className="flex items-center text-chamoisee opacity-80">
                  <span className="w-2 h-2 bg-chamoisee rounded-full mr-3"></span>
                  Monthly Style Report
                </li>
              </ul>
              <button className="w-full btn-secondary">Get Started</button>
            </div>

            {/* Pro Plan */}
            <div className="bg-chamoisee text-white rounded-2xl p-8 shadow-xl transform scale-105">
              <h3 className="text-xl font-bold mb-2">Professional</h3>
              <div className="text-3xl font-bold mb-4">$19.99<span className="text-base font-normal">/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center opacity-90">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  All Basic features
                </li>
                <li className="flex items-center opacity-90">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  Personal Shopping Assistant
                </li>
                <li className="flex items-center opacity-90">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  Occasion Styling
                </li>
                <li className="flex items-center opacity-90">
                  <span className="w-2 h-2 bg-white rounded-full mr-3"></span>
                  Trend Integration
                </li>
              </ul>
              <button className="w-full bg-white text-chamoisee hover:bg-opacity-90 font-semibold py-3 px-6 rounded-full transition-all duration-300">
                Most Popular
              </button>
            </div>

            {/* Premium Plan */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-chamoisee mb-2">Premium</h3>
              <div className="text-3xl font-bold text-chamoisee mb-4">$39.99<span className="text-base font-normal">/month</span></div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-chamoisee opacity-80">
                  <span className="w-2 h-2 bg-chamoisee rounded-full mr-3"></span>
                  All Pro features
                </li>
                <li className="flex items-center text-chamoisee opacity-80">
                  <span className="w-2 h-2 bg-chamoisee rounded-full mr-3"></span>
                  1-on-1 Style Consultations
                </li>
                <li className="flex items-center text-chamoisee opacity-80">
                  <span className="w-2 h-2 bg-chamoisee rounded-full mr-3"></span>
                  Priority Customer Support
                </li>
                <li className="flex items-center text-chamoisee opacity-80">
                  <span className="w-2 h-2 bg-chamoisee rounded-full mr-3"></span>
                  Exclusive Brand Partnerships
                </li>
              </ul>
              <button className="w-full btn-primary">Get Started</button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-khaki">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-chamoisee mb-4">Ready to Transform Your Style?</h2>
          <p className="text-chamoisee opacity-80 mb-8 max-w-2xl mx-auto">
            Start with our free trial and experience the power of AI-driven fashion recommendations.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link to="/signup" className="btn-primary inline-block">
              Start Free Trial
            </Link>
            <Link to="/contact" className="btn-secondary inline-block">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;