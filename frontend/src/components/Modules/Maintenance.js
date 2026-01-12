import React, { useState, useEffect } from 'react';
import { Wrench, Clock, CheckCircle, AlertCircle, Plus, Search, Home, User, Calendar, MapPin, Save, X, Zap, Droplets, Wind, Thermometer, Lightbulb } from 'lucide-react';

const Maintenance = () => {
  const [requests, setRequests] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    unit: '',
    priority: 'Medium',
    preferredDate: '',
    preferredTime: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    accessInstructions: '',
    images: []
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Simulate database connection
  useEffect(() => {
    // Load initial data from localStorage (simulating database)
    const savedRequests = localStorage.getItem('maintenanceRequests');
    if (savedRequests) {
      setRequests(JSON.parse(savedRequests));
    } else {
      // Initial sample data
      const initialRequests = [
        { id: 1, title: 'AC Repair - Block A', description: 'Air conditioning not working in living room', unit: 'A-101', priority: 'High', status: 'pending', date: 'Jan 7, 2024', category: 'HVAC', contactName: 'John Doe', contactPhone: '9876543210', contactEmail: 'john@email.com', preferredDate: '2024-01-15', preferredTime: '10:00' },
        { id: 2, title: 'Water Leakage - Block D', description: 'Water leaking from ceiling in bedroom', unit: 'D-205', priority: 'Medium', status: 'in-progress', date: 'Jan 6, 2024', category: 'Plumbing', contactName: 'Jane Smith', contactPhone: '9876543211', contactEmail: 'jane@email.com', preferredDate: '2024-01-14', preferredTime: '14:00' },
        { id: 3, title: 'Electrical Issue - Block B', description: 'Power outlets not working in kitchen', unit: 'B-302', priority: 'Low', status: 'completed', date: 'Jan 5, 2024', category: 'Electrical', contactName: 'Mike Johnson', contactPhone: '9876543212', contactEmail: 'mike@email.com', preferredDate: '2024-01-13', preferredTime: '09:00' },
      ];
      setRequests(initialRequests);
      localStorage.setItem('maintenanceRequests', JSON.stringify(initialRequests));
    }
  }, []);

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.unit.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || request.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Request title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.unit.trim()) newErrors.unit = 'Unit is required';
    if (!formData.contactName.trim()) newErrors.contactName = 'Contact name is required';
    if (!formData.contactPhone.trim()) newErrors.contactPhone = 'Contact phone is required';
    if (!formData.contactEmail.trim()) newErrors.contactEmail = 'Contact email is required';
    if (!formData.preferredDate.trim()) newErrors.preferredDate = 'Preferred date is required';
    
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
      
      const newRequest = {
        id: requests.length + 1,
        ...formData,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      const updatedRequests = [newRequest, ...requests];
      setRequests(updatedRequests);
      
      // Save to localStorage (simulating database)
      localStorage.setItem('maintenanceRequests', JSON.stringify(updatedRequests));
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        unit: '',
        priority: 'Medium',
        preferredDate: '',
        preferredTime: '',
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        accessInstructions: '',
        images: []
      });
      setErrors({});
      setShowAddForm(false);
      
      // Show success message
      alert('Maintenance request submitted successfully!');
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Error submitting request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = (id, newStatus) => {
    const updatedRequests = requests.map(request =>
      request.id === id ? { ...request, status: newStatus } : request
    );
    setRequests(updatedRequests);
    localStorage.setItem('maintenanceRequests', JSON.stringify(updatedRequests));
  };

  const deleteRequest = (id) => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      const updatedRequests = requests.filter(request => request.id !== id);
      setRequests(updatedRequests);
      localStorage.setItem('maintenanceRequests', JSON.stringify(updatedRequests));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-[#D4DBE9] text-[#142C52]';
      case 'pending': return 'bg-[#E0F7FA] text-[#142C52]';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-[#EF4444]';
      case 'Medium': return 'bg-[#E0F7FA] text-[#142C52]';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'HVAC': return Wind;
      case 'Plumbing': return Droplets;
      case 'Electrical': return Zap;
      case 'General': return Wrench;
      default: return Wrench;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src="/short_logo.png" alt="Society360 Logo" className="h-12 w-auto mr-4" />
          <h1 className="text-3xl font-bold">
            <span style={{color: '#1B9AAA'}}>Maintenance</span>
            <span style={{color: '#020509'}}> Requests</span>
          </h1>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center justify-center px-8 py-3 bg-[#16808D] text-white rounded-lg font-semibold hover:bg-[#1B9AAA] hover:text-white transition-colors"
        >
          <Plus className="ml-2 h-5 w-5" />
          New Request
        </button>
      </div>

      {/* Add Request Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border-2" style={{boxShadow: '0 20px 25px -5px rgba(20, 119, 131, 0.1), 0 10px 10px -5px rgba(20, 119, 131, 0.04)', borderColor: '#1B9AAA'}}>
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center">
                <img src="/short_logo.png" alt="Society360 Logo" className="h-8 w-auto mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">Submit Maintenance Request</h2>
              </div>
              <button 
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Request Details */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Wrench className="h-5 w-5 mr-2" style={{color: '#1B9AAA'}} />
                  Request Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Request Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all ${
                        errors.title ? 'border-red-500' : 'border-[#16808D]'
                      }`}
                      style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                      placeholder="Brief description of the issue"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Detailed Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all ${
                        errors.description ? 'border-red-500' : 'border-[#16808D]'
                      }`}
                      style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                      placeholder="Provide detailed information about the maintenance issue..."
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all ${
                        errors.category ? 'border-red-500' : 'border-[#16808D]'
                      }`}
                      style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                    >
                      <option value="">Select category</option>
                      <option value="HVAC">Air Conditioning & Heating</option>
                      <option value="Plumbing">Plumbing</option>
                      <option value="Electrical">Electrical</option>
                      <option value="Appliances">Appliances</option>
                      <option value="Structural">Structural</option>
                      <option value="Pest Control">Pest Control</option>
                      <option value="General">General Maintenance</option>
                    </select>
                    {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Unit/Apartment <span className="text-red-500">*</span>
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
                      Priority Level
                    </label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA]"
                      style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                    >
                      <option value="High">High - Emergency</option>
                      <option value="Medium">Medium - Urgent</option>
                      <option value="Low">Low - Routine</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Scheduling */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2" style={{color: '#1B9AAA'}} />
                  Preferred Schedule
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all ${
                        errors.preferredDate ? 'border-red-500' : 'border-[#16808D]'
                      }`}
                      style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                    />
                    {errors.preferredDate && <p className="text-red-500 text-sm mt-1">{errors.preferredDate}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Time
                    </label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA]"
                      style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                    >
                      <option value="">Select time</option>
                      <option value="08:00">8:00 AM</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">1:00 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                      <option value="17:00">5:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2" style={{color: '#1B9AAA'}} />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all ${
                        errors.contactName ? 'border-red-500' : 'border-[#16808D]'
                      }`}
                      style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                      placeholder="Your full name"
                    />
                    {errors.contactName && <p className="text-red-500 text-sm mt-1">{errors.contactName}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all ${
                        errors.contactPhone ? 'border-red-500' : 'border-[#16808D]'
                      }`}
                      style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                      placeholder="9876543210"
                    />
                    {errors.contactPhone && <p className="text-red-500 text-sm mt-1">{errors.contactPhone}</p>}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all ${
                        errors.contactEmail ? 'border-red-500' : 'border-[#16808D]'
                      }`}
                      style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                      placeholder="your.email@example.com"
                    />
                    {errors.contactEmail && <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>}
                  </div>
                </div>
              </div>

              {/* Access Instructions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Access Instructions
                </label>
                <textarea
                  name="accessInstructions"
                  value={formData.accessInstructions}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA]"
                  style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                  placeholder="Any special instructions for maintenance staff (e.g., call before arrival, pet information, etc.)"
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
                  className="px-6 py-2 bg-[#1B9AAA] text-white rounded-lg hover:bg-[#1B9AAA] disabled:opacity-50 flex items-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting Request...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Submit Request
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
            <Wrench className="h-12 w-12 mx-auto mb-2" style={{color: '#5B74A3'}} />
            <p className="text-2xl font-bold" style={{color: '#5B74A3'}}>{requests.length}</p>
            <p className="text-sm text-gray-600">Total Requests</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <Clock className="h-12 w-12 mx-auto mb-2" style={{color: '#142C52'}} />
            <p className="text-2xl font-bold" style={{color: '#142C52'}}>{requests.filter(r => r.status === 'pending').length}</p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 mx-auto mb-2" style={{color: '#EF4444'}} />
            <p className="text-2xl font-bold" style={{color: '#EF4444'}}>{requests.filter(r => r.status === 'in-progress').length}</p>
            <p className="text-sm text-gray-600">In Progress</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <CheckCircle className="h-12 w-12 mx-auto mb-2" style={{color: '#178740'}} />
            <p className="text-2xl font-bold" style={{color: '#178740'}}>{requests.filter(r => r.status === 'completed').length}</p>
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
                placeholder="Search requests by title, description, or unit..."
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
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA]"
            >
              <option value="all">All Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        {/* Requests Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p>No maintenance requests found</p>
                  </td>
                </tr>
              ) : (
                filteredRequests.map((request) => (
                  <tr key={request.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#CCE7EC', color: '#1B9AAA'}}>
                          {React.createElement(getCategoryIcon(request.category), { className: "h-4 w-4" })}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{request.title}</div>
                          <div className="text-xs text-gray-500">{request.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.unit}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(request.priority)}`}>
                        {request.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => updateRequestStatus(request.id, 'in-progress')}
                        className="mr-3 text-orange-600 hover:text-orange-800"
                        title="Start Work"
                      >
                        <Clock className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => updateRequestStatus(request.id, 'completed')}
                        className="mr-3 text-green-600 hover:text-green-800"
                        title="Mark Complete"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => deleteRequest(request.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete Request"
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

export default Maintenance;
