
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Bed, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Filter,
  MoreHorizontal,
  Users,
  DollarSign
} from 'lucide-react';
import { motion } from 'framer-motion';
import { dataStore } from '@/lib/dataStore';
import { Room } from '@/types/hotel';
import RoomForm from './RoomForm';
import { useToast } from '@/hooks/use-toast';

const RoomManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRooms = async () => {
      const rooms = await dataStore.getRooms();
      setRooms(rooms);
    };
    fetchRooms();
  }, []);

  const handleAddRoom = async (roomData: Partial<Room>) => {
    try {
      const newRoom = await dataStore.addRoom(roomData as Omit<Room, 'id'>);
      const rooms = await dataStore.getRooms();
      setRooms(rooms);
      toast({
        title: "Room Created",
        description: `${newRoom.name} has been successfully created.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create room. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditRoom = async (roomData: Partial<Room>) => {
    if (!selectedRoom) return;
    
    try {
      const updatedRoom = await dataStore.updateRoom(selectedRoom.id, roomData);
      if (updatedRoom) {
        const rooms = await dataStore.getRooms();
        setRooms(rooms);
        toast({
          title: "Room Updated",
          description: `${updatedRoom.name || 'Room'} has been successfully updated.`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update room. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteRoom = async (roomId: string) => {
    try {
      const success = await dataStore.deleteRoom(roomId);
      if (success) {
        const rooms = await dataStore.getRooms();
        setRooms(rooms);
        toast({
          title: "Room Deleted",
          description: "Room has been successfully deleted.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete room. Please try again.",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (room: Room) => {
    setSelectedRoom(room);
    setIsEditDialogOpen(true);
  };

  const getStatusBadge = (room: Room) => {
    const status = room.isAvailable ? 'available' : 'occupied';
    const statusConfig = {
      occupied: { label: 'Occupied', className: 'bg-blue-100 text-blue-800' },
      available: { label: 'Available', className: 'bg-green-100 text-green-800' },
      maintenance: { label: 'Maintenance', className: 'bg-yellow-100 text-yellow-800' },
      cleaning: { label: 'Cleaning', className: 'bg-purple-100 text-purple-800' },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || { label: status, className: 'bg-gray-100 text-gray-800' };
    
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'available' && room.isAvailable) ||
                         (statusFilter === 'occupied' && !room.isAvailable);
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: rooms.length,
    available: rooms.filter(r => r.isAvailable).length,
    occupied: rooms.filter(r => !r.isAvailable).length,
    maintenance: 0
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-serif font-bold">Room Management</h2>
        <Button className="btn-luxury" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Room
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Rooms</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <Bed className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available</p>
                <p className="text-2xl font-bold text-green-600">{stats.available}</p>
              </div>
              <Bed className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Occupied</p>
                <p className="text-2xl font-bold text-blue-600">{stats.occupied}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Maintenance</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.maintenance}</p>
              </div>
              <Filter className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search rooms by name or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {['all', 'available', 'occupied'].map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                  className="capitalize"
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rooms List */}
      <div className="grid gap-4">
        {filteredRooms.map((room, index) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Bed className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-lg">{room.name}</h3>
                        {getStatusBadge(room)}
                      </div>
                      <p className="text-muted-foreground mb-2">{room.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {room.capacity} guests
                        </span>
                        <span className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          ${room.price}/night
                        </span>
                        <span>{room.size} sq m</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {room.amenities.slice(0, 3).map((amenity) => (
                          <Badge key={amenity} variant="outline" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                        {room.amenities.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{room.amenities.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => openEditDialog(room)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteRoom(room.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredRooms.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Bed className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">No rooms found</h3>
            <p className="text-muted-foreground">
              {rooms.length === 0 
                ? "Start by adding your first room to the system."
                : "Try adjusting your search or filter criteria."
              }
            </p>
            {rooms.length === 0 && (
              <Button 
                className="mt-4" 
                onClick={() => setIsAddDialogOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Room
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Add Room Dialog */}
      <RoomForm
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSubmit={handleAddRoom}
      />

      {/* Edit Room Dialog */}
      <RoomForm
        room={selectedRoom || undefined}
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setSelectedRoom(null);
        }}
        onSubmit={handleEditRoom}
      />
    </div>
  );
};

export default RoomManagement;
