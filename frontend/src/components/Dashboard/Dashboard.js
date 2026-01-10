import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, Building, DollarSign, Clock, AlertCircle, TrendingUp, 
  Activity, BarChart3, PieChart, Calendar, Filter, Download, 
  RefreshCw, Settings, Bell, Search, ChevronUp, ChevronDown,
  Home, Wrench, CreditCard, Shield, FileText, Zap, Target
} from 'lucide-react';

const Dashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
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
  const [realTimeData, setRealTimeData] = useState({
    totalUsers: 1247,
    activeUnits: 892,
    totalRevenue: 2847500,
    pendingTasks: 23,
    occupancy: 78,
    satisfaction: 94
  });

  // Chart data for different time periods - Equal heights (बराबर) with different values (अलग)
  const chartDatasets = {
    daily: [
      { label: 'Mon', revenue: 45000, target: 50000 },    // Different values
      { label: 'Tue', revenue: 62000, target: 55000 },    // Same height
      { label: 'Wed', revenue: 78000, target: 60000 },    // Equal bars
      { label: 'Thu', revenue: 95000, target: 65000 },    // बराबर appearance
      { label: 'Fri', revenue: 112000, target: 70000 },    // अलग values
      { label: 'Sat', revenue: 128000, target: 75000 },     // Consistent look
      { label: 'Sun', revenue: 145000, target: 80000 }      // Professional chart
    ],
    weekly: [
      { label: 'Week 1', revenue: 320000, target: 350000 },    // Different values
      { label: 'Week 2', revenue: 410000, target: 400000 },    // Same height
      { label: 'Week 3', revenue: 485000, target: 450000 },    // Equal bars
      { label: 'Week 4', revenue: 560000, target: 500000 }     // बराबर appearance
    ],
    monthly: [
      { month: 'Jan', revenue: 800000, target: 900000 },    // Different values
      { month: 'Feb', revenue: 1100000, target: 1000000 },    // Same height
      { month: 'Mar', revenue: 1450000, target: 1100000 },    // Equal bars
      { month: 'Apr', revenue: 1850000, target: 1200000 },    // बराबर appearance
      { month: 'May', revenue: 2250000, target: 1300000 },    // अलग values
      { month: 'Jun', revenue: 2847500, target: 1400000 }     // Consistent look
    ],
    yearly: [
      { year: '2020', revenue: 4500000, target: 5000000 },    // Different values
      { year: '2021', revenue: 7800000, target: 6000000 },    // Same height
      { year: '2022', revenue: 12300000, target: 7000000 },    // Equal bars
      { year: '2023', revenue: 18900000, target: 8000000 },    // बराबर appearance
      { year: '2024', revenue: 22400000, target: 9000000 }    // अलग values
    ]
  };

  // Advanced color palettes
  const colorPalettes = {
    primary: {
      dark: '#070D15',
      medium: '#142C52',
      light: '#02394A',
      accent: '#1B9AAA',
      background: '#E0F7FA'
    },
    skyBlue: {
      lightest: '#E0F7FA',
      light: '#76D6E1',
      medium: '#1B9AAA',
      dark: '#147783',
      darkest: '#0C4A50'
    },
    darkBlack: {
      light: '#C9D0DA',
      medium: '#4A5563',
      dark: '#070D15',
      darker: '#040A10',
      darkest: '#020509'
    },
    darkBlue: {
      light: '#D4DBE9',
      medium: '#5B74A3',
      dark: '#142C52',
      darker: '#0E2140',
      darkest: '#071426'
    },
    tealNavy: {
      light: '#CCE7EC',
      medium: '#4C97A8',
      dark: '#02394A',
      darker: '#012136',
      darkest: '#01181F'
    }
  };

  const [chartData, setChartData] = useState({
    revenue: chartDatasets.monthly,
    occupancy: [
      { block: 'A', occupied: 45, total: 60, color: '#1B9AAA' },
      { block: 'B', occupied: 38, total: 60, color: '#178740' },
      { block: 'C', occupied: 52, total: 60, color: '#5B74A3' },
      { block: 'D', occupied: 29, total: 60, color: '#142C52' },
      { block: 'E', occupied: 41, total: 60, color: '#4C97A8' }
    ],
    activities: [
      { id: 1, type: 'visitor', message: 'New visitor registered - John Smith', time: '2 mins ago', icon: Users, color: '#1B9AAA' },
      { id: 2, type: 'maintenance', message: 'AC repair completed in Block A', time: '15 mins ago', icon: Wrench, color: '#178740' },
      { id: 3, type: 'payment', message: 'Payment received for Unit B-305', time: '1 hour ago', icon: CreditCard, color: '#178740' },
      { id: 4, type: 'alert', message: 'Water leakage reported in Block C', time: '2 hours ago', icon: AlertCircle, color: '#EF4444' },
      { id: 5, type: 'system', message: 'Monthly report generated', time: '3 hours ago', icon: FileText, color: '#5B74A3' }
    ]
  });

  const handleQuickAction = (actionId) => {
    switch(actionId) {
      case 1: // Add Visitor
        window.location.href = '/visitor-management';
        break;
      case 2: // Schedule Maintenance
        window.location.href = '/administration';
        break;
      case 3: // Generate Report
        window.location.href = '/finance';
        break;
      case 4: // Send Notification
        window.location.href = '/announcements';
        break;
      default:
        console.log('Unknown action:', actionId);
    }
  };

  const [quickActions] = useState([
    { id: 1, title: 'Add Visitor', icon: Users, color: '#1B9AAA', bgColor: '#E0F7FA' },
    { id: 2, title: 'Schedule Maintenance', icon: Wrench, color: '#178740', bgColor: '#E0F7FA' },
    { id: 3, title: 'Generate Report', icon: FileText, color: '#5B74A3', bgColor: '#E0F7FA' },
    { id: 4, title: 'Send Notification', icon: Bell, color: '#142C52', bgColor: '#E0F7FA' }
  ]);

  // Simulate real-time updates
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

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Simulate data refresh
      setRealTimeData(prev => ({
        ...prev,
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 10),
        totalRevenue: prev.totalRevenue + Math.floor(Math.random() * 50000)
      }));
    }, 1000);
  };

  const applyFilters = () => {
    setIsLoading(true);
    
    // Simulate filtering data based on selected filters
    setTimeout(() => {
      let filteredStats = { ...realTimeData };
      
      // Apply block filter
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
      
      // Apply status filter
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
      
      // Apply priority filter
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
      
      // Apply date range filter
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

  const displayData = filteredData || realTimeData;

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
    <div className="min-h-screen" style={{backgroundColor: colorPalettes.primary.background}} p-6>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold" style={{color: colorPalettes.primary.dark}} mb-2>Society360 Dashboard</h1>
            <p style={{color: colorPalettes.darkBlack.medium}}>Real-time overview of your society management system</p>
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
                className="pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 bg-white"
                style={{borderColor: colorPalettes.skyBlue.darkest, focusRingColor: colorPalettes.skyBlue.medium}}
              />
            </div>
            
            {/* Time Range Selector */}
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="px-4 py-2 rounded-lg focus:outline-none focus:ring-2 bg-white"
              style={{borderColor: colorPalettes.skyBlue.darkest, focusRingColor: colorPalettes.skyBlue.medium, color: colorPalettes.primary.light}}
            >
              <option value="24h">Last 24 hours</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>

            {/* Actions */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 text-white"
              style={{backgroundColor: colorPalettes.skyBlue.medium}}
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>

            <button
              onClick={handleRefresh}
              disabled={isLoading}
              className="px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 text-white disabled:opacity-50"
              style={{backgroundColor: colorPalettes.tealNavy.medium}}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            <button className="px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 text-white" style={{backgroundColor: colorPalettes.darkBlue.medium}}>
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="rounded-lg shadow-md p-4 mb-6 border" style={{backgroundColor: 'white', borderColor: colorPalettes.primary.background}}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{color: colorPalettes.primary.light}}>Block</label>
                <select 
                  value={filters.block}
                  onChange={(e) => setFilters(prev => ({...prev, block: e.target.value}))}
                  className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 bg-white" 
                  style={{borderColor: colorPalettes.skyBlue.darkest, focusRingColor: colorPalettes.skyBlue.medium}}
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
                  className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 bg-white" 
                  style={{borderColor: colorPalettes.skyBlue.darkest, focusRingColor: colorPalettes.skyBlue.medium}}
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
                  className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 bg-white" 
                  style={{borderColor: colorPalettes.skyBlue.darkest, focusRingColor: colorPalettes.skyBlue.medium}}
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
                  className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 bg-white" 
                  style={{borderColor: colorPalettes.skyBlue.darkest, focusRingColor: colorPalettes.skyBlue.medium}}
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
              <p className="text-2xl font-bold" style={{color: colorPalettes.tealNavy.dark}}>{displayData.totalUsers.toLocaleString()}</p>
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
              <p className="text-2xl font-bold" style={{color: colorPalettes.tealNavy.dark}}>{displayData.activeUnits}</p>
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
              <p className="text-2xl font-bold" style={{color: colorPalettes.tealNavy.dark}}>{formatCurrency(displayData.totalRevenue)}</p>
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
              <p className="text-2xl font-bold" style={{color: colorPalettes.tealNavy.dark}}>{displayData.pendingTasks}</p>
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
        {/* Revenue Chart */}
        <div className="rounded-lg shadow-md p-6" style={{backgroundColor: 'white'}}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold" style={{color: colorPalettes.primary.light}}>Revenue Overview</h3>
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" style={{color: colorPalettes.tealNavy.medium}} />
              <select 
                value={chartTimePeriod}
                onChange={(e) => handleChartTimePeriodChange(e.target.value)}
                className="text-sm rounded px-2 py-1 focus:outline-none focus:ring-2 bg-white" 
                style={{borderColor: colorPalettes.skyBlue.darkest, focusRingColor: colorPalettes.skyBlue.medium}}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between space-x-2">
            {chartData.revenue.map((data, index) => {
              const colors = ['#1B9AAA', '#178740', '#5B74A3', '#142C52', '#4C97A8', '#76D6E1'];
              const barColor = colors[index % colors.length];
              const fixedHeight = 60; // Fixed height for all bars
              const targetHeight = fixedHeight * 0.6; // Target bar slightly smaller
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex flex-col space-y-1">
                    <div 
                      className="w-full rounded-t transition-all duration-500"
                      style={{ 
                        height: `${fixedHeight}%`, 
                        backgroundColor: barColor,
                        minHeight: '20px'
                      }}
                    ></div>
                    <div 
                      className="w-full rounded-b opacity-50 transition-all duration-500"
                      style={{ 
                        height: `${targetHeight}%`, 
                        backgroundColor: colorPalettes.tealNavy.light,
                        minHeight: '12px'
                      }}
                    ></div>
                  </div>
                  <p className="text-xs mt-2" style={{color: colorPalettes.darkBlack.medium}}>{getChartLabel(data)}</p>
                  <p className="text-xs font-semibold" style={{color: colorPalettes.primary.light}}>{formatCurrency(data.revenue)}</p>
                </div>
              );
            })}
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
                className="p-4 rounded-lg border border-[#E0F7FA] hover:shadow-md transition-all hover:scale-105 flex flex-col items-center space-y-2"
                style={{ backgroundColor: action.bgColor }}
              >
                <div className="h-8 w-8 rounded-full flex items-center justify-center mx-auto mb-2">
                  <action.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-[#02394A]">{action.title}</span>
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
              <div className="absolute h-24 w-24 rounded-full border-8 border-[#178740] border-t-transparent border-r-transparent transform rotate-45"></div>
              <div className="absolute text-lg font-bold text-[#02394A]">{realTimeData.occupancy}%</div>
            </div>
            <p className="text-sm font-medium text-[#178740] mt-2">Occupancy Rate</p>
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
            <p className="text-sm font-medium text-[#178740] mt-2">Efficiency Rate</p>
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
  );
};

export default Dashboard;
