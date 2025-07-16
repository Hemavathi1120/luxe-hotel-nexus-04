
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Search, 
  Filter, 
  Eye, 
  Mail,
  Phone,
  Calendar,
  MoreHorizontal,
  MessageSquare,
  CheckCircle,
  Clock,
  AlertCircle,
  Building,
  User,
  Tag,
  Globe,
  Shield,
  Monitor,
  Timer,
  ChartBar
} from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { dataStore, ContactSubmission } from '@/lib/dataStore';
import { useToast } from '@/hooks/use-toast';

const ContactManagement = () => {
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchContacts = async () => {
      const contacts = await dataStore.getContacts();
      setContacts(contacts);
    };
    fetchContacts();
  }, []);

  const handleStatusChange = async (contactId: string, newStatus: ContactSubmission['status']) => {
    const updatedContact = await dataStore.updateContactStatus(contactId, newStatus);
    if (updatedContact) {
      const contacts = await dataStore.getContacts();
      setContacts(contacts);
      toast({
        title: "Status Updated",
        description: `Contact marked as ${newStatus}.`,
      });
    }
  };

  const viewContact = (contact: ContactSubmission) => {
    setSelectedContact(contact);
    setIsViewDialogOpen(true);
    if (contact.status === 'new') {
      handleStatusChange(contact.id, 'read');
    }
  };

  const getStatusBadge = (status: ContactSubmission['status']) => {
    const statusConfig = {
      new: { color: 'bg-blue-100 text-blue-800', icon: AlertCircle },
      read: { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      replied: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      resolved: { color: 'bg-purple-100 text-purple-800', icon: CheckCircle },
      archived: { color: 'bg-gray-100 text-gray-800', icon: CheckCircle }
    };
    
    const config = statusConfig[status];
    const Icon = config.icon;
    
    return (
      <Badge className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {status}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      low: { color: 'bg-green-100 text-green-800' },
      medium: { color: 'bg-yellow-100 text-yellow-800' },
      high: { color: 'bg-orange-100 text-orange-800' },
      urgent: { color: 'bg-red-100 text-red-800' }
    };
    
    const config = priorityConfig[priority as keyof typeof priorityConfig];
    
    return (
      <Badge className={config.color}>
        {priority}
      </Badge>
    );
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: contacts.length,
    new: contacts.filter(c => c.status === 'new').length,
    read: contacts.filter(c => c.status === 'read').length,
    replied: contacts.filter(c => c.status === 'replied').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-serif font-bold">Contact Management</h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Messages</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">New</p>
                <p className="text-2xl font-bold text-blue-600">{stats.new}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Read</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.read}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Replied</p>
                <p className="text-2xl font-bold text-green-600">{stats.replied}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search contacts by name, email, or subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {['all', 'new', 'read', 'replied'].map((status) => (
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

      {/* Contacts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell className="font-medium">
                    {contact.firstName} {contact.lastName}
                  </TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell className="max-w-xs truncate">{contact.subject}</TableCell>
                  <TableCell>{format(contact.createdAt, 'MMM dd, yyyy')}</TableCell>
                  <TableCell>{getStatusBadge(contact.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => viewContact(contact)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleStatusChange(contact.id, 'replied')}
                        disabled={contact.status === 'replied'}
                      >
                        <Mail className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredContacts.length === 0 && (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No contacts found</h3>
              <p className="text-muted-foreground">
                {contacts.length === 0 
                  ? "No contact messages received yet."
                  : "Try adjusting your search or filter criteria."
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Contact Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Contact Message Details</DialogTitle>
          </DialogHeader>
          
          {selectedContact && (
            <div className="space-y-6">
              {/* Contact Information */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Contact Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedContact.firstName} {selectedContact.lastName}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-sm text-muted-foreground">{selectedContact.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedContact.phone || 'Not provided'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Date</label>
                    <p className="text-sm text-muted-foreground">
                      {format(selectedContact.createdAt, 'PPP')}
                    </p>
                  </div>
                  {selectedContact.company && (
                    <div>
                      <label className="text-sm font-medium">Company</label>
                      <p className="text-sm text-muted-foreground">{selectedContact.company}</p>
                    </div>
                  )}
                  {selectedContact.title && (
                    <div>
                      <label className="text-sm font-medium">Title</label>
                      <p className="text-sm text-muted-foreground">{selectedContact.title}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Business Context */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center">
                  <Building className="w-4 h-4 mr-2" />
                  Business Context
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Category</label>
                    <p className="text-sm text-muted-foreground capitalize">{selectedContact.category}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Priority</label>
                    <div className="mt-1">
                      {getPriorityBadge(selectedContact.priority)}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Preferred Contact</label>
                    <p className="text-sm text-muted-foreground capitalize">{selectedContact.preferredContactMethod}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Expected Response</label>
                    <p className="text-sm text-muted-foreground">{selectedContact.expectedResponse.replace('_', ' ')}</p>
                  </div>
                  {selectedContact.bestTimeToContact && (
                    <div>
                      <label className="text-sm font-medium">Best Time to Contact</label>
                      <p className="text-sm text-muted-foreground">{selectedContact.bestTimeToContact.replace('_', ' ')}</p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium">Marketing Consent</label>
                    <p className="text-sm text-muted-foreground">
                      {selectedContact.consentToMarketing ? 'Yes' : 'No'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Message Details */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Message Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">Subject</label>
                    <p className="text-sm text-muted-foreground">{selectedContact.subject}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Message</label>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-sm whitespace-pre-wrap">{selectedContact.message}</p>
                    </div>
                  </div>
                  {selectedContact.tags && selectedContact.tags.length > 0 && (
                    <div>
                      <label className="text-sm font-medium">Tags</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedContact.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* System Metadata */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center">
                  <Monitor className="w-4 h-4 mr-2" />
                  System Information
                </h3>
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="text-sm font-medium">Source</label>
                    <p className="text-sm text-muted-foreground">{selectedContact.source}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Session ID</label>
                    <p className="text-sm text-muted-foreground font-mono">{selectedContact.metadata?.sessionId}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Processing Time</label>
                    <p className="text-sm text-muted-foreground">{selectedContact.metadata?.processingTime}ms</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Attempts</label>
                    <p className="text-sm text-muted-foreground">{selectedContact.metadata?.submissionAttempts}</p>
                  </div>
                  {selectedContact.referrer && (
                    <div className="col-span-2">
                      <label className="text-sm font-medium">Referrer</label>
                      <p className="text-sm text-muted-foreground">{selectedContact.referrer}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Status:</span>
                  {getStatusBadge(selectedContact.status)}
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => handleStatusChange(selectedContact.id, 'replied')}
                    disabled={selectedContact.status === 'replied'}
                  >
                    Mark as Replied
                  </Button>
                  <Button onClick={() => setIsViewDialogOpen(false)}>
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactManagement;
