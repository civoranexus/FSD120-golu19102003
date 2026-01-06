import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

interface Visitor {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  purpose: string;
  purposeDetails?: string;
  expectedArrival: string;
  expectedDeparture?: string;
  actualArrival?: string;
  actualDeparture?: string;
  vehicleNumber?: string;
  status: 'pending' | 'pre_approved' | 'checked_in' | 'checked_out' | 'cancelled';
  isPreApproved: boolean;
  host: {
    _id: string;
    name: string;
    phone: string;
  };
  hostUnit: {
    _id: string;
    unitNumber: string;
    block: string;
    floor: number;
  };
  createdAt: string;
}

const VisitorList: React.FC = () => {
  const { user } = useAuth();
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    search: '',
    dateFrom: '',
    dateTo: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });

  const fetchVisitors = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
        ...filters
      });

      const response = await axios.get(`/visitors?${params}`);
      setVisitors(response.data.data.visitors);
      setPagination(response.data.data.pagination);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch visitors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, [pagination.page, filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleStatusUpdate = async (visitorId: string, status: string, gateNumber?: string) => {
    try {
      await axios.patch(`/visitors/${visitorId}/status`, {
        status,
        gateNumber: gateNumber || 'Main Gate'
      });
      fetchVisitors();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update visitor status');
    }
  };

  const handleApprove = async (visitorId: string) => {
    try {
      await axios.patch(`/visitors/${visitorId}/approve`);
      fetchVisitors();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to approve visitor');
    }
  };

  const handleCancel = async (visitorId: string) => {
    if (window.confirm('Are you sure you want to cancel this visitor request?')) {
      try {
        await axios.patch(`/visitors/${visitorId}/cancel`);
        fetchVisitors();
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to cancel visitor');
      }
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      pre_approved: 'bg-blue-100 text-blue-800',
      checked_in: 'bg-green-100 text-green-800',
      checked_out: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status: string) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Visitor Management</h1>
        
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="pre_approved">Pre-approved</option>
              <option value="checked_in">Checked In</option>
              <option value="checked_out">Checked Out</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search by name, phone, vehicle..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
            <input
              type="date"
              name="dateFrom"
              value={filters.dateFrom}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
            <input
              type="date"
              name="dateTo"
              value={filters.dateTo}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Visitor List */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Visitor Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Purpose
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Host
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expected Arrival
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {visitors.map((visitor) => (
                <tr key={visitor._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{visitor.name}</div>
                      <div className="text-sm text-gray-500">{visitor.phone}</div>
                      {visitor.vehicleNumber && (
                        <div className="text-xs text-gray-400">Vehicle: {visitor.vehicleNumber}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{visitor.purpose}</div>
                    {visitor.purposeDetails && (
                      <div className="text-xs text-gray-500">{visitor.purposeDetails}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{visitor.host.name}</div>
                    <div className="text-xs text-gray-500">
                      {visitor.hostUnit.unitNumber}, {visitor.hostUnit.block}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(visitor.expectedArrival).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(visitor.status)}`}>
                      {getStatusText(visitor.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    {visitor.status === 'pending' && user?.role === 'resident' && (
                      <button
                        onClick={() => handleApprove(visitor._id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Approve
                      </button>
                    )}
                    
                    {visitor.status === 'pending' && ['staff', 'management'].includes(user?.role || '') && (
                      <button
                        onClick={() => handleStatusUpdate(visitor._id, 'checked_in')}
                        className="text-green-600 hover:text-green-900"
                      >
                        Check In
                      </button>
                    )}
                    
                    {visitor.status === 'checked_in' && ['staff', 'management'].includes(user?.role || '') && (
                      <button
                        onClick={() => handleStatusUpdate(visitor._id, 'checked_out')}
                        className="text-red-600 hover:text-red-900"
                      >
                        Check Out
                      </button>
                    )}
                    
                    {['pending', 'pre_approved'].includes(visitor.status) && (
                      <button
                        onClick={() => handleCancel(visitor._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {visitors.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No visitors found
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-gray-700">
              Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
              {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
              {pagination.total} results
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                disabled={pagination.page === 1}
                className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-3 py-1">
                Page {pagination.page} of {pagination.pages}
              </span>
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                disabled={pagination.page === pagination.pages}
                className="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisitorList;
