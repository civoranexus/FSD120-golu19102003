const express = require('express');
const { body, query, validationResult } = require('express-validator');
const adminRoutes = express.Router();

// Validation middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// Mock data (in production, this would come from database)
let systemUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Resident',
    unit: 'A-101',
    status: 'Active',
    phone: '9876543210',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-01-15T09:30:00Z'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Management',
    unit: 'Admin',
    status: 'Active',
    phone: '9876543211',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-01-15T08:45:00Z'
  },
  {
    id: 3,
    name: 'Mike Wilson',
    email: 'mike@example.com',
    role: 'Staff',
    unit: 'Security',
    status: 'Active',
    phone: '9876543212',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-01-14T22:15:00Z'
  }
];

const systemMetrics = {
  totalUsers: 156,
  activeUnits: 120,
  systemUptime: '99.9%',
  reportsGenerated: 45,
  lastUpdated: new Date().toISOString()
};

// Get admin dashboard data
adminRoutes.get('/dashboard', (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        metrics: systemMetrics,
        recentActivity: systemUsers.slice(0, 5),
        systemHealth: {
          database: 'operational',
          api: 'operational',
          authentication: 'operational',
          storage: 'operational'
        }
      }
    });
  } catch (error) {
    console.error('Error fetching admin dashboard:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to load dashboard data'
    });
  }
});

// Get all users with filtering and pagination
adminRoutes.get('/users', [
  query('search').optional().isString().trim(),
  query('role').optional().isIn(['all', 'Resident', 'Management', 'Staff']),
  query('status').optional().isIn(['all', 'Active', 'Inactive']),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 })
], handleValidationErrors, (req, res) => {
  try {
    const { search, role, status, page = 1, limit = 10 } = req.query;
    
    let filteredUsers = systemUsers;
    
    if (search) {
      filteredUsers = filteredUsers.filter(user => 
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (role && role !== 'all') {
      filteredUsers = filteredUsers.filter(user => user.role === role);
    }
    
    if (status && status !== 'all') {
      filteredUsers = filteredUsers.filter(user => user.status === status);
    }
    
    const startIndex = (page - 1) * limit;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + parseInt(limit));
    
    res.json({
      success: true,
      data: {
        users: paginatedUsers,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(filteredUsers.length / limit),
          totalUsers: filteredUsers.length,
          hasNextPage: startIndex + limit < filteredUsers.length,
          hasPreviousPage: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Create new user
adminRoutes.post('/users', [
  body('name').trim().isLength({ min: 1, max: 100 }).withMessage('Name must be between 1 and 100 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Please enter a valid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('role').isIn(['Resident', 'Management', 'Staff']).withMessage('Invalid role specified'),
  body('unit').trim().isLength({ min: 1, max: 20 }).withMessage('Unit must be between 1 and 20 characters'),
  body('phone').optional().isMobilePhone('en-IN').withMessage('Please enter a valid phone number')
], handleValidationErrors, (req, res) => {
  try {
    const { name, email, password, role, unit, phone } = req.body;
    
    // Check if user already exists
    if (systemUsers.some(user => user.email === email)) {
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists'
      });
    }
    
    // Create new user
    const newUser = {
      id: systemUsers.length + 1,
      name,
      email,
      role,
      unit,
      status: 'Active',
      phone: phone || '',
      createdAt: new Date().toISOString(),
      lastLogin: null
    };
    
    systemUsers.push(newUser);
    
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        unit: newUser.unit,
        status: newUser.status
      }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create user',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Update user status
adminRoutes.put('/users/:id/status', [
  body('status').isIn(['Active', 'Inactive']).withMessage('Invalid status specified')
], handleValidationErrors, (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const userIndex = systemUsers.findIndex(user => user.id === parseInt(id));
    
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    systemUsers[userIndex].status = status;
    
    res.json({
      success: true,
      message: 'User status updated successfully',
      data: {
        id: systemUsers[userIndex].id,
        name: systemUsers[userIndex].name,
        status: systemUsers[userIndex].status
      }
    });
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update user status',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Delete user
adminRoutes.delete('/users/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    const userIndex = systemUsers.findIndex(user => user.id === parseInt(id));
    
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    const deletedUser = systemUsers.splice(userIndex, 1)[0];
    
    res.json({
      success: true,
      message: 'User deleted successfully',
      data: {
        id: deletedUser.id,
        name: deletedUser.name
      }
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete user',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Get system statistics
adminRoutes.get('/statistics', (req, res) => {
  try {
    const statistics = {
      users: {
        total: systemUsers.length,
        active: systemUsers.filter(user => user.status === 'Active').length,
        inactive: systemUsers.filter(user => user.status === 'Inactive').length,
        byRole: {
          Resident: systemUsers.filter(user => user.role === 'Resident').length,
          Management: systemUsers.filter(user => user.role === 'Management').length,
          Staff: systemUsers.filter(user => user.role === 'Staff').length
        }
      },
      system: systemMetrics,
      lastUpdated: new Date().toISOString()
    };
    
    res.json({
      success: true,
      data: statistics
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

module.exports = adminRoutes;
