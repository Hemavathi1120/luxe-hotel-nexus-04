
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, SlidersHorizontal, Sparkles, Award, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RoomCard from '@/components/rooms/RoomCard';
import { dataStore } from '@/lib/dataStore';
import { Room } from '@/types/hotel';
import { SAMPLE_IMAGES } from '@/lib/cloudinary';

const Rooms = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    const fetchRooms = async () => {
      const rooms = await dataStore.getRooms();
      setRooms(rooms);
    };
    fetchRooms();
  }, []);

  const handleBookRoom = (roomId: string) => {
    console.log('Booking room:', roomId);
    // Navigate to booking page with room ID
  };

  const handleViewDetails = (roomId: string) => {
    console.log('Viewing room details:', roomId);
    // Navigate to room details page
  };

  // Filter and sort rooms
  const filteredRooms = rooms
    .filter(room => {
      const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           room.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'all' || room.type === typeFilter;
      const matchesPrice = priceRange === 'all' || 
                          (priceRange === 'budget' && room.price <= 200) ||
                          (priceRange === 'mid' && room.price > 200 && room.price <= 500) ||
                          (priceRange === 'luxury' && room.price > 500);
      
      return matchesSearch && matchesType && matchesPrice && room.isAvailable;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'capacity':
          return b.capacity - a.capacity;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
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
                src={SAMPLE_IMAGES.rooms.deluxe}
                alt="Luxury Rooms"
                className="w-full h-full object-cover"
              />
            </motion.div>
            {/* Improved overlay for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/85"></div>
            <div className="absolute inset-0 bg-luxury-navy/30"></div>
            
            {/* Enhanced Animated Pattern */}
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
                <Crown className="w-5 h-5 mr-3 text-primary" />
                <span className="text-sm font-semibold text-white tracking-wide">Luxury Accommodations</span>
              </motion.div>

              {/* Enhanced Main Heading */}
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight text-white drop-shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Our Luxury
                <span className="block bg-gradient-to-r from-primary via-yellow-400 to-primary bg-clip-text text-transparent drop-shadow-lg">
                  Accommodations
                </span>
              </motion.h1>

              {/* Enhanced Subtitle */}
              <motion.p 
                className="text-lg md:text-xl mb-8 text-white max-w-3xl mx-auto leading-relaxed drop-shadow-lg font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Discover our collection of meticulously designed rooms and suites, 
                each offering a unique blend of comfort, elegance, and breathtaking views.
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
                  <h3 className="text-lg font-semibold mb-1 text-white">Premium Design</h3>
                  <p className="text-white/90 text-sm font-medium">Meticulously crafted interiors</p>
                </div>
                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black/50 border-2 border-primary/50 mb-3 backdrop-blur-sm group-hover:bg-primary/20 transition-all duration-300 shadow-lg">
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1 text-white">Award Winning</h3>
                  <p className="text-white/90 text-sm font-medium">Internationally recognized</p>
                </div>
                <div className="text-center group">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black/50 border-2 border-primary/50 mb-3 backdrop-blur-sm group-hover:bg-primary/20 transition-all duration-300 shadow-lg">
                    <Crown className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1 text-white">Royal Service</h3>
                  <p className="text-white/90 text-sm font-medium">Personalized attention</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-12 bg-gradient-to-b from-background to-secondary/10">
          <div className="container mx-auto px-4">
            <Card className="max-w-4xl mx-auto shadow-xl border-border/50">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="md:col-span-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        placeholder="Search rooms..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger>
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Room Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="deluxe">Deluxe</SelectItem>
                      <SelectItem value="suite">Suite</SelectItem>
                      <SelectItem value="presidential">Presidential</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger>
                      <SlidersHorizontal className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Price Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="budget">Under $200</SelectItem>
                      <SelectItem value="mid">$200 - $500</SelectItem>
                      <SelectItem value="luxury">$500+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-between items-center mt-4 pt-4 border-t border-border/30">
                  <p className="text-sm text-muted-foreground">
                    {filteredRooms.length} room{filteredRooms.length !== 1 ? 's' : ''} available
                  </p>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="capacity">Guest Capacity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Rooms Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {filteredRooms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredRooms.map((room, index) => (
                  <motion.div
                    key={room.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
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
              <div className="text-center py-20">
                <h3 className="text-2xl font-semibold mb-4">No rooms found</h3>
                <p className="text-muted-foreground mb-8">
                  Try adjusting your search criteria or filters.
                </p>
                <Button onClick={() => {
                  setSearchTerm('');
                  setTypeFilter('all');
                  setPriceRange('all');
                }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Rooms;
