import React, { useState } from 'react';
import { Shield, Camera, Users, Lock, Eye, AlertTriangle, CheckCircle, Clock, MapPin, Search, Filter, Activity } from 'lucide-react';

const Security = () => {
  const [securityAlerts, setSecurityAlerts] = useState([
    { id: 1, type: 'Unauthorized', title: 'Unauthorized Access', description: 'Unknown person detected at main entrance', time: '2:30 AM', priority: 'high', status: 'active', camera: 'Camera 1', location: 'Main Gate' },
    { id: 2, type: 'Motion', title: 'Motion Detected', description: 'Movement detected in parking area', time: '11:45 PM', priority: 'medium', status: 'resolved', camera: 'Camera 2', location: 'Parking Lot' },
    { id: 3, type: 'Door', title: 'Door Forced Open', description: 'Emergency exit door opened without authorization', time: '9:15 PM', priority: 'high', status: 'active', camera: 'Camera 3', location: 'Emergency Exit' },
    { id: 4, type: 'System', title: 'System Check', description: 'Regular security system check completed', time: '6:00 PM', priority: 'low', status: 'resolved', camera: 'All Cameras', location: 'All Areas' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredAlerts = securityAlerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || alert.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-red-600 bg-red-100';
      case 'resolved': return 'text-green-600 bg-green-100';
      case 'investigating': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Unauthorized': return AlertTriangle;
      case 'Motion': return Activity;
      case 'Door': return Lock;
      case 'System': return CheckCircle;
      default: return Shield;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold" style={{color: '#147783'}}>
          <span style={{color: '#1B9AAA'}}>Security</span>
        </h1>
        <button className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg" style={{backgroundColor: '#178740'}} onMouseEnter={(e) => e.target.style.backgroundColor = '#22C55E'} onMouseLeave={(e) => e.target.style.backgroundColor = '#178740'}>
          <Shield className="h-4 w-4" />
          <span>Security Control</span>
        </button>
      </div>

      {/* Security Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-red-600">Active</p>
            <p className="text-sm text-gray-600">Security Alerts</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">Resolved</p>
            <p className="text-sm text-gray-600">This Week</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <Camera className="h-12 w-12 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-600">12</p>
            <p className="text-sm text-gray-600">Total Cameras</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search security alerts..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#147783] focus:border-transparent w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#147783] focus:border-transparent"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="Unauthorized">Unauthorized</option>
              <option value="Motion">Motion</option>
              <option value="Door">Door</option>
              <option value="System">System</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#147783] focus:border-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="resolved">Resolved</option>
              <option value="investigating">Investigating</option>
            </select>
          </div>
        </div>
      </div>

      {/* Security Alerts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAlerts.map((alert) => (
          <div key={alert.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${getStatusColor(alert.status)}`}>
                    {React.createElement(getTypeIcon(alert.type), { className: "h-5 w-5" })}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{alert.title}</h3>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert.status)}`}>
                      {alert.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  alert.priority === 'high' ? 'bg-red-100 text-red-800' :
                  alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {alert.priority.toUpperCase()}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{alert.description}</p>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  {alert.time}
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  {alert.location}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Camera className="h-4 w-4" />
                  {alert.camera}
                </div>
                <div className="flex space-x-2">
                  <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium">
                    Investigate
                  </button>
                  <button className={`text-[#147783] hover:text-[#1B9AAA] px-3 py-1 rounded text-sm font-medium`}>
                    View Camera
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Security;
