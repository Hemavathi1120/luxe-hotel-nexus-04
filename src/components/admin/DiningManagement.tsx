
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UtensilsCrossed, Calendar, ChefHat, MapPin } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MenuManagement from './MenuManagement';
import DiningReservationManagement from './DiningReservationManagement';
import RestaurantManagement from './RestaurantManagement';

const DiningManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold">Dining Management</h1>
          <p className="text-muted-foreground">
            Manage restaurant menus, reservations, and dining services
          </p>
        </div>
      </div>

      {/* Hero Image Section */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Elegant restaurant dining room"
            className="w-full h-48 object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent" />
        </div>
        <CardContent className="relative p-8">
          <div className="flex items-center space-x-4">
            <UtensilsCrossed className="w-12 h-12 text-primary" />
            <div>
              <h2 className="text-2xl font-serif font-bold">Comprehensive Dining Operations</h2>
              <p className="text-muted-foreground mt-1">
                Streamline your restaurant management, menu planning, and reservation system
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="restaurants" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="restaurants" className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>Restaurants</span>
          </TabsTrigger>
          <TabsTrigger value="menu" className="flex items-center space-x-2">
            <ChefHat className="w-4 h-4" />
            <span>Menu Management</span>
          </TabsTrigger>
          <TabsTrigger value="reservations" className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Reservations</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="restaurants" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1493962853295-0fd70327578a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="Restaurant management"
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="absolute inset-0 bg-primary/10 rounded-lg" />
                </div>
                <div className="flex-1">
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5" />
                    <span>Restaurant Management</span>
                  </CardTitle>
                  <CardDescription>
                    Manage restaurant details, locations, and operational settings
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <RestaurantManagement />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="menu" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="Menu management"
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="absolute inset-0 bg-primary/10 rounded-lg" />
                </div>
                <div className="flex-1">
                  <CardTitle className="flex items-center space-x-2">
                    <ChefHat className="w-5 h-5" />
                    <span>Menu Items</span>
                  </CardTitle>
                  <CardDescription>
                    Manage menu items, pricing, and availability across all restaurants
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <MenuManagement />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reservations" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    alt="Restaurant reservation"
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="absolute inset-0 bg-primary/10 rounded-lg" />
                </div>
                <div className="flex-1">
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Dining Reservations</span>
                  </CardTitle>
                  <CardDescription>
                    View and manage all dining reservations across all restaurant venues
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <DiningReservationManagement />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DiningManagement;
