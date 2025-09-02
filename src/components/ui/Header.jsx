import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ cartItemCount = 0, activeJobsCount = 0, isAuthenticated = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const location = useLocation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'th' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const navigationItems = [
    {
      label: language === 'en' ? 'Home' : 'หน้าแรก',
      path: '/homepage',
      icon: 'Home'
    },
    {
      label: language === 'en' ? 'Services' : 'บริการ',
      path: '/service-booking-form',
      icon: 'Wrench',
      badge: activeJobsCount > 0 ? activeJobsCount : null
    },
    {
      label: language === 'en' ? 'Shop' : 'ร้านค้า',
      path: '/product-catalog',
      icon: 'ShoppingBag'
    },
    {
      label: language === 'en' ? 'Track Jobs' : 'ติดตามงาน',
      path: '/job-tracking-dashboard',
      icon: 'Activity',
      requiresAuth: true
    }
  ];

  const Logo = () => (
    <Link to="/homepage" className="flex items-center space-x-2 text-primary hover:text-primary/80 smooth-transition">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <Icon name="Zap" size={20} color="white" />
      </div>
      <span className="text-xl font-semibold text-foreground">
        {language === 'en' ? 'IoT Hotline' : 'IoT ฮอตไลน์'}
      </span>
    </Link>
  );

  const CartIndicator = () => (
    <Link 
      to="/shopping-cart" 
      className="relative p-2 text-muted-foreground hover:text-foreground smooth-transition"
      aria-label={language === 'en' ? `Shopping cart with ${cartItemCount} items` : `ตะกร้าสินค้า ${cartItemCount} รายการ`}
    >
      <Icon name="ShoppingCart" size={24} />
      {cartItemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
          {cartItemCount > 99 ? '99+' : cartItemCount}
        </span>
      )}
    </Link>
  );

  const JobStatusBadge = ({ count }) => {
    if (count === 0) return null;
    
    return (
      <span className="ml-2 bg-success text-success-foreground text-xs font-medium px-2 py-1 rounded-full">
        {count}
      </span>
    );
  };

  const LanguageSwitcher = () => (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="text-muted-foreground hover:text-foreground"
      aria-label={language === 'en' ? 'Switch to Thai' : 'เปลี่ยนเป็นภาษาอังกฤษ'}
    >
      <Icon name="Globe" size={16} className="mr-1" />
      {language === 'en' ? 'TH' : 'EN'}
    </Button>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-1000 bg-background/95 backdrop-blur-sm border-b border-border nav-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems?.map((item) => {
              if (item?.requiresAuth && !isAuthenticated) return null;
              
              return (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md smooth-transition ${
                    isActivePath(item?.path)
                      ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  onClick={closeMobileMenu}
                >
                  <Icon name={item?.icon} size={16} className="mr-2" />
                  {item?.label}
                  {item?.badge && <JobStatusBadge count={item?.badge} />}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <CartIndicator />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <CartIndicator />
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              aria-label={language === 'en' ? 'Toggle menu' : 'เปิด/ปิดเมนู'}
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems?.map((item) => {
                if (item?.requiresAuth && !isAuthenticated) return null;
                
                return (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    className={`flex items-center px-3 py-2 text-base font-medium rounded-md smooth-transition ${
                      isActivePath(item?.path)
                        ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                    onClick={closeMobileMenu}
                  >
                    <Icon name={item?.icon} size={20} className="mr-3" />
                    {item?.label}
                    {item?.badge && <JobStatusBadge count={item?.badge} />}
                  </Link>
                );
              })}
              
              {/* Mobile Language Switcher */}
              <div className="px-3 py-2 border-t border-border mt-2 pt-4">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;