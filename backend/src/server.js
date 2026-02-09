const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    message: 'Society360 API',
    version: '1.0.0',
    status: 'active'
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

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

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/visitors', require('./routes/visitors'));
app.use('/api/maintenance', require('./routes/maintenance'));
app.use('/api/finance', require('./routes/finance'));
app.use('/api/communication', require('./routes/communication'));
app.use('/api/administration', require('./routes/administration'));
app.use('/api/amenities', require('./routes/amenities'));
app.use('/api/payments', require('./routes/payments'));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: 'Server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    message: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
