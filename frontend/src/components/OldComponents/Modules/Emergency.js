import React, { useState, useEffect, useRef } from 'react';
import { Phone, Shield, AlertTriangle, Users, MapPin, Clock, CheckCircle, XCircle, Send, Truck, Droplets, Search, X, User, MessageSquare, Bell, Activity, Zap, Radio } from 'lucide-react';

const Emergency = () => {
  const emergencyModalRef = useRef(null);
  const [emergencies, setEmergencies] = useState([
    { id: 1, type: 'Medical', title: 'Emergency Medical', description: 'Call doctor or ambulance immediately', priority: 'critical', contact: '108', icon: '🏥', available: true },
    { id: 2, type: 'Fire', title: 'Fire Emergency', description: 'Evacuate building and call fire department', priority: 'critical', contact: '101', icon: '🔥', available: true },
    { id: 3, type: 'Security', title: 'Security Threat', description: 'Report suspicious activity to security', priority: 'high', contact: '911', icon: '🔐', available: true },
    { id: 4, type: 'Maintenance', title: 'Building Emergency', description: 'Water leak, power outage, elevator stuck', priority: 'medium', contact: '022-1234567', icon: '🔧', available: true },
    { id: 5, type: 'Medical', title: 'First Aid Available', description: 'First aid room located in lobby', priority: 'low', contact: 'Reception', icon: '🏥', available: true },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [showEmergencyForm, setShowEmergencyForm] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [activeEmergency, setActiveEmergency] = useState(null);
  const [emergencyLogs, setEmergencyLogs] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [emergencyData, setEmergencyData] = useState({
    type: '',
    description: '',
    location: '',
    severity: 'medium',
    contactName: '',
    contactPhone: '',
    unit: '',
    urgency: 'normal',
    needsAssistance: false,
    additionalInfo: ''
  });

  const [callStatus, setCallStatus] = useState('idle'); // idle, calling, connected, ended
  const [callDuration, setCallDuration] = useState(0);
  const [callTimer, setCallTimer] = useState(null);

  const filteredEmergencies = emergencies.filter(emergency => {
    const matchesSearch = emergency.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emergency.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || emergency.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-[#EB1414] bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-[#142C52] bg-blue-100';
      case 'low': return 'text-[#142C52] bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'critical': return AlertTriangle;
      case 'high': return Shield;
      case 'medium': return Phone;
      case 'low': return CheckCircle;
      default: return Phone;
    }
  };

  const handleEmergencyCall = (contact) => {
    window.open(`tel:${contact}`);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showEmergencyForm && emergencyModalRef.current && !emergencyModalRef.current.contains(event.target)) {
        setShowEmergencyForm(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmergencyForm]);

  useEffect(() => {
    if (callStatus === 'connected') {
      const timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
      setCallTimer(timer);
    } else {
      if (callTimer) {
        clearInterval(callTimer);
        setCallTimer(null);
      }
      if (callStatus === 'ended') {
        setCallDuration(0);
      }
    }

    return () => {
      if (callTimer) {
        clearInterval(callTimer);
      }
    };
  }, [callStatus]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEmergencyData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEmergencySubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const emergencyLog = {
        id: emergencyLogs.length + 1,
        type: emergencyData.type,
        description: emergencyData.description,
        location: emergencyData.location,
        severity: emergencyData.severity,
        contactName: emergencyData.contactName,
        contactPhone: emergencyData.contactPhone,
        unit: emergencyData.unit,
        urgency: emergencyData.urgency,
        needsAssistance: emergencyData.needsAssistance,
        additionalInfo: emergencyData.additionalInfo,
        status: 'active',
        timestamp: new Date().toISOString(),
        resolvedAt: null
      };

      setEmergencyLogs([emergencyLog, ...emergencyLogs]);

      setActiveEmergency(emergencyLog);

      setEmergencyData({
        type: '',
        description: '',
        location: '',
        severity: 'medium',
        contactName: '',
        contactPhone: '',
        unit: '',
        urgency: 'normal',
        needsAssistance: false,
        additionalInfo: ''
      });

      setShowEmergencyForm(false);
      setIsSubmitting(false);
      
      alert(`Emergency reported successfully! Reference ID: #${emergencyLog.id}\n\nEmergency services have been notified.`);
      
      if (emergencyData.severity === 'critical') {
        handleEmergencyCall('911');
      }
    } catch (error) {
      console.error('Error submitting emergency:', error);
      setIsSubmitting(false);
      alert('Error submitting emergency report. Please try again or call emergency services directly.');
    }
  };

  const handleCallEmergency = async (emergency) => {
    setIsCalling(true);
    setCallStatus('calling');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setCallStatus('connected');
      
      const callLog = {
        id: emergencyLogs.length + 1,
        type: 'call',
        emergencyType: emergency.type,
        contact: emergency.contact,
        timestamp: new Date().toISOString(),
        duration: 0,
        status: 'connected'
      };
      
      setEmergencyLogs([callLog, ...emergencyLogs]);
      
      setTimeout(() => {
        setCallStatus('ended');
        setIsCalling(false);
        setCallDuration(0);
      }, 10000);
      
    } catch (error) {
      console.error('Error making emergency call:', error);
      setCallStatus('ended');
      setIsCalling(false);
    }
  };

  const handleEndCall = () => {
    setCallStatus('ended');
    setIsCalling(false);
    setCallDuration(0);
  };

  const handleResolveEmergency = (emergencyId) => {
    setEmergencyLogs(prev => 
      prev.map(log => 
        log.id === emergencyId 
          ? { ...log, status: 'resolved', resolvedAt: new Date().toISOString() }
          : log
      )
    );
    
    if (activeEmergency && activeEmergency.id === emergencyId) {
      setActiveEmergency(null);
    }
  };

  const formatCallDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getEmergencyIcon = (type) => {
    switch (type) {
      case 'Medical': return Truck;
      case 'Fire': return AlertTriangle;
      case 'Security': return Shield;
      case 'Maintenance': return Zap;
      default: return AlertTriangle;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src="/short_logo.png" alt="Society360 Logo" className="h-12 w-auto mr-4" />
          <h1 className="text-3xl font-bold text-red-600">
            <span style={{color: '#147783'}}>Emergency</span>
            <span style={{color: '#020509'}}> Services</span>
          </h1>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowEmergencyForm(true)}
            className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg bg-[#EF4444] hover:bg-[#EB1414]"
          >
            <AlertTriangle className="h-4 w-4" />
            <span>Report Emergency</span>
          </button>
          <button 
            onClick={() => handleEmergencyCall('911')}
            className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg bg-[#EB1414] hover:bg-[#DC2626]"
          >
            <Phone className="h-4 w-4" />
            <span>Call 911</span>
          </button>
        </div>
      </div>

      {/* Emergency Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 mx-auto mb-2" style={{color: '#EB1414'}} />
            <p className="text-2xl font-bold" style={{color: '#EB1414'}}>Critical</p>
            <p className="text-sm text-gray-600">Active Emergencies</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <Shield className="h-12 w-12 mx-auto mb-2" style={{color: '#EF4444'}} />
            <p className="text-2xl font-bold" style={{color: '#EF4444'}}>High</p>
            <p className="text-sm text-gray-600">Priority Issues</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <CheckCircle className="h-12 w-12 mx-auto mb-2" style={{color: '#178740'}} />
            <p className="text-2xl font-bold" style={{color: '#178740'}}>Resolved</p>
            <p className="text-sm text-gray-600">This Month</p>
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
                placeholder="Search emergency services..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Quick Emergency Contacts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg">
            <Phone className="h-6 w-6 text-red-600" />
            <div>
              <p className="font-semibold" style={{color: '#EB1414'}}>Emergency: 911</p>
              <p className="text-sm" style={{color: '#EB1414'}}>Police, Fire, Medical</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
            <Shield className="h-6 w-6" style={{color: '#1B9AAA'}} />
            <div>
              <p className="font-semibold" style={{color: '#1B9AAA'}}>Security: 022-1234567</p>
              <p className="text-sm" style={{color: '#1B9AAA'}}>24/7 Security Desk</p>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEmergencies.map((emergency) => (
          <div key={emergency.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative">
              <div className={`h-32 flex items-center justify-center text-white text-4xl ${
                emergency.priority === 'critical' ? 'bg-[#EB1414]' :
                emergency.priority === 'high' ? 'bg-[#1B9AAA]' :
                emergency.priority === 'medium' ? 'bg-[#178740]' :
                'bg-[#0E2140]'
              }`}>
                {emergency.icon}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{emergency.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(emergency.priority)}`}>
                    {emergency.priority.toUpperCase()}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{emergency.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Phone className="h-4 w-4" />
                    {emergency.contact}
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleCallEmergency(emergency)}
                      disabled={isCalling}
                      className="bg-[#EF4444] hover:bg-[#EB1414] text-white px-3 py-1 rounded text-sm font-medium disabled:opacity-50 flex items-center"
                    >
                      {isCalling ? (
                        <>
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                          Calling...
                        </>
                      ) : (
                        <>
                          <Phone className="h-3 w-3 mr-1" />
                          Call Now
                        </>
                      )}
                    </button>
                    <button className={`text-[#147783] hover:text-[#1B9AAA] px-3 py-1 rounded text-sm font-medium`}>
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency Call Status */}
      {isCalling && (
        <div className="fixed top-4 right-4 bg-white rounded-lg shadow-2xl p-4 z-50 border-2 border-red-500">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${
              callStatus === 'calling' ? 'bg-yellow-500 animate-pulse' :
              callStatus === 'connected' ? 'bg-green-500 animate-pulse' :
              'bg-red-500'
            }`}></div>
            <div>
              <p className="font-semibold text-gray-900">
                {callStatus === 'calling' ? 'Connecting...' :
                 callStatus === 'connected' ? 'Connected' :
                 'Call Ended'}
              </p>
              <p className="text-sm text-gray-600">
                {callStatus === 'connected' ? formatCallDuration(callDuration) : 'Emergency Services'}
              </p>
            </div>
            <button
              onClick={handleEndCall}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
            >
              End Call
            </button>
          </div>
        </div>
      )}

      {/* Report Emergency Modal */}
      {showEmergencyForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={emergencyModalRef} className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border-2" style={{boxShadow: '0 20px 25px -5px rgba(239, 68, 68, 0.1), 0 10px 10px -5px rgba(239, 68, 68, 0.04)', borderColor: '#EF4444'}}>
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center">
                <img 
                  src="/short_logo.png" 
                  alt="Society360 Logo" 
                  className="h-8 w-auto mr-3"
                />
                <h2 className="text-xl font-semibold text-red-600">Report Emergency</h2>
              </div>
              <button
                onClick={() => setShowEmergencyForm(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleEmergencySubmit} className="p-6 space-y-6">
              {/* Emergency Type */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" style={{color: '#EF4444'}} />
                  Emergency Type
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Emergency Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="type"
                    value={emergencyData.type}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#EF4444] transition-all border-[#DC2626]"
                    style={{boxShadow: '0 1px 3px 0 rgba(239, 68, 68, 0.1), 0 1px 2px 0 rgba(239, 68, 68, 0.06)'}}
                    required
                  >
                    <option value="">Choose emergency type...</option>
                    <option value="Medical">Medical Emergency</option>
                    <option value="Fire">Fire Emergency</option>
                    <option value="Security">Security Threat</option>
                    <option value="Maintenance">Building Emergency</option>
                    <option value="Other">Other Emergency</option>
                  </select>
                </div>
              </div>

              {/* Emergency Details */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" style={{color: '#EF4444'}} />
                  Emergency Details
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={emergencyData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#EF4444] transition-all border-[#DC2626]"
                    style={{boxShadow: '0 1px 3px 0 rgba(239, 68, 68, 0.1), 0 1px 2px 0 rgba(239, 68, 68, 0.06)'}}
                    placeholder="Describe the emergency situation..."
                    required
                  />
                </div>
              </div>

              {/* Location Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <MapPin className="h-5 w-5 mr-2" style={{color: '#EF4444'}} />
                  Location Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Specific Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={emergencyData.location}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#EF4444] transition-all border-[#DC2626]"
                      style={{boxShadow: '0 1px 3px 0 rgba(239, 68, 68, 0.1), 0 1px 2px 0 rgba(239, 68, 68, 0.06)'}}
                      placeholder="e.g., Building A, Floor 3, Room 301"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Unit/Apartment
                    </label>
                    <input
                      type="text"
                      name="unit"
                      value={emergencyData.unit}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#EF4444] transition-all border-[#DC2626]"
                      style={{boxShadow: '0 1px 3px 0 rgba(239, 68, 68, 0.1), 0 1px 2px 0 rgba(239, 68, 68, 0.06)'}}
                      placeholder="e.g., A-101"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2" style={{color: '#EF4444'}} />
                  Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      value={emergencyData.contactName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#EF4444] transition-all border-[#DC2626]"
                      style={{boxShadow: '0 1px 3px 0 rgba(239, 68, 68, 0.1), 0 1px 2px 0 rgba(239, 68, 68, 0.06)'}}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="contactPhone"
                      value={emergencyData.contactPhone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#EF4444] transition-all border-[#DC2626]"
                      style={{boxShadow: '0 1px 3px 0 rgba(239, 68, 68, 0.1), 0 1px 2px 0 rgba(239, 68, 68, 0.06)'}}
                      placeholder="9876543210"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Severity and Urgency */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Activity className="h-5 w-5 mr-2" style={{color: '#EF4444'}} />
                  Severity Assessment
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Severity Level <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="severity"
                      value={emergencyData.severity}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#EF4444] transition-all border-[#DC2626]"
                      style={{boxShadow: '0 1px 3px 0 rgba(239, 68, 68, 0.1), 0 1px 2px 0 rgba(239, 68, 68, 0.06)'}}
                      required
                    >
                      <option value="low">Low - Minor Issue</option>
                      <option value="medium">Medium - Urgent Attention</option>
                      <option value="high">High - Serious Concern</option>
                      <option value="critical">Critical - Life Threatening</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Urgency Level
                    </label>
                    <select
                      name="urgency"
                      value={emergencyData.urgency}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#EF4444] transition-all border-[#DC2626]"
                      style={{boxShadow: '0 1px 3px 0 rgba(239, 68, 68, 0.1), 0 1px 2px 0 rgba(239, 68, 68, 0.06)'}}
                    >
                      <option value="normal">Normal Response</option>
                      <option value="urgent">Urgent Response</option>
                      <option value="immediate">Immediate Response</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="needsAssistance"
                      checked={emergencyData.needsAssistance}
                      onChange={handleInputChange}
                      className="mr-2 h-4 w-4 text-[#EF4444] focus:ring-[#EF4444] border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Immediate assistance required</span>
                  </label>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Bell className="h-5 w-5 mr-2" style={{color: '#EF4444'}} />
                  Additional Information
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Details
                  </label>
                  <textarea
                    name="additionalInfo"
                    value={emergencyData.additionalInfo}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#EF4444] transition-all border-[#DC2626]"
                    style={{boxShadow: '0 1px 3px 0 rgba(239, 68, 68, 0.1), 0 1px 2px 0 rgba(239, 68, 68, 0.06)'}}
                    placeholder="Any additional information that may help emergency services..."
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowEmergencyForm(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-[#EF4444] text-white rounded-lg hover:bg-[#DC2626] disabled:opacity-50 flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Emergency Report
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Emergency Logs */}
      {emergencyLogs.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Emergency Activity Log</h2>
          <div className="space-y-3">
            {emergencyLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    log.status === 'active' ? 'bg-red-500' :
                    log.status === 'connected' ? 'bg-green-500' :
                    'bg-gray-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {log.type === 'call' ? `Emergency Call to ${log.contact}` : log.type}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(log.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
                {log.status === 'active' && (
                  <button
                    onClick={() => handleResolveEmergency(log.id)}
                    className="text-green-600 hover:text-green-800 text-sm font-medium"
                  >
                    Mark Resolved
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Emergency;
