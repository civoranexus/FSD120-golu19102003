const express = require('express');
const serverless = require('serverless-http');

// Health check function
exports.handler = async (event, context) => {
  // CORS headers for Netlify
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    'Content-Type': 'application/json'
  };

  // Handle OPTIONS requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: headers,
      body: '',
    };
  }

  return {
    statusCode: 200,
    headers: headers,
    body: JSON.stringify({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'Society360 API',
      environment: process.env.NODE_ENV || 'development'
    }),
  };
};
