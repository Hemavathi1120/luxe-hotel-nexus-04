
import React from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Award, Users, Clock, Globe, Heart, Shield, Sparkles, Star, ArrowDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { SAMPLE_IMAGES } from '@/lib/cloudinary';

const About = () => {
  const stats = [
    { icon: Award, value: '25+', label: 'Awards Won' },
    { icon: Users, value: '50K+', label: 'Happy Guests' },
    { icon: Clock, value: '15', label: 'Years Experience' },
    { icon: Globe, value: '50+', label: 'Countries Served' },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Exceptional Service',
      description: 'Every guest receives personalized attention and care that exceeds expectations.'
    },
    {
      icon: Shield,
      title: 'Uncompromising Quality',
      description: 'We maintain the highest standards in every aspect of our hospitality services.'
    },
    {
      icon: Sparkles,
      title: 'Memorable Experiences',
      description: 'Creating unforgettable moments that our guests cherish for a lifetime.'
    }
  ];

  const timeline = [
    { year: '2009', event: 'Grand Opening', description: 'Luxe Hotel opens its doors with 50 rooms and a vision for excellence.' },
    { year: '2012', event: 'First Michelin Star', description: 'Our restaurant Le Jardin receives its first Michelin star.' },
    { year: '2015', event: 'Expansion Complete', description: 'Added 100 more rooms and the luxury spa complex.' },
    { year: '2018', event: 'International Recognition', description: 'Awarded "Best Luxury Hotel" by Travel + Leisure.' },
    { year: '2021', event: 'Sustainability Initiative', description: 'Became the first carbon-neutral luxury hotel in the region.' },
    { year: '2024', event: 'Future Vision', description: 'Continuing to innovate and set new standards in luxury hospitality.' }
  ];

  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div>
      <Header />
      
      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with parallax effect */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="w-full h-full"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            <img 
              src={SAMPLE_IMAGES.hero}
              alt="Luxe Hotel Heritage"
              className="w-full h-full object-cover"
            />
          </motion.div>
          {/* Enhanced overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-black/85"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-navy/60 via-transparent to-luxury-navy/40"></div>
          
          {/* Floating decorative elements */}
          <div className="absolute inset-0 opacity-20">
            <motion.div 
              className="absolute top-32 left-16 w-20 h-20 border border-primary/40 rounded-full"
              animate={{ 
                y: [0, -20, 0],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute bottom-40 right-20 w-16 h-16 border border-primary/30 rounded-full"
              animate={{ 
                y: [0, 15, 0],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            <motion.div 
              className="absolute top-1/2 right-1/4 w-12 h-12 border border-primary/25 rounded-full"
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center px-6 py-3 rounded-full bg-black/40 border border-primary/50 mb-8 backdrop-blur-md"
            >
              <Star className="w-5 h-5 mr-3 text-primary" />
              <span className="text-sm font-semibold tracking-wider text-white/95">HERITAGE • EXCELLENCE • LUXURY</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-8 leading-tight text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="block"
              >
                Our
              </motion.span>
              <motion.span 
                className="block bg-gradient-to-r from-primary via-yellow-300 to-primary bg-clip-text text-transparent"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                STORY
              </motion.span>
              <motion.span 
                className="block text-white/95 text-4xl md:text-5xl lg:text-6xl"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                of Excellence
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              className="text-xl md:text-2xl mb-12 text-white/90 max-w-4xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              A legacy spanning decades, where timeless elegance meets modern sophistication. 
              <span className="block mt-2 text-lg md:text-xl text-white/80">
                Discover the heritage that defines luxury hospitality.
              </span>
            </motion.p>

            {/* Quick Stats Preview */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + index * 0.1 }}
                  className="text-center group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black/50 border border-primary/40 mb-4 backdrop-blur-sm group-hover:bg-primary/20 transition-all duration-300">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-yellow-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <p className="text-white/80 font-medium text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <motion.button
          onClick={scrollToNextSection}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 hover:text-primary transition-all duration-300 z-10 p-4 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 border border-white/20 hover:border-primary/40"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          aria-label="Scroll to discover our story"
        >
          <div className="flex flex-col items-center">
            <span className="text-xs mb-2 font-medium tracking-wide">DISCOVER MORE</span>
            <ArrowDown className="w-5 h-5" />
          </div>
        </motion.button>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="luxury-subheading mb-6">Our Story</h2>
              <div className="space-y-4 luxury-body">
                <p>
                  Since 2009, Luxe Hotel has been synonymous with exceptional hospitality 
                  and unparalleled luxury. What began as a vision to create the perfect 
                  sanctuary for discerning travelers has evolved into an internationally 
                  recognized symbol of elegance and sophistication.
                </p>
                <p>
                  Our commitment to excellence is reflected in every detail – from our 
                  meticulously designed rooms and world-class amenities to our 
                  personalized service that anticipates your every need.
                </p>
                <p>
                  Today, we continue to set new standards in luxury hospitality, 
                  ensuring that every guest experiences the extraordinary.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="luxury-card overflow-hidden"
            >
              <img 
                src={SAMPLE_IMAGES.hero}
                alt="Hotel Interior"
                className="w-full h-96 object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-luxury">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-luxury-navy">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
                className="space-y-4"
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4" />
                <div className="text-4xl font-bold">{stat.value}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="luxury-subheading mb-6">Our Values</h2>
            <p className="luxury-body max-w-2xl mx-auto">
              The principles that guide everything we do and define who we are.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="luxury-card text-center h-full">
                  <CardContent className="p-8">
                    <value.icon className="w-12 h-12 text-primary mx-auto mb-6" />
                    <h3 className="text-xl font-serif font-semibold mb-4">
                      {value.title}
                    </h3>
                    <p className="luxury-body">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-gradient-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="luxury-subheading mb-6">Our Journey</h2>
            <p className="luxury-body max-w-2xl mx-auto">
              Milestones that have shaped our legacy of excellence.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center mb-8 last:mb-0"
              >
                <div className="flex-shrink-0 w-20 text-right mr-8">
                  <div className="text-2xl font-bold text-primary">{item.year}</div>
                </div>
                <div className="flex-shrink-0 w-4 h-4 bg-primary rounded-full mr-8"></div>
                <Card className="luxury-card flex-1">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{item.event}</h3>
                    <p className="luxury-body">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="luxury-card p-8"
            >
              <h3 className="text-2xl font-serif font-semibold mb-4 text-primary">Our Mission</h3>
              <p className="luxury-body">
                To provide an extraordinary hospitality experience that exceeds expectations, 
                creating lasting memories through impeccable service, luxurious accommodations, 
                and personalized attention to every detail.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="luxury-card p-8"
            >
              <h3 className="text-2xl font-serif font-semibold mb-4 text-primary">Our Vision</h3>
              <p className="luxury-body">
                To be the world's most sought-after luxury hotel destination, 
                recognized for our commitment to excellence, innovation in hospitality, 
                and our ability to create transformative experiences for our guests.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
