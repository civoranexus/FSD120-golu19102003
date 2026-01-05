const express = require('express');
const router = express.Router();
const { protect, authorize, requirePermission } = require('../middleware/auth');

// All routes are protected
router.use(protect);

// @desc    Get all visitors
// @route   GET /api/visitors
// @access  Private
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Visitors route - Get all visitors',
    data: []
  });
});

// @desc    Create new visitor request
// @route   POST /api/visitors
// @access  Private
router.post('/', (req, res) => {
  res.status(201).json({
    success: true,
    message: 'Visitors route - Create visitor',
    data: {}
  });
});

// @desc    Update visitor status (check-in/check-out)
// @route   PATCH /api/visitors/:id/status
// @access  Private (Staff/Management)
router.patch('/:id/status', authorize('staff', 'management'), (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Visitors route - Update visitor status',
    data: { id: req.params.id }
  });
});

module.exports = router;
