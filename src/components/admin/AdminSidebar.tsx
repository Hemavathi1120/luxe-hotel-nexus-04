import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Bed, 
  Calendar, 
  Users, 
  UserCheck,
  BarChart3, 
  UtensilsCrossed,
  MessageSquare
} from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/admin/rooms', icon: Bed, label: 'Rooms' },
    { path: '/admin/bookings', icon: Calendar, label: 'Bookings' },
    { path: '/admin/dining', icon: UtensilsCrossed, label: 'Dining' },
    { path: '/admin/guests', icon: Users, label: 'Guests' },
    { path: '/admin/users', icon: UserCheck, label: 'Users' },
    { path: '/admin/contacts', icon: MessageSquare, label: 'Contacts' },
    { path: '/admin/reports', icon: BarChart3, label: 'Reports' },
  ];

  return (
    <aside className="w-64 bg-card border-r min-h-[calc(100vh-80px)]">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
              location.pathname === item.path
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
