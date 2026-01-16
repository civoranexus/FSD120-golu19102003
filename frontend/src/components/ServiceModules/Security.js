import React, { useState, useEffect, useRef } from 'react';
import { Shield, Camera, Users, Lock, Eye, AlertTriangle, CheckCircle, Clock, MapPin, Search, Filter, Activity, X, Settings, Bell, UserPlus, Key, Monitor } from 'lucide-react';

const Security = () => {
  const securityModalRef = useRef(null);
  const [securityAlerts, setSecurityAlerts] = useState([
    { id: 1, type: 'Unauthorized', title: 'Unauthorized Access', description: 'Unknown person detected at main entrance', time: '2:30 AM', priority: 'high', status: 'active', camera: 'Camera 1', location: 'Main Gate' },
    { id: 2, type: 'Motion', title: 'Motion Detected', description: 'Movement detected in parking area', time: '11:45 PM', priority: 'medium', status: 'resolved', camera: 'Camera 2', location: 'Parking Lot' },
    { id: 3, type: 'Door', title: 'Door Forced Open', description: 'Emergency exit door opened without authorization', time: '9:15 PM', priority: 'high', status: 'active', camera: 'Camera 3', location: 'Emergency Exit' },
    { id: 4, type: 'System', title: 'System Check', description: 'Regular security system check completed', time: '6:00 PM', priority: 'low', status: 'resolved', camera: 'All Cameras', location: 'All Areas' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showSecurityControl, setShowSecurityControl] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [controlData, setControlData] = useState({
    action: '',
    camera: '',
    location: '',
    duration: '',
    reason: '',
    priority: 'medium',
    notifySecurity: false,
    emergencyContact: '',
    notes: ''
  });

  const filteredAlerts = securityAlerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || alert.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-[#EB1414] bg-red-100';
      case 'resolved': return 'text-[#178740] bg-green-100';
      case 'investigating': return 'text-[#1B9AAA] bg-yellow-100';
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSecurityControl && securityModalRef.current && !securityModalRef.current.contains(event.target)) {
        setShowSecurityControl(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSecurityControl]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setControlData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newAlert = {
        id: securityAlerts.length + 1,
        type: controlData.action === 'lockdown' ? 'System' : 'Manual',
        title: `Security ${controlData.action.charAt(0).toUpperCase() + controlData.action.slice(1)}`,
        description: controlData.reason,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        priority: controlData.priority,
        status: 'active',
        camera: controlData.camera || 'All Cameras',
        location: controlData.location || 'System'
      };

      setSecurityAlerts([newAlert, ...securityAlerts]);

      setControlData({
        action: '',
        camera: '',
        location: '',
        duration: '',
        reason: '',
        priority: 'medium',
        notifySecurity: false,
        emergencyContact: '',
        notes: ''
      });

      setShowSecurityControl(false);
      setIsSubmitting(false);
      alert('Security control action executed successfully!');
    } catch (error) {
      console.error('Error executing security control:', error);
      setIsSubmitting(false);
      alert('Error executing security control. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src="/short_logo.png" alt="Society360 Logo" className="h-12 w-auto mr-4" />
          <h1 className="text-3xl font-bold" style={{color: '#147783'}}>
            <span style={{color: '#020509'}}>Security</span>
          </h1>
        </div>
        <button 
          onClick={() => setShowSecurityControl(true)}
          className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg" 
          style={{backgroundColor: '#178740'}} 
          onMouseEnter={(e) => e.target.style.backgroundColor = '#22C55E'} 
          onMouseLeave={(e) => e.target.style.backgroundColor = '#178740'}
        >
          <Shield className="h-4 w-4" />
          <span>Security Control</span>
        </button>
      </div>

      {/* Security Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 mx-auto mb-2" style={{color: '#EB1414'}} />
            <p className="text-2xl font-bold" style={{color: '#EB1414'}}>Active</p>
            <p className="text-sm text-gray-600">Security Alerts</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <CheckCircle className="h-12 w-12 mx-auto mb-2" style={{color: '#178740'}} />
            <p className="text-2xl font-bold" style={{color: '#178740'}}>Resolved</p>
            <p className="text-sm text-gray-600">This Week</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <Camera className="h-12 w-12 mx-auto mb-2" style={{color: '#1B9AAA'}} />
            <p className="text-2xl font-bold" style={{color: '#1B9AAA'}}>12</p>
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
                  alert.priority === 'high' ? 'bg-red-100 text-[#EB1414]' :
                  alert.priority === 'medium' ? 'bg-[#E0F7FA] text-[#142C52]' :
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
                  <button className="bg-[#EF4444] hover:bg-[#EB1414] text-white px-3 py-1 rounded text-sm font-medium">
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

      {/* Security Control Modal */}
      {showSecurityControl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={securityModalRef} className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border-2" style={{boxShadow: '0 20px 25px -5px rgba(20, 119, 131, 0.1), 0 10px 10px -5px rgba(20, 119, 131, 0.04)', borderColor: '#1B9AAA'}}>
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center">
                <img 
                  src="/short_logo.png" 
                  alt="Society360 Logo" 
                  className="h-8 w-auto mr-3"
                />
                <h2 className="text-xl font-semibold text-gray-900">Security Control</h2>
              </div>
              <button
                onClick={() => setShowSecurityControl(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Security Action */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2" style={{color: '#1B9AAA'}} />
                  Security Action
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Action <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="action"
                    value={controlData.action}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all border-[#16808D]"
                    style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                    required
                  >
                    <option value="">Choose an action...</option>
                    <option value="lockdown">Lockdown</option>
                    <option value="evacuation">Evacuation</option>
                    <option value="camera">Camera Control</option>
                    <option value="access">Access Control</option>
                    <option value="alert">Emergency Alert</option>
                  </select>
                </div>
              </div>

              {/* Location & Camera */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Monitor className="h-5 w-5 mr-2" style={{color: '#1B9AAA'}} />
                  Location & Camera
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Camera <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="camera"
                      value={controlData.camera}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all border-[#16808D]"
                      style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                      required
                    >
                      <option value="">Select camera...</option>
                      <option value="Camera 1">Camera 1 - Main Gate</option>
                      <option value="Camera 2">Camera 2 - Parking Lot</option>
                      <option value="Camera 3">Camera 3 - Emergency Exit</option>
                      <option value="Camera 4">Camera 4 - Lobby</option>
                      <option value="All Cameras">All Cameras</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={controlData.location}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all border-[#16808D]"
                      style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                      placeholder="e.g., Main Gate, Parking Lot"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Action Details */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Settings className="h-5 w-5 mr-2" style={{color: '#1B9AAA'}} />
                  Action Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration
                    </label>
                    <input
                      type="text"
                      name="duration"
                      value={controlData.duration}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all border-[#16808D]"
                      style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                      placeholder="e.g., 2 hours, until further notice"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Priority <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="priority"
                      value={controlData.priority}
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

              {/* Reason & Contact */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" style={{color: '#1B9AAA'}} />
                  Reason & Contact
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Action <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="reason"
                    value={controlData.reason}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA]"
                    style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                    placeholder="Detailed reason for this security action..."
                    required
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emergency Contact
                  </label>
                  <input
                    type="text"
                    name="emergencyContact"
                    value={controlData.emergencyContact}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all border-[#16808D]"
                    style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                    placeholder="Emergency contact number or name"
                  />
                </div>
              </div>

              {/* Additional Options */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Bell className="h-5 w-5 mr-2" style={{color: '#1B9AAA'}} />
                  Notifications
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="notifySecurity"
                      checked={controlData.notifySecurity}
                      onChange={handleInputChange}
                      className="mr-2 h-4 w-4 text-[#1B9AAA] focus:ring-[#1B9AAA] border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Notify security team immediately</span>
                  </label>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    name="notes"
                    value={controlData.notes}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA]"
                    style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                    placeholder="Any additional instructions or notes..."
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowSecurityControl(false)}
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
                      Executing...
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4 mr-2" />
                      Execute Action
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

export default Security;
