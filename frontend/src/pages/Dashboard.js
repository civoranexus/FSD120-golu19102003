import React from 'react';
import { Building, Users, Wrench, DollarSign, MessageSquare, Settings, TrendingUp, Calendar, Bell, Home, Shield, FileText, Activity, Plus, Search } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Residents',
      value: '156',
      change: '+12%',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Pending Maintenance',
      value: '8',
      change: '-2',
      icon: Wrench,
      color: 'bg-yellow-500'
    },
    {
      title: 'Monthly Revenue',
      value: '₹2.4L',
      change: '+8%',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'Active Visitors',
      value: '23',
      change: '+5',
      icon: Shield,
      color: 'bg-purple-500'
    }
  ];

  const recentActivities = [
    { id: 1, type: 'maintenance', title: 'AC Repair - Block A', time: '2 hours ago', status: 'pending' },
    { id: 2, type: 'visitor', title: 'Guest arrived for Unit B-201', time: '3 hours ago', status: 'completed' },
    { id: 3, type: 'payment', title: 'Maintenance fee paid - Unit C-105', time: '5 hours ago', status: 'completed' },
    { id: 4, type: 'complaint', title: 'Water leakage issue - Block D', time: '1 day ago', status: 'in-progress' },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Society Meeting', date: 'Jan 10, 2024', time: '6:00 PM' },
    { id: 2, title: 'Maintenance Schedule', date: 'Jan 12, 2024', time: '10:00 AM' },
    { id: 3, title: 'Festival Celebration', date: 'Jan 15, 2024', time: '7:00 PM' },
  ];

  const quickActions = [
    { title: 'Add Visitor', icon: Users, color: 'bg-[#1B9AAA]/20 text-[#1B9AAA]', href: '/visitor-management' },
    { title: 'Report Issue', icon: Wrench, color: 'bg-yellow-100 text-yellow-600', href: '/maintenance' },
    { title: 'Pay Dues', icon: DollarSign, color: 'bg-green-100 text-green-600', href: '/finance' },
    { title: 'Send Notice', icon: MessageSquare, color: 'bg-purple-100 text-purple-600', href: '/communication' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome to Society360 Management System</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-gray-600 hover:text-gray-900">
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
              JD
            </div>
            <span className="text-sm font-medium text-gray-700">John Doe</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-gray-500'}`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-full`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <a
                key={index}
                href={action.href}
                className={`${action.color} p-4 rounded-lg flex flex-col items-center justify-center space-y-2 hover:opacity-80 transition-opacity`}
              >
                <Icon className="h-8 w-8" />
                <span className="text-sm font-medium">{action.title}</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Recent Activities and Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
          </div>
          <div className="p-6 space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`p-2 rounded-full ${
                  activity.type === 'maintenance' ? 'bg-yellow-100' :
                  activity.type === 'visitor' ? 'bg-[#4C97A8]/20' :
                  activity.type === 'payment' ? 'bg-green-100' :
                  'bg-red-100'
                }`}>
                  {
                    activity.type === 'maintenance' ? <Wrench className="h-4 w-4 text-yellow-600" /> :
                    activity.type === 'visitor' ? <Users className="h-4 w-4 text-blue-600" /> :
                    activity.type === 'payment' ? <DollarSign className="h-4 w-4 text-green-600" /> :
                    <FileText className="h-4 w-4 text-red-600" />
                  }
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                  activity.status === 'in-progress' ? 'bg-[#4C97A8]/20 text-[#4C97A8]/80' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Events</h2>
          </div>
          <div className="p-6 space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex items-start space-x-3">
                <div className="p-2 bg-purple-100 rounded-full">
                  <Calendar className="h-4 w-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{event.title}</p>
                  <p className="text-xs text-gray-500">{event.date} at {event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">System Health</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <Activity className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Server Status</p>
              <p className="text-xs text-green-600">Operational</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Home className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Database</p>
              <p className="text-xs text-blue-600">Connected</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Shield className="h-5 w-5 text-purple-500" />
            <div>
              <p className="text-sm font-medium text-gray-900">Security</p>
              <p className="text-xs text-purple-600">All systems secured</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
