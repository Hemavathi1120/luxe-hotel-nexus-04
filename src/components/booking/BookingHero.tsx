
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Shield, Clock, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SAMPLE_IMAGES } from '@/lib/cloudinary';

const BookingHero = () => {
  const scrollToForm = () => {
    const formSection = document.querySelector('form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      icon: Shield,
      title: 'Secure Booking',
      description: 'Your information is protected with enterprise-grade security'
    },
    {
      icon: Clock,
      title: '24hr Confirmation',
      description: 'Receive booking confirmation within 24 hours'
    },
    {
      icon: Award,
      title: 'Best Rate Guarantee',
      description: 'We guarantee the best available rates for your stay'
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="w-full h-full"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <img 
            src={SAMPLE_IMAGES.hero}
            alt="Luxury Hotel Booking"
            className="w-full h-full object-cover"
          />
        </motion.div>
        {/* Improved overlay for better visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/85"></div>
        <div className="absolute inset-0 bg-luxury-navy/30"></div>
        
        {/* Enhanced Animated Pattern */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-20 left-20 w-32 h-32 border-2 border-primary rounded-full animate-luxury-float"></div>
          <div className="absolute bottom-32 right-16 w-24 h-24 border-2 border-primary/60 rounded-full animate-luxury-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-10 w-16 h-16 border-2 border-primary/40 rounded-full animate-luxury-float" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>

      {/* Enhanced Hero Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Enhanced Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center px-6 py-3 rounded-full bg-black/50 border-2 border-primary/60 mb-8 backdrop-blur-md shadow-lg"
          >
            <Calendar className="w-5 h-5 mr-3 text-primary" />
            <span className="text-sm font-semibold text-white tracking-wide">Reserve Your Perfect Stay</span>
          </motion.div>

          {/* Enhanced Main Heading */}
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-8 leading-tight text-white drop-shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Book Your
            <span className="block bg-gradient-to-r from-primary via-yellow-400 to-primary bg-clip-text text-transparent drop-shadow-lg">
              Luxury
            </span>
            <span className="text-white">Experience</span>
          </motion.h1>

          {/* Enhanced Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl mb-12 text-white max-w-4xl mx-auto leading-relaxed drop-shadow-lg font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Secure your reservation in minutes with our streamlined booking process. 
            Experience world-class hospitality with personalized service and premium amenities.
          </motion.p>

          {/* Enhanced CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-20"
          >
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-black font-bold text-lg px-12 py-6 transform hover:scale-105 transition-all duration-300 border-2 border-primary/20 shadow-2xl"
              onClick={scrollToForm}
            >
              <Calendar className="w-6 h-6 mr-3" />
              Start Booking Process
            </Button>
          </motion.div>

          {/* Enhanced Features Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-black/50 border-2 border-primary/50 mb-4 backdrop-blur-sm group-hover:bg-primary/20 transition-all duration-300 shadow-lg">
                  <feature.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-white/90 text-sm leading-relaxed font-medium">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white z-10 p-4 rounded-full bg-black/30 backdrop-blur-sm"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2 font-semibold">Scroll to continue</span>
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-2 bg-white/80 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default BookingHero;
