
import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const ContactInfo = () => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-serif font-bold mb-6">Contact Information</h3>
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Address</h4>
              <p className="text-muted-foreground">123 Luxury Avenue<br />Paradise City, PC 12345</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Phone</h4>
              <p className="text-muted-foreground">+1 (555) 123-4567</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">Email</h4>
              <p className="text-muted-foreground">info@luxuryhotel.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary/5 p-6 rounded-lg">
        <h4 className="font-semibold mb-3">Business Hours</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Monday - Friday:</span>
            <span>8:00 AM - 10:00 PM</span>
          </div>
          <div className="flex justify-between">
            <span>Saturday - Sunday:</span>
            <span>9:00 AM - 9:00 PM</span>
          </div>
          <div className="flex justify-between font-medium text-primary">
            <span>Concierge Service:</span>
            <span>24/7</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
