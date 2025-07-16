
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Filter, ChefHat, DollarSign, Upload, X } from 'lucide-react';
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
import { MenuItem, Restaurant } from '@/types/hotel';

const menuItemSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().min(0, 'Price must be positive'),
  category: z.string().min(1, 'Category is required'),
  restaurantId: z.string().min(1, 'Restaurant is required'),
  allergens: z.array(z.string()).optional(),
  image: z.string().optional(),
});

type MenuItemFormData = z.infer<typeof menuItemSchema>;

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [restaurantFilter, setRestaurantFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const form = useForm<MenuItemFormData>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      category: 'appetizer',
      restaurantId: '',
      allergens: [],
      image: '',
    },
  });

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'appetizer', label: 'Appetizers' },
    { value: 'main', label: 'Main Course' },
    { value: 'dessert', label: 'Desserts' },
    { value: 'beverage', label: 'Beverages' },
    { value: 'wine', label: 'Wine' },
  ];

  const allergenOptions = [
    'Dairy', 'Gluten', 'Nuts', 'Shellfish', 'Fish', 'Eggs', 'Soy'
  ];

  // Load data from dataStore
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [menuData, allData] = await Promise.all([
          dataStore.getMenuItems(),
          dataStore.getAllData()
        ]);
        setMenuItems(menuData);
        // Load restaurants from localStorage or create empty array
        const storedRestaurants = localStorage.getItem('restaurants');
        if (storedRestaurants) {
          setRestaurants(JSON.parse(storedRestaurants));
        } else {
          setRestaurants([]);
        }
      } catch (error) {
        console.error('Error loading data:', error);
        toast({
          title: "Error",
          description: "Failed to load menu items. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [toast]);

  useEffect(() => {
    filterItems();
  }, [menuItems, searchTerm, categoryFilter, restaurantFilter]);

  const filterItems = () => {
    let filtered = menuItems;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    if (restaurantFilter !== 'all') {
      filtered = filtered.filter(item => item.restaurantId === restaurantFilter);
    }

    setFilteredItems(filtered);
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
        folder: 'menu-items',
        tags: ['menu', 'restaurant'],
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

  const onSubmit = async (data: MenuItemFormData) => {
    try {
      const menuItemData: Omit<MenuItem, 'id'> = {
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category as MenuItem['category'],
        cuisine: '',
        allergens: data.allergens || [],
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        isAvailable: true,
        image: data.image || '',
        preparationTime: 30,
        restaurantId: data.restaurantId,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      if (editingItem) {
        const updatedItem = await dataStore.updateMenuItem(editingItem.id, menuItemData);
        if (updatedItem) {
          setMenuItems(prev => prev.map(item => item.id === editingItem.id ? { ...updatedItem, id: editingItem.id } : item));
          toast({
            title: "Success",
            description: "Menu item updated successfully.",
          });
        }
      } else {
        const newItem = await dataStore.addMenuItem(menuItemData);
        setMenuItems(prev => [...prev, newItem]);
        toast({
          title: "Success",
          description: "Menu item added successfully.",
        });
      }

      form.reset();
      setEditingItem(null);
      setImagePreview(null);
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error('Error saving menu item:', error);
      toast({
        title: "Error",
        description: "Failed to save menu item. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    form.reset({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      restaurantId: item.restaurantId,
      allergens: item.allergens || [],
      image: item.image || '',
    });
    setImagePreview(item.image || null);
    setIsAddDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this menu item?')) {
      try {
        const success = await dataStore.deleteMenuItem(id);
        if (success) {
          setMenuItems(prev => prev.filter(item => item.id !== id));
          toast({
            title: "Success",
            description: "Menu item deleted successfully.",
          });
        }
      } catch (error) {
        console.error('Error deleting menu item:', error);
        toast({
          title: "Error",
          description: "Failed to delete menu item. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const toggleAvailability = async (id: string) => {
    try {
      const item = menuItems.find(item => item.id === id);
      if (!item) return;

      const updatedItem = await dataStore.updateMenuItem(id, { isAvailable: !item.isAvailable });
      if (updatedItem) {
        setMenuItems(prev => prev.map(item =>
          item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
        ));
      }
    } catch (error) {
      console.error('Error updating availability:', error);
      toast({
        title: "Error",
        description: "Failed to update availability. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'appetizer':
        return <Badge className="bg-green-100 text-green-800">Appetizer</Badge>;
      case 'main':
        return <Badge className="bg-blue-100 text-blue-800">Main Course</Badge>;
      case 'dessert':
        return <Badge className="bg-purple-100 text-purple-800">Dessert</Badge>;
      case 'beverage':
        return <Badge className="bg-orange-100 text-orange-800">Beverage</Badge>;
      case 'wine':
        return <Badge className="bg-red-100 text-red-800">Wine</Badge>;
      default:
        return <Badge variant="secondary">{category}</Badge>;
    }
  };

  const getRestaurantName = (restaurantId: string) => {
    const restaurant = restaurants.find(r => r.id === restaurantId);
    return restaurant ? restaurant.name : 'Unknown Restaurant';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading menu items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-serif font-bold">Menu Management</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Menu Item</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}</DialogTitle>
              <DialogDescription>
                {editingItem ? 'Update the menu item details.' : 'Add a new item to the restaurant menu.'}
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Image Upload Section */}
                <FormItem>
                  <FormLabel>Item Image</FormLabel>
                  <div className="space-y-4">
                    {imagePreview ? (
                      <div className="relative">
                        <OptimizedImage
                          src={imagePreview}
                          alt="Menu item preview"
                          width={200}
                          height={150}
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
                            <label htmlFor="image-upload" className="cursor-pointer">
                              <span className="mt-2 block text-sm font-medium text-muted-foreground">
                                Click to upload an image or drag and drop
                              </span>
                              <span className="mt-1 block text-xs text-muted-foreground">
                                PNG, JPG, GIF up to 5MB
                              </span>
                            </label>
                            <input
                              id="image-upload"
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
                        <FormLabel>Item Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter item name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price ($)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          />
                        </FormControl>
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
                          placeholder="Enter item description"
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
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="appetizer">Appetizers</SelectItem>
                            <SelectItem value="main">Main Course</SelectItem>
                            <SelectItem value="dessert">Desserts</SelectItem>
                            <SelectItem value="beverage">Beverages</SelectItem>
                            <SelectItem value="wine">Wine</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="restaurantId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Restaurant</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select restaurant" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {restaurants.map((restaurant) => (
                              <SelectItem key={restaurant.id} value={restaurant.id}>
                                {restaurant.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsAddDialogOpen(false);
                      setEditingItem(null);
                      setImagePreview(null);
                      form.reset();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={uploadingImage}>
                    {editingItem ? 'Update Item' : 'Add Item'}
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
              <ChefHat className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Items</p>
                <p className="text-2xl font-bold">{menuItems.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Price</p>
                <p className="text-2xl font-bold">
                  ${menuItems.length > 0 ? (menuItems.reduce((sum, item) => sum + item.price, 0) / menuItems.length).toFixed(2) : '0.00'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Badge className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Available</p>
                <p className="text-2xl font-bold">
                  {menuItems.filter(item => item.isAvailable).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Badge className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Unavailable</p>
                <p className="text-2xl font-bold">
                  {menuItems.filter(item => !item.isAvailable).length}
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
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={restaurantFilter} onValueChange={setRestaurantFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by restaurant" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Restaurants</SelectItem>
                {restaurants.map((restaurant) => (
                  <SelectItem key={restaurant.id} value={restaurant.id}>
                    {restaurant.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Menu Items Table */}
      <Card>
        <CardHeader>
          <CardTitle>Menu Items ({filteredItems.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {menuItems.length === 0 ? (
            <div className="text-center py-8">
              <ChefHat className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No menu items found. Add your first menu item to get started.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Restaurant</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          {item.image && (
                            <OptimizedImage
                              src={item.image}
                              alt={item.name}
                              width={64}
                              height={64}
                              className="rounded-lg object-cover"
                            />
                          )}
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {item.description}
                            </div>
                            {item.allergens && item.allergens.length > 0 && (
                              <div className="flex flex-wrap gap-1 mt-1">
                                {item.allergens.map((allergen, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {allergen}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getCategoryBadge(item.category)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {getRestaurantName(item.restaurantId)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">${item.price.toFixed(2)}</span>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleAvailability(item.id)}
                          className={item.isAvailable ? 'text-green-600' : 'text-red-600'}
                        >
                          {item.isAvailable ? 'Available' : 'Unavailable'}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(item)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(item.id)}
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
          
          {filteredItems.length === 0 && menuItems.length > 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No menu items match your search criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MenuManagement;
