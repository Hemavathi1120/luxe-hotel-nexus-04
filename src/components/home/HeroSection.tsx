import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Calendar, Users, MapPin, Sparkles, Star, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SAMPLE_IMAGES } from '@/lib/cloudinary';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative min-h-screen flex items-end justify-center overflow-hidden pb-32">
      {/* Enhanced Background with parallax effect */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="w-full h-full"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <img 
            src={SAMPLE_IMAGES.hero}
            alt="Luxury Hotel Experience"
            className="w-full h-full object-cover"
          />
        </motion.div>
        {/* Sophisticated overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-black/85"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-navy/60 via-transparent to-luxury-navy/40"></div>
        
        {/* Floating elements with improved design */}
        <div className="absolute inset-0 opacity-15">
          <motion.div 
            className="absolute top-1/4 left-16 w-20 h-20 border-2 border-primary/30 rounded-full backdrop-blur-sm"
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.15, 0.3, 0.15],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-1/3 right-20 w-14 h-14 border-2 border-primary/25 rounded-full backdrop-blur-sm"
            animate={{ 
              y: [0, 15, 0],
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 0.9, 1]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.div 
            className="absolute top-2/3 left-1/4 w-12 h-12 border border-primary/20 rounded-full backdrop-blur-sm"
            animate={{ 
              y: [0, -10, 0],
              opacity: [0.1, 0.25, 0.1]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          />
        </div>
      </div>

      {/* Enhanced Hero Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-6xl mx-auto mt-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Refined Premium Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center px-6 py-3 rounded-full bg-black/40 border border-primary/50 mb-8 backdrop-blur-md shadow-lg"
          >
            <Award className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-semibold tracking-wider text-white/95">5-Star Luxury Since 1985</span>
          </motion.div>

          {/* Main Heading with improved typography */}
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-8 leading-[0.9] text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.span
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="block"
            >
              Where
            </motion.span>
            <motion.span 
              className="block bg-gradient-to-r from-primary via-yellow-200 to-primary bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              LUXURY
            </motion.span>
            <motion.span 
              className="block text-white/95"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              Lives
            </motion.span>
          </motion.h1>

          {/* Enhanced Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl mb-12 text-white/85 max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Discover an oasis of sophistication where timeless elegance meets modern comfort. 
            Your extraordinary journey begins here.
          </motion.p>

          {/* Enhanced CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Button 
              variant="luxury"
              size="xl" 
              className="min-w-[220px] h-16 text-lg font-bold shadow-2xl hover:shadow-primary/30 transform hover:scale-105 transition-all duration-300"
              onClick={() => navigate('/booking')}
              aria-label="Book your luxury stay now"
            >
              <Calendar className="w-6 h-6 mr-3" />
              Reserve Now
            </Button>
            <Button 
              variant="luxury-outline" 
              size="xl" 
              className="min-w-[220px] h-16 text-lg border-2 border-white/70 text-white hover:bg-white hover:text-black backdrop-blur-md font-semibold shadow-xl transform hover:scale-105 transition-all duration-300"
              onClick={() => navigate('/rooms')}
              aria-label="Explore our luxury accommodations"
            >
              Explore Suites
            </Button>
          </motion.div>

          {/* Redesigned Stats with cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.div 
              className="text-center group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-black/50 border-2 border-primary/50 mb-4 backdrop-blur-md group-hover:bg-primary/20 group-hover:border-primary/70 transition-all duration-300 shadow-lg">
                <Star className="w-10 h-10 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-yellow-300 bg-clip-text text-transparent">5★</div>
              <p className="text-white/80 font-semibold">Michelin Excellence</p>
            </motion.div>
            
            <motion.div 
              className="text-center group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-black/50 border-2 border-primary/50 mb-4 backdrop-blur-md group-hover:bg-primary/20 group-hover:border-primary/70 transition-all duration-300 shadow-lg">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-yellow-300 bg-clip-text text-transparent">200+</div>
              <p className="text-white/80 font-semibold">Premium Suites</p>
            </motion.div>
            
            <motion.div 
              className="text-center group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-black/50 border-2 border-primary/50 mb-4 backdrop-blur-md group-hover:bg-primary/20 group-hover:border-primary/70 transition-all duration-300 shadow-lg">
                <MapPin className="w-10 h-10 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-yellow-300 bg-clip-text text-transparent">24/7</div>
              <p className="text-white/80 font-semibold">Butler Service</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.button
        onClick={scrollToNextSection}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 hover:text-primary transition-all duration-300 z-10 p-4 rounded-full bg-black/30 backdrop-blur-md hover:bg-black/50 border border-white/20 hover:border-primary/50 shadow-lg"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.1 }}
        aria-label="Scroll to discover more"
      >
        <div className="flex flex-col items-center">
          <span className="text-xs mb-2 font-semibold tracking-wider">Discover More</span>
          <ChevronDown className="w-5 h-5" />
        </div>
      </motion.button>
    </section>
  );
};

export default HeroSection;
