
import React from 'react';
import { Building, User, Clock, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface ContactFormFieldsProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  setFormData: (data: any) => void;
}

const ContactFormFields = ({ formData, handleChange, handleSelectChange, setFormData }: ContactFormFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium mb-2">
            First Name *
          </label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            placeholder="John"
            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium mb-2">
            Last Name *
          </label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            placeholder="Doe"
            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email Address *
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="john@example.com"
          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2">
          Phone Number
        </label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+1 (555) 123-4567"
          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-2">
            <Building className="inline w-4 h-4 mr-1" />
            Company
          </label>
          <Input
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Your Company"
            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            <User className="inline w-4 h-4 mr-1" />
            Job Title
          </label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Your Position"
            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-2">
          Subject *
        </label>
        <Input
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          placeholder="How can we help you?"
          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium mb-2">
            Category *
          </label>
          <Select value={formData.category} onValueChange={(value) => handleSelectChange('category', value)}>
            <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General Inquiry</SelectItem>
              <SelectItem value="booking">Booking Request</SelectItem>
              <SelectItem value="event">Event Planning</SelectItem>
              <SelectItem value="business">Business Services</SelectItem>
              <SelectItem value="complaint">Complaint</SelectItem>
              <SelectItem value="compliment">Compliment</SelectItem>
              <SelectItem value="media">Media Inquiry</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="priority" className="block text-sm font-medium mb-2">
            <AlertCircle className="inline w-4 h-4 mr-1" />
            Priority
          </label>
          <Select value={formData.priority} onValueChange={(value) => handleSelectChange('priority', value)}>
            <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Message *
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Tell us more about your inquiry..."
          rows={5}
          className="transition-all duration-200 focus:ring-2 focus:ring-primary/20 resize-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="preferredContactMethod" className="block text-sm font-medium mb-2">
            Preferred Contact Method *
          </label>
          <Select value={formData.preferredContactMethod} onValueChange={(value) => handleSelectChange('preferredContactMethod', value)}>
            <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
              <SelectValue placeholder="Select method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="phone">Phone</SelectItem>
              <SelectItem value="both">Both</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="expectedResponse" className="block text-sm font-medium mb-2">
            <Clock className="inline w-4 h-4 mr-1" />
            Expected Response Time
          </label>
          <Select value={formData.expectedResponse} onValueChange={(value) => handleSelectChange('expectedResponse', value)}>
            <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="within_24h">Within 24 hours</SelectItem>
              <SelectItem value="within_48h">Within 48 hours</SelectItem>
              <SelectItem value="within_week">Within a week</SelectItem>
              <SelectItem value="no_rush">No rush</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label htmlFor="bestTimeToContact" className="block text-sm font-medium mb-2">
          Best Time to Contact
        </label>
        <Select value={formData.bestTimeToContact} onValueChange={(value) => handleSelectChange('bestTimeToContact', value)}>
          <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20">
            <SelectValue placeholder="Select best time" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="weekday_morning">Weekday Morning (9AM-12PM)</SelectItem>
            <SelectItem value="weekday_afternoon">Weekday Afternoon (12PM-5PM)</SelectItem>
            <SelectItem value="weekday_evening">Weekday Evening (5PM-8PM)</SelectItem>
            <SelectItem value="weekend">Weekend</SelectItem>
            <SelectItem value="anytime">Anytime</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="consentToMarketing"
          checked={formData.consentToMarketing}
          onCheckedChange={(checked) => setFormData((prev: any) => ({ ...prev, consentToMarketing: !!checked }))}
        />
        <label htmlFor="consentToMarketing" className="text-sm font-medium">
          I consent to receiving marketing communications and promotional offers
        </label>
      </div>
    </>
  );
};

export default ContactFormFields;
