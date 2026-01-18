const express = require('express');
const maintenanceRoutes = express.Router();

// Mock database (in production, use MongoDB)
let maintenanceRequests = [];
let requestIdCounter = 1;

// Validation helper
const validateMaintenance = (data) => {
  const errors = [];
  
  if (!data.title || data.title.trim().length < 3) {
    errors.push('Title is required (min 3 characters)');
  }
  
  if (!data.description || data.description.trim().length < 10) {
    errors.push('Description is required (min 10 characters)');
  }
  
  if (!data.unit || data.unit.trim().length < 3) {
    errors.push('Unit is required');
  }
  
  if (!data.priority || !['low', 'medium', 'high', 'urgent'].includes(data.priority)) {
    errors.push('Valid priority is required (low, medium, high, urgent)');
  }
  
  if (!data.category || !['plumbing', 'electrical', 'carpentry', 'general', 'hvac', 'other'].includes(data.category)) {
    errors.push('Valid category is required');
  }
  
  return errors;
};

// Get all maintenance requests
maintenanceRoutes.get('/', (req, res) => {
  try {
    const { status, priority, category, unit } = req.query;
    let filteredRequests = [...maintenanceRequests];
    
    // Apply filters
    if (status) {
      filteredRequests = filteredRequests.filter(r => r.status === status);
    }
    
    if (priority) {
      filteredRequests = filteredRequests.filter(r => r.priority === priority);
    }
    
    if (category) {
      filteredRequests = filteredRequests.filter(r => r.category === category);
    }
    
    if (unit) {
      filteredRequests = filteredRequests.filter(r => 
        r.unit.toLowerCase().includes(unit.toLowerCase())
      );
    }
    
    // Sort by priority and date
    filteredRequests.sort((a, b) => {
      const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
      if (priorityOrder[b.priority] !== priorityOrder[a.priority]) {
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    
    res.json({
      success: true,
      data: filteredRequests,
      count: filteredRequests.length,
      filters: { status, priority, category, unit }
    });
  } catch (error) {
    console.error('Error fetching maintenance requests:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch maintenance requests'
    });
  }
});

// Get maintenance request by ID
maintenanceRoutes.get('/:id', (req, res) => {
  try {
    const request = maintenanceRequests.find(r => r.id === parseInt(req.params.id));
    
    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Maintenance request not found'
      });
    }
    
    res.json({
      success: true,
      data: request
    });
  } catch (error) {
    console.error('Error fetching maintenance request:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch maintenance request'
    });
  }
});

// Create new maintenance request
maintenanceRoutes.post('/', (req, res) => {
  try {
    const {
      title,
      description,
      unit,
      priority,
      category,
      requestedBy,
      contactPhone,
      preferredTime
    } = req.body;
    
    // Validate input
    const validationErrors = validateMaintenance({
      title, description, unit, priority, category
    });
    
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: validationErrors.join(', ')
      });
    }
    
    // Create maintenance request
    const newRequest = {
      id: requestIdCounter++,
      title: title.trim(),
      description: description.trim(),
      unit: unit.trim(),
      priority,
      category,
      requestedBy: requestedBy?.trim() || 'Anonymous',
      contactPhone: contactPhone?.trim() || '',
      preferredTime: preferredTime || null,
      status: 'pending',
      assignedTo: null,
      estimatedCost: null,
      actualCost: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    maintenanceRequests.push(newRequest);
    
    res.status(201).json({
      success: true,
      message: 'Maintenance request created successfully',
      data: newRequest
    });
    
  } catch (error) {
    console.error('Error creating maintenance request:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create maintenance request'
    });
  }
});

// Update maintenance request
maintenanceRoutes.patch('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const requestIndex = maintenanceRequests.findIndex(r => r.id === parseInt(id));
    
    if (requestIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Maintenance request not found'
      });
    }
    
    // Update allowed fields
    const allowedUpdates = ['status', 'assignedTo', 'estimatedCost', 'actualCost', 'notes'];
    const updates = {};
    
    allowedUpdates.forEach(field => {
      if (updateData[field] !== undefined) {
        updates[field] = updateData[field];
      }
    });
    
    maintenanceRequests[requestIndex] = {
      ...maintenanceRequests[requestIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    res.json({
      success: true,
      message: 'Maintenance request updated successfully',
      data: maintenanceRequests[requestIndex]
    });
    
  } catch (error) {
    console.error('Error updating maintenance request:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update maintenance request'
    });
  }
});

// Delete maintenance request
maintenanceRoutes.delete('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const requestIndex = maintenanceRequests.findIndex(r => r.id === parseInt(id));
    
    if (requestIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Maintenance request not found'
      });
    }
    
    const deletedRequest = maintenanceRequests.splice(requestIndex, 1)[0];
    
    res.json({
      success: true,
      message: 'Maintenance request deleted successfully',
      data: deletedRequest
    });
    
  } catch (error) {
    console.error('Error deleting maintenance request:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete maintenance request'
    });
  }
});

module.exports = maintenanceRoutes;
