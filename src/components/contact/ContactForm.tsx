
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { dataStore } from '@/lib/dataStore';
import ContactInfo from './ContactInfo';
import ContactFormFields from './ContactFormFields';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    title: '',
    subject: '',
    message: '',
    category: 'general' as const,
    priority: 'medium' as const,
    preferredContactMethod: 'email' as const,
    bestTimeToContact: '',
    expectedResponse: 'within_24h' as const,
    consentToMarketing: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStartTime, setSubmissionStartTime] = useState<number>(0);
  const [attemptCount, setAttemptCount] = useState(0);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionStartTime(Date.now());
    setAttemptCount(prev => prev + 1);
    setIsSubmitting(true);

    try {
      const processingTime = Date.now() - submissionStartTime;
      
      // Generate professional contact submission with comprehensive metadata
      const professionalContactData = {
        ...formData,
        source: 'website_contact_form',
        referrer: typeof window !== 'undefined' ? document.referrer || 'direct' : 'direct',
        userAgent: typeof window !== 'undefined' ? navigator.userAgent : '',
        metadata: {
          timestamp: new Date(),
          ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`, // Simulated IP
          sessionId: `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          formVersion: '2.0.0',
          processingTime: processingTime || 1000,
          submissionAttempts: attemptCount
        },
        createdAt: new Date(),
        status: 'new' as const,
        responseCount: 0,
        tags: [
          formData.category,
          formData.priority,
          formData.company ? 'business' : 'personal',
          formData.consentToMarketing ? 'marketing-consent' : 'no-marketing'
        ].filter(Boolean),
        notes: ''
      };

      const newContact = await dataStore.addContact(professionalContactData);

      console.log('Professional contact submission:', newContact);

      toast({
        title: "Message Sent Successfully!",
        description: `We'll respond ${formData.expectedResponse.replace('_', ' ')} via ${formData.preferredContactMethod}.`,
      });

      // Reset form to initial state
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        title: '',
        subject: '',
        message: '',
        category: 'general',
        priority: 'medium',
        preferredContactMethod: 'email',
        bestTimeToContact: '',
        expectedResponse: 'within_24h',
        consentToMarketing: false
      });
      setAttemptCount(0);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="luxury-heading mb-6">Send us a Message</h2>
          <p className="luxury-body max-w-3xl mx-auto">
            Complete the form below and our team will get back to you promptly. 
            For urgent matters, please call us directly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <ContactInfo />
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-serif">Get in Touch</CardTitle>
                <p className="text-muted-foreground">Fill out the form and we'll be in touch soon.</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <ContactFormFields
                    formData={formData}
                    handleChange={handleChange}
                    handleSelectChange={handleSelectChange}
                    setFormData={setFormData}
                  />

                  <Button
                    type="submit"
                    className="w-full btn-luxury h-12 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending Message...
                      </div>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
