
export interface Room {
  id: string;
  name: string;
  type: 'deluxe' | 'suite' | 'presidential';
  description: string;
  price: number;
  capacity: number;
  size: number; // in square meters
  amenities: string[];
  images: string[];
  availability: Record<string, boolean>; // date -> available
  isAvailable?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  id: string;
  guestId: string;
  roomId: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  addOns: AddOn[];
  specialRequests?: string;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  createdAt: Date;
  updatedAt: Date;
}

export interface Guest {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  preferences: string[];
  bookingHistory: string[]; // booking IDs
  loyaltyStatus: 'bronze' | 'silver' | 'gold' | 'platinum';
  createdAt: Date;
  updatedAt: Date;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'breakfast' | 'spa' | 'transport' | 'dining' | 'other';
  isAvailable: boolean;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  code: string;
  discount: number; // percentage or fixed amount
  discountType: 'percentage' | 'fixed';
  validFrom: Date;
  validTo: Date;
  isActive: boolean;
  applicableRoomTypes?: string[];
  minStayDays?: number;
  createdAt: Date;
}

export interface HotelSettings {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  checkInTime: string;
  checkOutTime: string;
  cancellationPolicy: string;
  amenities: string[];
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

export interface BookingFormData {
  checkIn: Date;
  checkOut: Date;
  guests: number;
  roomType?: string;
  addOns: string[];
  specialRequests?: string;
}

export interface SearchFilters {
  checkIn?: Date;
  checkOut?: Date;
  guests?: number;
  roomType?: string;
  priceRange?: [number, number];
  amenities?: string[];
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  location: string;
  phone: string;
  email: string;
  openingHours: {
    [key: string]: { open: string; close: string; closed?: boolean };
  };
  capacity: number;
  priceRange: 'budget' | 'mid-range' | 'fine-dining';
  amenities: string[];
  image?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'appetizer' | 'main' | 'dessert' | 'beverage' | 'wine';
  cuisine: string;
  allergens: string[];
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isAvailable: boolean;
  image?: string;
  preparationTime: number; // in minutes
  spiciness?: 'mild' | 'medium' | 'hot' | 'very-hot';
  restaurantId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DiningReservation {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  restaurant: string;
  date: Date;
  time: string;
  partySize: number;
  specialRequests?: string;
  dietaryRestrictions?: string[];
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  tableNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}
