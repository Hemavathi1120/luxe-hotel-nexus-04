
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Maximize, 
  Wifi, 
  Coffee, 
  Tv, 
  Car, 
  Star,
  Calendar,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Room } from '@/types/hotel';
import OptimizedImage from '@/components/ui/optimized-image';

interface RoomCardProps {
  room: Room;
  onBook?: (roomId: string) => void;
  onViewDetails?: (roomId: string) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onBook, onViewDetails }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const amenityIcons = {
    'Free WiFi': Wifi,
    'Coffee Machine': Coffee,
    'Smart TV': Tv,
    'Valet Parking': Car,
    'Minibar': Coffee,
    'Room Service': Coffee,
  };

  const getAmenityIcon = (amenity: string) => {
    const IconComponent = amenityIcons[amenity as keyof typeof amenityIcons] || Star;
    return <IconComponent className="w-4 h-4" />;
  };

  const getRoomTypeColor = (type: string) => {
    switch (type) {
      case 'deluxe':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'suite':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'presidential':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="luxury-card group overflow-hidden"
    >
      {/* Room Image */}
      <div className="relative overflow-hidden h-64">
        <OptimizedImage
          src={room.images[imageIndex]}
          alt={room.name}
          width={400}
          height={300}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Image Navigation Dots */}
        {room.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {room.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === imageIndex 
                    ? 'bg-white' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        )}

        {/* Availability Badge */}
        <div className="absolute top-4 right-4">
          <Badge 
            variant={room.isAvailable ? "default" : "secondary"}
            className={room.isAvailable ? "bg-green-500" : "bg-red-500"}
          >
            {room.isAvailable ? 'Available' : 'Booked'}
          </Badge>
        </div>

        {/* Room Type Badge */}
        <div className="absolute top-4 left-4">
          <Badge className={getRoomTypeColor(room.type)}>
            {room.type.charAt(0).toUpperCase() + room.type.slice(1)}
          </Badge>
        </div>
      </div>

      {/* Room Content */}
      <div className="p-6">
        {/* Room Header */}
        <div className="mb-4">
          <h3 className="text-2xl font-serif font-semibold mb-2 group-hover:text-primary transition-colors">
            {room.name}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {room.description}
          </p>
        </div>

        {/* Room Details */}
        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Users className="w-4 h-4 text-primary" />
            <span>Up to {room.capacity} guests</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Maximize className="w-4 h-4 text-primary" />
            <span>{room.size} sqm</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-6">
          <h4 className="font-medium mb-3 text-sm uppercase tracking-wide">Amenities</h4>
          <div className="flex flex-wrap gap-2">
            {room.amenities.slice(0, 4).map((amenity) => (
              <div 
                key={amenity}
                className="flex items-center space-x-1 text-xs bg-muted px-2 py-1 rounded-full"
              >
                {getAmenityIcon(amenity)}
                <span>{amenity}</span>
              </div>
            ))}
            {room.amenities.length > 4 && (
              <div className="text-xs text-muted-foreground px-2 py-1">
                +{room.amenities.length - 4} more
              </div>
            )}
          </div>
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold text-primary">
              ${room.price}
            </div>
            <div className="text-sm text-muted-foreground">per night</div>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="luxury-ghost"
              size="sm"
              onClick={() => onViewDetails?.(room.id)}
              className="flex items-center space-x-1"
              aria-label={`View details for ${room.name}`}
            >
              <span>Details</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              variant="luxury"
              size="sm"
              onClick={() => onBook?.(room.id)}
              disabled={!room.isAvailable}
              aria-label={`Book ${room.name} for $${room.price} per night`}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Now
            </Button>
          </div>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
};

export default RoomCard;
