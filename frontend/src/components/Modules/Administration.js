import React, { useState } from 'react';
import { Settings, Users, Building, Shield, Download, Search, BarChart, FileText } from 'lucide-react';

const Administration = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Resident', unit: 'A-101', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Management', unit: 'Admin', status: 'Active' },
    { id: 3, name: 'Mike Wilson', email: 'mike@example.com', role: 'Staff', unit: 'Security', status: 'Active' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const systemStats = [
    { title: 'Total Users', value: '156', icon: Users },
    { title: 'Active Units', value: '120', icon: Building },
    { title: 'System Uptime', value: '99.9%', icon: Shield },
    { title: 'Reports Generated', value: '45', icon: FileText },
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          <span style={{color: '#147783'}}>Administration</span>
          <span style={{color: '#020509'}}> & Reporting</span>
        </h1>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg" style={{backgroundColor: '#178740'}} onMouseEnter={(e) => e.target.style.backgroundColor = '#22C55E'} onMouseLeave={(e) => e.target.style.backgroundColor = '#178740'}>
            <Users className="h-4 w-4" />
            <span>Add User</span>
          </button>
          <button className="flex items-center justify-center px-8 py-3 bg-[#16808D] text-white rounded-lg font-semibold hover:bg-[#1B9AAA] hover:text-white transition-colors">
            <Download className="ml-2 h-5 w-5" />
            Export Report
          </button>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {systemStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="h-8 w-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#CCE7EC', color: '#5B74A3'}}>
                  <Icon className="h-4 w-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* User Management */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">User Management</h2>
        </div>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-[#0C4A50] focus:border-[#0C4A50]"
              />
            </div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-[#0C4A50] focus:border-[#0C4A50]"
            >
              <option value="all">All Roles</option>
              <option value="Resident">Resident</option>
              <option value="Management">Management</option>
              <option value="Staff">Staff</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:border-[#0C4A50] focus:border-[#0C4A50]"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full flex items-center justify-center text-white font-semibold text-sm" style={{backgroundColor: '#CCE7EC', color: '#142C52'}}>
                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === 'Management' ? 'bg-[#C9D0DA] text-[#142C52]' :
                      user.role === 'Staff' ? 'bg-[#E0F7FA] text-[#142C52]' :
                      'bg-[#D4DBE9] text-[#02394A]'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.unit}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="mr-3" style={{color: '#1B9AAA'}} onMouseEnter={(e) => e.target.style.color = '#147783'} onMouseLeave={(e) => e.target.style.color = '#1B9AAA'}>Edit</button>
                    <button style={{color: '#EF4444'}} onMouseEnter={(e) => e.target.style.color = '#EB1414'} onMouseLeave={(e) => e.target.style.color = '#EF4444'}>Deactivate</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reports Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Generate Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
            <BarChart className="h-6 w-6 mb-2" style={{color: '#147783'}} />
            <h3 className="font-medium text-gray-900">Financial Report</h3>
            <p className="text-sm text-gray-600">Monthly revenue and expenses</p>
          </button>
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
            <Users className="h-6 w-6 mb-2" style={{color: '#178740'}} />
            <h3 className="font-medium text-gray-900">User Activity Report</h3>
            <p className="text-sm text-gray-600">Login and engagement statistics</p>
          </button>
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
            <Shield className="h-6 w-6 mb-2" style={{color: '#5B74A3'}} />
            <h3 className="font-medium text-gray-900">Facility Report</h3>
            <p className="text-sm text-gray-600">Maintenance and visitor statistics</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Administration;
