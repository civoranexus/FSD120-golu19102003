import React, { useState, useEffect, useRef } from 'react';
import { Building, Dumbbell, Calendar, Clock, Users, Star, Search, Filter, CheckCircle, XCircle, X, Mail, Phone, User, MapPin, FileText } from 'lucide-react';

const Amenities = () => {
  const bookingModalRef = useRef(null);
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
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedAmenity, setSelectedAmenity] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    amenityId: '',
    amenityName: '',
    name: '',
    email: '',
    phone: '',
    unitNumber: '',
    date: '',
    time: '',
    duration: '1',
    purpose: '',
    specialRequests: ''
  });

  // Simulate database fetch
  useEffect(() => {
    // Simulate fetching existing bookings from database
    const mockBookings = [
      {
        id: 1,
        amenityName: 'Swimming Pool',
        name: 'John Smith',
        email: 'john@example.com',
        phone: '+1234567890',
        unitNumber: 'A-101',
        date: '2024-01-15',
        time: '10:00 AM',
        duration: '2 hours',
        purpose: 'Family swimming',
        status: 'confirmed',
        createdAt: '2024-01-10T10:00:00Z'
      },
      {
        id: 2,
        amenityName: 'Gym',
        name: 'Jane Doe',
        email: 'jane@example.com',
        phone: '+0987654321',
        unitNumber: 'B-205',
        date: '2024-01-16',
        time: '7:00 AM',
        duration: '1 hour',
        purpose: 'Morning workout',
        status: 'pending',
        createdAt: '2024-01-11T14:30:00Z'
      }
    ];
    setBookings(mockBookings);
  }, []);

  // Click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showBookingForm && bookingModalRef.current && !bookingModalRef.current.contains(event.target)) {
        setShowBookingForm(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showBookingForm]);

  const filteredAmenities = amenities.filter(amenity => {
    const matchesSearch = amenity.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || amenity.type === typeFilter;
    const matchesAvailability = availabilityFilter === 'all' || amenity.available === availabilityFilter;
    return matchesSearch && matchesType && matchesAvailability;
  });

  const stats = [
    { title: 'Total Amenities', value: '6', icon: Building, color: '#142C52' },
    { title: 'Available Now', value: '5', icon: CheckCircle, color: '#178740' },
    { title: 'Total Bookings', value: bookings.length.toString(), icon: Calendar, color: '#16808D' },
  ];

  const handleBookFacility = (amenity) => {
    setSelectedAmenity(amenity);
    setFormData({
      ...formData,
      amenityId: amenity.id.toString(),
      amenityName: amenity.name
    });
    setShowBookingForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call to database
      const newBooking = {
        id: bookings.length + 1,
        ...formData,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      // Add to bookings state (simulating database update)
      setBookings(prev => [newBooking, ...prev]);

      // Reset form
      setFormData({
        amenityId: '',
        amenityName: '',
        name: '',
        email: '',
        phone: '',
        unitNumber: '',
        date: '',
        time: '',
        duration: '1',
        purpose: '',
        specialRequests: ''
      });

      setShowBookingForm(false);
      setIsSubmitting(false);
      
      // Show success message (you could add a toast notification here)
      alert('Facility booked successfully!');
    } catch (error) {
      console.error('Error booking facility:', error);
      setIsSubmitting(false);
      alert('Error booking facility. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src="/short_logo.png" alt="Society360 Logo" className="h-12 w-auto mr-4" />
          <h1 className="text-3xl font-bold" style={{color: '#147783'}}>
            <span style={{color: '#020509'}}>Amenities</span>
          </h1>
        </div>
        <button 
          onClick={() => setShowBookingForm(true)}
          className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg" 
          style={{backgroundColor: '#178740'}} 
          onMouseEnter={(e) => e.target.style.backgroundColor = '#22C55E'} 
          onMouseLeave={(e) => e.target.style.backgroundColor = '#178740'}
        >
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
                  <p className="text-2xl font-bold" style={{color: stat.color}}>{stat.value}</p>
                </div>
                <Icon className="h-8 w-8" style={{color: stat.color}} />
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
                    amenity.available ? 'bg-green-100 text-[#22C55E]' : 'bg-red-100 text-[#EF4444]'
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
                    <Star className="h-4 w-4" style={{color: '#1B9AAA'}} />
                    {amenity.rating}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {amenity.type}
                  </span>
                  <button 
                    onClick={() => handleBookFacility(amenity)}
                    disabled={!amenity.available}
                    className={`font-medium text-sm ${
                      amenity.available 
                        ? 'text-[#147783] hover:text-[#1B9AAA]' 
                        : 'text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bookings Display */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4" style={{color: '#147783'}}>Recent Bookings</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amenity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.amenityName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.unitNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={bookingModalRef} className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border-2" style={{boxShadow: '0 20px 25px -5px rgba(20, 119, 131, 0.1), 0 10px 10px -5px rgba(20, 119, 131, 0.04)', borderColor: '#1B9AAA'}}>
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center">
                <img 
                  src="/short_logo.png" 
                  alt="Society360 Logo" 
                  className="h-8 w-auto mr-3"
                />
                <h2 className="text-xl font-semibold text-gray-900">Book Facility</h2>
              </div>
              <button
                onClick={() => setShowBookingForm(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Facility Selection */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Building className="h-5 w-5 mr-2" style={{color: '#1B9AAA'}} />
                  Facility Details
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Facility <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="amenityId"
                    value={formData.amenityId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all border-[#16808D]"
                    style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                    required
                  >
                    <option value="">Choose a facility...</option>
                    {amenities.filter(a => a.available).map(amenity => (
                      <option key={amenity.id} value={amenity.id}>{amenity.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2" style={{color: '#1B9AAA'}} />
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all border-[#16808D]"
                      style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                      placeholder="Enter your name"
                      required
                    />
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
                      className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all border-[#16808D]"
                      style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all border-[#16808D]"
                      style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                      placeholder="+1234567890"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Unit Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="unitNumber"
                      value={formData.unitNumber}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all border-[#16808D]"
                      style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                      placeholder="A-101"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Calendar className="h-5 w-5 mr-2" style={{color: '#1B9AAA'}} />
                  Booking Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all border-[#16808D]"
                      style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all border-[#16808D]"
                      style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration (hours)
                    </label>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all border-[#16808D]"
                      style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                    >
                      <option value="1">1 hour</option>
                      <option value="2">2 hours</option>
                      <option value="3">3 hours</option>
                      <option value="4">4 hours</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Purpose */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2" style={{color: '#1B9AAA'}} />
                  Purpose & Requests
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Purpose <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all border-[#16808D]"
                    style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                    placeholder="e.g., Family gathering, workout, meeting"
                    required
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA]"
                    style={{boxShadow: '0 1px 3px 0 rgba(20, 119, 131, 0.1), 0 1px 2px 0 rgba(20, 119, 131, 0.06)'}}
                    placeholder="Any special requirements or requests..."
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowBookingForm(false)}
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
                      Booking...
                    </>
                  ) : (
                    <>
                      <Calendar className="h-4 w-4 mr-2" />
                      Book Facility
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

export default Amenities;
