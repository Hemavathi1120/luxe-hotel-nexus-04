
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, MapPin, Clock, Phone, Mail, Star, Users, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { uploadToCloudinary } from '@/lib/cloudinary';
import OptimizedImage from '@/components/ui/optimized-image';
import { dataStore } from '@/lib/dataStore';

interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  location: string;
  phone: string;
  email: string;
  operatingHours: string;
  capacity: number;
  rating: number;
  status: 'active' | 'inactive';
  image?: string;
  features?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const restaurantSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  cuisine: z.string().min(1, 'Cuisine type is required'),
  location: z.string().min(1, 'Location is required'),
  phone: z.string().min(1, 'Phone is required'),
  email: z.string().email('Valid email is required'),
  operatingHours: z.string().min(1, 'Operating hours are required'),
  capacity: z.number().min(1, 'Capacity must be at least 1'),
  features: z.array(z.string()).optional(),
  image: z.string().optional(),
});

type RestaurantFormData = z.infer<typeof restaurantSchema>;

const RestaurantManagement = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(restaurantSchema),
    defaultValues: {
      name: '',
      description: '',
      cuisine: '',
      location: '',
      phone: '',
      email: '',
      operatingHours: '',
      capacity: 0,
      features: [],
      image: '',
    },
  });

  const cuisineTypes = [
    'French', 'Italian', 'Mediterranean', 'Asian', 'American', 'Continental', 'Fusion'
  ];

  const featureOptions = [
    'Fine Dining', 'Casual Dining', 'Rooftop', 'Garden View', 'City View', 'Ocean View',
    'Private Dining', 'Wine Cellar', 'Cocktail Bar', 'Live Music', 'Outdoor Seating'
  ];

  // Load restaurants from Firestore (we'll use a custom collection since Restaurant isn't in the existing dataStore)
  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        setLoading(true);
        // For now, we'll create a simple in-memory store since restaurants aren't in the current dataStore
        // In a real implementation, you'd add restaurant methods to dataStore
        const savedRestaurants = localStorage.getItem('restaurants');
        if (savedRestaurants) {
          const parsed = JSON.parse(savedRestaurants);
          setRestaurants(parsed.map((r: any) => ({
            ...r,
            createdAt: new Date(r.createdAt),
            updatedAt: new Date(r.updatedAt)
          })));
        } else {
          setRestaurants([]);
        }
      } catch (error) {
        console.error('Error loading restaurants:', error);
        toast({
          title: "Error",
          description: "Failed to load restaurants. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadRestaurants();
  }, [toast]);

  // Save to localStorage whenever restaurants change
  useEffect(() => {
    if (restaurants.length > 0 || !loading) {
      localStorage.setItem('restaurants', JSON.stringify(restaurants));
    }
  }, [restaurants, loading]);

  useEffect(() => {
    filterRestaurants();
  }, [restaurants, searchTerm, statusFilter]);

  const filterRestaurants = () => {
    let filtered = restaurants;

    if (searchTerm) {
      filtered = filtered.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(restaurant => restaurant.status === statusFilter);
    }

    setFilteredRestaurants(filtered);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "Please select a valid image file.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "Image size must be less than 5MB.",
        variant: "destructive",
      });
      return;
    }

    try {
      setUploadingImage(true);
      setUploadProgress(0);

      const result = await uploadToCloudinary(file, {
        folder: 'restaurants',
        tags: ['restaurant', 'dining'],
        onProgress: (progress) => setUploadProgress(progress),
      });

      form.setValue('image', result.url);
      setImagePreview(result.url);

      toast({
        title: "Success",
        description: "Image uploaded successfully.",
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploadingImage(false);
      setUploadProgress(0);
    }
  };

  const removeImage = () => {
    form.setValue('image', '');
    setImagePreview(null);
  };

  const onSubmit = async (data: RestaurantFormData) => {
    try {
      const restaurantData: Restaurant = {
        id: editingRestaurant ? editingRestaurant.id : Date.now().toString(),
        name: data.name,
        description: data.description,
        cuisine: data.cuisine,
        location: data.location,
        phone: data.phone,
        email: data.email,
        operatingHours: data.operatingHours,
        capacity: data.capacity,
        rating: editingRestaurant ? editingRestaurant.rating : 0,
        status: editingRestaurant ? editingRestaurant.status : 'active',
        image: data.image || '',
        features: data.features || [],
        createdAt: editingRestaurant ? editingRestaurant.createdAt : new Date(),
        updatedAt: new Date()
      };

      if (editingRestaurant) {
        setRestaurants(prev => prev.map(restaurant => 
          restaurant.id === editingRestaurant.id ? restaurantData : restaurant
        ));
        toast({
          title: "Success",
          description: "Restaurant updated successfully.",
        });
      } else {
        setRestaurants(prev => [...prev, restaurantData]);
        toast({
          title: "Success",
          description: "Restaurant added successfully.",
        });
      }

      form.reset();
      setEditingRestaurant(null);
      setImagePreview(null);
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error('Error saving restaurant:', error);
      toast({
        title: "Error",
        description: "Failed to save restaurant. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (restaurant: Restaurant) => {
    setEditingRestaurant(restaurant);
    form.reset({
      name: restaurant.name,
      description: restaurant.description,
      cuisine: restaurant.cuisine,
      location: restaurant.location,
      phone: restaurant.phone,
      email: restaurant.email,
      operatingHours: restaurant.operatingHours,
      capacity: restaurant.capacity,
      features: restaurant.features || [],
      image: restaurant.image || '',
    });
    setImagePreview(restaurant.image || null);
    setIsAddDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this restaurant?')) {
      setRestaurants(prev => prev.filter(restaurant => restaurant.id !== id));
      toast({
        title: "Success",
        description: "Restaurant deleted successfully.",
      });
    }
  };

  const toggleStatus = (id: string) => {
    setRestaurants(prev => prev.map(restaurant =>
      restaurant.id === id 
        ? { ...restaurant, status: restaurant.status === 'active' ? 'inactive' : 'active' as 'active' | 'inactive' }
        : restaurant
    ));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-red-100 text-red-800">Inactive</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading restaurants...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-serif font-bold">Restaurant Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Restaurant</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingRestaurant ? 'Edit Restaurant' : 'Add New Restaurant'}</DialogTitle>
              <DialogDescription>
                {editingRestaurant ? 'Update the restaurant details.' : 'Add a new restaurant to your hotel.'}
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Image Upload Section */}
                <FormItem>
                  <FormLabel>Restaurant Image</FormLabel>
                  <div className="space-y-4">
                    {imagePreview ? (
                      <div className="relative">
                        <OptimizedImage
                          src={imagePreview}
                          alt="Restaurant preview"
                          width={300}
                          height={200}
                          className="rounded-lg object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={removeImage}
                          className="absolute top-2 right-2"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8">
                        <div className="text-center">
                          <Upload className="mx-auto h-12 w-12 text-muted-foreground/50" />
                          <div className="mt-4">
                            <label htmlFor="restaurant-image-upload" className="cursor-pointer">
                              <span className="mt-2 block text-sm font-medium text-muted-foreground">
                                Click to upload an image or drag and drop
                              </span>
                              <span className="mt-1 block text-xs text-muted-foreground">
                                PNG, JPG, GIF up to 5MB
                              </span>
                            </label>
                            <input
                              id="restaurant-image-upload"
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                              disabled={uploadingImage}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {uploadingImage && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Uploading...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </FormItem>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Restaurant Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter restaurant name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cuisine"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cuisine Type</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select cuisine type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {cuisineTypes.map((cuisine) => (
                              <SelectItem key={cuisine} value={cuisine.toLowerCase()}>
                                {cuisine}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter restaurant description"
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter location" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capacity (Seats)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter capacity"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter email address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="operatingHours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Operating Hours</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 6:00 PM - 11:00 PM" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsAddDialogOpen(false);
                      setEditingRestaurant(null);
                      setImagePreview(null);
                      form.reset();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={uploadingImage}>
                    {editingRestaurant ? 'Update Restaurant' : 'Add Restaurant'}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Restaurants</p>
                <p className="text-2xl font-bold">{restaurants.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Capacity</p>
                <p className="text-2xl font-bold">
                  {restaurants.reduce((sum, restaurant) => sum + restaurant.capacity, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
                <p className="text-2xl font-bold">
                  {restaurants.length > 0 ? (restaurants.reduce((sum, restaurant) => sum + restaurant.rating, 0) / restaurants.length).toFixed(1) : '0.0'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-2xl font-bold">
                  {restaurants.filter(restaurant => restaurant.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search restaurants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Restaurants Table */}
      <Card>
        <CardHeader>
          <CardTitle>Restaurants ({filteredRestaurants.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {restaurants.length === 0 ? (
            <div className="text-center py-8">
              <MapPin className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No restaurants found. Add your first restaurant to get started.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Restaurant</TableHead>
                    <TableHead>Cuisine</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRestaurants.map((restaurant) => (
                    <TableRow key={restaurant.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          {restaurant.image && (
                            <OptimizedImage
                              src={restaurant.image}
                              alt={restaurant.name}
                              width={64}
                              height={64}
                              className="rounded-lg object-cover"
                            />
                          )}
                          <div>
                            <div className="font-medium">{restaurant.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {restaurant.description}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{restaurant.cuisine}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{restaurant.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{restaurant.capacity}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span>{restaurant.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleStatus(restaurant.id)}
                        >
                          {getStatusBadge(restaurant.status)}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(restaurant)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(restaurant.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          
          {filteredRestaurants.length === 0 && restaurants.length > 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No restaurants match your search criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RestaurantManagement;
