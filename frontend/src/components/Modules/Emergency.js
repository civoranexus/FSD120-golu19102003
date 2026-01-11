import React, { useState } from 'react';
import { Phone, Shield, AlertTriangle, Users, MapPin, Clock, CheckCircle, XCircle, Send, Ambulance, Fire, Droplets } from 'lucide-react';

const Emergency = () => {
  const [emergencies, setEmergencies] = useState([
    { id: 1, type: 'Medical', title: 'Emergency Medical', description: 'Call doctor or ambulance immediately', priority: 'critical', contact: '108', icon: '🏥', available: true },
    { id: 2, type: 'Fire', title: 'Fire Emergency', description: 'Evacuate building and call fire department', priority: 'critical', contact: '101', icon: '🔥', available: true },
    { id: 3, type: 'Security', title: 'Security Threat', description: 'Report suspicious activity to security', priority: 'high', contact: '911', icon: '🔐', available: true },
    { id: 4, type: 'Maintenance', title: 'Building Emergency', description: 'Water leak, power outage, elevator stuck', priority: 'medium', contact: '022-1234567', icon: '🔧', available: true },
    { id: 5, type: 'Medical', title: 'First Aid Available', description: 'First aid room located in lobby', priority: 'low', contact: 'Reception', icon: '🏥', available: true },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const filteredEmergencies = emergencies.filter(emergency => {
    const matchesSearch = emergency.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emergency.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || emergency.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-blue-600 bg-blue-100';
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-red-600">
          <span style={{color: '#147783'}}>Emergency</span>
          <span style={{color: '#EF4444'}}> Services</span>
        </h1>
        <button className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700">
          <Phone className="h-4 w-4" />
          <span>Call Emergency: 911</span>
        </button>
      </div>

      {/* Emergency Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-red-600">Critical</p>
            <p className="text-sm text-gray-600">Active Emergencies</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <Shield className="h-12 w-12 text-orange-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-orange-600">High</p>
            <p className="text-sm text-gray-600">Priority Issues</p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-600">Resolved</p>
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
              <p className="font-semibold text-red-800">Emergency: 911</p>
              <p className="text-sm text-red-600">Police, Fire, Medical</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
            <Shield className="h-6 w-6 text-blue-600" />
            <div>
              <p className="font-semibold text-blue-800">Security: 022-1234567</p>
              <p className="text-sm text-blue-600">24/7 Security Desk</p>
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
                emergency.priority === 'critical' ? 'bg-red-600' :
                emergency.priority === 'high' ? 'bg-orange-600' :
                emergency.priority === 'medium' ? 'bg-yellow-600' :
                'bg-blue-600'
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
                      onClick={() => handleEmergencyCall(emergency.contact)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm font-medium"
                    >
                      Call Now
                    </button>
                    <button className={`text-[#147783] hover:text-[#1B9AAA] px-3 py-1 rounded text-sm font-medium`}>
                      Details
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

export default Emergency;
