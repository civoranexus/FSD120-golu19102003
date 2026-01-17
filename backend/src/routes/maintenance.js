const express = require('express');
const maintenanceRoutes = express.Router();

let maintenanceRequests = [
  {
    id: 1,
    title: 'Water Leakage in A-301',
    description: 'Water leaking from ceiling in bedroom',
    category: 'Plumbing',
    priority: 'high',
    status: 'pending',
    unit: 'A-301',
    residentName: 'John Resident',
    email: 'john@email.com',
    phone: '9876543210',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    title: 'AC Not Working',
    description: 'Air conditioner not cooling properly',
    category: 'Electrical',
    priority: 'medium',
    status: 'in-progress',
    unit: 'B-205',
    residentName: 'Jane Smith',
    email: 'jane@email.com',
    phone: '9876543211',
    createdAt: '2024-01-14T14:20:00Z'
  }
];

maintenanceRoutes.get('/', (req, res) => {
  try {
    const { status, priority, category } = req.query;
    
    let filteredRequests = maintenanceRequests;
    
    if (status && status !== 'all') {
      filteredRequests = filteredRequests.filter(req => req.status === status);
    }
    
    if (priority && priority !== 'all') {
      filteredRequests = filteredRequests.filter(req => req.priority === priority);
    }
    
    if (category && category !== 'all') {
      filteredRequests = filteredRequests.filter(req => req.category === category);
    }

    res.json({
      success: true,
      data: filteredRequests,
      count: filteredRequests.length,
      filters: { status, priority, category }
    });
  } catch (error) {
    console.error('Error fetching maintenance requests:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch maintenance requests'
    });
  }
});

maintenanceRoutes.post('/', (req, res) => {
  try {
    const {
      title,
      description,
      category,
      priority,
      unit,
      residentName,
      email,
      phone
    } = req.body;

    if (!title || !description || !category || !unit) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, category, and unit are required'
      });
    }

    const newRequest = {
      id: maintenanceRequests.length + 1,
      title,
      description,
      category,
      priority: priority || 'medium',
      status: 'pending',
      unit,
      residentName,
      email: email || '',
      phone: phone || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    maintenanceRequests.push(newRequest);

    res.status(201).json({
      success: true,
      message: 'Maintenance request submitted successfully',
      data: newRequest
    });
  } catch (error) {
    console.error('Error creating maintenance request:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit maintenance request'
    });
  }
});

maintenanceRoutes.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { status, priority } = req.body;

    const requestIndex = maintenanceRequests.findIndex(req => req.id === parseInt(id));
    
    if (requestIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Maintenance request not found'
      });
    }

    if (status) maintenanceRequests[requestIndex].status = status;
    if (priority) maintenanceRequests[requestIndex].priority = priority;
    maintenanceRequests[requestIndex].updatedAt = new Date().toISOString();

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

module.exports = maintenanceRoutes;
