
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import RoomsPreview from '@/components/home/RoomsPreview';
import AmenitiesSection from '@/components/home/AmenitiesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import NewsletterSection from '@/components/home/NewsletterSection';

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen"
    >
      <Header />
      <main>
        <HeroSection />
        <RoomsPreview />
        <AmenitiesSection />
        <TestimonialsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </motion.div>
  );
};

export default Index;
