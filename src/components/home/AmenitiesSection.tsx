import React from 'react';
import { motion } from 'framer-motion';
import { 
  Waves, 
  Utensils, 
  Dumbbell, 
  Wifi, 
  Car, 
  Coffee,
  Users,
  Shield,
  Clock,
  Heart,
  Sparkles,
  MapPin
} from 'lucide-react';
import { SAMPLE_IMAGES } from '@/lib/cloudinary';

const AmenitiesSection = () => {
  const amenities = [
    {
      icon: Waves,
      title: 'Infinity Pool',
      description: 'Rooftop infinity pool with panoramic city views',
      image: SAMPLE_IMAGES.amenities.pool,
    },
    {
      icon: Utensils,
      title: 'Fine Dining',
      description: 'Michelin-starred restaurant with world-class cuisine',
      image: SAMPLE_IMAGES.amenities.restaurant,
    },
    {
      icon: Heart,
      title: 'Luxury Spa',
      description: 'Full-service spa with rejuvenating treatments',
      image: SAMPLE_IMAGES.amenities.spa,
    },
    {
      icon: Dumbbell,
      title: 'Fitness Center',
      description: 'State-of-the-art gym with personal trainers',
    },
    {
      icon: Car,
      title: 'Valet Service',
      description: 'Complimentary valet parking and concierge',
    },
    {
      icon: Wifi,
      title: 'High-Speed WiFi',
      description: 'Complimentary ultra-fast internet throughout',
    },
    {
      icon: Coffee,
      title: '24/7 Room Service',
      description: 'Gourmet dining delivered to your door',
    },
    {
      icon: Users,
      title: 'Event Spaces',
      description: 'Elegant venues for meetings and celebrations',
    },
    {
      icon: Shield,
      title: 'Premium Security',
      description: '24/7 security with keycard access',
    },
    {
      icon: Clock,
      title: 'Concierge Service',
      description: 'Personal assistance for all your needs',
    },
    {
      icon: Sparkles,
      title: 'Housekeeping',
      description: 'Daily housekeeping with premium linens',
    },
    {
      icon: MapPin,
      title: 'Prime Location',
      description: 'Steps away from shopping and attractions',
    },
  ];

  const featuredAmenities = amenities.slice(0, 3);
  const additionalAmenities = amenities.slice(3);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Enhanced Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center px-6 py-3 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <Sparkles className="w-5 h-5 mr-3 text-primary" />
            <span className="text-sm font-semibold tracking-wide text-primary">Premium Amenities</span>
          </motion.div>
          <h2 className="luxury-heading mb-8">
            World-Class Amenities
          </h2>
          <p className="luxury-body max-w-4xl mx-auto">
            Indulge in our carefully curated selection of amenities designed to 
            elevate your stay and create unforgettable moments of pure luxury.
          </p>
        </motion.div>

        {/* Featured Amenities */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {featuredAmenities.map((amenity, index) => (
            <motion.div
              key={amenity.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="luxury-card group overflow-hidden hover:shadow-2xl hover:shadow-primary/10"
            >
              {amenity.image && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={amenity.image}
                    alt={amenity.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <amenity.icon className="w-8 h-8 text-white mb-2" />
                  </div>
                </div>
              )}
              <div className="p-6">
                {!amenity.image && (
                  <div className="mb-4">
                    <amenity.icon className="w-12 h-12 text-primary mb-4" />
                  </div>
                )}
                <h3 className="text-xl font-serif font-semibold mb-2 group-hover:text-primary transition-colors">
                  {amenity.title}
                </h3>
                <p className="text-muted-foreground">
                  {amenity.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Additional Amenities Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="luxury-card-glass p-12 border-2 border-primary/10"
        >
          <h3 className="luxury-subheading text-center mb-12">
            Additional Services
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {additionalAmenities.map((amenity, index) => (
              <motion.div
                key={amenity.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start space-x-3 p-4 rounded-lg hover:bg-background/50 transition-colors"
              >
                <div className="flex-shrink-0">
                  <amenity.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">{amenity.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {amenity.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-serif font-bold mb-4">
              Experience the Difference
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              Our amenities are designed to exceed your expectations and create 
              lasting memories during your stay with us.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AmenitiesSection;