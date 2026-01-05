const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// All routes are protected
router.use(protect);

// @desc    Get all bills
// @route   GET /api/billing
// @access  Private
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Billing route - Get all bills',
    data: []
  });
});

// @desc    Create new bill
// @route   POST /api/billing
// @access  Private (Management)
router.post('/', authorize('management'), (req, res) => {
  res.status(201).json({
    success: true,
    message: 'Billing route - Create bill',
    data: {}
  });
});

// @desc    Process payment
// @route   POST /api/billing/:id/pay
// @access  Private
router.post('/:id/pay', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Billing route - Process payment',
    data: { id: req.params.id }
  });
});

module.exports = router;
