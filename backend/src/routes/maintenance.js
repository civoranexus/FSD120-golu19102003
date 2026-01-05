const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// All routes are protected
router.use(protect);

// @desc    Get all maintenance requests
// @route   GET /api/maintenance
// @access  Private
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Maintenance route - Get all requests',
    data: []
  });
});

// @desc    Create new maintenance request
// @route   POST /api/maintenance
// @access  Private
router.post('/', (req, res) => {
  res.status(201).json({
    success: true,
    message: 'Maintenance route - Create request',
    data: {}
  });
});

// @desc    Update maintenance request
// @route   PATCH /api/maintenance/:id
// @access  Private
router.patch('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Maintenance route - Update request',
    data: { id: req.params.id }
  });
});

module.exports = router;
