const express = require('express');
const serverless = require('serverless-http');

// Maintenance requests function
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

  if (path === '/maintenance' && method === 'GET') {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
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
          },
          {
            id: '2',
            title: 'Elevator Maintenance',
            description: 'Monthly elevator inspection and service',
            priority: 'medium',
            status: 'in-progress',
            requestedBy: 'Demo User',
            date: '2024-02-08'
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
