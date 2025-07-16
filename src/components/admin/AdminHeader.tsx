
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, LogOut } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

const AdminHeader = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('adminSession');
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      navigate('/admin/signin');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <header className="bg-card border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-serif font-bold bg-gradient-luxury bg-clip-text text-transparent">
          Luxe Hotel Admin
        </h1>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <User className="w-4 h-4 mr-2" />
            Admin
          </Button>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
