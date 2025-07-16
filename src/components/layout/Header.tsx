
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Rooms', path: '/rooms' },
    { label: 'Dining', path: '/dining' },
    { label: 'Amenities', path: '/amenities' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleBookingClick = () => {
    navigate('/booking');
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/95 backdrop-blur-xl shadow-xl border-b border-border' 
            : 'bg-background/90 backdrop-blur-lg shadow-lg border-b border-border/50'
        }`}
      >
        <div className="container mx-auto px-4">
          {/* Main Navigation */}
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-md">
                  <span className="text-primary-foreground font-bold text-base">L</span>
                </div>
                <div>
                  <div className="text-lg font-serif font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                    LUXE HOTEL
                  </div>
                  <div className="text-xs text-muted-foreground tracking-wider">
                    PREMIUM HOSPITALITY
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* Enhanced Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1" role="navigation" aria-label="Main navigation">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`luxury-nav-link ${
                    isActive(item.path) 
                      ? 'luxury-nav-link-active' 
                      : ''
                  }`}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                >
                  {item.label}
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary/10 rounded-lg"
                      initial={false}
                      style={{ zIndex: -1 }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Enhanced Action Buttons */}
            <div className="flex items-center space-x-3">
              <Link to="/signin">
                <Button 
                  variant="luxury-outline" 
                  size="sm" 
                  className="hidden sm:flex items-center space-x-2"
                  aria-label="Sign in to your account"
                >
                  <User className="w-4 h-4" />
                  <span>Sign In</span>
                </Button>
              </Link>
              
              <Button 
                onClick={handleBookingClick}
                variant="luxury"
                size="sm"
                className="hidden sm:flex items-center space-x-2"
                aria-label="Book your stay now"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Now</span>
              </Button>

              {/* Enhanced Mobile Action Buttons */}
              <div className="flex sm:hidden items-center space-x-2">
                <Link to="/signin">
                  <Button 
                    variant="luxury-outline" 
                    size="sm" 
                    className="p-2"
                    aria-label="Sign in"
                  >
                    <User className="w-5 h-5" />
                  </Button>
                </Link>
                
                <Button 
                  onClick={handleBookingClick}
                  variant="luxury"
                  size="sm"
                  className="p-2"
                  aria-label="Book now"
                >
                  <Calendar className="w-5 h-5" />
                </Button>
              </div>

              {/* Enhanced Mobile Menu Button */}
              <Button
                variant={isMobileMenuOpen ? "luxury-ghost" : "luxury-outline"}
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, type: "spring", bounce: 0.1 }}
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.div>
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
            <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.1 }}
            className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-b border-border shadow-2xl lg:hidden"
            style={{ paddingTop: '80px' }}
            role="navigation"
            aria-label="Mobile navigation menu"
          >
            <div className="container mx-auto px-4 py-6">
              {/* Mobile Navigation */}
              <nav className="space-y-3 mb-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block py-3 px-4 rounded-lg text-lg font-medium transition-all duration-200 border ${
                        isActive(item.path) 
                          ? 'text-primary-foreground bg-primary border-primary shadow-md' 
                          : 'text-foreground bg-background/50 border-border hover:bg-accent hover:text-primary hover:border-primary/50 shadow-sm'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-3"
              >
                <Link to="/signin" className="block">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start h-12 text-left bg-background border-2 border-border hover:bg-accent hover:text-primary hover:border-primary/50 text-foreground transition-all duration-200 shadow-sm hover:shadow-md font-medium"
                  >
                    <User className="w-5 h-5 mr-3" />
                    Sign In to Your Account
                  </Button>
                </Link>
                <Button 
                  onClick={handleBookingClick}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg border-2 border-primary hover:border-primary/80 transition-all duration-200 font-medium"
                >
                  <Calendar className="w-5 h-5 mr-3" />
                  Book Your Stay Now
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/20 z-30 lg:hidden"
            style={{ top: '80px' }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
