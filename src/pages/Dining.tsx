import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MenuSection from '@/components/dining/MenuSection';
import ReservationForm from '@/components/dining/ReservationForm';
import { Button } from '@/components/ui/button';
import { Clock, Star, MapPin, Phone, ChefHat, Award, Utensils, X } from 'lucide-react';
import { SAMPLE_IMAGES } from '@/lib/cloudinary';
import { Restaurant } from '@/types/hotel';

const Dining = () => {
  const [showReservationForm, setShowReservationForm] = useState(false);
  const [showMenuSection, setShowMenuSection] = useState(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRestaurants = () => {
      try {
        const storedRestaurants = localStorage.getItem('restaurants');
        if (storedRestaurants) {
          setRestaurants(JSON.parse(storedRestaurants));
        }
      } catch (error) {
        console.error('Error loading restaurants:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRestaurants();
  }, []);

  const handleMakeReservation = () => {
    setShowReservationForm(true);
    setShowMenuSection(false);
    // Scroll to reservation section
    setTimeout(() => {
      const element = document.getElementById('reservation-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleViewMenu = () => {
    setShowMenuSection(true);
    setShowReservationForm(false);
    // Scroll to menu section
    setTimeout(() => {
      const element = document.getElementById('menu-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const closeReservationForm = () => {
    setShowReservationForm(false);
  };

  const closeMenuSection = () => {
    setShowMenuSection(false);
  };

  // Helper function to format opening hours
  const formatOpeningHours = (openingHours: Restaurant['openingHours']) => {
    // Add proper null/undefined checks
    if (!openingHours || typeof openingHours !== 'object') {
      return null;
    }
    
    const days = Object.entries(openingHours);
    if (days.length === 0) return null;

    return days.map(([day, hours]) => {
      if (!hours || hours.closed) {
        return `${day}: Closed`;
      }
      return `${day}: ${hours.open} - ${hours.close}`;
    }).join(', ');
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading restaurants...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      
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
              src={SAMPLE_IMAGES.amenities.restaurant}
              alt="Culinary Excellence"
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
              <ChefHat className="w-5 h-5 mr-3 text-primary" />
              <span className="text-sm font-semibold text-white tracking-wide">Fine Dining Experience</span>
            </motion.div>

            {/* Enhanced Main Heading */}
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight text-white drop-shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Culinary
              <span className="block bg-gradient-to-r from-primary via-yellow-400 to-primary bg-clip-text text-transparent drop-shadow-lg">
                Excellence
              </span>
            </motion.h1>

            {/* Enhanced Subtitle */}
            <motion.p 
              className="text-lg md:text-xl mb-8 text-white max-w-3xl mx-auto leading-relaxed drop-shadow-lg font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Discover our carefully curated dining experiences, crafted by world-class chefs 
              using the finest ingredients from around the globe.
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
                  <Star className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-1 text-white">Premium Quality</h3>
                <p className="text-white/90 text-sm font-medium">Exceptional cuisine</p>
              </div>
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black/50 border-2 border-primary/50 mb-3 backdrop-blur-sm group-hover:bg-primary/20 transition-all duration-300 shadow-lg">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-1 text-white">Expert Chefs</h3>
                <p className="text-white/90 text-sm font-medium">Culinary mastery</p>
              </div>
              <div className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black/50 border-2 border-primary/50 mb-3 backdrop-blur-sm group-hover:bg-primary/20 transition-all duration-300 shadow-lg">
                  <Utensils className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-1 text-white">Fine Dining</h3>
                <p className="text-white/90 text-sm font-medium">Elegant experiences</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {restaurants.length > 0 ? (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="space-y-16">
              {restaurants.map((restaurant, index) => (
                <motion.div
                  key={restaurant.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="luxury-card overflow-hidden h-96"
                    >
                      <img 
                        src={restaurant.image || SAMPLE_IMAGES.amenities.restaurant}
                        alt={restaurant.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-6 left-6 text-white">
                        <div className="flex items-center space-x-2 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-5 h-5 ${i < 4 ? 'text-primary fill-primary' : 'text-white/50'}`} 
                            />
                          ))}
                          <span className="text-sm">{restaurant.priceRange}</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {restaurant.cuisine}
                        </span>
                        <span className="text-sm text-muted-foreground">{restaurant.location}</span>
                      </div>
                      <h2 className="luxury-subheading mb-4">{restaurant.name}</h2>
                      <p className="luxury-body">{restaurant.description}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Highlights</h3>
                      <div className="flex flex-wrap gap-2">
                        {restaurant.amenities && restaurant.amenities.map((amenity) => (
                          <span 
                            key={amenity}
                            className="text-sm bg-muted px-3 py-1 rounded-full"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>

                    {restaurant.openingHours && Object.keys(restaurant.openingHours).length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <Clock className="w-4 h-4 text-primary" />
                          <span className="font-medium">Hours:</span>
                        </div>
                        <div className="text-sm text-muted-foreground ml-6">
                          {formatOpeningHours(restaurant.openingHours)}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      {restaurant.phone && (
                        <div className="flex items-center space-x-1">
                          <Phone className="w-4 h-4" />
                          <span>{restaurant.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>Capacity: {restaurant.capacity}</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button className="btn-luxury" onClick={handleMakeReservation}>
                        Make Reservation
                      </Button>
                      <Button variant="outline" onClick={handleViewMenu}>
                        View Menu
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <ChefHat className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="luxury-subheading mb-4">No Restaurants Available</h2>
              <p className="luxury-body max-w-2xl mx-auto">
                Our restaurants are being prepared for you. Please check back soon for our dining options.
              </p>
            </motion.div>
          </div>
        </section>
      )}

      <section className="py-16 bg-gradient-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="luxury-subheading mb-6">24/7 Room Service</h2>
            <p className="luxury-body max-w-2xl mx-auto mb-8">
              Enjoy gourmet dining in the comfort of your room with our comprehensive 
              room service menu, available around the clock.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">24/7 Available</h3>
                <p className="text-sm text-muted-foreground">
                  Round-the-clock service for your convenience
                </p>
              </div>
              <div className="text-center">
                <Star className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Quality Service</h3>
                <p className="text-sm text-muted-foreground">
                  Premium meals delivered to your door
                </p>
              </div>
              <div className="text-center">
                <Phone className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Quick Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  Fast service within 30 minutes
                </p>
              </div>
            </div>
            <Button className="btn-luxury" onClick={handleViewMenu}>
              View Room Service Menu
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Conditionally render Menu Section */}
      {showMenuSection && (
        <div id="menu-section" className="relative">
          <div className="absolute top-4 right-4 z-10">
            <Button
              variant="outline"
              size="sm"
              onClick={closeMenuSection}
              className="bg-white/90 backdrop-blur-sm"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <MenuSection />
        </div>
      )}

      {/* Conditionally render Reservation Form */}
      {showReservationForm && (
        <div id="reservation-section" className="relative">
          <div className="absolute top-4 right-4 z-10">
            <Button
              variant="outline"
              size="sm"
              onClick={closeReservationForm}
              className="bg-white/90 backdrop-blur-sm"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <ReservationForm />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Dining;
