import React, { useState } from 'react';
import { FileText, MessageSquare, Clock, Search, Filter, CheckCircle, XCircle, Send, TrendingUp, TrendingDown, Calendar, Users, AlertCircle } from 'lucide-react';

const Complaints = () => {
  const [complaints, setComplaints] = useState([
    { id: 1, title: 'Water Leakage', description: 'Water leaking from ceiling in A-301', category: 'Maintenance', status: 'open', priority: 'high', date: '2024-01-15', resident: 'John Doe', unit: 'A-301' },
    { id: 2, title: 'Noise Complaint', description: 'Loud music from B-302 after 11PM', category: 'Disturbance', status: 'resolved', priority: 'medium', date: '2024-01-14', resident: 'Jane Smith', unit: 'B-302' },
    { id: 3, title: 'Elevator Not Working', description: 'Elevator stuck between 3rd and 4th floor', category: 'Maintenance', status: 'in-progress', priority: 'high', date: '2024-01-13', resident: 'Mike Johnson', unit: 'Common Area' },
    { id: 4, title: 'Garbage Collection', description: 'Garbage not collected for 3 days', category: 'Service', status: 'open', priority: 'medium', date: '2024-01-12', resident: 'Sarah Wilson', unit: 'C-105' },
    { id: 5, title: 'Parking Issue', description: 'Unauthorized parking in resident spot', category: 'Security', status: 'open', priority: 'medium', date: '2024-01-11', resident: 'Robert Brown', unit: 'Visitor Parking' },
    { id: 6, title: 'Gym Equipment Broken', description: 'Treadmill not working in gym', category: 'Amenities', status: 'resolved', priority: 'low', date: '2024-01-10', resident: 'Various', unit: 'Gym' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || complaint.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'text-red-600 bg-red-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'resolved': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-orange-600 bg-orange-100';
      case 'low': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Maintenance': return TrendingUp;
      case 'Disturbance': return MessageSquare;
      case 'Service': return Users;
      case 'Security': return AlertCircle;
      case 'Amenities': return Calendar;
      default: return FileText;
    }
  };

  const handleNewComplaint = () => {
    const newComplaint = {
      id: complaints.length + 1,
      title: 'New Complaint',
      description: 'Enter complaint details...',
      category: 'General',
      status: 'open',
      priority: 'medium',
      date: new Date().toISOString().split('T')[0],
      resident: 'Current User',
      unit: 'N/A'
    };
    setComplaints([newComplaint, ...complaints]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold" style={{color: '#147783'}}>
          <span style={{color: '#1B9AAA'}}>Complaints</span>
        </h1>
        <button className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg" style={{backgroundColor: '#178740'}} onMouseEnter={(e) => e.target.style.backgroundColor = '#22C55E'} onMouseLeave={(e) => e.target.style.backgroundColor = '#178740'}>
          <FileText className="h-4 w-4" />
          <span>File Complaint</span>
        </button>
      </div>

      {/* Complaint Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <TrendingUp className="h-12 w-12 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-red-600">Open</p>
            <p className="text-sm text-gray-600">Active Complaints</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <TrendingDown className="h-12 w-12 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">Resolved</p>
            <p className="text-sm text-gray-600">This Month</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-orange-600">High</p>
            <p className="text-sm text-gray-600">Priority</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <CheckCircle className="h-12 w-12 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-600">Total</p>
            <p className="text-sm text-gray-600">Complaints</p>
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
                placeholder="Search complaints..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#147783] focus:border-transparent w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#147783] focus:border-transparent"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Disturbance">Disturbance</option>
              <option value="Service">Service</option>
              <option value="Security">Security</option>
              <option value="Amenities">Amenities</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#147783] focus:border-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* File Complaint Button */}
      <div className="bg-white rounded-lg shadow p-6">
        <button 
          onClick={handleNewComplaint}
          className="w-full bg-[#147783] hover:bg-[#1B9AAA] text-white py-3 rounded-lg font-semibold transition-colors"
        >
          <Send className="h-4 w-4" />
          <span>Submit New Complaint</span>
        </button>
      </div>

      {/* Complaints List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredComplaints.map((complaint) => (
          <div key={complaint.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${getStatusColor(complaint.status)}`}>
                    {React.createElement(getCategoryIcon(complaint.category), { className: "h-5 w-5" })}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{complaint.title}</h3>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(complaint.priority)}`}>
                      {complaint.priority.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <button className="text-[#147783] hover:text-[#1B9AAA] font-medium text-sm">
                    Edit
                  </button>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{complaint.description}</p>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{complaint.resident}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{complaint.unit}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{complaint.date}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                  {complaint.status.toUpperCase()}
                </span>
                <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Complaints;
