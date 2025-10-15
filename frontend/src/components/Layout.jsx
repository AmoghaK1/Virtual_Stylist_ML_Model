import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

const Layout = ({ children, showNavigation = true, showFooter = true }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {showNavigation && <Navigation />}
      <main className="flex-grow">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;