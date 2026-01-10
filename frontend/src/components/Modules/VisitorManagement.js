import React, { useState } from 'react';
import { Users, Shield, Clock, CheckCircle, XCircle, Plus, Search } from 'lucide-react';

const VisitorManagement = () => {
  const [visitors, setVisitors] = useState([
    { id: 1, name: 'Rahul Sharma', purpose: 'Delivery', unit: 'A-101', time: '10:30 AM', status: 'approved' },
    { id: 2, name: 'Priya Patel', purpose: 'Guest', unit: 'B-205', time: '11:15 AM', status: 'pending' },
    { id: 3, name: 'Amazon Delivery', purpose: 'Package', unit: 'C-302', time: '09:45 AM', status: 'completed' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredVisitors = visitors.filter(visitor => {
    const matchesSearch = visitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         visitor.purpose.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || visitor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          <span style={{color: '#147783'}}>Visitor</span>
          <span style={{color: '#020509'}}> Management</span>
        </h1>
        <button className="flex items-center justify-center px-8 py-3 bg-[#16808D] text-white rounded-lg font-semibold hover:bg-[#1B9AAA] hover:text-white transition-colors">
          <Plus className="ml-2 h-5 w-5" />
          Add Visitor
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search visitors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-[#0C4A50] focus:border-[#0C4A50]"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-[#0C4A50] focus:border-[#0C4A50]"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

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
              {filteredVisitors.map((visitor) => (
                <tr key={visitor.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#CCE7EC', color: '#147783'}}>
                        <Users className="h-4 w-4" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{visitor.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{visitor.purpose}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{visitor.unit}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{visitor.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      visitor.status === 'approved' ? 'bg-green-100 text-green-800' :
                      visitor.status === 'pending' ? 'bg-[#E0F7FA] text-[#142C52]' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {visitor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="mr-3" style={{color: '#1B9AAA'}} onMouseEnter={(e) => e.target.style.color = '#147783'} onMouseLeave={(e) => e.target.style.color = '#1B9AAA'}>View</button>
                    <button style={{color: '#4A5563'}} onMouseEnter={(e) => e.target.style.color = '#020509'} onMouseLeave={(e) => e.target.style.color = '#4A5563'}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VisitorManagement;
