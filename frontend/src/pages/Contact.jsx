import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    // Handle form submission
  };

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
          <h1 className="text-5xl font-bold text-chamoisee mb-6">Contact Us</h1>
          <p className="text-xl text-chamoisee opacity-80 max-w-3xl">
            Get in touch with our team. We're here to help you with any questions about our services 
            or to assist you on your style journey.
          </p>
        </div>
      </div>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-chamoisee mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-chamoisee mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-khaki rounded-lg focus:border-chamoisee focus:outline-none transition-colors bg-ivory"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-chamoisee mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-khaki rounded-lg focus:border-chamoisee focus:outline-none transition-colors bg-ivory"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-chamoisee mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-khaki rounded-lg focus:border-chamoisee focus:outline-none transition-colors bg-ivory"
                    placeholder="What can we help you with?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-chamoisee mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border-2 border-khaki rounded-lg focus:border-chamoisee focus:outline-none transition-colors bg-ivory resize-vertical"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-chamoisee mb-6">Get in Touch</h2>
              
              <div className="space-y-6">
                <div className="card">
                  <h3 className="text-xl font-semibold text-chamoisee mb-2">Email</h3>
                  <p className="text-chamoisee opacity-80">hello@virtualstylist.com</p>
                  <p className="text-chamoisee opacity-80">support@virtualstylist.com</p>
                </div>

                <div className="card">
                  <h3 className="text-xl font-semibold text-chamoisee mb-2">Phone</h3>
                  <p className="text-chamoisee opacity-80">+1 (555) 123-4567</p>
                  <p className="text-chamoisee opacity-80">+1 (555) 987-6543 (Support)</p>
                </div>

                <div className="card">
                  <h3 className="text-xl font-semibold text-chamoisee mb-2">Address</h3>
                  <p className="text-chamoisee opacity-80">
                    123 Fashion Street<br />
                    Style City, SC 12345<br />
                    United States
                  </p>
                </div>

                <div className="card">
                  <h3 className="text-xl font-semibold text-chamoisee mb-4">Business Hours</h3>
                  <div className="space-y-2 text-chamoisee opacity-80">
                    <div className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span>10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gradient-to-r from-beige to-khaki">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center text-chamoisee mb-12">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-chamoisee mb-2">How does the AI styling work?</h3>
                <p className="text-chamoisee opacity-80">
                  Our AI analyzes your preferences, body type, and lifestyle to create personalized outfit recommendations.
                </p>
              </div>
              <div className="card">
                <h3 className="text-lg font-semibold text-chamoisee mb-2">Can I cancel my subscription anytime?</h3>
                <p className="text-chamoisee opacity-80">
                  Yes, you can cancel your subscription at any time with no cancellation fees.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-lg font-semibold text-chamoisee mb-2">Do you offer refunds?</h3>
                <p className="text-chamoisee opacity-80">
                  We offer a 30-day money-back guarantee if you're not satisfied with our service.
                </p>
              </div>
              <div className="card">
                <h3 className="text-lg font-semibold text-chamoisee mb-2">How secure is my data?</h3>
                <p className="text-chamoisee opacity-80">
                  We use industry-standard encryption and never share your personal information with third parties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-chamoisee">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-ivory mb-4">Still Have Questions?</h2>
          <p className="text-ivory opacity-80 mb-8 max-w-2xl mx-auto">
            Our support team is here to help you get started with Virtual Stylist.
          </p>
          <Link to="/signup" className="bg-ivory text-chamoisee hover:bg-opacity-90 font-semibold py-3 px-8 rounded-full transition-all duration-300 inline-block">
            Start Your Free Trial
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Contact;