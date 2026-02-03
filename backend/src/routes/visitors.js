const express = require('express');
const router = express.Router();

let visitors = [];

router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      data: visitors,
      count: visitors.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch visitors'
    });
  }
});

router.post('/', (req, res) => {
  try {
    const { name, email, phone, purpose, unit } = req.body;
    
    if (!name || !email || !phone || !purpose || !unit) {
      return res.status(400).json({
        success: false,
        message: 'All fields required'
      });
    }
    
    const newVisitor = {
      id: visitors.length + 1,
      name,
      email,
      phone,
      purpose,
      unit,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    visitors.push(newVisitor);
    
    res.status(201).json({
      success: true,
      message: 'Visitor registered successfully',
      data: newVisitor
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to register visitor'
    });
  }
});

router.put('/:id', (req, res) => {
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
    
    visitors[visitorIndex].status = status;
    
    res.json({
      success: true,
      message: 'Visitor status updated',
      data: visitors[visitorIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update visitor'
    });
  }
});

module.exports = router;

    if (!name || !purpose || !unit) {
      return res.status(400).json({
        success: false,
        message: 'Name, purpose, and unit are required fields'
      });
    }

    const newVisitor = {
      id: visitors.length + 1,
      name,
      email: email || '',
      phone: phone || '',
      purpose,
      unit,
      time: expectedArrival || new Date().toLocaleTimeString(),
      status: 'pending',
      hostName,
      hostUnit,
      expectedArrival,
      expectedDeparture,
      vehicleNumber: vehicleNumber || '',
      createdAt: new Date().toISOString()
    };

    visitors.push(newVisitor);

    res.status(201).json({
      success: true,
      message: 'Visitor registration successful',
      data: newVisitor
    });
  } catch (error) {
    console.error('Error registering visitor:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to register visitor'
    });
  }
});

visitorRoutes.put('/:id/status', (req, res) => {
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

    visitors[visitorIndex].status = status;

    res.json({
      success: true,
      message: `Visitor status updated to ${status}`,
      data: visitors[visitorIndex]
    });
  } catch (error) {
    console.error('Error updating visitor status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update visitor status'
    });
  }
});

module.exports = visitorRoutes;
