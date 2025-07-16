import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  Calendar, 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  CheckCircle, 
  Home,
  Printer
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { format } from 'date-fns';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';

interface BookingData {
  dates: {
    checkIn: string;
    checkOut: string;
    nights: number;
  };
  room: {
    id: string;
    name: string;
    price: number;
    amenities: string[];
    maxGuests: number;
  };
  guests: number;
  addOns: Array<{
    id: string;
    name: string;
    price: number;
    description: string;
  }>;
  guestDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    specialRequests: string;
  };
  payment: {
    method: string;
    upiId: string | null;
    total: string;
  };
}

const BookingConfirmation = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState<BookingData | null>(null);
  const [bookingId] = useState(`BK${Date.now()}`);

  useEffect(() => {
    const savedBooking = localStorage.getItem('latestBooking');
    if (savedBooking) {
      setBookingData(JSON.parse(savedBooking));
    } else {
      // Redirect to booking page if no booking data found
      navigate('/booking');
    }
  }, [navigate]);

  const downloadPDF = async () => {
    const element = document.getElementById('booking-confirmation');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`booking-confirmation-${bookingId}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading booking confirmation...</p>
        </div>
      </div>
    );
  }

  const subtotal = (bookingData.room.price * bookingData.dates.nights) + 
    (bookingData.addOns?.reduce((sum, addon) => sum + (addon?.price || 0), 0) || 0);
  const taxes = subtotal * 0.12;
  const total = subtotal + taxes;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Success Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="mb-6">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h1 className="luxury-heading text-4xl mb-2">Booking Confirmed!</h1>
              <p className="luxury-body text-lg">
                Thank you for choosing our luxury hotel. Your reservation has been confirmed.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={downloadPDF}
                className="btn-luxury flex items-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Download PDF</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => window.print()}
                className="flex items-center space-x-2"
              >
                <Printer className="w-5 h-5" />
                <span>Print</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="flex items-center space-x-2"
              >
                <Home className="w-5 h-5" />
                <span>Back to Home</span>
              </Button>
            </div>
          </motion.div>

          {/* Booking Details */}
          <div id="booking-confirmation" className="bg-white p-8 rounded-lg shadow-sm">
            <div className="mb-8 text-center border-b pb-6">
              <h2 className="text-2xl font-bold text-primary mb-2">Luxury Hotel</h2>
              <p className="text-muted-foreground">Booking Confirmation</p>
              <Badge className="mt-2 bg-green-100 text-green-800">
                Booking ID: {bookingId}
              </Badge>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Guest Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Guest Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-semibold">
                      {bookingData.guestDetails.firstName} {bookingData.guestDetails.lastName}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{bookingData.guestDetails.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{bookingData.guestDetails.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{bookingData.guests} Guests</span>
                  </div>
                  {bookingData.guestDetails.specialRequests && (
                    <div>
                      <p className="font-medium text-sm mb-1">Special Requests:</p>
                      <p className="text-sm text-muted-foreground">
                        {bookingData.guestDetails.specialRequests}
                      </p>
                    </div>
                  )}
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
                    <p className="font-medium">Check-in</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(bookingData.dates.checkIn), 'EEEE, MMMM do, yyyy')}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Check-out</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(bookingData.dates.checkOut), 'EEEE, MMMM do, yyyy')}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Duration</p>
                    <p className="text-sm text-muted-foreground">
                      {bookingData.dates.nights} {bookingData.dates.nights === 1 ? 'night' : 'nights'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Room Details */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Accommodation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">{bookingData.room.name}</h3>
                    <p className="text-muted-foreground">
                      ${bookingData.room.price} per night
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-2">Room Amenities:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {bookingData.room.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-3 h-3 text-green-600" />
                          <span className="text-sm">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Add-ons */}
            {bookingData.addOns && bookingData.addOns.length > 0 && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Additional Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {bookingData.addOns.map((addon, index) => (
                      addon && (
                        <div key={index} className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{addon.name}</p>
                            <p className="text-sm text-muted-foreground">{addon.description}</p>
                          </div>
                          <p className="font-semibold">${addon.price}</p>
                        </div>
                      )
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Payment Summary */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Room ({bookingData.dates.nights} nights)</span>
                    <span>${(bookingData.room.price * bookingData.dates.nights).toFixed(2)}</span>
                  </div>
                  {bookingData.addOns && bookingData.addOns.map((addon, index) => (
                    addon && (
                      <div key={index} className="flex justify-between">
                        <span>{addon.name}</span>
                        <span>${addon.price.toFixed(2)}</span>
                      </div>
                    )
                  ))}
                  <div className="flex justify-between">
                    <span>Taxes & Fees</span>
                    <span>${taxes.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Paid</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <p className="text-sm">
                      <span className="font-medium">Payment Method:</span>{' '}
                      {bookingData.payment.method === 'upi' ? 'UPI Payment' : 'QR Code Payment'}
                    </p>
                    {bookingData.payment.upiId && (
                      <p className="text-sm">
                        <span className="font-medium">UPI ID:</span> {bookingData.payment.upiId}
                      </p>
                    )}
                    <p className="text-sm font-medium text-green-700 mt-1">
                      ✓ Payment Confirmed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Important Information */}
            <Card>
              <CardHeader>
                <CardTitle>Important Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>• Check-in time: 3:00 PM</p>
                  <p>• Check-out time: 11:00 AM</p>
                  <p>• Please bring a valid ID for check-in</p>
                  <p>• For any changes or cancellations, contact us at least 24 hours before check-in</p>
                  <p>• Contact: +1 (555) 123-4567 | reservations@luxuryhotel.com</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingConfirmation;