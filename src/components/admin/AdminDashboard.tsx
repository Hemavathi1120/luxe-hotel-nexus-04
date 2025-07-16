
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Bed, 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Clock,
  CheckCircle,
  AlertCircle,
  MoreHorizontal
} from 'lucide-react';
import { motion } from 'framer-motion';
import { dataStore } from '@/lib/dataStore';
import { Booking, Guest, Room } from '@/types/hotel';
import { format } from 'date-fns';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);

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

  const stats = [
    { 
      title: 'Total Rooms', 
      value: rooms.length.toString(), 
      icon: Bed, 
      change: '+2%', 
      trend: 'up',
      description: `${rooms.filter(r => r.isAvailable).length} available, ${rooms.filter(r => !r.isAvailable).length} occupied`
    },
    { 
      title: 'Active Bookings', 
      value: bookings.filter(b => b.status === 'confirmed' || b.status === 'pending').length.toString(), 
      icon: Calendar, 
      change: '+12%', 
      trend: 'up',
      description: `${bookings.filter(b => b.status === 'pending').length} pending confirmation`
    },
    { 
      title: 'Total Guests', 
      value: guests.length.toString(), 
      icon: Users, 
      change: '+8%', 
      trend: 'up',
      description: `${guests.filter(g => g.loyaltyStatus === 'gold' || g.loyaltyStatus === 'platinum').length} VIP guests`
    },
    { 
      title: 'Revenue', 
      value: `$${bookings.reduce((acc, b) => acc + b.totalPrice, 0).toLocaleString()}`, 
      icon: DollarSign, 
      change: '+23%', 
      trend: 'up',
      description: 'Total from all bookings'
    },
  ];

  // Get recent bookings (last 5)
  const recentBookings = bookings
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const roomStatus = [
    { type: 'Occupied', count: rooms.filter(r => !r.isAvailable).length, color: 'bg-blue-500' },
    { type: 'Available', count: rooms.filter(r => r.isAvailable).length, color: 'bg-green-500' },
    { type: 'Maintenance', count: 0, color: 'bg-yellow-500' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      case 'completed':
        return <Badge className="bg-blue-100 text-blue-800">Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-serif font-bold">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Clock className="w-4 h-4 mr-2" />
            Last updated: 2 min ago
          </Button>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                  <div className="flex items-center">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-600 mr-1" />
                    )}
                    <span className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Bookings</CardTitle>
            <Button variant="outline" size="sm" onClick={() => navigate('/admin/bookings')}>
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.length > 0 ? (
                recentBookings.map((booking) => {
                  const guest = getGuestInfo(booking.guestId);
                  const room = getRoomInfo(booking.roomId);
                  return (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{guest?.firstName} {guest?.lastName}</p>
                          <p className="text-sm text-muted-foreground">{room?.name || 'Unknown Room'}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{format(booking.checkIn, 'MMM dd, yyyy')}</p>
                        {getStatusBadge(booking.status)}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No bookings yet</p>
                  <p className="text-sm text-muted-foreground">Bookings will appear here once guests make reservations</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Room Status */}
        <Card>
          <CardHeader>
            <CardTitle>Room Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roomStatus.map((status) => (
                <div key={status.type} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${status.color}`} />
                    <span className="font-medium">{status.type}</span>
                  </div>
                  <span className="text-2xl font-bold">{status.count}</span>
                </div>
              ))}
              <div className="pt-4 border-t">
                <div className="grid grid-cols-2 gap-4">
                  <Button size="sm" className="w-full" onClick={() => navigate('/admin/bookings')}>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Check-in
                  </Button>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/admin/rooms')}>
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Maintenance
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-br from-background to-muted/30 border-2 border-primary/10">
        <CardHeader className="pb-8">
          <CardTitle className="text-2xl font-serif">Quick Actions</CardTitle>
          <p className="text-muted-foreground">Streamline your daily operations</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group"
            >
              <Button 
                variant="luxury" 
                className="w-full h-32 flex flex-col items-center justify-center space-y-4 relative overflow-hidden"
                onClick={() => navigate('/admin/bookings')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex flex-col items-center space-y-3">
                  <div className="p-3 rounded-full bg-primary-foreground/20 group-hover:bg-primary-foreground/30 transition-colors">
                    <Calendar className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <span className="text-lg font-semibold">New Booking</span>
                    <p className="text-xs opacity-75 mt-1">Create reservation</p>
                  </div>
                </div>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group"
            >
              <Button 
                variant="luxury-outline" 
                className="w-full h-32 flex flex-col items-center justify-center space-y-4 relative overflow-hidden"
                onClick={() => navigate('/admin/rooms')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex flex-col items-center space-y-3">
                  <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Bed className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-center">
                    <span className="text-lg font-semibold">Room Status</span>
                    <p className="text-xs opacity-75 mt-1">View availability</p>
                  </div>
                </div>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group"
            >
              <Button 
                variant="luxury-outline" 
                className="w-full h-32 flex flex-col items-center justify-center space-y-4 relative overflow-hidden"
                onClick={() => navigate('/admin/guests')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex flex-col items-center space-y-3">
                  <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-center">
                    <span className="text-lg font-semibold">Guest List</span>
                    <p className="text-xs opacity-75 mt-1">Manage guests</p>
                  </div>
                </div>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group"
            >
              <Button 
                variant="luxury-outline" 
                className="w-full h-32 flex flex-col items-center justify-center space-y-4 relative overflow-hidden"
                onClick={() => navigate('/admin/reports')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex flex-col items-center space-y-3">
                  <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <DollarSign className="w-8 h-8 text-primary" />
                  </div>
                  <div className="text-center">
                    <span className="text-lg font-semibold">Reports</span>
                    <p className="text-xs opacity-75 mt-1">View analytics</p>
                  </div>
                </div>
              </Button>
            </motion.div>
          </div>

          <div className="mt-8 pt-6 border-t border-primary/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">System Status: Online</span>
              </div>
              <Button variant="luxury-ghost" size="sm">
                <MoreHorizontal className="w-4 h-4 mr-2" />
                More Options
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
