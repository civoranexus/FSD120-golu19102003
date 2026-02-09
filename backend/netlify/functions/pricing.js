const express = require('express');
const serverless = require('serverless-http');

// Pricing plans function
exports.handler = async (event, context) => {
  const app = express();
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // CORS headers for Netlify
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
  });

  // Handle OPTIONS requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      },
      body: '',
    };
  }

  // Route handling
  const path = event.path.replace('/.netlify/functions', '');
  const method = event.httpMethod;

  if (path === '/pricing/plans' && method === 'GET') {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
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
      }),
    };
  }

  // Default response
  return {
    statusCode: 404,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      message: 'Function not found'
    }),
  };
};
