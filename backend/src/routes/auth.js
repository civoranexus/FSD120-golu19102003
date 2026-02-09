const express = require('express');
const router = express.Router();

const users = [];

router.post('/signin', (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password required'
      });
    }
    
    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: 1,
        name: 'John Resident',
        email: email,
        role: 'resident'
      },
      token: 'mock-jwt-token'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
});

router.post('/register', (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields required'
      });
    }
    
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already exists'
      });
    }
    
    const newUser = {
      id: users.length + 1,
      name,
      email,
      role: 'resident',
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    
    res.status(201).json({
      success: true,
      message: 'Registration successful',
      user: newUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Registration failed'
    });
  }
});

router.post('/register-free', (req, res) => {
  try {
    const { name, email, phone } = req.body;
    
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'All fields required'
      });
    }
    
    const newUser = {
      id: users.length + 1,
      name,
      email,
      phone,
      role: 'resident',
      plan: 'free',
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    
    res.status(201).json({
      success: true,
      message: 'Free registration successful',
      user: newUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Registration failed'
    });
  }
});

router.post('/signout', (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

module.exports = router;
