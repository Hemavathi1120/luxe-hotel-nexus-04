
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import RoomCard from '@/components/rooms/RoomCard';
import { dataStore } from '@/lib/dataStore';
import { Room } from '@/types/hotel';

const RoomsPreview = () => {
  const [featuredRooms, setFeaturedRooms] = useState<Room[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      // Get first 3 available rooms from the data store
      const allRooms = await dataStore.getRooms();
      const availableRooms = allRooms.filter(room => room.isAvailable).slice(0, 3);
      setFeaturedRooms(availableRooms);
    };
    fetchRooms();
  }, []);

  const handleBookRoom = (roomId: string) => {
    navigate(`/booking?roomId=${roomId}`);
  };

  const handleViewDetails = (roomId: string) => {
    navigate(`/rooms#room-${roomId}`);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="luxury-heading mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Luxury Accommodations
          </motion.h2>
          <motion.p 
            className="luxury-body max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Choose from our collection of meticulously designed rooms and suites, 
            each offering a unique blend of comfort, elegance, and breathtaking views.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/rooms">
              <Button variant="luxury-outline" size="lg">
                View All Rooms
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Featured Rooms Grid */}
        {featuredRooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.4 }}
              >
                <RoomCard
                  room={room}
                  onBook={handleBookRoom}
                  onViewDetails={handleViewDetails}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No rooms available at the moment. Please check back later.
            </p>
          </div>
        )}

        {/* Enhanced Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="luxury-card-glass p-12 text-center bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/20">
            <h3 className="luxury-heading-alt text-3xl lg:text-4xl mb-6">
              Ready to Experience Luxury?
            </h3>
            <p className="luxury-body-sm mb-8 max-w-2xl mx-auto">
              Book your stay today and discover what makes us extraordinary.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/booking">
                <Button 
                  variant="luxury"
                  size="lg" 
                  className="min-w-[180px]"
                  aria-label="Book your luxury stay"
                >
                  Book Now
                </Button>
              </Link>
              <Link to="/contact">
                <Button 
                  variant="luxury-outline" 
                  size="lg"
                  className="min-w-[180px]"
                  aria-label="Contact us for inquiries"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RoomsPreview;
