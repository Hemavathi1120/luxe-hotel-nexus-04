
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  Clock, 
  Star, 
  Leaf, 
  Info,
  ChefHat,
  Wine
} from 'lucide-react';
import { MenuItem } from '@/types/hotel';
import { dataStore } from '@/lib/dataStore';
import { buildCloudinaryUrl, SAMPLE_IMAGES } from '@/lib/cloudinary';

const MenuSection = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const items = await dataStore.getMenuItems();
        setMenuItems(items);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenuItems();
  }, []);

  const categories = [
    { id: 'all', label: 'All Items', icon: ChefHat },
    { id: 'appetizer', label: 'Appetizers', icon: Star },
    { id: 'main', label: 'Main Course', icon: ChefHat },
    { id: 'dessert', label: 'Desserts', icon: Star },
    { id: 'beverage', label: 'Beverages', icon: Wine },
    { id: 'wine', label: 'Wine', icon: Wine }
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory && item.isAvailable;
  });

  // Helper function to get optimized image URL from Cloudinary
  const getOptimizedImageUrl = (imageUrl: string) => {
    // Check if it's already a Cloudinary URL or a local/external URL
    if (imageUrl.includes('cloudinary.com') && imageUrl.includes('/upload/')) {
      // Extract public ID from existing Cloudinary URL
      const parts = imageUrl.split('/upload/');
      if (parts.length > 1) {
        const publicIdPart = parts[1];
        const publicId = publicIdPart.includes('/') ? publicIdPart.substring(publicIdPart.indexOf('/') + 1) : publicIdPart;
        
        // Return optimized version
        return buildCloudinaryUrl(publicId, {
          width: 400,
          height: 300,
          crop: 'fill',
          quality: 'auto',
          format: 'auto'
        });
      }
    }
    
    // Return original URL if not a Cloudinary URL
    return imageUrl;
  };

  if (loading) {
    return (
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading menu...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="luxury-subheading mb-4">Our Culinary Menu</h2>
          <p className="luxury-body max-w-2xl mx-auto mb-8">
            Discover our carefully curated selection of dishes, crafted by world-renowned chefs 
            using the finest ingredients from around the globe.
          </p>
        </motion.div>

        {menuItems.length > 0 ? (
          <>
            {/* Search and Filter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search dishes, cuisine, or ingredients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Filter by:</span>
                </div>
              </div>
            </motion.div>

            {/* Category Tabs */}
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="text-xs lg:text-sm">
                    <category.icon className="w-4 h-4 mr-1" />
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Menu Items Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="luxury-card h-full overflow-hidden group hover:shadow-luxury transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={getOptimizedImageUrl(item.image || SAMPLE_IMAGES.amenities.restaurant)}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute top-3 right-3 flex flex-col gap-2">
                        {item.isVegetarian && (
                          <Badge className="bg-green-500/90 text-white">
                            <Leaf className="w-3 h-3 mr-1" />
                            Vegetarian
                          </Badge>
                        )}
                        {item.isVegan && (
                          <Badge className="bg-emerald-500/90 text-white">
                            <Leaf className="w-3 h-3 mr-1" />
                            Vegan
                          </Badge>
                        )}
                        {item.isGlutenFree && (
                          <Badge className="bg-blue-500/90 text-white">GF</Badge>
                        )}
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-serif font-semibold text-lg mb-1">{item.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {item.cuisine}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">${item.price}</p>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                        {item.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{item.preparationTime} mins</span>
                        </div>
                        {item.allergens.length > 0 && (
                          <div className="flex items-center space-x-1">
                            <Info className="w-4 h-4" />
                            <span className="text-xs">Contains: {item.allergens.join(', ')}</span>
                          </div>
                        )}
                      </div>

                      <Button className="w-full btn-luxury">
                        Add to Order
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {filteredItems.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <ChefHat className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No dishes found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria to find what you're looking for.
                </p>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <ChefHat className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Menu Available</h3>
            <p className="text-muted-foreground">
              Our menu is being prepared. Please check back soon for our delicious offerings.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default MenuSection;
