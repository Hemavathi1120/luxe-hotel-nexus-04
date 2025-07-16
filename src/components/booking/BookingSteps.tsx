
import React from 'react';
import { motion } from 'framer-motion';
import { User, Calendar, CreditCard, CheckCircle, Clock, Mail } from 'lucide-react';

const BookingSteps = () => {
  const steps = [
    {
      number: '01',
      icon: User,
      title: 'Guest Information',
      description: 'Provide your personal details and contact information for the reservation.',
      duration: '2 min'
    },
    {
      number: '02',
      icon: Calendar,
      title: 'Select Dates & Room',
      description: 'Choose your preferred dates and select from our available luxury rooms.',
      duration: '3 min'
    },
    {
      number: '03',
      icon: CreditCard,
      title: 'Review & Submit',
      description: 'Review your booking details and submit your reservation request.',
      duration: '1 min'
    },
    {
      number: '04',
      icon: Mail,
      title: 'Confirmation',
      description: 'Receive booking confirmation and detailed information via email.',
      duration: '24 hrs'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-luxury-cream to-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 border border-primary rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 border border-primary rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <CheckCircle className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium text-primary">Simple Booking Process</span>
          </motion.div>

          <h2 className="luxury-heading text-4xl md:text-5xl mb-6">
            Book in 4 Easy Steps
          </h2>
          <p className="luxury-body max-w-3xl mx-auto">
            Our streamlined booking process ensures you can secure your luxury stay 
            quickly and efficiently. Follow these simple steps to complete your reservation.
          </p>
        </motion.div>

        {/* Steps Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connection Lines for Desktop */}
            <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20 z-0"></div>
            
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className="relative z-10"
              >
                <div className="luxury-card p-8 text-center h-full hover:shadow-luxury transition-all duration-500 group">
                  {/* Step Number */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-luxury flex items-center justify-center text-luxury-navy font-bold text-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                      {step.number}
                    </div>
                    <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center -mt-2 group-hover:bg-primary/20 transition-colors duration-300">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="luxury-subheading text-xl">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {step.description}
                    </p>
                    
                    {/* Duration Badge */}
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-xs font-medium text-secondary-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      {step.duration}
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl pointer-events-none"></div>
                </div>

                {/* Mobile Connection Line */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-8 mb-8">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-primary to-primary/20"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-luxury text-luxury-navy font-medium">
            <CheckCircle className="w-5 h-5 mr-2" />
            Ready to begin? Start with your guest information below
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingSteps;
