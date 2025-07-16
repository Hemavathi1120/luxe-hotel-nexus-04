
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'New York, USA',
      rating: 5,
      comment: 'Absolutely exceptional service and luxury beyond expectations. Every detail was perfect, from the elegant rooms to the world-class dining.',
      avatar: '/placeholder.svg',
      initials: 'SJ'
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'Tokyo, Japan',
      rating: 5,
      comment: 'The concierge service was outstanding. They made our anniversary celebration truly memorable with personalized touches throughout our stay.',
      avatar: '/placeholder.svg',
      initials: 'MC'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      location: 'Madrid, Spain',
      rating: 5,
      comment: 'Luxurious amenities and breathtaking views. The spa experience was rejuvenating, and the rooftop dining was simply spectacular.',
      avatar: '/placeholder.svg',
      initials: 'ER'
    }
  ];

  return (
    <section className="py-20 bg-gradient-card">
      <div className="container mx-auto px-4">
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
            <Star className="w-5 h-5 mr-3 text-primary fill-primary" />
            <span className="text-sm font-semibold tracking-wide text-primary">5★ Guest Reviews</span>
          </motion.div>
          <h2 className="luxury-heading mb-8">Guest Testimonials</h2>
          <p className="luxury-body max-w-3xl mx-auto">
            Discover what our distinguished guests say about their extraordinary 
            experiences at our luxury hotel.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="luxury-card h-full hover:shadow-2xl hover:shadow-primary/10">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <Quote className="w-8 h-8 text-primary mb-4" />
                  </div>
                  
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${
                          i < testimonial.rating 
                            ? 'text-primary fill-primary' 
                            : 'text-muted-foreground'
                        }`} 
                      />
                    ))}
                  </div>

                  <blockquote className="luxury-body mb-6 italic">
                    "{testimonial.comment}"
                  </blockquote>

                  <div className="flex items-center">
                    <Avatar className="w-12 h-12 mr-4">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {testimonial.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
