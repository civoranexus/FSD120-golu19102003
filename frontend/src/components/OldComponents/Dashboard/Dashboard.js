import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, Building, DollarSign, Clock, AlertCircle, TrendingUp, 
  Activity, BarChart3, PieChart, Calendar, Filter, Download, 
  RefreshCw, Settings, Bell, Search, ChevronUp, ChevronDown,
  Home, Wrench, CreditCard, Shield, FileText, Zap, Target,
  MessageSquare, Megaphone, X
} from 'lucide-react';

const Dashboard = () => {
  const securityModalRef = useRef(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showSecurityDropdown, setShowSecurityDropdown] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [notifications, setNotifications] = useState([]);
  const [filters, setFilters] = useState({
    block: 'all',
    status: 'all',
    priority: 'all',
    dateRange: 'all'
  });
  const [filteredData, setFilteredData] = useState(null);
  const [chartTimePeriod, setChartTimePeriod] = useState('monthly');

  const colorPalettes = {
    primary: {
      light: '#02394A',
      medium: '#142C52',
      dark: '#070D15'
    },
    skyBlue: {
      light: '#E0F7FA',
      medium: '#1B9AAA',
      dark: '#147783'
    },
    darkBlack: {
      light: '#C9D0DA',
      medium: '#4A5563',
      dark: '#070D15'
    },
    darkBlue: {
      light: '#D4DBE9',
      medium: '#5B74A3',
      dark: '#142C52'
    },
    tealNavy: {
      light: '#CCE7EC',
      medium: '#4C97A8',
      dark: '#02394A'
    }
  };
  const [displayData, setDisplayData] = useState({
    totalUsers: 1247,
    activeUnits: 156,
    totalRevenue: 2847500,
    pendingTasks: 23
  });
  const [realTimeData, setRealTimeData] = useState({
    totalUsers: 1247,
    activeUnits: 156,
    totalRevenue: 2847500,
    pendingTasks: 23,
    occupancy: 87,
    satisfaction: 94,
    newVisitors: 8,
    pendingMaintenance: 12,
    openComplaints: 5,
    recentPayments: 3
  });
  const [chartData, setChartData] = useState({
    revenue: [
      { label: 'Mon', revenue: 6500, target: 7000 },        // Start of week
      { label: 'Tue', revenue: 5800, target: 6500 },        // Decrease
      { label: 'Wed', revenue: 7200, target: 6800 },        // Increase
      { label: 'Thu', revenue: 6100, target: 7200 },        // Decrease
      { label: 'Fri', revenue: 8200, target: 7500 },        // Increase (weekend)
      { label: 'Sat', revenue: 7500, target: 8000 },        // Decrease
      { label: 'Sun', revenue: 6800, target: 7500 }         // Decrease
    ],
    weekly: [
      { label: 'Week 1', revenue: 45000, target: 50000 },     // Start point
      { label: 'Week 2', revenue: 38000, target: 45000 },     // Decrease
      { label: 'Week 3', revenue: 52000, target: 48000 },     // Increase
      { label: 'Week 4', revenue: 41000, target: 52000 }     // Decrease
    ],
    monthly: [
      { month: 'Jan', revenue: 120000, target: 90000 },      // Start point
      { month: 'Feb', revenue: 95000, target: 100000 },     // Decrease
      { month: 'Mar', revenue: 135000, target: 110000 },     // Increase
      { month: 'Apr', revenue: 115000, target: 120000 },     // Decrease
      { month: 'May', revenue: 165000, target: 130000 },     // Increase
      { month: 'Jun', revenue: 145000, target: 140000 }      // Decrease
    ],
    yearly: [
      { year: '2020', revenue: 450000, target: 500000 },      // Base year
      { year: '2021', revenue: 520000, target: 600000 },      // Increase
      { year: '2022', revenue: 480000, target: 700000 },      // Decrease
      { year: '2023', revenue: 580000, target: 800000 },      // Increase
      { year: '2024', revenue: 550000, target: 900000 }      // Decrease
    ],
    occupancy: [
      { block: 'A', occupied: 42, total: 48, color: '#1B9AAA' },
      { block: 'B', occupied: 38, total: 48, color: '#178740' },
      { block: 'C', occupied: 45, total: 48, color: '#5B74A3' },
      { block: 'D', occupied: 31, total: 48, color: '#142C52' }
    ],
    activities: [
      { id: 1, type: 'visitor', message: 'New visitor registration: John Smith', time: '2 mins ago', icon: Users, color: '#1B9AAA' },
      { id: 2, type: 'payment', message: 'Payment received for Unit A-101', time: '15 mins ago', icon: CreditCard, color: '#178740' },
      { id: 3, type: 'maintenance', message: 'Maintenance request submitted for B-205', time: '1 hour ago', icon: Wrench, color: '#5B74A3' },
      { id: 4, type: 'complaint', message: 'New complaint: Water leakage in C-302', time: '2 hours ago', icon: FileText, color: '#142C52' },
      { id: 5, type: 'system', message: 'Monthly report generated', time: '3 hours ago', icon: FileText, color: '#02394A' }
    ]
  });

  const chartDatasets = {
    daily: [
      { label: 'Mon', revenue: 6500, target: 7000 },
      { label: 'Tue', revenue: 5800, target: 6500 },
      { label: 'Wed', revenue: 7200, target: 6800 },
      { label: 'Thu', revenue: 6100, target: 7200 },
      { label: 'Fri', revenue: 8200, target: 7500 },
      { label: 'Sat', revenue: 7500, target: 8000 },
      { label: 'Sun', revenue: 6800, target: 7500 }
    ],
    weekly: [
      { label: 'Week 1', revenue: 45000, target: 50000 },
      { label: 'Week 2', revenue: 38000, target: 45000 },
      { label: 'Week 3', revenue: 52000, target: 48000 },
      { label: 'Week 4', revenue: 41000, target: 52000 }
    ],
    monthly: [
      { month: 'Jan', revenue: 120000, target: 90000 },
      { month: 'Feb', revenue: 95000, target: 100000 },
      { month: 'Mar', revenue: 135000, target: 110000 },
      { month: 'Apr', revenue: 115000, target: 120000 },
      { month: 'May', revenue: 165000, target: 130000 },
      { month: 'Jun', revenue: 145000, target: 140000 }
    ],
    yearly: [
      { year: '2020', revenue: 450000, target: 500000 },
      { year: '2021', revenue: 520000, target: 600000 },
      { year: '2022', revenue: 480000, target: 700000 },
      { year: '2023', revenue: 580000, target: 800000 },
      { year: '2024', revenue: 550000, target: 900000 }
    ]
  };

  const handleQuickAction = (actionId) => {
    switch(actionId) {
      case 1: // Add Visitor
        window.location.href = '/visitor-management';
        break;
      case 2: // Schedule Maintenance
        window.location.href = '/maintenance';
        break;
      case 3: // Generate Report
        window.location.href = '/finance';
        break;
      case 4: // Send Notification
        window.location.href = '/communication';
        break;
      case 5: // Report Now
        window.location.href = '/administration';
        break;
      case 6: // Security Support
        setShowSecurityDropdown(true);
        break;
      default:
        console.log('Unknown action:', actionId);
    }
  };

  const handleSecurityOptionClick = (path) => {
    setShowSecurityDropdown(false);
    window.location.href = path;
  };

  const [quickActions] = useState([
    { id: 1, title: 'Add Visitor', icon: Users, color: '#1B9AAA', bgColor: '#E0F7FA' },
    { id: 2, title: 'Schedule Maintenance', icon: Wrench, color: '#178740', bgColor: '#E0F7FA' },
    { id: 3, title: 'Finance & Billing', icon: FileText, color: '#5B74A3', bgColor: '#E0F7FA' },
    { id: 4, title: 'Check Notifications', icon: Bell, color: '#142C52', bgColor: '#E0F7FA' },
    { id: 5, title: 'Report Now', icon: Megaphone, color: '#02394A', bgColor: '#E0F7FA' },
    { id: 6, title: 'Security Support', icon: Shield, color: '#02394A', bgColor: '#E0F7FA' }
  ]);

  const securityOptions = [
    { id: 1, title: 'Amenities', icon: Zap, path: '/amenities' },
    { id: 2, title: 'Security', icon: Shield, path: '/security' },
    { id: 3, title: 'Complaint', icon: FileText, path: '/complaints' },
    { id: 4, title: 'Emergency', icon: AlertCircle, path: '/emergency' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 3),
        totalRevenue: prev.totalRevenue + Math.floor(Math.random() * 10000),
        pendingTasks: Math.max(0, prev.pendingTasks + (Math.random() > 0.7 ? 1 : -1))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSecurityDropdown && securityModalRef.current && !securityModalRef.current.contains(event.target)) {
        setShowSecurityDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSecurityDropdown]);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setRealTimeData(prev => ({
        ...prev,
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 10),
        totalRevenue: prev.totalRevenue + Math.floor(Math.random() * 50000)
      }));
    }, 1000);
  };

  const applyFilters = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      let filteredStats = { ...realTimeData };
      
      if (filters.block !== 'all') {
        const blockMultiplier = {
          'A': 1.2,
          'B': 0.9,
          'C': 1.1,
          'D': 0.7,
          'E': 1.0
        };
        const multiplier = blockMultiplier[filters.block] || 1;
        filteredStats.totalUsers = Math.floor(realTimeData.totalUsers * multiplier);
        filteredStats.activeUnits = Math.floor(realTimeData.activeUnits * multiplier);
        filteredStats.totalRevenue = Math.floor(realTimeData.totalRevenue * multiplier);
      }
      
      if (filters.status !== 'all') {
        const statusMultiplier = {
          'active': 1.3,
          'pending': 0.8,
          'completed': 1.1
        };
        const multiplier = statusMultiplier[filters.status] || 1;
        filteredStats.activeUnits = Math.floor(realTimeData.activeUnits * multiplier);
        filteredStats.pendingTasks = filters.status === 'pending' ? 
          Math.floor(realTimeData.pendingTasks * 2) : 
          Math.floor(realTimeData.pendingTasks * 0.5);
      }
      
      if (filters.priority !== 'all') {
        const priorityMultiplier = {
          'high': 1.4,
          'medium': 1.0,
          'low': 0.6
        };
        const multiplier = priorityMultiplier[filters.priority] || 1;
        filteredStats.totalRevenue = Math.floor(realTimeData.totalRevenue * multiplier);
        filteredStats.pendingTasks = filters.priority === 'high' ? 
          Math.floor(realTimeData.pendingTasks * 1.5) : 
          Math.floor(realTimeData.pendingTasks * 0.7);
      }
      
      if (filters.dateRange !== 'all') {
        const dateMultiplier = {
          '7d': 0.8,
          '30d': 1.0,
          '90d': 1.2
        };
        const multiplier = dateMultiplier[filters.dateRange] || 1;
        filteredStats.totalRevenue = Math.floor(realTimeData.totalRevenue * multiplier);
        filteredStats.totalUsers = Math.floor(realTimeData.totalUsers * multiplier);
      }
      
      setFilteredData(filteredStats);
      setIsLoading(false);
      setShowFilters(false);
    }, 1000);
  };

  const clearFilters = () => {
    setFilters({
      block: 'all',
      status: 'all',
      priority: 'all',
      dateRange: 'all'
    });
    setFilteredData(null);
  };

  const currentDisplayData = filteredData || realTimeData || {
  totalUsers: 1247,
  activeUnits: 156,
  totalRevenue: 2847500,
  pendingTasks: 23
};

  const handleChartTimePeriodChange = (period) => {
    setChartTimePeriod(period);
    setChartData(prev => ({
      ...prev,
      revenue: chartDatasets[period]
    }));
  };

  const getChartLabel = (data) => {
    return data.month || data.label || data.year || 'Unknown';
  };

  const getMaxRevenue = (data) => {
    return Math.max(...data.map(d => d.revenue), ...data.map(d => d.target));
  };

  const getMinRevenue = (data) => {
    return Math.min(...data.map(d => d.revenue), ...data.map(d => d.target));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getMetricIcon = (metric) => {
    switch (metric) {
      case 'users': return Users;
      case 'units': return Building;
      case 'revenue': return DollarSign;
      case 'tasks': return Clock;
      default: return Activity;
    }
  };

  const getMetricColor = (metric) => {
    switch (metric) {
      case 'users': return '#1B9AAA';
      case 'units': return '#178740';
      case 'revenue': return '#5B74A3';
      case 'tasks': return '#142C52';
      default: return '#4C97A8';
    }
  };

  return (
    <div className="min-h-screen p-6" style={{
      backgroundColor: '#E0F7FA',
      backgroundImage: `
        linear-gradient(rgba(224, 247, 250, 0.8) 1px, transparent 1px),
        linear-gradient(90deg, rgba(224, 247, 250, 0.8) 1px, transparent 1px)
      `,
      backgroundSize: '50px 50px',
      backgroundPosition: '0 0, 0 0',
      borderRadius: '2rem',
      overflow: 'hidden',
      width: '110%',
      marginLeft: '-4rem',
      paddingLeft: '2rem',
      marginRight: '-3rem',
      paddingRight: '2rem'
    }}>
      {/* Main Dashboard Container */}
      <div className="max-w-full mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8" style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          width: '100%'
        }}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <img 
              src="/short_logo.png" 
              alt="Society360 Logo" 
              className="h-12 w-auto mr-3"
            />
            <div>
              <h1 className="text-3xl font-bold" style={{color: colorPalettes.primary.dark}} mb-2>Society360 Dashboard</h1>
              <p style={{color: colorPalettes.darkBlack.medium}}>Real-time overview of your society management system</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{color: colorPalettes.darkBlack.medium}} />
              <input
                type="text"
                placeholder="Search dashboard..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 bg-white border-2"
                style={{borderColor: colorPalettes.skyBlue.medium, focusRingColor: colorPalettes.skyBlue.light}}
              />
            </div>
            
            {/* Time Range Selector */}
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="px-4 py-2 rounded-lg focus:outline-none focus:ring-2 bg-white border-2"
              style={{borderColor: colorPalettes.skyBlue.medium, focusRingColor: colorPalettes.skyBlue.light, color: colorPalettes.primary.light}}
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>

            {/* Actions */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 text-white border-2 hover:bg-[#1B9AAA] hover:text-white"
              style={{backgroundColor: colorPalettes.skyBlue.medium}}
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>

            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 text-white disabled:opacity-50 border-2 hover:bg-[#1B9AAA] hover:text-white"
              style={{backgroundColor: colorPalettes.tealNavy.medium}}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            <button className="px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 text-white border-2 hover:bg-[#1B9AAA] hover:text-white" style={{backgroundColor: colorPalettes.darkBlue.medium}}>
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="rounded-lg shadow-md p-4 mb-6 border" style={{backgroundColor: 'white', borderColor: colorPalettes.skyBlue.medium}}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{color: colorPalettes.primary.light}}>Block</label>
                <select 
                  value={filters.block}
                  onChange={(e) => setFilters(prev => ({...prev, block: e.target.value}))}
                  className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 bg-white border-2" 
                  style={{borderColor: colorPalettes.skyBlue.medium, focusRingColor: colorPalettes.skyBlue.light}}
                >
                  <option value="all">All Blocks</option>
                  <option value="A">Block A</option>
                  <option value="B">Block B</option>
                  <option value="C">Block C</option>
                  <option value="D">Block D</option>
                  <option value="E">Block E</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{color: colorPalettes.primary.light}}>Status</label>
                <select 
                  value={filters.status}
                  onChange={(e) => setFilters(prev => ({...prev, status: e.target.value}))}
                  className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 bg-white border-2" 
                  style={{borderColor: colorPalettes.skyBlue.medium, focusRingColor: colorPalettes.skyBlue.light}}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{color: colorPalettes.primary.light}}>Priority</label>
                <select 
                  value={filters.priority}
                  onChange={(e) => setFilters(prev => ({...prev, priority: e.target.value}))}
                  className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 bg-white border-2" 
                  style={{borderColor: colorPalettes.skyBlue.medium, focusRingColor: colorPalettes.skyBlue.light}}
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{color: colorPalettes.primary.light}}>Date Range</label>
                <select 
                  value={filters.dateRange}
                  onChange={(e) => setFilters(prev => ({...prev, dateRange: e.target.value}))}
                  className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 bg-white border-2" 
                  style={{borderColor: colorPalettes.skyBlue.medium, focusRingColor: colorPalettes.skyBlue.light}}
                >
                  <option value="all">All Time</option>
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                  <option value="90d">Last 90 Days</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={clearFilters}
                className="px-4 py-2 rounded-lg transition-colors text-white"
                style={{backgroundColor: colorPalettes.darkBlack.medium}}
              >
                Clear Filters
              </button>
              <button
                onClick={applyFilters}
                disabled={isLoading}
                className="px-4 py-2 rounded-lg transition-colors text-white disabled:opacity-50"
                style={{backgroundColor: colorPalettes.skyBlue.medium}}
              >
                {isLoading ? 'Applying...' : 'Apply Filters'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow" style={{backgroundColor: 'white', borderLeft: `4px solid ${colorPalettes.skyBlue.medium}`}}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium" style={{color: colorPalettes.tealNavy.dark}}>Total Users</p>
              <p className="text-2xl font-bold" style={{color: colorPalettes.tealNavy.dark}}>{currentDisplayData.totalUsers.toLocaleString()}</p>
              <p className="text-sm flex items-center mt-2" style={{color: '#178740'}}>
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% from last month
              </p>
            </div>
            <div className="h-12 w-12 rounded-full flex items-center justify-center" style={{backgroundColor: colorPalettes.tealNavy.light, color: colorPalettes.skyBlue.medium}}>
              <Users className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow" style={{backgroundColor: 'white', borderLeft: `4px solid ${colorPalettes.tealNavy.medium}`}}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium" style={{color: colorPalettes.tealNavy.dark}}>Active Units</p>
              <p className="text-2xl font-bold" style={{color: colorPalettes.tealNavy.dark}}>{currentDisplayData.activeUnits}</p>
              <p className="text-sm flex items-center mt-2" style={{color: '#EF4444'}}>
                <ChevronDown className="h-3 w-3 mr-1" />
                -5% from last month
              </p>
            </div>
            <div className="h-12 w-12 rounded-full flex items-center justify-center" style={{backgroundColor: colorPalettes.tealNavy.light, color: colorPalettes.tealNavy.medium}}>
              <Building className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow" style={{backgroundColor: 'white', borderLeft: `4px solid ${colorPalettes.darkBlue.medium}`}}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium" style={{color: colorPalettes.tealNavy.dark}}>Total Revenue</p>
              <p className="text-2xl font-bold" style={{color: colorPalettes.tealNavy.dark}}>{formatCurrency(currentDisplayData.totalRevenue)}</p>
              <p className="text-sm flex items-center mt-2" style={{color: '#178740'}}>
                <TrendingUp className="h-3 w-3 mr-1" />
                +18% from last month
              </p>
            </div>
            <div className="h-12 w-12 rounded-full flex items-center justify-center" style={{backgroundColor: colorPalettes.tealNavy.light, color: colorPalettes.darkBlue.medium}}>
              <DollarSign className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow" style={{backgroundColor: 'white', borderLeft: `4px solid ${colorPalettes.primary.medium}`}}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium" style={{color: colorPalettes.tealNavy.dark}}>Pending Tasks</p>
              <p className="text-2xl font-bold" style={{color: colorPalettes.tealNavy.dark}}>{currentDisplayData.pendingTasks}</p>
              <p className="text-sm flex items-center mt-2" style={{color: '#EF4444'}}>
                <ChevronDown className="h-3 w-3 mr-1" />
                -8% from last month
              </p>
            </div>
            <div className="h-12 w-12 rounded-full flex items-center justify-center" style={{backgroundColor: colorPalettes.tealNavy.light, color: colorPalettes.primary.medium}}>
              <Clock className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Overview - Fresh Implementation */}
        <div className="rounded-lg shadow-md p-6 bg-white">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold" style={{color: '#02394A'}}>Revenue Overview</h3>
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" style={{color: '#4C97A8'}} />
              <select 
                value={chartTimePeriod}
                onChange={(e) => handleChartTimePeriodChange(e.target.value)}
                className="text-sm rounded px-3 py-1 border border-[#E0F7FA] focus:outline-none focus:ring-2 focus:ring-[#1B9AAA]"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>
          
          {/* Chart Container */}
          <div className="h-64 flex items-end justify-between space-x-3 px-4">
            {chartData.revenue.map((data, index) => {
              const mixedColors = [
                { from: '#1B9AAA', to: '#147783', hover: '#0C4A50' },  // Sky Blue palette
                { from: '#178740', to: '#0F4C2A', hover: '#0A3420' },  // Green (from existing)
                { from: '#5B74A3', to: '#415A8A', hover: '#364A75' },  // Dark Blue palette
                { from: '#142C52', to: '#0E2140', hover: '#071426' },  // Dark Blue palette
                { from: '#4C97A8', to: '#02394A', hover: '#01181F' },  // Teal Navy palette
                { from: '#76D6E1', to: '#4C97A8', hover: '#1B9AAA' }   // Sky Blue palette
              ];
              const colorScheme = mixedColors[index % mixedColors.length];
              
              const maxRevenue = Math.max(...chartData.revenue.map(d => d.revenue));
              const minRevenue = Math.min(...chartData.revenue.map(d => d.revenue));
              const revenueRange = maxRevenue - minRevenue;
              
              const normalizedValue = revenueRange > 0 ? (data.revenue - minRevenue) / revenueRange : 0;
              const barHeight = normalizedValue * 165 + 15; // 15-180px range for continuous scaling
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full">
                    <div 
                      className="w-full rounded-t-lg transition-all duration-300"
                      style={{ 
                        background: `linear-gradient(to top, ${colorScheme.from}, ${colorScheme.to})`,
                        height: `${barHeight}px`
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = `linear-gradient(to top, ${colorScheme.hover}, ${colorScheme.to})`;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = `linear-gradient(to top, ${colorScheme.from}, ${colorScheme.to})`;
                      }}
                    ></div>
                  </div>
                  <div className="mt-3 text-center">
                    <p className="text-xs font-medium" style={{color: '#4A5563'}}>{getChartLabel(data)}</p>
                    <p className="text-sm font-bold" style={{color: '#02394A'}}>{formatCurrency(data.revenue)}</p>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Summary Stats */}
          <div className="mt-6 pt-4 border-t border-[#E0F7FA]">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-xs" style={{color: '#4A5563'}}>Total Revenue</p>
                <p className="text-lg font-bold" style={{color: '#02394A'}}>
                  {formatCurrency(chartData.revenue.reduce((sum, item) => sum + item.revenue, 0))}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs" style={{color: '#4A5563'}}>Average</p>
                <p className="text-lg font-bold" style={{color: '#02394A'}}>
                  {formatCurrency(Math.round(chartData.revenue.reduce((sum, item) => sum + item.revenue, 0) / chartData.revenue.length))}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs" style={{color: '#4A5563'}}>Growth</p>
                <p className="text-lg font-bold" style={{color: '#178740'}}>+12.5%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Occupancy Chart */}
        <div className="rounded-lg shadow-md p-6" style={{backgroundColor: 'white'}}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold" style={{color: colorPalettes.primary.light}}>Unit Occupancy</h3>
            <div className="flex items-center space-x-2">
              <PieChart className="h-5 w-5" style={{color: colorPalettes.tealNavy.medium}} />
              <span className="text-sm" style={{color: colorPalettes.darkBlack.medium}}>Overall: {realTimeData.occupancy}%</span>
            </div>
          </div>
          <div className="space-y-3">
            {chartData.occupancy.map((block, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium" style={{color: colorPalettes.primary.light}}>Block {block.block}</span>
                    <span style={{color: colorPalettes.darkBlack.medium}}>{block.occupied}/{block.total}</span>
                  </div>
                  <div className="w-full rounded-full h-2" style={{backgroundColor: '#E5E7EB'}}>
                    <div 
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${(block.occupied / block.total) * 100}%`,
                        backgroundColor: block.color
                      }}
                    ></div>
                  </div>
                </div>
                <span className="text-sm font-medium" style={{color: colorPalettes.primary.light}}>
                  {Math.round((block.occupied / block.total) * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-[#02394A] mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={() => handleQuickAction(action.id)}
                className="p-4 rounded-lg border border-[#E0F7FA] hover:shadow-md transition-all hover:scale-105 flex flex-col items-center space-y-2 min-h-[120px]"
                style={{ backgroundColor: action.bgColor }}
              >
                <div className="h-8 w-8 rounded-full flex items-center justify-center mx-auto mb-2">
                  <action.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-[#02394A] text-center">{action.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#02394A]">Recent Activities</h3>
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-[#4C97A8]" />
              <button className="text-sm text-[#1B9AAA] hover:text-[#147783]">View All</button>
            </div>
          </div>
          <div className="space-y-3">
            {chartData.activities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#E0F7FA] transition-colors">
                <div className="p-2 rounded-full" style={{backgroundColor: '#CCE7EC', color: activity.color}}>
                  <activity.icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#02394A]">{activity.message}</p>
                  <p className="text-xs text-[#4A5563]">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-[#02394A] mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="relative inline-flex items-center justify-center">
              <div className="h-24 w-24 rounded-full border-8 border-[#E0F7FA]"></div>
              <div className="absolute h-24 w-24 rounded-full border-8 border-[#1B9AAA] border-t-transparent border-r-transparent transform rotate-45"></div>
              <div className="absolute text-lg font-bold text-[#02394A]">{realTimeData.occupancy}%</div>
            </div>
            <p className="text-sm font-medium text-[#1B9AAA] mt-2">Occupancy Rate</p>
          </div>
          
          <div className="text-center">
            <div className="relative inline-flex items-center justify-center">
              <div className="h-24 w-24 rounded-full border-8 border-[#E0F7FA]"></div>
              <div className="absolute h-24 w-24 rounded-full border-8 border-[#178740] border-t-transparent border-r-transparent transform rotate-45"></div>
              <div className="absolute text-lg font-bold text-[#02394A]">{realTimeData.satisfaction}%</div>
            </div>
            <p className="text-sm font-medium text-[#178740] mt-2">Satisfaction Score</p>
          </div>
          
          <div className="text-center">
            <div className="relative inline-flex items-center justify-center">
              <div className="h-24 w-24 rounded-full border-8 border-[#E0F7FA]"></div>
              <div className="absolute h-24 w-24 rounded-full border-8 border-[#5B74A3] border-t-transparent border-r-transparent transform rotate-45"></div>
              <div className="absolute text-lg font-bold text-[#02394A]">92%</div>
            </div>
            <p className="text-sm font-medium text-[#5B74A3] mt-2">Efficiency Rate</p>
          </div>
        </div>
      </div>

      {/* Additional Features Section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Statistics */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#02394A]">Monthly Statistics</h3>
            <Calendar className="h-5 w-5 text-[#4C97A8]" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-[#E0F7FA] rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-[#1B9AAA] flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#02394A]">New Registrations</p>
                  <p className="text-xs text-[#4A5563]">This month</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-[#1B9AAA]">47</p>
                <p className="text-xs text-[#22C55E]">+12%</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-[#E0F7FA] rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-[#178740] flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#02394A]">Revenue Collected</p>
                  <p className="text-xs text-[#4A5563]">This month</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-[#178740]">$284K</p>
                <p className="text-xs text-[#22C55E]">+18%</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-[#E0F7FA] rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-[#5B74A3] flex items-center justify-center">
                  <Wrench className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#02394A]">Maintenance Tasks</p>
                  <p className="text-xs text-[#4A5563]">Completed</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-[#5B74A3]">23</p>
                <p className="text-xs text-[#22C55E]">+8%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[#02394A]">Activity Timeline</h3>
            <Activity className="h-5 w-5 text-[#4C97A8]" />
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="h-8 w-8 rounded-full bg-[#1B9AAA] flex items-center justify-center flex-shrink-0 mt-1">
                <Users className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-[#02394A]">New User Registration</p>
                  <span className="text-xs text-[#4A5563]">2 mins ago</span>
                </div>
                <p className="text-xs text-[#4A5563] mt-1">John Smith registered for Block A</p>
                <div className="mt-2 h-1 bg-[#E0F7FA] rounded"></div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="h-8 w-8 rounded-full bg-[#178740] flex items-center justify-center flex-shrink-0 mt-1">
                <CreditCard className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-[#02394A]">Payment Received</p>
                  <span className="text-xs text-[#4A5563]">15 mins ago</span>
                </div>
                <p className="text-xs text-[#4A5563] mt-1">Monthly dues paid for Unit B-305</p>
                <div className="mt-2 h-1 bg-[#E0F7FA] rounded"></div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="h-8 w-8 rounded-full bg-[#EF4444] flex items-center justify-center flex-shrink-0 mt-1">
                <AlertCircle className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-[#02394A]">Maintenance Alert</p>
                  <span className="text-xs text-[#4A5563]">1 hour ago</span>
                </div>
                <p className="text-xs text-[#4A5563] mt-1">Water leakage reported in Block C</p>
                <div className="mt-2 h-1 bg-[#E0F7FA] rounded"></div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="h-8 w-8 rounded-full bg-[#5B74A3] flex items-center justify-center flex-shrink-0 mt-1">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-[#02394A]">Report Generated</p>
                  <span className="text-xs text-[#4A5563]">3 hours ago</span>
                </div>
                <p className="text-xs text-[#4A5563] mt-1">Monthly financial report completed</p>
                <div className="mt-2 h-1 bg-[#E0F7FA] rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performers Section */}
      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-[#02394A]">Top Performers</h3>
          <Target className="h-5 w-5 text-[#4C97A8]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-[#E0F7FA] rounded-lg">
            <div className="h-12 w-12 rounded-full bg-[#1B9AAA] flex items-center justify-center mx-auto mb-2">
              <Users className="h-6 w-6 text-white" />
            </div>
            <p className="text-lg font-bold text-[#02394A]">Block A</p>
            <p className="text-sm text-[#22C55E]">95% Occupancy</p>
            <div className="mt-2 flex justify-center">
              {[1,2,3,4,5].map((star) => (
                <div key={star} className="h-4 w-4 bg-[#1B9AAA] rounded-full mx-0.5"></div>
              ))}
            </div>
          </div>
          
          <div className="text-center p-4 bg-[#E0F7FA] rounded-lg">
            <div className="h-12 w-12 rounded-full bg-[#178740] flex items-center justify-center mx-auto mb-2">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <p className="text-lg font-bold text-[#02394A]">Block B</p>
            <p className="text-sm text-[#22C55E]">92% Revenue</p>
            <div className="mt-2 flex justify-center">
              {[1,2,3,4,5].map((star) => (
                <div key={star} className="h-4 w-4 bg-[#178740] rounded-full mx-0.5"></div>
              ))}
            </div>
          </div>
          
          <div className="text-center p-4 bg-[#E0F7FA] rounded-lg">
            <div className="h-12 w-12 rounded-full bg-[#5B74A3] flex items-center justify-center mx-auto mb-2">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <p className="text-lg font-bold text-[#02394A]">Block C</p>
            <p className="text-sm text-[#22C55E]">98% Safety</p>
            <div className="mt-2 flex justify-center">
              {[1,2,3,4,5].map((star) => (
                <div key={star} className="h-4 w-4 bg-[#5B74A3] rounded-full mx-0.5"></div>
              ))}
            </div>
          </div>
          
          <div className="text-center p-4 bg-[#E0F7FA] rounded-lg">
            <div className="h-12 w-12 rounded-full bg-[#142C52] flex items-center justify-center mx-auto mb-2">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <p className="text-lg font-bold text-[#02394A]">Block D</p>
            <p className="text-sm text-[#22C55E]">90% Efficiency</p>
            <div className="mt-2 flex justify-center">
              {[1,2,3,4,5].map((star) => (
                <div key={star} className="h-4 w-4 bg-[#142C52] rounded-full mx-0.5"></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="h-8 w-8 rounded-full bg-[#1B9AAA] flex items-center justify-center mx-auto mb-2">
            <Users className="h-4 w-4 text-white" />
          </div>
          <p className="text-2xl font-bold text-[#02394A]">1,247</p>
          <p className="text-xs text-[#4A5563]">Total Users</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="h-8 w-8 rounded-full bg-[#178740] flex items-center justify-center mx-auto mb-2">
            <Building className="h-4 w-4 text-white" />
          </div>
          <p className="text-2xl font-bold text-[#02394A]">892</p>
          <p className="text-xs text-[#4A5563]">Active Units</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="h-8 w-8 rounded-full bg-[#5B74A3] flex items-center justify-center mx-auto mb-2">
            <DollarSign className="h-4 w-4 text-white" />
          </div>
          <p className="text-2xl font-bold text-[#02394A]">$2.8M</p>
          <p className="text-xs text-[#4A5563]">Revenue</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="h-8 w-8 rounded-full bg-[#142C52] flex items-center justify-center mx-auto mb-2">
            <Clock className="h-4 w-4 text-white" />
          </div>
          <p className="text-2xl font-bold text-[#02394A]">23</p>
          <p className="text-xs text-[#4A5563]">Pending</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="h-8 w-8 rounded-full bg-[#EF4444] flex items-center justify-center mx-auto mb-2">
            <AlertCircle className="h-4 w-4 text-white" />
          </div>
          <p className="text-2xl font-bold text-[#02394A]">5</p>
          <p className="text-xs text-[#4A5563]">Alerts</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="h-8 w-8 rounded-full bg-[#22C55E] flex items-center justify-center mx-auto mb-2">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
          <p className="text-2xl font-bold text-[#02394A]">94%</p>
          <p className="text-xs text-[#4A5563]">Growth</p>
        </div>
      </div>
        </div>
      </div>

      {/* Security Support Full Page Overlay */}
      {showSecurityDropdown && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={securityModalRef} className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <img 
                  src="/short_logo.png" 
                  alt="Society360 Logo" 
                  className="h-8 w-auto"
                />
                <h2 className="text-2xl font-bold" style={{color: '#02394A'}}>Security Support</h2>
              </div>
              <button
                onClick={() => setShowSecurityDropdown(false)}
                className="p-2 rounded-full hover:bg-[#E0F7FA] transition-colors"
              >
                <X className="h-6 w-6" style={{color: '#02394A'}} />
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {securityOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSecurityOptionClick(option.path)}
                  className="p-6 rounded-xl border-2 border-[#E0F7FA] hover:shadow-lg transition-all hover:scale-105 flex flex-col items-center space-y-4 min-h-[180px]"
                  style={{ backgroundColor: '#E0F7FA' }}
                >
                  <div className="h-16 w-16 rounded-full flex items-center justify-center" style={{backgroundColor: '#CCE7EC'}}>
                    <option.icon className="h-8 w-8" style={{color: '#02394A'}} />
                  </div>
                  <span className="text-lg font-semibold text-[#02394A] text-center">{option.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
