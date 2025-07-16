
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/contact/ContactForm';
import { Phone, Mail, MapPin, Clock, Globe, MessageSquare } from 'lucide-react';
import { SAMPLE_IMAGES } from '@/lib/cloudinary';

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Enhanced Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
          {/* Enhanced Background */}
          <div className="absolute inset-0 z-0">
            <motion.div
              className="w-full h-full"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
            >
              <img 
                src={SAMPLE_IMAGES.amenities.restaurant}
                alt="Contact Us"
                className="w-full h-full object-cover"
              />
            </motion.div>
            {/* Improved overlay for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80"></div>
            <div className="absolute inset-0 bg-luxury-navy/20"></div>
          </div>

          {/* Enhanced Hero Content */}
          <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Enhanced Main Heading */}
              <motion.h1 
                className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight text-white drop-shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Get in Touch
              </motion.h1>

              {/* Enhanced Subtitle */}
              <motion.p 
                className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-lg font-light"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                We're here to make your luxury experience exceptional. 
                Reach out to us for any inquiries, reservations, or assistance.
              </motion.p>

              {/* Enhanced Contact Methods Grid */}
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="text-center group cursor-pointer">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-black/40 border-2 border-primary/60 mb-4 backdrop-blur-md group-hover:bg-primary/30 group-hover:border-primary transition-all duration-300 shadow-xl">
                    <Phone className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Call Us</h3>
                  <p className="text-white/80 text-base font-medium">+1 (555) 123-4567</p>
                  <p className="text-white/60 text-sm mt-1">24/7 Concierge Service</p>
                </div>
                
                <div className="text-center group cursor-pointer">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-black/40 border-2 border-primary/60 mb-4 backdrop-blur-md group-hover:bg-primary/30 group-hover:border-primary transition-all duration-300 shadow-xl">
                    <Mail className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Email Us</h3>
                  <p className="text-white/80 text-base font-medium">info@luxehotel.com</p>
                  <p className="text-white/60 text-sm mt-1">Response within 2 hours</p>
                </div>
                
                <div className="text-center group cursor-pointer">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-black/40 border-2 border-primary/60 mb-4 backdrop-blur-md group-hover:bg-primary/30 group-hover:border-primary transition-all duration-300 shadow-xl">
                    <MapPin className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Visit Us</h3>
                  <p className="text-white/80 text-base font-medium">Downtown District</p>
                  <p className="text-white/60 text-sm mt-1">Prime luxury location</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Quick Info Bar */}
        <section className="bg-primary text-white py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Response Time: Within 2 hours</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>Available in 12 languages</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <span>Live chat available 24/7</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <ContactForm />

        {/* Enhanced Additional Contact Information */}
        <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-foreground">
                More Ways to Connect
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Choose the communication method that works best for you. Our dedicated team is available around the clock to assist you.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-center p-8 rounded-xl bg-background/80 backdrop-blur-sm shadow-lg border border-border/50 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Reservations</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">Book your stay with our experts</p>
                <p className="font-medium text-foreground text-lg">+1 (555) 123-4567</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-center p-8 rounded-xl bg-background/80 backdrop-blur-sm shadow-lg border border-border/50 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <MessageSquare className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Live Chat</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">Instant support available</p>
                <p className="font-medium text-foreground text-lg">24/7 Available</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-center p-8 rounded-xl bg-background/80 backdrop-blur-sm shadow-lg border border-border/50 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Email Support</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">Detailed inquiries welcome</p>
                <p className="font-medium text-foreground text-lg">info@luxehotel.com</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-center p-8 rounded-xl bg-background/80 backdrop-blur-sm shadow-lg border border-border/50 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">Location</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">Visit us in person</p>
                <p className="font-medium text-foreground text-lg">Downtown District</p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
