const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration for Netlify
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://society360.netlify.app',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// Pricing plans endpoint (static data for demo)
app.get('/api/pricing/plans', (req, res) => {
  res.json({
    success: true,
    plans: [
      {
        id: 'basic',
        name: 'Basic',
        price: 999,
        duration: 'month',
        features: [
          'Visitor Management',
          'Maintenance Requests',
          'Basic Analytics',
          'Email Support'
        ],
        popular: false
      },
      {
        id: 'premium',
        name: 'Premium',
        price: 1999,
        duration: 'month',
        features: [
          'All Basic Features',
          'Advanced Analytics',
          'Priority Support',
          'Custom Reports',
          'API Access'
        ],
        popular: true
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: 4999,
        duration: 'month',
        features: [
          'All Premium Features',
          'Unlimited Users',
          'Custom Integrations',
          'Dedicated Support',
          'White-label Option'
        ],
        popular: false
      }
    ]
  });
});

// Mock user data for demo
app.get('/api/users/profile', (req, res) => {
  res.json({
    success: true,
    user: {
      id: 'demo_user_123',
      name: 'Demo User',
      email: 'demo@society360.com',
      role: 'resident',
      society: 'Demo Society',
      joinDate: '2024-01-15'
    }
  });
});

// Mock visitor data
app.get('/api/visitors', (req, res) => {
  res.json({
    success: true,
    visitors: [
      {
        id: '1',
        name: 'John Doe',
        purpose: 'Visit Friend',
        host: 'Demo User',
        date: '2024-02-09',
        status: 'approved'
      }
    ]
  });
});

// Mock maintenance requests
app.get('/api/maintenance', (req, res) => {
  res.json({
    success: true,
    requests: [
      {
        id: '1',
        title: 'Water Leak Repair',
        description: 'Fix water leak in kitchen',
        priority: 'high',
        status: 'pending',
        requestedBy: 'Demo User',
        date: '2024-02-09'
      }
    ]
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: 'Server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
