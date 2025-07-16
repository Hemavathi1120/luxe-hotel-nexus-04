import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  Twitter,
  Wifi,
  Car,
  Coffee,
  Waves,
  Dumbbell,
  Utensils
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const quickLinks = [
    { label: 'Rooms & Suites', path: '/rooms' },
    { label: 'Dining', path: '/dining' },
    { label: 'Amenities', path: '/amenities' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'Book Now', path: '/booking' },
  ];

  const amenities = [
    { icon: Wifi, label: 'Free WiFi' },
    { icon: Car, label: 'Valet Parking' },
    { icon: Coffee, label: '24/7 Room Service' },
    { icon: Waves, label: 'Swimming Pool' },
    { icon: Dumbbell, label: 'Fitness Center' },
    { icon: Utensils, label: 'Fine Dining' },
  ];

  return (
    <footer className="bg-luxury-navy text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Hotel Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-serif font-bold mb-4 bg-gradient-luxury bg-clip-text text-transparent">
                LUXE HOTEL
              </h3>
              <p className="text-white/80 leading-relaxed">
                Experience unparalleled luxury and sophistication at our world-class hotel. 
                Where every moment becomes a cherished memory.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-white/80">
                <MapPin className="w-5 h-5 text-primary" />
                <span>123 Luxury Avenue, Beverly Hills, CA 90210</span>
              </div>
              <div className="flex items-center space-x-3 text-white/80">
                <Phone className="w-5 h-5 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-white/80">
                <Mail className="w-5 h-5 text-primary" />
                <span>reservations@luxehotel.com</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-xl font-serif font-semibold mb-6">Quick Links</h4>
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-white/80 hover:text-primary transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Amenities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-xl font-serif font-semibold mb-6">Amenities</h4>
            <div className="space-y-3">
              {amenities.map((amenity) => (
                <div key={amenity.label} className="flex items-center space-x-3 text-white/80">
                  <amenity.icon className="w-5 h-5 text-primary" />
                  <span>{amenity.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Newsletter & Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div>
              <h4 className="text-xl font-serif font-semibold mb-4">Stay Connected</h4>
              <p className="text-white/80 mb-4">
                Subscribe to receive exclusive offers and updates.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 
                           text-white placeholder:text-white/60 
                           focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <Button variant="luxury" size="lg" className="w-full">
                  Subscribe
                </Button>
              </div>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Follow Us</h5>
              <div className="flex space-x-4">
                <motion.a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/10 border border-white/20 
                           flex items-center justify-center hover:bg-primary hover:border-primary 
                           transition-all duration-300"
                >
                  <Facebook className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/10 border border-white/20 
                           flex items-center justify-center hover:bg-primary hover:border-primary 
                           transition-all duration-300"
                >
                  <Instagram className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/10 border border-white/20 
                           flex items-center justify-center hover:bg-primary hover:border-primary 
                           transition-all duration-300"
                >
                  <Twitter className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm">
              © 2024 Luxe Hotel. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/contact" className="text-white/60 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/contact" className="text-white/60 hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-white/60 hover:text-primary transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;