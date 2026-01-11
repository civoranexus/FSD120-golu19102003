import React, { useState } from 'react';
import { Pool, Dumbbell, Calendar, Clock, Users, Star, Search, Filter, CheckCircle, XCircle } from 'lucide-react';

const Amenities = () => {
  const [amenities, setAmenities] = useState([
    { id: 1, name: 'Swimming Pool', type: 'Sports', available: true, rating: 4.5, time: '6AM - 10PM', icon: '🏊' },
    { id: 2, name: 'Gym', type: 'Fitness', available: true, rating: 4.8, time: '5AM - 11PM', icon: '🏋️' },
    { id: 3, name: 'Clubhouse', type: 'Social', available: true, rating: 4.6, time: '7AM - 11PM', icon: '🏠' },
    { id: 4, name: 'Tennis Court', type: 'Sports', available: false, rating: 4.2, time: '6AM - 9PM', icon: '🎾' },
    { id: 5, name: 'Children Play Area', type: 'Kids', available: true, rating: 4.7, time: '8AM - 8PM', icon: '👶' },
    { id: 6, name: 'Jogging Track', type: 'Fitness', available: true, rating: 4.4, time: '5AM - 10PM', icon: '🏃' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');

  const filteredAmenities = amenities.filter(amenity => {
    const matchesSearch = amenity.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || amenity.type === typeFilter;
    const matchesAvailability = availabilityFilter === 'all' || amenity.available === availabilityFilter;
    return matchesSearch && matchesType && matchesAvailability;
  });

  const stats = [
    { title: 'Total Amenities', value: '6', icon: Pool, color: 'text-blue-600' },
    { title: 'Available Now', value: '5', icon: CheckCircle, color: 'text-green-600' },
    { title: 'Avg Rating', value: '4.5', icon: Star, color: 'text-yellow-600' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold" style={{color: '#147783'}}>
          <span style={{color: '#1B9AAA'}}>Amenities</span>
        </h1>
        <button className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg" style={{backgroundColor: '#178740'}} onMouseEnter={(e) => e.target.style.backgroundColor = '#22C55E'} onMouseLeave={(e) => e.target.style.backgroundColor = '#178740'}>
          <Calendar className="h-4 w-4" />
          <span>Book Facility</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search amenities..."
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
              <option value="Sports">Sports</option>
              <option value="Fitness">Fitness</option>
              <option value="Social">Social</option>
              <option value="Kids">Kids</option>
            </select>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#147783] focus:border-transparent"
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="true">Available</option>
              <option value="false">Unavailable</option>
            </select>
          </div>
        </div>
      </div>

      {/* Amenities List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAmenities.map((amenity) => (
          <div key={amenity.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="relative">
              <div className="h-48 bg-gradient-to-br from-[#147783] to-[#1B9AAA] flex items-center justify-center text-white text-4xl">
                {amenity.icon}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{amenity.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    amenity.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {amenity.available ? 'Available' : 'Unavailable'}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                  <span className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    {amenity.time}
                  </span>
                  <span className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    {amenity.rating}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {amenity.type}
                  </span>
                  <button className="text-[#147783] hover:text-[#1B9AAA] font-medium text-sm">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Amenities;
