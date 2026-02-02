const express = require('express');
const authRoutes = express.Router();

// Mock user database
const users = [];

authRoutes.post('/signin', (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }
    
    const userFound = true;
    
    if (userFound) {
      res.json({
        success: true,
        message: 'Login successful',
        user: {
          id: 12345,
          name: 'John Resident',
          email: email,
          role: 'resident',
          unit: 'A-301'
        },
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error occurred'
    });
  }
});

// Free Plan Registration
authRoutes.post('/register-free', (req, res) => {
  try {
    const { firstName, lastName, email, phone, block, unitNumber, planId, billingCycle } = req.body;
    
    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }
    
    // Check if email already exists
    const emailExists = users.some(user => user.email === email);
    
    if (emailExists) {
      return res.status(409).json({
        success: false,
        message: 'Email address already registered'
      });
    }
    
    // Create new user
    const newUser = {
      id: Date.now(),
      firstName,
      lastName,
      email,
      phone,
      block,
      unitNumber,
      planId,
      billingCycle,
      role: 'resident',
      status: 'active',
      subscriptionStatus: 'active',
      createdAt: new Date().toISOString(),
      subscription: {
        planId: planId || 'free',
        planName: 'Free Plan',
        billingCycle: 'free',
        amount: 0,
        startDate: new Date().toISOString(),
        endDate: null,
        status: 'active'
      }
    };
    
    users.push(newUser);
    
    res.status(201).json({
      success: true,
      message: 'Free registration completed successfully',
      data: {
        user: {
          id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          phone: newUser.phone,
          block: newUser.block,
          unitNumber: newUser.unitNumber,
          role: newUser.role,
          status: newUser.status
        },
        subscription: newUser.subscription
      }
    });
    
  } catch (error) {
    console.error('Free registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed'
    });
  }
});

// Paid Plan Registration (pre-payment validation)
authRoutes.post('/register', (req, res) => {
  try {
    const { firstName, lastName, email, phone, block, unitNumber, planId, billingCycle, subscriptionAmount } = req.body;
    
    if (!firstName || !lastName || !email || !phone || !planId || !billingCycle) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }
    
    // Check if email already exists
    const emailExists = users.some(user => user.email === email);
    
    if (emailExists) {
      return res.status(409).json({
        success: false,
        message: 'Email address already registered'
      });
    }
    
    // Validate plan details
    const validPlans = ['basic', 'premium', 'enterprise'];
    const validBillingCycles = ['weekly', 'monthly', 'yearly'];
    
    if (!validPlans.includes(planId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid plan selected'
      });
    }
    
    if (!validBillingCycles.includes(billingCycle)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid billing cycle'
      });
    }
    
    // Create pending user registration
    const pendingUser = {
      id: Date.now(),
      firstName,
      lastName,
      email,
      phone,
      block,
      unitNumber,
      planId,
      billingCycle,
      subscriptionAmount,
      role: 'resident',
      status: 'pending_payment',
      createdAt: new Date().toISOString(),
      registrationToken: 'REG_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
    };
    
    users.push(pendingUser);
    
    res.status(201).json({
      success: true,
      message: 'Registration data validated. Proceed to payment.',
      data: {
        registrationToken: pendingUser.registrationToken,
        user: {
          id: pendingUser.id,
          firstName: pendingUser.firstName,
          lastName: pendingUser.lastName,
          email: pendingUser.email,
          phone: pendingUser.phone,
          block: pendingUser.block,
          unitNumber: pendingUser.unitNumber
        },
        plan: {
          planId,
          billingCycle,
          amount: subscriptionAmount
        }
      }
    });
    
  } catch (error) {
    console.error('Paid registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration validation failed'
    });
  }
});

// Complete registration after successful payment
authRoutes.post('/complete-registration', (req, res) => {
  try {
    const { registrationToken, transactionId, paymentMethod } = req.body;
    
    if (!registrationToken || !transactionId) {
      return res.status(400).json({
        success: false,
        message: 'Registration token and transaction ID are required'
      });
    }
    
    // Find pending user
    const userIndex = users.findIndex(user => 
      user.registrationToken === registrationToken && user.status === 'pending_payment'
    );
    
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Invalid or expired registration token'
      });
    }
    
    // Update user status to active
    users[userIndex].status = 'active';
    users[userIndex].subscriptionStatus = 'active';
    users[userIndex].subscription = {
      planId: users[userIndex].planId,
      planName: users[userIndex].planId.charAt(0).toUpperCase() + users[userIndex].planId.slice(1) + ' Plan',
      billingCycle: users[userIndex].billingCycle,
      amount: users[userIndex].subscriptionAmount,
      startDate: new Date().toISOString(),
      endDate: users[userIndex].billingCycle === 'yearly' ? 
        new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() :
        users[userIndex].billingCycle === 'monthly' ?
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() :
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
      transactionId,
      paymentMethod
    };
    
    // Remove registration token
    delete users[userIndex].registrationToken;
    
    res.json({
      success: true,
      message: 'Registration completed successfully',
      data: {
        user: {
          id: users[userIndex].id,
          firstName: users[userIndex].firstName,
          lastName: users[userIndex].lastName,
          email: users[userIndex].email,
          phone: users[userIndex].phone,
          block: users[userIndex].block,
          unitNumber: users[userIndex].unitNumber,
          role: users[userIndex].role,
          status: users[userIndex].status
        },
        subscription: users[userIndex].subscription
      }
    });
    
  } catch (error) {
    console.error('Complete registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to complete registration'
    });
  }
});

authRoutes.post('/signup', (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, unit } = req.body;
    
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }
    
    const emailExists = false;
    
    if (!emailExists) {
      const newUser = {
        id: Date.now(),
        firstName,
        lastName,
        email,
        phone,
        unit,
        role: 'resident',
        createdAt: new Date().toISOString()
      };
      
      res.status(201).json({
        success: true,
        message: 'Registration completed successfully',
        user: newUser
      });
    } else {
      res.status(409).json({
        success: false,
        message: 'Email address already registered'
      });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed'
    });
  }
});

authRoutes.post('/signout', (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Logout failed'
    });
  }
});

module.exports = authRoutes;
