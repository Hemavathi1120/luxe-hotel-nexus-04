
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BookingHero from '@/components/booking/BookingHero';
import BookingSteps from '@/components/booking/BookingSteps';
import BookingRequestForm from '@/components/booking/BookingRequestForm';

const Booking = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Premium Hero Section */}
        <BookingHero />

        {/* Step-by-Step Process */}
        <BookingSteps />

        {/* Booking Form Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <BookingRequestForm />
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Booking;
