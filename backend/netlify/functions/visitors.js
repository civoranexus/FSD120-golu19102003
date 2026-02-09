const express = require('express');
const serverless = require('serverless-http');

// Visitor management function
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

  if (path === '/visitors' && method === 'GET') {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: true,
        visitors: [
          {
            id: '1',
            name: 'John Doe',
            purpose: 'Visit Friend',
            host: 'Demo User',
            date: '2024-02-09',
            status: 'approved'
          },
          {
            id: '2',
            name: 'Jane Smith',
            purpose: 'Delivery',
            host: 'Demo User',
            date: '2024-02-09',
            status: 'pending'
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
