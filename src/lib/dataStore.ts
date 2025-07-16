import { Room, Booking, Guest, MenuItem, DiningReservation } from '@/types/hotel';
import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  doc, 
  onSnapshot, 
  query, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';

// Contact form interface
export interface ContactSubmission {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  title?: string;
  subject: string;
  message: string;
  category: 'general' | 'booking' | 'event' | 'complaint' | 'compliment' | 'business' | 'media';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  source: string;
  referrer?: string;
  userAgent?: string;
  preferredContactMethod: 'email' | 'phone' | 'both';
  bestTimeToContact?: string;
  expectedResponse: 'within_24h' | 'within_48h' | 'within_week' | 'no_rush';
  consentToMarketing: boolean;
  attachments?: string[];
  metadata: {
    timestamp: Date;
    ipAddress: string;
    sessionId: string;
    formVersion: string;
    processingTime: number;
    submissionAttempts: number;
  };
  createdAt: Date;
  status: 'new' | 'read' | 'replied' | 'resolved' | 'archived';
  assignedTo?: string;
  lastResponseAt?: Date;
  responseCount: number;
  tags: string[];
  notes: string;
}

// Firebase Firestore data store
class DataStore {
  private listeners: (() => void)[] = [];

  constructor() {
    this.initializeSampleData();
  }

  private async initializeSampleData() {
    try {
      // Check if rooms collection is empty and add sample data
      const roomsSnapshot = await getDocs(collection(db, 'rooms'));
      if (roomsSnapshot.empty) {
        const sampleRooms: Omit<Room, 'id'>[] = [
          {
            name: 'Ocean View Deluxe',
            type: 'deluxe',
            description: 'Luxurious room with stunning ocean views and premium amenities.',
            price: 299,
            capacity: 2,
            size: 45,
            amenities: ['Ocean View', 'King Bed', 'Mini Bar', 'WiFi', 'Room Service'],
            images: ['https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80'],
            availability: {},
            isAvailable: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Executive Suite',
            type: 'suite',
            description: 'Spacious suite perfect for business travelers and extended stays.',
            price: 599,
            capacity: 4,
            size: 85,
            amenities: ['City View', 'Separate Living Area', 'Work Desk', 'WiFi', 'Kitchenette'],
            images: ['https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80'],
            availability: {},
            isAvailable: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            name: 'Presidential Suite',
            type: 'presidential',
            description: 'The pinnacle of luxury with unparalleled service and amenities.',
            price: 1299,
            capacity: 6,
            size: 150,
            amenities: ['Panoramic View', 'Private Balcony', 'Butler Service', 'Jacuzzi', 'Premium WiFi'],
            images: ['https://images.unsplash.com/photo-1521783988139-89397d761dce?auto=format&fit=crop&w=800&q=80'],
            availability: {},
            isAvailable: true,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ];

        for (const room of sampleRooms) {
          await this.addRoom(room);
        }
      }

      // Check if contacts collection is empty and add sample data
      const contactsSnapshot = await getDocs(collection(db, 'contacts'));
      if (contactsSnapshot.empty) {
        const sampleContacts: Omit<ContactSubmission, 'id'>[] = [
          {
            firstName: 'Sarah',
            lastName: 'Johnson',
            email: 'sarah.johnson@email.com',
            phone: '+1 (555) 123-4567',
            company: 'Johnson Wedding Planning',
            title: 'Event Coordinator',
            subject: 'Wedding Reception Inquiry',
            message: 'Hi, I am interested in booking your hotel for my wedding reception in June. Could you please provide more information about your event packages?',
            category: 'event',
            priority: 'high',
            source: 'website_contact_form',
            referrer: 'https://google.com',
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            preferredContactMethod: 'email',
            bestTimeToContact: 'weekday_morning',
            expectedResponse: 'within_24h',
            consentToMarketing: true,
            metadata: {
              timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
              ipAddress: '192.168.1.100',
              sessionId: 'sess_abc123',
              formVersion: '1.0.0',
              processingTime: 1250,
              submissionAttempts: 1
            },
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            status: 'new',
            responseCount: 0,
            tags: ['wedding', 'event', 'high-value'],
            notes: ''
          },
          {
            firstName: 'Michael',
            lastName: 'Chen',
            email: 'michael.chen@company.com',
            phone: '+1 (555) 987-6543',
            company: 'Tech Solutions Inc.',
            title: 'HR Director',
            subject: 'Corporate Event Booking',
            message: 'We are planning a corporate retreat for 50 people. What meeting facilities and group rates do you offer?',
            category: 'business',
            priority: 'medium',
            source: 'website_contact_form',
            referrer: 'https://linkedin.com',
            userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
            preferredContactMethod: 'both',
            bestTimeToContact: 'weekday_afternoon',
            expectedResponse: 'within_48h',
            consentToMarketing: false,
            metadata: {
              timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
              ipAddress: '192.168.1.101',
              sessionId: 'sess_def456',
              formVersion: '1.0.0',
              processingTime: 850,
              submissionAttempts: 1
            },
            createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
            status: 'read',
            responseCount: 0,
            tags: ['corporate', 'business', 'group-booking'],
            notes: ''
          }
        ];

        for (const contact of sampleContacts) {
          await this.addContact(contact);
        }
      }
    } catch (error) {
      console.error('Error initializing sample data:', error);
    }
  }

  // Room management
  async getRooms(): Promise<Room[]> {
    try {
      const querySnapshot = await getDocs(collection(db, 'rooms'));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(doc.data().createdAt),
        updatedAt: doc.data().updatedAt?.toDate?.() || new Date(doc.data().updatedAt),
      } as Room));
    } catch (error) {
      console.error('Error getting rooms:', error);
      return [];
    }
  }

  async addRoom(room: Omit<Room, 'id'>): Promise<Room> {
    try {
      const roomData = {
        ...room,
        createdAt: room.createdAt ? Timestamp.fromDate(new Date(room.createdAt)) : Timestamp.fromDate(new Date()),
        updatedAt: room.updatedAt ? Timestamp.fromDate(new Date(room.updatedAt)) : Timestamp.fromDate(new Date()),
      };
      const docRef = await addDoc(collection(db, 'rooms'), roomData);
      const newRoom: Room = { 
        ...room, 
        id: docRef.id,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      console.log('Room added to Firebase:', newRoom);
      return newRoom;
    } catch (error) {
      console.error('Error adding room:', error);
      throw error;
    }
  }

  async updateRoom(id: string, updates: Partial<Room>): Promise<Room | null> {
    try {
      const updateData: any = {
        ...updates,
        updatedAt: Timestamp.fromDate(new Date()),
      };
      if (updates.createdAt) {
        updateData.createdAt = Timestamp.fromDate(new Date(updates.createdAt));
      }
      
      const roomRef = doc(db, 'rooms', id);
      await updateDoc(roomRef, updateData);
      console.log('Room updated in Firebase:', id);
      return { id, ...updates } as Room;
    } catch (error) {
      console.error('Error updating room:', error);
      return null;
    }
  }

  async deleteRoom(id: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db, 'rooms', id));
      console.log('Room deleted from Firebase:', id);
      return true;
    } catch (error) {
      console.error('Error deleting room:', error);
      return false;
    }
  }

  // Booking management
  async getBookings(): Promise<Booking[]> {
    try {
      const querySnapshot = await getDocs(collection(db, 'bookings'));
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          checkIn: data.checkIn?.toDate?.() || new Date(data.checkIn),
          checkOut: data.checkOut?.toDate?.() || new Date(data.checkOut),
          createdAt: data.createdAt?.toDate?.() || new Date(data.createdAt),
          updatedAt: data.updatedAt?.toDate?.() || new Date(data.updatedAt),
        } as Booking;
      });
    } catch (error) {
      console.error('Error getting bookings:', error);
      return [];
    }
  }

  async addBooking(booking: Omit<Booking, 'id'>): Promise<Booking> {
    try {
      const bookingData = {
        ...booking,
        checkIn: Timestamp.fromDate(new Date(booking.checkIn)),
        checkOut: Timestamp.fromDate(new Date(booking.checkOut)),
        createdAt: booking.createdAt ? Timestamp.fromDate(new Date(booking.createdAt)) : Timestamp.fromDate(new Date()),
        updatedAt: booking.updatedAt ? Timestamp.fromDate(new Date(booking.updatedAt)) : Timestamp.fromDate(new Date()),
      };
      const docRef = await addDoc(collection(db, 'bookings'), bookingData);
      const newBooking: Booking = { 
        ...booking, 
        id: docRef.id,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      console.log('Booking added to Firebase:', newBooking);
      return newBooking;
    } catch (error) {
      console.error('Error adding booking:', error);
      throw error;
    }
  }

  async updateBooking(id: string, updates: Partial<Booking>): Promise<Booking | null> {
    try {
      const updateData: any = { ...updates, updatedAt: Timestamp.fromDate(new Date()) };
      if (updates.checkIn) {
        updateData.checkIn = Timestamp.fromDate(new Date(updates.checkIn));
      }
      if (updates.checkOut) {
        updateData.checkOut = Timestamp.fromDate(new Date(updates.checkOut));
      }
      if (updates.createdAt) {
        updateData.createdAt = Timestamp.fromDate(new Date(updates.createdAt));
      }
      
      const bookingRef = doc(db, 'bookings', id);
      await updateDoc(bookingRef, updateData);
      console.log('Booking updated in Firebase:', id);
      return { id, ...updates } as Booking;
    } catch (error) {
      console.error('Error updating booking:', error);
      return null;
    }
  }

  async deleteBooking(id: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db, 'bookings', id));
      console.log('Booking deleted from Firebase:', id);
      return true;
    } catch (error) {
      console.error('Error deleting booking:', error);
      return false;
    }
  }

  // Guest management
  async getGuests(): Promise<Guest[]> {
    try {
      const querySnapshot = await getDocs(collection(db, 'guests'));
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() || new Date(data.createdAt),
          updatedAt: data.updatedAt?.toDate?.() || new Date(data.updatedAt),
        } as Guest;
      });
    } catch (error) {
      console.error('Error getting guests:', error);
      return [];
    }
  }

  async addGuest(guest: Omit<Guest, 'id'>): Promise<Guest> {
    try {
      // Check if guest already exists by email
      const existingGuests = await this.getGuests();
      const existingGuest = existingGuests.find(g => g.email === guest.email);
      if (existingGuest) {
        console.log('Guest already exists, returning existing guest:', existingGuest);
        return existingGuest;
      }

      const guestData = {
        ...guest,
        createdAt: guest.createdAt ? Timestamp.fromDate(new Date(guest.createdAt)) : Timestamp.fromDate(new Date()),
        updatedAt: guest.updatedAt ? Timestamp.fromDate(new Date(guest.updatedAt)) : Timestamp.fromDate(new Date()),
      };
      const docRef = await addDoc(collection(db, 'guests'), guestData);
      const newGuest: Guest = { 
        ...guest, 
        id: docRef.id,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      console.log('Guest added to Firebase:', newGuest);
      return newGuest;
    } catch (error) {
      console.error('Error adding guest:', error);
      throw error;
    }
  }

  async updateGuest(id: string, updates: Partial<Guest>): Promise<Guest | null> {
    try {
      const updateData: any = {
        ...updates,
        updatedAt: Timestamp.fromDate(new Date()),
      };
      if (updates.createdAt) {
        updateData.createdAt = Timestamp.fromDate(new Date(updates.createdAt));
      }
      
      const guestRef = doc(db, 'guests', id);
      await updateDoc(guestRef, updateData);
      console.log('Guest updated in Firebase:', id);
      return { id, ...updates } as Guest;
    } catch (error) {
      console.error('Error updating guest:', error);
      return null;
    }
  }

  // Contact management
  async getContacts(): Promise<ContactSubmission[]> {
    try {
      const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() || new Date(data.createdAt),
        } as ContactSubmission;
      });
    } catch (error) {
      console.error('Error getting contacts:', error);
      return [];
    }
  }

  async addContact(contact: Omit<ContactSubmission, 'id'>): Promise<ContactSubmission> {
    try {
      const contactData = {
        ...contact,
        createdAt: Timestamp.fromDate(new Date(contact.createdAt)),
      };
      const docRef = await addDoc(collection(db, 'contacts'), contactData);
      const newContact: ContactSubmission = { ...contact, id: docRef.id };
      console.log('Contact added to Firebase:', newContact);
      return newContact;
    } catch (error) {
      console.error('Error adding contact:', error);
      throw error;
    }
  }

  async updateContactStatus(id: string, status: ContactSubmission['status']): Promise<ContactSubmission | null> {
    try {
      const contactRef = doc(db, 'contacts', id);
      await updateDoc(contactRef, { status });
      console.log('Contact status updated in Firebase:', id);
      return { id, status } as ContactSubmission;
    } catch (error) {
      console.error('Error updating contact status:', error);
      return null;
    }
  }

  async deleteContact(id: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db, 'contacts', id));
      console.log('Contact deleted from Firebase:', id);
      return true;
    } catch (error) {
      console.error('Error deleting contact:', error);
      return false;
    }
  }

  // Real-time data listening
  onRoomsChange(callback: (rooms: Room[]) => void) {
    const unsubscribe = onSnapshot(collection(db, 'rooms'), (snapshot) => {
      const rooms = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() || new Date(data.createdAt),
          updatedAt: data.updatedAt?.toDate?.() || new Date(data.updatedAt),
        } as Room;
      });
      callback(rooms);
    });
    this.listeners.push(unsubscribe);
    return unsubscribe;
  }

  onBookingsChange(callback: (bookings: Booking[]) => void) {
    const unsubscribe = onSnapshot(collection(db, 'bookings'), (snapshot) => {
      const bookings = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          checkIn: data.checkIn?.toDate?.() || new Date(data.checkIn),
          checkOut: data.checkOut?.toDate?.() || new Date(data.checkOut),
          createdAt: data.createdAt?.toDate?.() || new Date(data.createdAt),
          updatedAt: data.updatedAt?.toDate?.() || new Date(data.updatedAt),
        } as Booking;
      });
      callback(bookings);
    });
    this.listeners.push(unsubscribe);
    return unsubscribe;
  }

  onContactsChange(callback: (contacts: ContactSubmission[]) => void) {
    const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const contacts = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() || new Date(data.createdAt),
        } as ContactSubmission;
      });
      callback(contacts);
    });
    this.listeners.push(unsubscribe);
    return unsubscribe;
  }

  // Menu Items management
  async getMenuItems(): Promise<MenuItem[]> {
    try {
      const querySnapshot = await getDocs(collection(db, 'menuItems'));
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() || new Date(data.createdAt),
          updatedAt: data.updatedAt?.toDate?.() || new Date(data.updatedAt),
        } as MenuItem;
      });
    } catch (error) {
      console.error('Error getting menu items:', error);
      return [];
    }
  }

  async addMenuItem(menuItem: Omit<MenuItem, 'id'>): Promise<MenuItem> {
    try {
      const menuItemData = {
        ...menuItem,
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),
      };
      const docRef = await addDoc(collection(db, 'menuItems'), menuItemData);
      const newMenuItem: MenuItem = { 
        ...menuItem, 
        id: docRef.id,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      console.log('Menu item added to Firebase:', newMenuItem);
      return newMenuItem;
    } catch (error) {
      console.error('Error adding menu item:', error);
      throw error;
    }
  }

  async updateMenuItem(id: string, updates: Partial<MenuItem>): Promise<MenuItem | null> {
    try {
      const updateData: any = {
        ...updates,
        updatedAt: Timestamp.fromDate(new Date()),
      };
      
      const menuItemRef = doc(db, 'menuItems', id);
      await updateDoc(menuItemRef, updateData);
      console.log('Menu item updated in Firebase:', id);
      return { id, ...updates } as MenuItem;
    } catch (error) {
      console.error('Error updating menu item:', error);
      return null;
    }
  }

  async deleteMenuItem(id: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db, 'menuItems', id));
      console.log('Menu item deleted from Firebase:', id);
      return true;
    } catch (error) {
      console.error('Error deleting menu item:', error);
      return false;
    }
  }

  // Dining Reservations management
  async getDiningReservations(): Promise<DiningReservation[]> {
    try {
      const querySnapshot = await getDocs(collection(db, 'diningReservations'));
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          date: data.date?.toDate?.() || new Date(data.date),
          createdAt: data.createdAt?.toDate?.() || new Date(data.createdAt),
          updatedAt: data.updatedAt?.toDate?.() || new Date(data.updatedAt),
        } as DiningReservation;
      });
    } catch (error) {
      console.error('Error getting dining reservations:', error);
      return [];
    }
  }

  async addDiningReservation(reservation: Omit<DiningReservation, 'id'>): Promise<DiningReservation> {
    try {
      const reservationData = {
        ...reservation,
        date: Timestamp.fromDate(new Date(reservation.date)),
        createdAt: Timestamp.fromDate(new Date()),
        updatedAt: Timestamp.fromDate(new Date()),
      };
      const docRef = await addDoc(collection(db, 'diningReservations'), reservationData);
      const newReservation: DiningReservation = { 
        ...reservation, 
        id: docRef.id,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      console.log('Dining reservation added to Firebase:', newReservation);
      return newReservation;
    } catch (error) {
      console.error('Error adding dining reservation:', error);
      throw error;
    }
  }

  async updateDiningReservation(id: string, updates: Partial<DiningReservation>): Promise<DiningReservation | null> {
    try {
      const updateData: any = { ...updates, updatedAt: Timestamp.fromDate(new Date()) };
      if (updates.date) {
        updateData.date = Timestamp.fromDate(new Date(updates.date));
      }
      
      const reservationRef = doc(db, 'diningReservations', id);
      await updateDoc(reservationRef, updateData);
      console.log('Dining reservation updated in Firebase:', id);
      return { id, ...updates } as DiningReservation;
    } catch (error) {
      console.error('Error updating dining reservation:', error);
      return null;
    }
  }

  async deleteDiningReservation(id: string): Promise<boolean> {
    try {
      await deleteDoc(doc(db, 'diningReservations', id));
      console.log('Dining reservation deleted from Firebase:', id);
      return true;
    } catch (error) {
      console.error('Error deleting dining reservation:', error);
      return false;
    }
  }

  // Utility methods
  async getAllData() {
    const [rooms, bookings, guests, contacts, menuItems, diningReservations] = await Promise.all([
      this.getRooms(),
      this.getBookings(),
      this.getGuests(),
      this.getContacts(),
      this.getMenuItems(),
      this.getDiningReservations()
    ]);
    
    return { rooms, bookings, guests, contacts, menuItems, diningReservations };
  }

  notifyDataChange() {
    console.log('Firebase data updated');
  }

  // Cleanup listeners
  cleanup() {
    this.listeners.forEach(unsubscribe => unsubscribe());
    this.listeners = [];
  }
}

// Create singleton instance
export const dataStore = new DataStore();