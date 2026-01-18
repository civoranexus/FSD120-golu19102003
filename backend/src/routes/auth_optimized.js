const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authRoutes = express.Router();

// Mock user database (in production, use MongoDB)
const users = [];

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Helper function to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// Validation helper
const validateInput = (data) => {
  const errors = [];
  
  if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.push('Valid email is required');
  }
  
  if (!data.password || data.password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }
  
  return errors;
};

// Sign In Route
authRoutes.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    const validationErrors = validateInput({ email, password });
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: validationErrors.join(', ')
      });
    }
    
    // Find user (mock implementation)
    const user = users.find(u => u.email === email);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Compare password (in production, use bcrypt.compare)
    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    // Generate token
    const token = generateToken(user);
    
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          unit: user.unit
        },
        token
      }
    });
    
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Sign Up Route
authRoutes.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, unit } = req.body;
    
    // Validate input
    const validationErrors = validateInput({ email, password });
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: validationErrors.join(', ')
      });
    }
    
    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists'
      });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUser = {
      id: users.length + 1,
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      phone,
      unit,
      role: 'resident',
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    
    // Generate token
    const token = generateToken(newUser);
    
    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          unit: newUser.unit
        },
        token
      }
    });
    
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Verify Token Route
authRoutes.get('/verify', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }
    
    const decoded = jwt.verify(token, JWT_SECRET);
    
    res.json({
      success: true,
      message: 'Token is valid',
      data: decoded
    });
    
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
});

module.exports = authRoutes;
