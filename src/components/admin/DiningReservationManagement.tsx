import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, Clock, Users, Phone, Mail, CheckCircle, X, Eye, Filter } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { DiningReservation } from '@/types/hotel';
import { dataStore } from '@/lib/dataStore';

const DiningReservationManagement = () => {
  const [reservations, setReservations] = useState<DiningReservation[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<DiningReservation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedReservation, setSelectedReservation] = useState<DiningReservation | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'completed', label: 'Completed' }
  ];

  useEffect(() => {
    fetchReservations();
  }, []);

  useEffect(() => {
    filterReservations();
  }, [reservations, searchTerm, statusFilter]);

  const fetchReservations = async () => {
    try {
      const data = await dataStore.getDiningReservations();
      // Sort by creation date, newest first
      const sortedData = data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setReservations(sortedData);
    } catch (error) {
      console.error('Error fetching dining reservations:', error);
      toast({
        title: "Error",
        description: "Failed to fetch dining reservations.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterReservations = () => {
    let filtered = reservations;

    if (searchTerm) {
      filtered = filtered.filter(reservation =>
        reservation.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.guestEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reservation.restaurant.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(reservation => reservation.status === statusFilter);
    }

    setFilteredReservations(filtered);
  };

  const getStatusBadge = (status: DiningReservation['status']) => {
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

  const updateReservationStatus = async (id: string, status: DiningReservation['status']) => {
    try {
      await dataStore.updateDiningReservation(id, { status });
      toast({
        title: "Success",
        description: `Reservation ${status} successfully.`,
      });
      fetchReservations();
    } catch (error) {
      console.error('Error updating reservation status:', error);
      toast({
        title: "Error",
        description: "Failed to update reservation status.",
        variant: "destructive",
      });
    }
  };

  const deleteReservation = async (id: string) => {
    if (!confirm('Are you sure you want to delete this reservation?')) return;

    try {
      await dataStore.deleteDiningReservation(id);
      toast({
        title: "Success",
        description: "Reservation deleted successfully.",
      });
      fetchReservations();
    } catch (error) {
      console.error('Error deleting reservation:', error);
      toast({
        title: "Error",
        description: "Failed to delete reservation.",
        variant: "destructive",
      });
    }
  };

  const openDetails = (reservation: DiningReservation) => {
    setSelectedReservation(reservation);
    setIsDetailsOpen(true);
  };

  const stats = {
    total: reservations.length,
    pending: reservations.filter(r => r.status === 'pending').length,
    confirmed: reservations.filter(r => r.status === 'confirmed').length,
    today: reservations.filter(r => {
      const today = new Date();
      const reservationDate = new Date(r.date);
      return reservationDate.toDateString() === today.toDateString();
    }).length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-serif font-bold">Dining Reservations</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-sm">
            Total: {stats.total}
          </Badge>
          <Badge className="bg-yellow-100 text-yellow-800 text-sm">
            Pending: {stats.pending}
          </Badge>
          <Badge className="bg-green-100 text-green-800 text-sm">
            Today: {stats.today}
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Reservations</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{stats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Confirmed</p>
                <p className="text-2xl font-bold">{stats.confirmed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Today</p>
                <p className="text-2xl font-bold">{stats.today}</p>
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
                placeholder="Search by guest name, email, or restaurant..."
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
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reservations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Reservations ({filteredReservations.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Guest</TableHead>
                  <TableHead>Restaurant</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Party Size</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReservations.map((reservation) => (
                  <TableRow key={reservation.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{reservation.guestName}</div>
                        <div className="text-sm text-muted-foreground flex items-center space-x-2">
                          <Mail className="w-3 h-3" />
                          <span>{reservation.guestEmail}</span>
                        </div>
                        {reservation.guestPhone && (
                          <div className="text-sm text-muted-foreground flex items-center space-x-2">
                            <Phone className="w-3 h-3" />
                            <span>{reservation.guestPhone}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {reservation.restaurant.replace('-', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {format(new Date(reservation.date), 'MMM dd, yyyy')}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {reservation.time}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span>{reservation.partySize}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(reservation.status)}</TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">
                        {format(new Date(reservation.createdAt), 'MMM dd, HH:mm')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openDetails(reservation)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {reservation.status === 'pending' && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                              className="text-green-600 hover:text-green-700"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                        {reservation.status === 'confirmed' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateReservationStatus(reservation.id, 'completed')}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            Complete
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredReservations.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No reservations found.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reservation Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Reservation Details</DialogTitle>
            <DialogDescription>
              View complete reservation information and manage status.
            </DialogDescription>
          </DialogHeader>
          
          {selectedReservation && (
            <div className="space-y-6">
              {/* Guest Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold">Guest Information</h4>
                  <div className="space-y-2">
                    <div>
                      <label className="text-sm text-muted-foreground">Name</label>
                      <p className="font-medium">{selectedReservation.guestName}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Email</label>
                      <p>{selectedReservation.guestEmail}</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Phone</label>
                      <p>{selectedReservation.guestPhone}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold">Reservation Details</h4>
                  <div className="space-y-2">
                    <div>
                      <label className="text-sm text-muted-foreground">Restaurant</label>
                      <p className="font-medium capitalize">
                        {selectedReservation.restaurant.replace('-', ' ')}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Date & Time</label>
                      <p>
                        {format(new Date(selectedReservation.date), 'EEEE, MMMM dd, yyyy')} at {selectedReservation.time}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Party Size</label>
                      <p>{selectedReservation.partySize} guests</p>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Status</label>
                      <div className="mt-1">{getStatusBadge(selectedReservation.status)}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Requests */}
              {selectedReservation.specialRequests && (
                <div>
                  <h4 className="font-semibold mb-2">Special Requests</h4>
                  <p className="text-sm bg-muted p-3 rounded-md">
                    {selectedReservation.specialRequests}
                  </p>
                </div>
              )}

              {/* Dietary Restrictions */}
              {selectedReservation.dietaryRestrictions && selectedReservation.dietaryRestrictions.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Dietary Restrictions</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedReservation.dietaryRestrictions.map((restriction, index) => (
                      <Badge key={index} variant="outline">
                        {restriction}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Table Assignment */}
              {selectedReservation.tableNumber && (
                <div>
                  <h4 className="font-semibold mb-2">Table Assignment</h4>
                  <p>Table {selectedReservation.tableNumber}</p>
                </div>
              )}

              {/* Timestamps */}
              <div className="text-sm text-muted-foreground border-t pt-4">
                <p>Created: {format(new Date(selectedReservation.createdAt), 'PPp')}</p>
                <p>Updated: {format(new Date(selectedReservation.updatedAt), 'PPp')}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-2 border-t pt-4">
                {selectedReservation.status === 'pending' && (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => {
                        updateReservationStatus(selectedReservation.id, 'confirmed');
                        setIsDetailsOpen(false);
                      }}
                      className="text-green-600 hover:text-green-700"
                    >
                      Confirm Reservation
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        updateReservationStatus(selectedReservation.id, 'cancelled');
                        setIsDetailsOpen(false);
                      }}
                      className="text-red-600 hover:text-red-700"
                    >
                      Cancel Reservation
                    </Button>
                  </>
                )}
                {selectedReservation.status === 'confirmed' && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      updateReservationStatus(selectedReservation.id, 'completed');
                      setIsDetailsOpen(false);
                    }}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Mark as Completed
                  </Button>
                )}
                <Button
                  variant="destructive"
                  onClick={() => {
                    deleteReservation(selectedReservation.id);
                    setIsDetailsOpen(false);
                  }}
                >
                  Delete Reservation
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DiningReservationManagement;