import React, { useState, useEffect, useRef } from 'react';
import { Settings, Users, Building, Shield, Download, Search, BarChart, FileText, X, Plus, Mail, Lock, UserCheck } from 'lucide-react';
import jsPDF from 'jspdf';

const Administration = () => {
  const adminModalRef = useRef(null);
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Resident', unit: 'A-101', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Management', unit: 'Admin', status: 'Active' },
    { id: 3, name: 'Mike Wilson', email: 'mike@example.com', role: 'Staff', unit: 'Security', status: 'Active' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showEditUserForm, setShowEditUserForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Resident',
    unit: '',
    phone: ''
  });

  const [editUser, setEditUser] = useState({
    name: '',
    email: '',
    role: 'Resident',
    unit: '',
    phone: ''
  });

  const systemStats = [
    { title: 'Total Users', value: '156', icon: Users },
    { title: 'Active Units', value: '120', icon: Building },
    { title: 'System Uptime', value: '99.9%', icon: Shield },
    { title: 'Reports Generated', value: '45', icon: FileText },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showAddUserForm && adminModalRef.current && !adminModalRef.current.contains(event.target)) {
        setShowAddUserForm(false);
      }
      if (showEditUserForm && adminModalRef.current && !adminModalRef.current.contains(event.target)) {
        setShowEditUserForm(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showAddUserForm, showEditUserForm]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const newErrors = {};
    if (!newUser.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!newUser.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(newUser.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!newUser.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (newUser.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!newUser.role) {
      newErrors.role = 'Role is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const user = {
        id: users.length + 1,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        unit: newUser.unit || 'N/A',
        phone: newUser.phone || 'N/A',
        status: 'Active',
        createdAt: new Date().toISOString(),
        lastLogin: null
      };
      
      setUsers([user, ...users]);
      setNewUser({ name: '', email: '', password: '', role: 'Resident', unit: '', phone: '' });
      setShowAddUserForm(false);
      alert('User created successfully!');
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditUser({
      name: user.name,
      email: user.email,
      role: user.role,
      unit: user.unit,
      phone: user.phone || ''
    });
    setShowEditUserForm(true);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const newErrors = {};
    if (!editUser.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!editUser.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(editUser.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!editUser.role) {
      newErrors.role = 'Role is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setUsers(users.map(user => 
        user.id === selectedUser.id 
          ? { ...user, ...editUser, updatedAt: new Date().toISOString() }
          : user
      ));
      
      setEditUser({ name: '', email: '', role: 'Resident', unit: '', phone: '' });
      setSelectedUser(null);
      setShowEditUserForm(false);
      alert('User updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivateUser = async (user) => {
    if (window.confirm(`Are you sure you want to ${user.status === 'Active' ? 'deactivate' : 'activate'} ${user.name}?`)) {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const newStatus = user.status === 'Active' ? 'Inactive' : 'Active';
        setUsers(users.map(u => 
          u.id === user.id 
            ? { ...u, status: newStatus, updatedAt: new Date().toISOString() }
            : u
        ));
        
        alert(`User ${newStatus === 'Active' ? 'activated' : 'deactivated'} successfully!`);
      } catch (error) {
        console.error('Error updating user status:', error);
        alert('Failed to update user status. Please try again.');
      }
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const exportReport = () => {
    const reportData = {
      generatedAt: new Date().toLocaleString(),
      totalUsers: users.length,
      activeUsers: users.filter(u => u.status === 'Active').length,
      managementUsers: users.filter(u => u.role === 'Management').length,
      staffUsers: users.filter(u => u.role === 'Staff').length,
      residentUsers: users.filter(u => u.role === 'Resident').length,
      users: filteredUsers,
      systemStats: {
        totalUsers: systemStats[0].value,
        activeUnits: systemStats[1].value,
        systemUptime: systemStats[2].value,
        reportsGenerated: systemStats[3].value
      }
    };

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    const logoImg = new Image();
    logoImg.src = '/short_logo.png';
    
    doc.addImage(logoImg, 15, 10, 30, 30);
    
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Administrative Report', 60, 25);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated: ${reportData.generatedAt}`, 60, 35);
    
    doc.setLineWidth(0.5);
    doc.line(15, 45, 195, 45);
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('System Statistics', 15, 55);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Total Users: ${reportData.systemStats.totalUsers}`, 15, 65);
    doc.text(`Active Units: ${reportData.systemStats.activeUnits}`, 15, 72);
    doc.text(`System Uptime: ${reportData.systemStats.systemUptime}`, 15, 79);
    doc.text(`Reports Generated: ${reportData.systemStats.reportsGenerated}`, 15, 86);
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('User Statistics', 15, 100);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`Total Users: ${reportData.totalUsers}`, 15, 110);
    doc.text(`Active Users: ${reportData.activeUsers}`, 15, 117);
    doc.text(`Management Users: ${reportData.managementUsers}`, 15, 124);
    doc.text(`Staff Users: ${reportData.staffUsers}`, 15, 131);
    doc.text(`Resident Users: ${reportData.residentUsers}`, 15, 138);
    
    doc.line(15, 150, 195, 150);
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('User Details', 15, 160);
    
    let yPosition = 170;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    reportData.users.forEach((user, index) => {
      if (yPosition > 270) {
        doc.addPage();
        doc.addImage(logoImg, 15, 10, 30, 30);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Administrative Report (Continued)', 60, 25);
        yPosition = 55;
      }
      
      doc.text(`Name: ${user.name}`, 15, yPosition);
      doc.text(`Email: ${user.email}`, 15, yPosition + 7);
      doc.text(`Role: ${user.role}`, 15, yPosition + 14);
      doc.text(`Unit: ${user.unit}`, 15, yPosition + 21);
      doc.text(`Status: ${user.status.toUpperCase()}`, 15, yPosition + 28);
      
      if (user.status === 'Active') {
        doc.text('✓', 180, yPosition + 28);
      } else {
        doc.text('○', 180, yPosition + 28);
      }
      
      doc.setLineWidth(0.2);
      doc.line(15, yPosition + 35, 195, yPosition + 35);
      
      yPosition += 42;
    });
    
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.text('This is an automatically generated administrative report from Society360 Management System', 15, 280);
    doc.text('For any queries, please contact administration.', 15, 287);
    
    doc.save(`Society360_Administrative_Report_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src="/short_logo.png" alt="Society360 Logo" className="h-12 w-auto mr-4" />
          <h1 className="text-3xl font-bold">
            <span style={{color: '#147783'}}>Administration</span>
            <span style={{color: '#020509'}}> & Reporting</span>
          </h1>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowAddUserForm(true)}
            className="flex items-center space-x-2 text-white px-4 py-2 rounded-lg" 
            style={{backgroundColor: '#178740'}} 
            onMouseEnter={(e) => e.target.style.backgroundColor = '#22C55E'} 
            onMouseLeave={(e) => e.target.style.backgroundColor = '#178740'}
          >
            <Users className="h-4 w-4" />
            <span>Add User</span>
          </button>
          <button 
            onClick={exportReport}
            className="flex items-center justify-center px-8 py-3 bg-[#16808D] text-white rounded-lg font-semibold hover:bg-[#1B9AAA] hover:text-white transition-colors"
          >
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
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleEditUser(user)}
                      className="mr-3 flex items-center" 
                      style={{color: '#1B9AAA'}} 
                      onMouseEnter={(e) => e.target.style.color = '#147783'} 
                      onMouseLeave={(e) => e.target.style.color = '#1B9AAA'}
                    >
                      <Settings className="h-4 w-4 mr-1" />
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeactivateUser(user)}
                      className="flex items-center" 
                      style={{color: user.status === 'Active' ? '#EF4444' : '#22C55E'}} 
                      onMouseEnter={(e) => e.target.style.color = user.status === 'Active' ? '#EB1414' : '#16A34A'} 
                      onMouseLeave={(e) => e.target.style.color = user.status === 'Active' ? '#EF4444' : '#22C55E'}
                    >
                      <Lock className="h-4 w-4 mr-1" />
                      {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </button>
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

      {/* Add User Modal */}
      {showAddUserForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={adminModalRef} className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border-2" style={{borderColor: '#1B9AAA'}}>
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center">
                <img src="/short_logo.png" alt="Society360 Logo" className="h-8 w-auto mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">Add New User</h2>
              </div>
              <button 
                onClick={() => setShowAddUserForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleCreateUser} className="p-6 space-y-4">
              {/* User Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <UserCheck className="h-5 w-5 mr-2" style={{color: '#1B9AAA'}} />
                  User Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={newUser.name}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all ${
                        errors.name ? 'border-red-500' : 'border-[#16808D]'
                      }`}
                      style={{borderColor: errors.name ? '#EF4444' : '#1B9AAA', boxShadow: '0 1px 3px 0 rgba(27, 154, 170, 0.1), 0 1px 2px 0 rgba(27, 154, 170, 0.06)'}}
                      placeholder="Enter full name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={newUser.email}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all ${
                        errors.email ? 'border-red-500' : 'border-[#16808D]'
                      }`}
                      style={{borderColor: errors.email ? '#EF4444' : '#1B9AAA', boxShadow: '0 1px 3px 0 rgba(27, 154, 170, 0.1), 0 1px 2px 0 rgba(27, 154, 170, 0.06)'}}
                      placeholder="user@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={newUser.password}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all ${
                        errors.password ? 'border-red-500' : 'border-[#16808D]'
                      }`}
                      style={{borderColor: errors.password ? '#EF4444' : '#1B9AAA', boxShadow: '0 1px 3px 0 rgba(27, 154, 170, 0.1), 0 1px 2px 0 rgba(27, 154, 170, 0.06)'}}
                      placeholder="Enter password"
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={newUser.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all"
                      style={{borderColor: '#1B9AAA', boxShadow: '0 1px 3px 0 rgba(27, 154, 170, 0.1), 0 1px 2px 0 rgba(27, 154, 170, 0.06)'}}
                      placeholder="9876543210"
                    />
                  </div>
                </div>
              </div>

              {/* Access Details */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Lock className="h-5 w-5 mr-2" style={{color: '#1B9AAA'}} />
                  Access Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      User Role <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="role"
                      value={newUser.role}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all ${
                        errors.role ? 'border-red-500' : 'border-[#16808D]'
                      }`}
                      style={{borderColor: errors.role ? '#EF4444' : '#1B9AAA', boxShadow: '0 1px 3px 0 rgba(27, 154, 170, 0.1), 0 1px 2px 0 rgba(27, 154, 170, 0.06)'}}
                    >
                      <option value="Resident">Resident</option>
                      <option value="Management">Management</option>
                      <option value="Staff">Staff</option>
                      <option value="Security">Security</option>
                    </select>
                    {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Unit/Apartment
                    </label>
                    <input
                      type="text"
                      name="unit"
                      value={newUser.unit}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all"
                      style={{borderColor: '#1B9AAA', boxShadow: '0 1px 3px 0 rgba(27, 154, 170, 0.1), 0 1px 2px 0 rgba(27, 154, 170, 0.06)'}}
                      placeholder="A-101"
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAddUserForm(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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
                      Creating User...
                    </>
                  ) : (
                    <>
                      <UserCheck className="h-4 w-4 mr-2" />
                      Create User
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditUserForm && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={adminModalRef} className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border-2" style={{borderColor: '#1B9AAA'}}>
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center">
                <img src="/short_logo.png" alt="Society360 Logo" className="h-8 w-auto mr-3" />
                <h2 className="text-xl font-semibold text-gray-900">Edit User</h2>
              </div>
              <button 
                onClick={() => setShowEditUserForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form onSubmit={handleUpdateUser} className="p-6 space-y-4">
              {/* User Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <UserCheck className="h-5 w-5 mr-2" style={{color: '#1B9AAA'}} />
                  User Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={editUser.name}
                      onChange={handleEditInputChange}
                      className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all ${
                        errors.name ? 'border-red-500' : 'border-[#16808D]'
                      }`}
                      style={{borderColor: errors.name ? '#EF4444' : '#1B9AAA', boxShadow: '0 1px 3px 0 rgba(27, 154, 170, 0.1), 0 1px 2px 0 rgba(27, 154, 170, 0.06)'}}
                      placeholder="Enter full name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={editUser.email}
                      onChange={handleEditInputChange}
                      className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all ${
                        errors.email ? 'border-red-500' : 'border-[#16808D]'
                      }`}
                      style={{borderColor: errors.email ? '#EF4444' : '#1B9AAA', boxShadow: '0 1px 3px 0 rgba(27, 154, 170, 0.1), 0 1px 2px 0 rgba(27, 154, 170, 0.06)'}}
                      placeholder="user@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={editUser.phone}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all"
                      style={{borderColor: '#1B9AAA', boxShadow: '0 1px 3px 0 rgba(27, 154, 170, 0.1), 0 1px 2px 0 rgba(27, 154, 170, 0.06)'}}
                      placeholder="9876543210"
                    />
                  </div>
                </div>
              </div>

              {/* Access Details */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Lock className="h-5 w-5 mr-2" style={{color: '#1B9AAA'}} />
                  Access Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      User Role <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="role"
                      value={editUser.role}
                      onChange={handleEditInputChange}
                      className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all ${
                        errors.role ? 'border-red-500' : 'border-[#16808D]'
                      }`}
                      style={{borderColor: errors.role ? '#EF4444' : '#1B9AAA', boxShadow: '0 1px 3px 0 rgba(27, 154, 170, 0.1), 0 1px 2px 0 rgba(27, 154, 170, 0.06)'}}
                    >
                      <option value="Resident">Resident</option>
                      <option value="Management">Management</option>
                      <option value="Staff">Staff</option>
                      <option value="Security">Security</option>
                    </select>
                    {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Unit/Apartment
                    </label>
                    <input
                      type="text"
                      name="unit"
                      value={editUser.unit}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-[#1B9AAA] transition-all"
                      style={{borderColor: '#1B9AAA', boxShadow: '0 1px 3px 0 rgba(27, 154, 170, 0.1), 0 1px 2px 0 rgba(27, 154, 170, 0.06)'}}
                      placeholder="A-101"
                    />
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowEditUserForm(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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
                      Updating User...
                    </>
                  ) : (
                    <>
                      <UserCheck className="h-4 w-4 mr-2" />
                      Update User
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

export default Administration;
