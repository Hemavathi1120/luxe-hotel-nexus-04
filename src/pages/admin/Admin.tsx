
import React from 'react';
import { motion } from 'framer-motion';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '@/components/admin/AdminDashboard';
import RoomManagement from '@/components/admin/RoomManagement';
import BookingManagement from '@/components/admin/BookingManagement';
import DiningManagement from '@/components/admin/DiningManagement';
import GuestManagement from '@/components/admin/GuestManagement';
import UserManagement from '@/components/admin/UserManagement';
import ContactManagement from '@/components/admin/ContactManagement';
import ReportsAnalytics from '@/components/admin/ReportsAnalytics';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import ProtectedAdminRoute from '@/components/admin/ProtectedAdminRoute';

const Admin = () => {
  return (
    <ProtectedAdminRoute>
      <div className="min-h-screen bg-background">
        <AdminHeader />
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Routes>
                <Route path="/" element={<AdminDashboard />} />
                <Route path="/rooms" element={<RoomManagement />} />
                <Route path="/bookings" element={<BookingManagement />} />
                <Route path="/dining" element={<DiningManagement />} />
                <Route path="/guests" element={<GuestManagement />} />
                <Route path="/users" element={<UserManagement />} />
                <Route path="/contacts" element={<ContactManagement />} />
                <Route path="/reports" element={<ReportsAnalytics />} />
              </Routes>
            </motion.div>
          </main>
        </div>
      </div>
    </ProtectedAdminRoute>
  );
};

export default Admin;
