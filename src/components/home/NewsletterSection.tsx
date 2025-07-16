
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribed(true);
    toast({
      title: "Successfully subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    });

    setTimeout(() => {
      setIsSubscribed(false);
      setEmail('');
    }, 3000);
  };

  return (
    <section className="py-20 bg-gradient-luxury">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Card className="luxury-card border-0 bg-white/10 backdrop-blur-sm">
            <CardContent className="p-12 text-center text-luxury-navy">
              <motion.div
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <Mail className="w-16 h-16 mx-auto mb-6 text-luxury-navy" />
                <h2 className="text-4xl font-serif font-bold mb-4">
                  Stay Connected
                </h2>
                <p className="text-lg opacity-90 max-w-2xl mx-auto">
                  Subscribe to our newsletter and be the first to know about 
                  exclusive offers, special events, and luxury experiences.
                </p>
              </motion.div>

              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-white/20 border-white/30 text-luxury-navy placeholder:text-luxury-navy/70"
                    required
                  />
                  <Button
                    type="submit"
                    className="bg-luxury-navy text-white hover:bg-luxury-navy-dark px-8"
                    disabled={isSubscribed}
                  >
                    {isSubscribed ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Subscribed!
                      </>
                    ) : (
                      'Subscribe'
                    )}
                  </Button>
                </div>
                <p className="text-sm opacity-70 mt-4">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
