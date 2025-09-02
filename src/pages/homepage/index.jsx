import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import HeroBanner from './components/HeroBanner';
import ServiceCategories from './components/ServiceCategories';
import FeaturedProducts from './components/FeaturedProducts';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

const Homepage = () => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);

    const handleStorageChange = () => {
      const newLanguage = localStorage.getItem('language') || 'en';
      setLanguage(newLanguage);
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Check for language changes every 100ms to catch localStorage updates from same tab
    const interval = setInterval(() => {
      const currentLanguage = localStorage.getItem('language') || 'en';
      if (currentLanguage !== language) {
        setLanguage(currentLanguage);
      }
    }, 100);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [language]);

  // Mock data for header props
  const headerProps = {
    cartItemCount: 3,
    activeJobsCount: 2,
    isAuthenticated: false
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header {...headerProps} />
      
      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Banner Section */}
        <HeroBanner language={language} />
        
        {/* Service Categories Section */}
        <ServiceCategories language={language} />
        
        {/* Featured Products Section */}
        <FeaturedProducts language={language} />
        
        {/* About Section */}
        <AboutSection language={language} />
        
        {/* Contact Section */}
        <ContactSection language={language} />
      </main>
      
      {/* Footer */}
      <Footer language={language} />
    </div>
  );
};

export default Homepage;