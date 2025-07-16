
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-2xl mx-auto"
        >
          {/* Large 404 */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-9xl font-bold bg-gradient-luxury bg-clip-text text-transparent">
              404
            </h1>
          </motion.div>

          {/* Error message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-serif font-bold mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-lg text-muted-foreground mb-2">
              The page you're looking for seems to have vanished into thin air.
            </p>
            <p className="text-sm text-muted-foreground">
              Route: <code className="bg-muted px-2 py-1 rounded text-xs">{location.pathname}</code>
            </p>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              onClick={() => navigate('/')}
              className="btn-luxury flex items-center space-x-2"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Go Back</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate('/rooms')}
              className="flex items-center space-x-2"
            >
              <Search className="w-4 h-4" />
              <span>Browse Rooms</span>
            </Button>
          </motion.div>

          {/* Helpful links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 pt-8 border-t border-border"
          >
            <p className="text-sm text-muted-foreground mb-4">
              Perhaps you were looking for:
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <button
                onClick={() => navigate('/rooms')}
                className="text-primary hover:underline"
              >
                Our Rooms
              </button>
              <button
                onClick={() => navigate('/dining')}
                className="text-primary hover:underline"
              >
                Dining
              </button>
              <button
                onClick={() => navigate('/amenities')}
                className="text-primary hover:underline"
              >
                Amenities
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="text-primary hover:underline"
              >
                Contact Us
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
