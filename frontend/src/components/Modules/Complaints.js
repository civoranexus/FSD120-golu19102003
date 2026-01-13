import React, { useState, useEffect, useRef } from 'react';
import { FileText, MessageSquare, Clock, Search, Filter, CheckCircle, XCircle, Send, TrendingUp, TrendingDown, Calendar, Users, AlertCircle, X, User, Home, Phone, Mail, MapPin, Camera, Paperclip } from 'lucide-react';

const Complaints = () => {
  const complaintModalRef = useRef(null);
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
  const [showComplaintForm, setShowComplaintForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state for new complaint
  const [complaintData, setComplaintData] = useState({
    title: '',
    description: '',
    category: 'Maintenance',
    priority: 'medium',
    residentName: '',
    unit: '',
    email: '',
    phone: '',
    location: '',
    urgency: 'normal',
    preferredResolution: '',
    attachments: [],
    anonymous: false
  });

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || complaint.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'text-[#EB1414] bg-red-100';
      case 'in-progress': return 'text-[#178740] bg-blue-100';
      case 'resolved': return 'text-[#178740] bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-[#EB1414] bg-red-100';
      case 'medium': return 'text-[#142C52] bg-[#D4DBE9]';
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

  // Click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showComplaintForm && complaintModalRef.current && !complaintModalRef.current.contains(event.target)) {
        setShowComplaintForm(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showComplaintForm]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setComplaintData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call to database
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create new complaint object
      const newComplaint = {
        id: complaints.length + 1,
        title: complaintData.title,
        description: complaintData.description,
        category: complaintData.category,
        status: 'open',
        priority: complaintData.priority,
        date: new Date().toISOString().split('T')[0],
        resident: complaintData.anonymous ? 'Anonymous' : complaintData.residentName,
        unit: complaintData.unit,
        email: complaintData.email,
        phone: complaintData.phone,
        location: complaintData.location,
        urgency: complaintData.urgency,
        preferredResolution: complaintData.preferredResolution,
        attachments: complaintData.attachments,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Add to complaints array (simulating database insert)
      setComplaints([newComplaint, ...complaints]);

      // Reset form
      setComplaintData({
        title: '',
        description: '',
        category: 'Maintenance',
        priority: 'medium',
        residentName: '',
        unit: '',
        email: '',
        phone: '',
        location: '',
        urgency: 'normal',
        preferredResolution: '',
        attachments: [],
        anonymous: false
      });

      setShowComplaintForm(false);
      setIsSubmitting(false);
      alert('Complaint submitted successfully! Reference ID: #' + newComplaint.id);
    } catch (error) {
      console.error('Error submitting complaint:', error);
      setIsSubmitting(false);
      alert('Error submitting complaint. Please try again.');
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setComplaintData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const removeAttachment = (index) => {
    setComplaintData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src="/short_logo.png" alt="Society360 Logo" className="h-12 w-auto mr-4" />
          <h1 className="text-3xl font-bold" style={{color: '#147783'}}>
            <span style={{color: '#020509'}}>Complaints</span>
          </h1>
        </div>
        <button 
          onClick={() => setShowComplaintForm(true)}
          className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg" 
          style={{backgroundColor: '#178740'}} 
          onMouseEnter={(e) => e.target.style.backgroundColor = '#22C55E'} 
          onMouseLeave={(e) => e.target.style.backgroundColor = '#178740'}
        >
          <FileText className="h-4 w-4" />
          <span>File Complaint</span>
        </button>
      </div>

      {/* Complaint Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <TrendingUp className="h-12 w-12 mx-auto mb-2" style={{color: '#EB1414'}} />
            <p className="text-2xl font-bold" style={{color: '#EB1414'}}>Open</p>
            <p className="text-sm text-gray-600">Active Complaints</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <TrendingDown className="h-12 w-12 mx-auto mb-2" style={{color: '#178740'}} />
            <p className="text-2xl font-bold text-green-600">Resolved</p>
            <p className="text-sm text-gray-600">This Month</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 mx-auto mb-2" style={{color: '#142C52'}} />
            <p className="text-2xl font-bold" style={{color: '#142C52'}}>High</p>
            <p className="text-sm text-gray-600">Priority</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <CheckCircle className="h-12 w-12 mx-auto mb-2" style={{color: '#5B74A3'}} />
            <p className="text-2xl font-bold" style={{color: '#5B74A3'}}>Total</p>
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
                <button className="bg-[#EF4444] hover:bg-[#EB1414] text-white px-3 py-1 rounded text-sm">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* File Complaint Modal */}
      {showComplaintForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={complaintModalRef} className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border-2" style={{boxShadow: '0 20px 25px -5px rgba(20, 119, 131, 0.1), 0 10px 10px -5px rgba(20, 119, 131, 0.04)', borderColor: '#1B9AAA'}}>
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center">
                <img 
                  src="/short_logo.png" 
                  alt="Society360 Logo" 
                  className="h-8 w-auto mr-3"
                />
                <h2 className="text-xl font-semibold text-gray-900">File New Complaint</h2>
              </div>
              <button
                onClick={() => setShowComplaintForm(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Complaint Details */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2" style={{color: '#1B9AAA'}} />
                  Complaint Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Complaint Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={complaintData.title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all border-[#16808D]"
                      style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                      placeholder="Brief title of your complaint"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Detailed Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={complaintData.description}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all border-[#16808D]"
                      style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                      placeholder="Provide detailed information about your complaint..."
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="category"
                        value={complaintData.category}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all border-[#16808D]"
                        style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                        required
                      >
                        <option value="Maintenance">Maintenance</option>
                        <option value="Disturbance">Disturbance</option>
                        <option value="Service">Service</option>
                        <option value="Security">Security</option>
                        <option value="Amenities">Amenities</option>
                        <option value="Billing">Billing</option>
                        <option value="Parking">Parking</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Priority Level <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="priority"
                        value={complaintData.priority}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all border-[#16808D]"
                        style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                        required
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="critical">Critical</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2" style={{color: '#1B9AAA'}} />
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="residentName"
                        value={complaintData.residentName}
                        onChange={handleInputChange}
                        disabled={complaintData.anonymous}
                        className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all border-[#16808D]"
                        style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)', opacity: complaintData.anonymous ? 0.5 : 1}}
                        placeholder="Your full name"
                        required={!complaintData.anonymous}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Unit/Apartment <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="unit"
                        value={complaintData.unit}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all border-[#16808D]"
                        style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                        placeholder="e.g., A-101"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={complaintData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all border-[#16808D]"
                        style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={complaintData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all border-[#16808D]"
                        style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                        placeholder="9876543210"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Specific Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={complaintData.location}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all border-[#16808D]"
                      style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                      placeholder="e.g., Near main gate, Parking area B, etc."
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" style={{color: '#1B9AAA'}} />
                  Additional Information
                </h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Urgency Level
                      </label>
                      <select
                        name="urgency"
                        value={complaintData.urgency}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all border-[#16808D]"
                        style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                      >
                        <option value="normal">Normal</option>
                        <option value="urgent">Urgent</option>
                        <option value="emergency">Emergency</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Resolution Time
                      </label>
                      <select
                        name="preferredResolution"
                        value={complaintData.preferredResolution}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all border-[#16808D]"
                        style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                      >
                        <option value="">Select preference</option>
                        <option value="immediate">Immediate</option>
                        <option value="24hours">Within 24 hours</option>
                        <option value="3days">Within 3 days</option>
                        <option value="1week">Within 1 week</option>
                        <option value="asap">As soon as possible</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="anonymous"
                        checked={complaintData.anonymous}
                        onChange={handleInputChange}
                        className="mr-2 h-4 w-4 text-[#1B9AAA] focus:ring-[#1B9AAA] border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">Submit complaint anonymously</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Attachments */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Paperclip className="h-5 w-5 mr-2" style={{color: '#1B9AAA'}} />
                  Attachments
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Supporting Documents
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#1B9AAA] transition-colors">
                      <Camera className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600 mb-2">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, PDF up to 10MB
                      </p>
                      <input
                        type="file"
                        multiple
                        accept="image/*,.pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label
                        htmlFor="file-upload"
                        className="mt-2 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                      >
                        Select Files
                      </label>
                    </div>
                  </div>

                  {complaintData.attachments.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Attached Files:</p>
                      {complaintData.attachments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm text-gray-600">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => removeAttachment(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowComplaintForm(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-[#1B9AAA] text-white rounded-lg hover:bg-[#147783] disabled:opacity-50 flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Complaint
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Complaints;
