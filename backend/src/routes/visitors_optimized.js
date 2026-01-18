const express = require('express');
const visitorRoutes = express.Router();

// Mock database (in production, use MongoDB)
let visitors = [];
let visitorIdCounter = 1;

// Validation helper
const validateVisitor = (data) => {
  const errors = [];
  
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Valid name is required');
  }
  
  if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.push('Valid email is required');
  }
  
  if (!data.purpose || data.purpose.trim().length < 3) {
    errors.push('Purpose is required');
  }
  
  if (!data.unit || data.unit.trim().length < 3) {
    errors.push('Valid unit is required');
  }
  
  return errors;
};

// Get all visitors
visitorRoutes.get('/', (req, res) => {
  try {
    const { status, unit, date } = req.query;
    let filteredVisitors = [...visitors];
    
    // Apply filters
    if (status) {
      filteredVisitors = filteredVisitors.filter(v => v.status === status);
    }
    
    if (unit) {
      filteredVisitors = filteredVisitors.filter(v => v.unit.toLowerCase().includes(unit.toLowerCase()));
    }
    
    if (date) {
      filteredVisitors = filteredVisitors.filter(v => 
        new Date(v.expectedArrival).toDateString() === new Date(date).toDateString()
      );
    }
    
    res.json({
      success: true,
      data: filteredVisitors,
      count: filteredVisitors.length,
      filters: { status, unit, date }
    });
  } catch (error) {
    console.error('Error fetching visitors:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch visitor records'
    });
  }
});

// Get visitor by ID
visitorRoutes.get('/:id', (req, res) => {
  try {
    const visitor = visitors.find(v => v.id === parseInt(req.params.id));
    
    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: 'Visitor not found'
      });
    }
    
    res.json({
      success: true,
      data: visitor
    });
  } catch (error) {
    console.error('Error fetching visitor:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch visitor record'
    });
  }
});

// Create new visitor
visitorRoutes.post('/', (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      purpose,
      unit,
      expectedArrival,
      expectedDeparture,
      hostName,
      hostUnit,
      vehicleNumber
    } = req.body;
    
    // Validate input
    const validationErrors = validateVisitor({
      name, email, purpose, unit, expectedArrival
    });
    
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: validationErrors.join(', ')
      });
    }
    
    // Create visitor record
    const newVisitor = {
      id: visitorIdCounter++,
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || '',
      purpose: purpose.trim(),
      unit: unit.trim(),
      expectedArrival,
      expectedDeparture,
      hostName: hostName?.trim() || '',
      hostUnit: hostUnit?.trim() || '',
      vehicleNumber: vehicleNumber?.trim() || '',
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    visitors.push(newVisitor);
    
    res.status(201).json({
      success: true,
      message: 'Visitor registered successfully',
      data: newVisitor
    });
    
  } catch (error) {
    console.error('Error creating visitor:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to register visitor'
    });
  }
});

// Update visitor status
visitorRoutes.patch('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const visitorIndex = visitors.findIndex(v => v.id === parseInt(id));
    
    if (visitorIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Visitor not found'
      });
    }
    
    if (!['approved', 'rejected', 'checked-in', 'checked-out'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }
    
    visitors[visitorIndex].status = status;
    visitors[visitorIndex].updatedAt = new Date().toISOString();
    
    res.json({
      success: true,
      message: `Visitor ${status} successfully`,
      data: visitors[visitorIndex]
    });
    
  } catch (error) {
    console.error('Error updating visitor:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update visitor status'
    });
  }
});

// Delete visitor
visitorRoutes.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const visitorIndex = visitors.findIndex(v => v.id === parseInt(id));
    
    if (visitorIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Visitor not found'
      });
    }
    
    const deletedVisitor = visitors.splice(visitorIndex, 1)[0];
    
    res.json({
      success: true,
      message: 'Visitor record deleted successfully',
      data: deletedVisitor
    });
    
  } catch (error) {
    console.error('Error deleting visitor:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete visitor record'
    });
  }
});

module.exports = visitorRoutes;
