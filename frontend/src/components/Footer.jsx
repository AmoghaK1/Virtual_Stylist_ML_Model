import React from 'react';
import { Link } from 'react-router-dom';
import { FOOTER_LINKS } from '../constants';

const Footer = () => {
  return (
    <footer className="bg-chamoisee text-ivory">
      <div className="container-custom section-padding">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Virtual Stylist</h3>
            <p className="opacity-80 leading-relaxed mb-4">
              Your AI-powered fashion companion for every occasion.
            </p>
            <p className="text-sm opacity-60">
              Transforming fashion through technology and personal expression.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href} 
                    className="opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href} 
                    className="opacity-80 hover:opacity-100 transition-opacity"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4 mb-4">
              {FOOTER_LINKS.social.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-ivory bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all"
                  title={social.label}
                >
                  <span className="sr-only">{social.label}</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"/>
                  </svg>
                </a>
              ))}
            </div>
            <div className="text-sm opacity-80">
              <p>hello@virtualstylist.com</p>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-ivory border-opacity-20 mt-12 pt-8 text-center">
          <p className="opacity-80 mb-2">
            &copy; 2025 Virtual Stylist. All rights reserved.
          </p>
          <p className="font-medium text-tan">
            Made with ♥ by Amogha
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;