const express = require('express');
const serverless = require('serverless-http');

// User profile function
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

  if (path === '/users/profile' && method === 'GET') {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: true,
        user: {
          id: 'demo_user_123',
          name: 'Demo User',
          email: 'demo@society360.com',
          role: 'resident',
          society: 'Demo Society',
          joinDate: '2024-01-15'
        }
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
