import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar as CalendarIcon,
  CheckCircle,
  Clock,
  XCircle,
  MoreHorizontal,
  Download,
  RefreshCw,
  MessageSquare,
  Phone,
  Mail
} from 'lucide-react';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { Booking, Guest, Room } from '@/types/hotel';
import { motion } from 'framer-motion';
import { dataStore } from '@/lib/dataStore';
import { useToast } from '@/hooks/use-toast';

const BookingManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [contactType, setContactType] = useState<'email' | 'whatsapp' | 'phone'>('email');
  const [contactMessage, setContactMessage] = useState('');
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      guestName: '',
      email: '',
      phone: '',
      roomType: '',
      checkIn: new Date(),
      checkOut: new Date(),
      guests: 1,
      totalPrice: 0,
      status: 'pending' as 'pending' | 'confirmed' | 'cancelled' | 'completed'
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      const [bookingsData, guestsData, roomsData] = await Promise.all([
        dataStore.getBookings(),
        dataStore.getGuests(),
        dataStore.getRooms()
      ]);
      setBookings(bookingsData);
      setGuests(guestsData);
      setRooms(roomsData);
    };
    fetchData();
  }, []);

  const getGuestInfo = (guestId: string) => {
    return guests.find(g => g.id === guestId);
  };

  const getRoomInfo = (roomId: string) => {
    return rooms.find(r => r.id === roomId);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      confirmed: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      cancelled: { color: 'bg-red-100 text-red-800', icon: XCircle },
      completed: { color: 'bg-blue-100 text-blue-800', icon: CheckCircle }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config?.icon || Clock;
    
    return (
      <Badge className={config?.color || 'bg-gray-100 text-gray-800'}>
        <Icon className="w-3 h-3 mr-1" />
        {status}
      </Badge>
    );
  };

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      await dataStore.updateBooking(bookingId, { status: newStatus as any });
      const updatedBookings = await dataStore.getBookings();
      setBookings(updatedBookings);
      toast({
        title: "Status Updated",
        description: `Booking status has been updated to ${newStatus}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update booking status.",
        variant: "destructive",
      });
    }
  };

  const openContactDialog = (booking: Booking) => {
    setSelectedBooking(booking);
    const guest = getGuestInfo(booking.guestId);
    const room = getRoomInfo(booking.roomId);
    
    // Generate professional message template
    const template = `Dear ${guest?.firstName} ${guest?.lastName},

Thank you for choosing our hotel for your upcoming stay. We wanted to reach out regarding your booking:

Booking Details:
- Booking ID: ${booking.id}
- Room: ${room?.name || 'N/A'}
- Check-in: ${format(booking.checkIn, 'MMM dd, yyyy')}
- Check-out: ${format(booking.checkOut, 'MMM dd, yyyy')}
- Guests: ${booking.guests}
- Total Amount: $${booking.totalPrice}
- Status: ${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}

${booking.status === 'confirmed' 
  ? 'Your booking has been confirmed! We look forward to welcoming you to our hotel.' 
  : booking.status === 'pending'
  ? 'We are currently processing your booking and will confirm it shortly.'
  : 'Please let us know if you have any questions about your reservation.'}

${booking.specialRequests ? `\nSpecial Requests: ${booking.specialRequests}` : ''}

If you have any questions or need to make changes to your reservation, please don't hesitate to contact us.

Best regards,
Hotel Management Team`;

    setContactMessage(template);
    setIsContactDialogOpen(true);
  };

  const handleContactGuest = () => {
    const guest = getGuestInfo(selectedBooking?.guestId || '');
    if (!guest) return;

    switch (contactType) {
      case 'email':
        const subject = `Regarding your booking ${selectedBooking?.id}`;
        const mailtoLink = `mailto:${guest.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(contactMessage)}`;
        window.open(mailtoLink);
        break;
      case 'phone':
        if (guest.phone) {
          window.open(`tel:${guest.phone}`);
        } else {
          toast({
            title: "No Phone Number",
            description: "This guest hasn't provided a phone number.",
            variant: "destructive",
          });
        }
        break;
      case 'whatsapp':
        if (guest.phone) {
          const whatsappUrl = `https://wa.me/${guest.phone.replace(/\D/g, '')}?text=${encodeURIComponent(contactMessage)}`;
          window.open(whatsappUrl, '_blank');
        } else {
          toast({
            title: "No Phone Number",
            description: "This guest hasn't provided a phone number for WhatsApp.",
            variant: "destructive",
          });
        }
        break;
    }
    
    setIsContactDialogOpen(false);
    toast({
      title: "Contact Initiated",
      description: `${contactType.charAt(0).toUpperCase() + contactType.slice(1)} communication has been initiated.`,
    });
  };

  // Filter for user bookings only (exclude admin-created bookings)
  const userBookings = bookings.filter(booking => {
    const guest = getGuestInfo(booking.guestId);
    // Only show bookings that have valid guest information (user bookings)
    return guest && guest.email && guest.firstName && guest.lastName;
  });

  const filteredBookings = userBookings.filter(booking => {
    const guest = getGuestInfo(booking.guestId);
    const room = getRoomInfo(booking.roomId);
    const matchesSearch = 
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest?.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest?.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room?.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: 'User Bookings', value: userBookings.length.toString(), change: '+12%', color: 'text-blue-600' },
    { label: 'Confirmed', value: userBookings.filter(b => b.status === 'confirmed').length.toString(), change: '+8%', color: 'text-green-600' },
    { label: 'Pending', value: userBookings.filter(b => b.status === 'pending').length.toString(), change: '+15%', color: 'text-yellow-600' },
    { label: 'Revenue', value: `$${userBookings.reduce((acc, b) => acc + b.totalPrice, 0).toLocaleString()}`, change: '+18%', color: 'text-purple-600' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-serif font-bold">Booking Management</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Booking
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Booking</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="guestName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Guest Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter guest name" {...field} />
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
                            <Input type="email" placeholder="Enter email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="checkIn"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Check-in Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button variant="outline" className="w-full justify-start">
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {field.value ? format(field.value, 'PPP') : 'Select date'}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                className="pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="checkOut"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Check-out Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button variant="outline" className="w-full justify-start">
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {field.value ? format(field.value, 'PPP') : 'Select date'}
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                className="pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Create Booking</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`text-sm font-medium ${stat.color}`}>
                    {stat.change}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search bookings by guest name, ID, or room..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card>
        <CardHeader>
          <CardTitle>User Bookings ({filteredBookings.length} of {userBookings.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Booking ID</TableHead>
                <TableHead>Guest</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Check-out</TableHead>
                <TableHead>Guests</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => {
                const guest = getGuestInfo(booking.guestId);
                const room = getRoomInfo(booking.roomId);
                return (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{guest?.firstName} {guest?.lastName}</p>
                        <p className="text-sm text-muted-foreground">{guest?.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{room?.name || 'Unknown Room'}</TableCell>
                    <TableCell>{format(booking.checkIn, 'MMM dd, yyyy')}</TableCell>
                    <TableCell>{format(booking.checkOut, 'MMM dd, yyyy')}</TableCell>
                    <TableCell>{booking.guests}</TableCell>
                    <TableCell>${booking.totalPrice}</TableCell>
                    <TableCell>
                      <Select value={booking.status} onValueChange={(value) => handleStatusChange(booking.id, value)}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Badge variant={booking.paymentStatus === 'paid' ? 'default' : 'secondary'}>
                        {booking.paymentStatus}
                      </Badge>
                    </TableCell>
                     <TableCell>
                       <div className="flex items-center space-x-2">
                         <Button variant="ghost" size="sm">
                           <Eye className="w-4 h-4" />
                         </Button>
                         <Button variant="ghost" size="sm">
                           <Edit className="w-4 h-4" />
                         </Button>
                         <Button 
                           variant="ghost" 
                           size="sm"
                           onClick={() => {
                             setSelectedBooking(booking);
                             setContactType('email');
                             const guest = getGuestInfo(booking.guestId);
                             const room = getRoomInfo(booking.roomId);
                             const template = `Dear ${guest?.firstName} ${guest?.lastName},

Thank you for choosing our hotel. We wanted to reach out regarding your booking:

Booking Details:
- Booking ID: ${booking.id}
- Room: ${room?.name || 'N/A'}
- Check-in: ${format(booking.checkIn, 'MMM dd, yyyy')}
- Check-out: ${format(booking.checkOut, 'MMM dd, yyyy')}
- Guests: ${booking.guests}
- Total Amount: $${booking.totalPrice}
- Status: ${booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}

${booking.status === 'confirmed' 
  ? 'Your booking has been confirmed! We look forward to welcoming you.' 
  : booking.status === 'pending'
  ? 'We are processing your booking and will confirm it shortly.'
  : 'Please let us know if you have any questions about your reservation.'}

${booking.specialRequests ? `\nSpecial Requests: ${booking.specialRequests}` : ''}

If you have any questions, please don't hesitate to contact us.

Best regards,
Hotel Management Team`;
                             setContactMessage(template);
                             if (guest?.email) {
                               const subject = `Regarding your booking ${booking.id}`;
                               const mailtoLink = `mailto:${guest.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(template)}`;
                               window.open(mailtoLink);
                             }
                           }}
                           title="Send Email"
                         >
                           <Mail className="w-4 h-4" />
                         </Button>
                         <Button 
                           variant="ghost" 
                           size="sm"
                           onClick={() => {
                             const guest = getGuestInfo(booking.guestId);
                             const room = getRoomInfo(booking.roomId);
                             if (guest?.phone) {
                               const message = `Hello ${guest.firstName}! This is regarding your hotel booking ${booking.id} for ${room?.name || 'room'} from ${format(booking.checkIn, 'MMM dd')} to ${format(booking.checkOut, 'MMM dd')}. Status: ${booking.status}. Please let us know if you have any questions!`;
                               const whatsappUrl = `https://wa.me/${guest.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
                               window.open(whatsappUrl, '_blank');
                             } else {
                               toast({
                                 title: "No Phone Number",
                                 description: "This guest hasn't provided a phone number for WhatsApp.",
                                 variant: "destructive",
                               });
                             }
                           }}
                           title="Send WhatsApp"
                         >
                           <MessageSquare className="w-4 h-4" />
                         </Button>
                         <Button 
                           variant="ghost" 
                           size="sm"
                           onClick={() => {
                             const guest = getGuestInfo(booking.guestId);
                             if (guest?.phone) {
                               window.open(`tel:${guest.phone}`);
                             } else {
                               toast({
                                 title: "No Phone Number",
                                 description: "This guest hasn't provided a phone number.",
                                 variant: "destructive",
                               });
                             }
                           }}
                           title="Call Guest"
                         >
                           <Phone className="w-4 h-4" />
                         </Button>
                         <Button variant="ghost" size="sm">
                           <MoreHorizontal className="w-4 h-4" />
                         </Button>
                       </div>
                     </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Contact Guest Dialog */}
      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Contact Guest</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedBooking && (
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Booking Details</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span>Booking ID: {selectedBooking.id}</span>
                  <span>Guest: {getGuestInfo(selectedBooking.guestId)?.firstName} {getGuestInfo(selectedBooking.guestId)?.lastName}</span>
                  <span>Email: {getGuestInfo(selectedBooking.guestId)?.email}</span>
                  <span>Phone: {getGuestInfo(selectedBooking.guestId)?.phone || 'Not provided'}</span>
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium mb-2">Contact Method</label>
              <Select value={contactType} onValueChange={(value) => setContactType(value as any)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </div>
                  </SelectItem>
                  <SelectItem value="whatsapp">
                    <div className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      WhatsApp
                    </div>
                  </SelectItem>
                  <SelectItem value="phone">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      Phone Call
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(contactType === 'email' || contactType === 'whatsapp') && (
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <Textarea
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  rows={10}
                  placeholder="Professional message to guest..."
                />
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsContactDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleContactGuest}>
                {contactType === 'phone' ? 'Call Guest' : `Send ${contactType === 'email' ? 'Email' : 'WhatsApp'}`}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingManagement;
