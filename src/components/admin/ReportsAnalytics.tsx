import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Bed, 
  Calendar as CalendarIcon,
  Download,
  Filter,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Target
} from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { DateRange } from 'react-day-picker';

const ReportsAnalytics = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({ 
    from: new Date(), 
    to: new Date() 
  });
  const [reportType, setReportType] = useState('revenue');

  // Mock data for charts
  const revenueData = [
    { month: 'Jan', revenue: 45000, bookings: 89 },
    { month: 'Feb', revenue: 52000, bookings: 102 },
    { month: 'Mar', revenue: 48000, bookings: 95 },
    { month: 'Apr', revenue: 61000, bookings: 118 },
    { month: 'May', revenue: 55000, bookings: 108 },
    { month: 'Jun', revenue: 67000, bookings: 125 }
  ];

  const occupancyData = [
    { name: 'Deluxe Rooms', value: 65, color: '#8884d8' },
    { name: 'Suites', value: 78, color: '#82ca9d' },
    { name: 'Presidential', value: 45, color: '#ffc658' },
    { name: 'Garden View', value: 82, color: '#ff7300' }
  ];

  const dailyMetrics = [
    { date: '2024-01-01', occupancy: 85, revenue: 12500, adr: 180 },
    { date: '2024-01-02', occupancy: 78, revenue: 11200, adr: 175 },
    { date: '2024-01-03', occupancy: 92, revenue: 15800, adr: 195 },
    { date: '2024-01-04', occupancy: 88, revenue: 14200, adr: 185 },
    { date: '2024-01-05', occupancy: 76, revenue: 10800, adr: 170 },
    { date: '2024-01-06', occupancy: 89, revenue: 13900, adr: 190 },
    { date: '2024-01-07', occupancy: 94, revenue: 16200, adr: 200 }
  ];

  const kpiData = [
    {
      title: 'Total Revenue',
      value: '$348,750',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Average Occupancy',
      value: '84.2%',
      change: '+3.2%',
      trend: 'up',
      icon: Bed,
      color: 'text-blue-600'
    },
    {
      title: 'Average Daily Rate',
      value: '$185',
      change: '+8.1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-purple-600'
    },
    {
      title: 'RevPAR',
      value: '$156',
      change: '+11.3%',
      trend: 'up',
      icon: Target,
      color: 'text-orange-600'
    }
  ];

  const topRoomsData = [
    { room: 'Presidential Suite', bookings: 45, revenue: 67500 },
    { room: 'Ocean View Deluxe', bookings: 78, revenue: 54600 },
    { room: 'Garden Suite', bookings: 62, revenue: 43400 },
    { room: 'Executive Room', bookings: 89, revenue: 40050 }
  ];

  const handleDateRangeChange = (range: DateRange | undefined) => {
    if (range) {
      setDateRange(range);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-serif font-bold">Reports & Analytics</h2>
        <div className="flex items-center space-x-2">
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-[180px]">
              <BarChart3 className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="revenue">Revenue Report</SelectItem>
              <SelectItem value="occupancy">Occupancy Report</SelectItem>
              <SelectItem value="guest">Guest Analytics</SelectItem>
              <SelectItem value="performance">Performance Report</SelectItem>
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <CalendarIcon className="w-4 h-4 mr-2" />
                Date Range
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={handleDateRangeChange}
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-muted`}>
                      <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{kpi.title}</p>
                      <p className="text-2xl font-bold">{kpi.value}</p>
                    </div>
                  </div>
                  <div className={`flex items-center ${kpi.color}`}>
                    {kpi.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 mr-1" />
                    )}
                    <span className="text-sm font-medium">{kpi.change}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue & Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="revenue" orientation="left" />
                <YAxis yAxisId="bookings" orientation="right" />
                <Tooltip />
                <Bar yAxisId="revenue" dataKey="revenue" fill="#8884d8" name="Revenue ($)" />
                <Bar yAxisId="bookings" dataKey="bookings" fill="#82ca9d" name="Bookings" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Occupancy Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Room Type Occupancy</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={occupancyData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {occupancyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Daily Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={dailyMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="occupancy" orientation="left" />
              <YAxis yAxisId="adr" orientation="right" />
              <Tooltip />
              <Area
                yAxisId="occupancy"
                type="monotone"
                dataKey="occupancy"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.3}
                name="Occupancy (%)"
              />
              <Line
                yAxisId="adr"
                type="monotone"
                dataKey="adr"
                stroke="#ff7300"
                strokeWidth={2}
                name="ADR ($)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Rooms */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Rooms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topRoomsData.map((room, index) => (
                <div key={room.room} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{room.room}</p>
                    <p className="text-sm text-muted-foreground">{room.bookings} bookings</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${room.revenue.toLocaleString()}</p>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-2" />
                      <span className="text-sm">#{index + 1}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg text-center">
                <p className="text-2xl font-bold text-green-600">92%</p>
                <p className="text-sm text-muted-foreground">Guest Satisfaction</p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <p className="text-2xl font-bold text-blue-600">3.2</p>
                <p className="text-sm text-muted-foreground">Avg. Length of Stay</p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <p className="text-2xl font-bold text-purple-600">68%</p>
                <p className="text-sm text-muted-foreground">Repeat Guests</p>
              </div>
              <div className="p-4 border rounded-lg text-center">
                <p className="text-2xl font-bold text-orange-600">4.8</p>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </div>
            </div>
            <div className="pt-4">
              <Button className="w-full">
                <Activity className="w-4 h-4 mr-2" />
                Generate Detailed Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportsAnalytics;
