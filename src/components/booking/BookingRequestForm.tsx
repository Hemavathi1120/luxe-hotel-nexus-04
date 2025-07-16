
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, CreditCard, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { dataStore } from '@/lib/dataStore';
import { Room } from '@/types/hotel';

const BookingRequestForm = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    roomId: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRooms = async () => {
      const rooms = await dataStore.getRooms();
      setRooms(rooms.filter(room => room.isAvailable));
    };
    fetchRooms();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'guests' ? parseInt(value) || 1 : value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const calculateTotalPrice = () => {
    if (!formData.roomId || !formData.checkIn || !formData.checkOut) return 0;
    
    const room = rooms.find(r => r.id === formData.roomId);
    if (!room) return 0;

    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    
    return nights * room.price;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // First, add/get guest
      const guest = await dataStore.addGuest({
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        preferences: [],
        bookingHistory: [],
        loyaltyStatus: 'bronze',
        createdAt: new Date(),
        updatedAt: new Date()
      });

      // Create booking
      const booking = await dataStore.addBooking({
        guestId: guest.id,
        roomId: formData.roomId,
        checkIn: new Date(formData.checkIn),
        checkOut: new Date(formData.checkOut),
        guests: formData.guests,
        totalPrice: calculateTotalPrice(),
        status: 'pending',
        addOns: [],
        specialRequests: formData.specialRequests,
        paymentStatus: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      });

      console.log('Booking request submitted:', booking);

      toast({
        title: "Booking Request Submitted!",
        description: `Your booking request has been submitted. Booking ID: ${booking.id}`,
      });

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        roomId: '',
        checkIn: '',
        checkOut: '',
        guests: 1,
        specialRequests: ''
      });
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast({
        title: "Error",
        description: "Failed to submit booking request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedRoom = rooms.find(r => r.id === formData.roomId);
  const totalPrice = calculateTotalPrice();

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Guest Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Guest Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name *</label>
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name *</label>
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <Input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </CardContent>
          </Card>

          {/* Booking Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Booking Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Room *</label>
                <Select value={formData.roomId} onValueChange={(value) => handleSelectChange('roomId', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a room" />
                  </SelectTrigger>
                  <SelectContent>
                    {rooms.map((room) => (
                      <SelectItem key={room.id} value={room.id}>
                        {room.name} - ${room.price}/night
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Check-in *</label>
                  <Input
                    name="checkIn"
                    type="date"
                    value={formData.checkIn}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Check-out *</label>
                  <Input
                    name="checkOut"
                    type="date"
                    value={formData.checkOut}
                    onChange={handleChange}
                    required
                    min={formData.checkIn || new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Number of Guests *</label>
                <Select value={formData.guests.toString()} onValueChange={(value) => handleSelectChange('guests', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} Guest{num > 1 ? 's' : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Special Requests */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Special Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              placeholder="Any special requests or preferences..."
              rows={4}
            />
          </CardContent>
        </Card>

        {/* Booking Summary */}
        {selectedRoom && totalPrice > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Booking Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Room:</span>
                  <span className="font-medium">{selectedRoom.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Dates:</span>
                  <span>{formData.checkIn} to {formData.checkOut}</span>
                </div>
                <div className="flex justify-between">
                  <span>Guests:</span>
                  <span>{formData.guests}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rate per night:</span>
                  <span>${selectedRoom.price}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>${totalPrice}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Submit Button */}
        <div className="mt-8 text-center">
          <Button
            type="submit"
            size="lg"
            className="btn-luxury px-8"
            disabled={isSubmitting || !formData.roomId || !formData.checkIn || !formData.checkOut}
          >
            {isSubmitting ? (
              'Submitting...'
            ) : (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                Submit Booking Request
              </>
            )}
          </Button>
          <p className="text-sm text-muted-foreground mt-3">
            Your booking request will be reviewed and confirmed within 24 hours.
          </p>
        </div>
      </form>
    </div>
  );
};

export default BookingRequestForm;
