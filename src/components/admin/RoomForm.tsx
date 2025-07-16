
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { X, Plus, Upload, Loader2, ImageIcon } from 'lucide-react';
import { Room } from '@/types/hotel';
import { uploadToCloudinary, extractPublicIdFromUrl } from '@/lib/cloudinary';
import { useToast } from '@/hooks/use-toast';
import OptimizedImage from '@/components/ui/optimized-image';

interface RoomFormProps {
  room?: Room;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Room>) => void;
}

const RoomForm = ({ room, isOpen, onClose, onSubmit }: RoomFormProps) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      name: room?.name || '',
      type: room?.type || 'deluxe',
      description: room?.description || '',
      price: room?.price || 0,
      capacity: room?.capacity || 1,
      size: room?.size || 0,
      amenities: room?.amenities || [],
      images: room?.images || [],
      isAvailable: room?.isAvailable !== false,
      floorNumber: 1,
      viewType: 'city',
      bedType: 'king'
    }
  });

  const [amenitiesList, setAmenitiesList] = React.useState<string[]>(room?.amenities || []);
  const [newAmenity, setNewAmenity] = React.useState('');

  const addAmenity = () => {
    if (newAmenity.trim() && !amenitiesList.includes(newAmenity.trim())) {
      const updated = [...amenitiesList, newAmenity.trim()];
      setAmenitiesList(updated);
      form.setValue('amenities', updated);
      setNewAmenity('');
    }
  };

  const removeAmenity = (amenity: string) => {
    const updated = amenitiesList.filter(a => a !== amenity);
    setAmenitiesList(updated);
    form.setValue('amenities', updated);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      const currentImages = form.getValues('images') || [];
      const uploadPromises = Array.from(files).map(async (file) => {
        const result = await uploadToCloudinary(file, {
          onProgress: (progress) => setUploadProgress(progress),
          folder: 'hotel-rooms',
          tags: ['room', 'hotel']
        });
        return result.url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      form.setValue('images', [...currentImages, ...uploadedUrls]);
      
      toast({
        title: "Images uploaded successfully",
        description: `${uploadedUrls.length} image(s) have been uploaded.`,
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload images. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const removeImage = (index: number) => {
    const currentImages = form.getValues('images') || [];
    const newImages = currentImages.filter((_, i) => i !== index);
    form.setValue('images', newImages);
  };

  const handleSubmit = (data: any) => {
    const roomData = {
      ...data,
      amenities: amenitiesList,
      availability: {},
      isAvailable: true,
      createdAt: room?.createdAt || new Date(),
      updatedAt: new Date()
    };
    onSubmit(roomData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">
            {room ? 'Edit Room' : 'Add New Room'}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Basic Information</h3>
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Ocean View Suite" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Room Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select room type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="deluxe">Deluxe Room</SelectItem>
                          <SelectItem value="suite">Executive Suite</SelectItem>
                          <SelectItem value="presidential">Presidential Suite</SelectItem>
                          <SelectItem value="standard">Standard Room</SelectItem>
                          <SelectItem value="family">Family Room</SelectItem>
                          <SelectItem value="penthouse">Penthouse</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the room features and amenities..."
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Room Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Room Details</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price per Night ($)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="299"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
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
                        <FormLabel>Guest Capacity</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="2"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Size (sq m)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="45"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="viewType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>View Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select view type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ocean">Ocean View</SelectItem>
                            <SelectItem value="city">City View</SelectItem>
                            <SelectItem value="garden">Garden View</SelectItem>
                            <SelectItem value="mountain">Mountain View</SelectItem>
                            <SelectItem value="pool">Pool View</SelectItem>
                            <SelectItem value="interior">Interior View</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="bedType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bed Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select bed type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="single">Single Bed</SelectItem>
                            <SelectItem value="twin">Twin Beds</SelectItem>
                            <SelectItem value="double">Double Bed</SelectItem>
                            <SelectItem value="queen">Queen Bed</SelectItem>
                            <SelectItem value="king">King Bed</SelectItem>
                            <SelectItem value="sofa">Sofa Bed</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <FormLabel>Amenities</FormLabel>
              <div className="flex gap-2 mt-2">
                <Input
                  placeholder="Add amenity..."
                  value={newAmenity}
                  onChange={(e) => setNewAmenity(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAmenity())}
                />
                <Button type="button" onClick={addAmenity} size="icon">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {amenitiesList.map((amenity) => (
                  <Badge key={amenity} variant="secondary" className="flex items-center gap-1">
                    {amenity}
                    <X 
                      className="w-3 h-3 cursor-pointer" 
                      onClick={() => removeAmenity(amenity)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Images */}
            <div>
              <FormLabel>Room Images</FormLabel>
              <div className="mt-2">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload">
                  <Button type="button" variant="outline" disabled={uploading} asChild>
                    <span className="flex items-center gap-2 cursor-pointer">
                      {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                      {uploading ? 'Uploading...' : 'Upload Images'}
                    </span>
                  </Button>
                </label>
                <p className="text-xs text-muted-foreground mt-1">
                  Upload multiple high-quality images to showcase your room
                </p>
              </div>
              
              {uploading && (
                <div className="mt-3">
                  <Progress value={uploadProgress} className="w-full" />
                  <p className="text-sm text-muted-foreground mt-1">
                    Uploading... {uploadProgress}%
                  </p>
                </div>
              )}
              
              {/* Display uploaded images */}
              {form.watch('images') && form.watch('images').length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-3">
                    Uploaded Images ({form.watch('images').length})
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {form.watch('images').map((image: string, index: number) => (
                      <div key={index} className="relative group">
                        <OptimizedImage 
                          src={image} 
                          alt={`Room image ${index + 1}`}
                          width={200}
                          height={150}
                          className="w-full h-24 object-cover rounded border"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6"
                          onClick={() => removeImage(index)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={uploading}>
                {room ? 'Update Room' : 'Create Room'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RoomForm;
