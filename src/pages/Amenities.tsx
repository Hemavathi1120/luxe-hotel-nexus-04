
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AmenitiesSection from '@/components/home/AmenitiesSection';
import { Sparkles, Award, Gem } from 'lucide-react';
import { SAMPLE_IMAGES } from '@/lib/cloudinary';

const Amenities = () => {
  return (
    <div>
      <Header />
      
      {/* Enhanced Premium Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="w-full h-full"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <img 
              src={SAMPLE_IMAGES.amenities.spa}
              alt="Premium Amenities"
              className="w-full h-full object-cover"
            />
          </motion.div>
          {/* Improved overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/85"></div>
          <div className="absolute inset-0 bg-luxury-navy/30"></div>
          
          {/* Enhanced Animated Overlay Pattern */}
          <div className="absolute inset-0 opacity-15">
            <div className="absolute top-16 left-16 w-24 h-24 border-2 border-primary rounded-full animate-luxury-float"></div>
            <div className="absolute bottom-24 right-20 w-32 h-32 border-2 border-primary/60 rounded-full animate-luxury-float" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        {/* Enhanced Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Enhanced Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-6 py-3 rounded-full bg-black/50 border-2 border-primary/60 mb-6 backdrop-blur-md shadow-lg"
            >
              <Gem className="w-5 h-5 mr-3 text-primary" />
              <span className="text-sm font-semibold text-white tracking-wide">World-Class Facilities</span>
            </motion.div>

            {/* Enhanced Main Heading */}
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight text-white drop-shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Premium
              <span className="block bg-gradient-to-r from-primary via-yellow-400 to-primary bg-clip-text text-transparent drop-shadow-lg">
                Amenities
              </span>
            </motion.h1>

            {/* Enhanced Subtitle */}
            <motion.p 
              className="text-lg md:text-xl mb-8 text-white max-w-3xl mx-auto leading-relaxed drop-shadow-lg font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Discover our extensive collection of world-class amenities designed 
              to enhance every aspect of your stay with unparalleled luxury and comfort.
            </motion.p>

            {/* Enhanced Premium Features */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black/50 border-2 border-primary/50 mb-3 backdrop-blur-sm group-hover:bg-primary/20 transition-all duration-300 shadow-lg">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-1 text-white">Luxury Spa</h3>
                <p className="text-white/90 text-sm font-medium">Rejuvenate mind and body</p>
              </div>
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black/50 border-2 border-primary/50 mb-3 backdrop-blur-sm group-hover:bg-primary/20 transition-all duration-300 shadow-lg">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-1 text-white">Fine Dining</h3>
                <p className="text-white/90 text-sm font-medium">Michelin-starred cuisine</p>
              </div>
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black/50 border-2 border-primary/50 mb-3 backdrop-blur-sm group-hover:bg-primary/20 transition-all duration-300 shadow-lg">
                  <Gem className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-1 text-white">Exclusive Access</h3>
                <p className="text-white/90 text-sm font-medium">Private club facilities</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <AmenitiesSection />
      
      <Footer />
    </div>
  );
};

export default Amenities;
