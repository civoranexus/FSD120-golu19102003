import React, { useState, useEffect, useRef } from 'react';
import { Users, Shield, Clock, CheckCircle, XCircle, Plus, Search, Phone, Mail, Calendar, MapPin, User, AlertCircle, Save, X } from 'lucide-react';

const VisitorManagement = () => {
  const visitorModalRef = useRef(null);
  const [visitors, setVisitors] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    purpose: '',
    unit: '',
    expectedArrival: '',
    expectedDeparture: '',
    vehicleNumber: '',
    notes: '',
    hostName: '',
    hostUnit: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Simulate database connection
  useEffect(() => {
    // Load initial data from localStorage (simulating database)
    const savedVisitors = localStorage.getItem('visitors');
    if (savedVisitors) {
      setVisitors(JSON.parse(savedVisitors));
    } else {
      // Initial sample data
      const initialVisitors = [
        { id: 1, name: 'Rahul Sharma', purpose: 'Delivery', unit: 'A-101', time: '10:30 AM', status: 'approved', email: 'rahul@email.com', phone: '9876543210', hostName: 'John Doe', hostUnit: 'A-101', expectedArrival: '2024-01-15 10:30', expectedDeparture: '2024-01-15 11:30' },
        { id: 2, name: 'Priya Patel', purpose: 'Guest', unit: 'B-205', time: '11:15 AM', status: 'pending', email: 'priya@email.com', phone: '9876543211', hostName: 'Jane Smith', hostUnit: 'B-205', expectedArrival: '2024-01-15 11:15', expectedDeparture: '2024-01-15 13:15' },
        { id: 3, name: 'Amazon Delivery', purpose: 'Package', unit: 'C-302', time: '09:45 AM', status: 'completed', email: 'delivery@amazon.com', phone: '9876543212', hostName: 'Security', hostUnit: 'Reception', expectedArrival: '2024-01-15 09:45', expectedDeparture: '2024-01-15 10:45' },
      ];
      setVisitors(initialVisitors);
      localStorage.setItem('visitors', JSON.stringify(initialVisitors));
    }
  }, []);

  // Click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showAddForm && visitorModalRef.current && !visitorModalRef.current.contains(event.target)) {
        setShowAddForm(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAddForm]);

  const filteredVisitors = visitors.filter(visitor => {
    const matchesSearch = visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visitor.purpose.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visitor.unit.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || visitor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Visitor name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.purpose.trim()) newErrors.purpose = 'Purpose is required';
    if (!formData.unit.trim()) newErrors.unit = 'Unit is required';
    if (!formData.hostName.trim()) newErrors.hostName = 'Host name is required';
    if (!formData.hostUnit.trim()) newErrors.hostUnit = 'Host unit is required';
    if (!formData.expectedArrival.trim()) newErrors.expectedArrival = 'Expected arrival time is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      // Simulate API call to database
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newVisitor = {
        id: visitors.length + 1,
        ...formData,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      const updatedVisitors = [newVisitor, ...visitors];
      setVisitors(updatedVisitors);
      
      // Save to localStorage (simulating database)
      localStorage.setItem('visitors', JSON.stringify(updatedVisitors));
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        purpose: '',
        unit: '',
        expectedArrival: '',
        expectedDeparture: '',
        vehicleNumber: '',
        notes: '',
        hostName: '',
        hostUnit: ''
      });
      setErrors({});
      setShowAddForm(false);
      
      // Show success message
      alert('Visitor added successfully!');
    } catch (error) {
      console.error('Error adding visitor:', error);
      alert('Error adding visitor. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateVisitorStatus = (id, newStatus) => {
    const updatedVisitors = visitors.map(visitor =>
      visitor.id === id ? { ...visitor, status: newStatus } : visitor
    );
    setVisitors(updatedVisitors);
    localStorage.setItem('visitors', JSON.stringify(updatedVisitors));
  };

  const deleteVisitor = (id) => {
    if (window.confirm('Are you sure you want to delete this visitor?')) {
      const updatedVisitors = visitors.filter(visitor => visitor.id !== id);
      setVisitors(updatedVisitors);
      localStorage.setItem('visitors', JSON.stringify(updatedVisitors));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-[#E0F7FA] text-[#142C52]';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src="/short_logo.png" alt="Society360 Logo" className="h-12 w-auto mr-4" />
          <h1 className="text-3xl font-bold">
            <span style={{color: '#1B9AAA'}}>Visitor</span>
            <span style={{color: '#020509'}}> Management</span>
          </h1>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center justify-center px-8 py-3 bg-[#16808D] text-white rounded-lg font-semibold hover:bg-[#1B9AAA] hover:text-white transition-colors"
        >
          <Plus className="ml-2 h-5 w-5" />
          Add Visitor
        </button>
      </div>

      {/* Add Visitor Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={visitorModalRef} className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border-2" style={{boxShadow: '0 20px 25px -5px rgba(20, 119, 131, 0.1), 0 10px 10px -5px rgba(20, 119, 131, 0.04)', borderColor: '#1B9AAA'}}>
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center">
                <img src="/short_logo.png" alt="Society360 Logo" className="h-8 w-auto mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">Add New Visitor</h2>
              </div>
              <button 
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2" style={{color: '#1B9AAA'}} />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Visitor Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all ${
                        errors.name ? 'border-red-500' : 'border-[#16808D]'
                      }`}
                      style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                      placeholder="Enter visitor's full name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all ${
                        errors.email ? 'border-red-500' : 'border-[#16808D]'
                      }`}
                      style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                      placeholder="visitor@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all ${
                        errors.phone ? 'border-red-500' : 'border-[#16808D]'
                      }`}
                      style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                      placeholder="9876543210"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Vehicle Number
                    </label>
                    <input
                      type="text"
                      name="vehicleNumber"
                      value={formData.vehicleNumber}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA]"
                      style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                      placeholder="MH-12-AB-1234"
                    />
                  </div>
                </div>
              </div>

              {/* Visit Details */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2" style={{color: '#1B9AAA'}} />
                  Visit Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Purpose of Visit <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all ${
                        errors.purpose ? 'border-red-500' : 'border-[#16808D]'
                      }`}
                      style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                    >
                      <option value="">Select purpose</option>
                      <option value="Guest">Guest Visit</option>
                      <option value="Delivery">Delivery</option>
                      <option value="Service">Service</option>
                      <option value="Interview">Interview</option>
                      <option value="Meeting">Business Meeting</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.purpose && <p className="text-red-500 text-sm mt-1">{errors.purpose}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Unit to Visit <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="unit"
                      value={formData.unit}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all ${
                        errors.unit ? 'border-red-500' : 'border-[#16808D]'
                      }`}
                      style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                      placeholder="A-101"
                    />
                    {errors.unit && <p className="text-red-500 text-sm mt-1">{errors.unit}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Arrival <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="datetime-local"
                      name="expectedArrival"
                      value={formData.expectedArrival}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all ${
                        errors.expectedArrival ? 'border-red-500' : 'border-[#16808D]'
                      }`}
                      style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                    />
                    {errors.expectedArrival && <p className="text-red-500 text-sm mt-1">{errors.expectedArrival}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Departure
                    </label>
                    <input
                      type="datetime-local"
                      name="expectedDeparture"
                      value={formData.expectedDeparture}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA]"
                      style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                    />
                  </div>
                </div>
              </div>

              {/* Host Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Users className="h-5 w-5 mr-2" style={{color: '#1B9AAA'}} />
                  Host Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Host Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="hostName"
                      value={formData.hostName}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all ${
                        errors.hostName ? 'border-red-500' : 'border-[#16808D]'
                      }`}
                      style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                      placeholder="Host's full name"
                    />
                    {errors.hostName && <p className="text-red-500 text-sm mt-1">{errors.hostName}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Host Unit <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="hostUnit"
                      value={formData.hostUnit}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all ${
                        errors.hostUnit ? 'border-red-500' : 'border-[#16808D]'
                      }`}
                      style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                      placeholder="A-101"
                    />
                    {errors.hostUnit && <p className="text-red-500 text-sm mt-1">{errors.hostUnit}</p>}
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA]"
                  style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                  placeholder="Any additional information about the visit..."
                />
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-[#1B9AAA] text-white rounded-lg hover:bg-[#147783] disabled:opacity-50 flex items-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Adding Visitor...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Add Visitor
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <Users className="h-12 w-12 mx-auto mb-2" style={{color: '#147783'}} />
            <p className="text-2xl font-bold" style={{color: '#147783'}}>{visitors.length}</p>
            <p className="text-sm text-gray-600">Total Visitors</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <Clock className="h-12 w-12 mx-auto mb-2" style={{color: '#EF4444'}} />
            <p className="text-2xl font-bold" style={{color: '#EF4444'}}>{visitors.filter(v => v.status === 'pending').length}</p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <CheckCircle className="h-12 w-12 mx-auto mb-2" style={{color: '#178740'}} />
            <p className="text-2xl font-bold" style={{color: '#178740'}}>{visitors.filter(v => v.status === 'approved').length}</p>
            <p className="text-sm text-gray-600">Approved</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <Shield className="h-12 w-12 mx-auto mb-2" style={{color: '#142C52'}} />
            <p className="text-2xl font-bold" style={{color: '#142C52'}}>{visitors.filter(v => v.status === 'completed').length}</p>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search visitors by name, purpose, or unit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA]"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA]"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="completed">Completed</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Visitors Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visitor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVisitors.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p>No visitors found</p>
                  </td>
                </tr>
              ) : (
                filteredVisitors.map((visitor) => (
                  <tr key={visitor.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#CCE7EC', color: '#1B9AAA'}}>
                          <Users className="h-4 w-4" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{visitor.name}</div>
                          <div className="text-xs text-gray-500">{visitor.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{visitor.purpose}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{visitor.unit}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{visitor.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(visitor.status)}`}>
                        {visitor.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => updateVisitorStatus(visitor.id, 'approved')}
                        className="mr-3 text-green-600 hover:text-green-800"
                        title="Approve"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => updateVisitorStatus(visitor.id, 'rejected')}
                        className="mr-3 text-red-600 hover:text-red-800"
                        title="Reject"
                      >
                        <XCircle className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => deleteVisitor(visitor.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VisitorManagement;
