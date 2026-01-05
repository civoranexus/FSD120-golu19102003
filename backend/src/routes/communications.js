const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// All routes are protected
router.use(protect);

// @desc    Get all communications
// @route   GET /api/communications
// @access  Private
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Communications route - Get all communications',
    data: []
  });
});

// @desc    Create new communication
// @route   POST /api/communications
// @access  Private
router.post('/', (req, res) => {
  res.status(201).json({
    success: true,
    message: 'Communications route - Create communication',
    data: {}
  });
});

// @desc    Add comment to communication
// @route   POST /api/communications/:id/comments
// @access  Private
router.post('/:id/comments', (req, res) => {
  res.status(201).json({
    success: true,
    message: 'Communications route - Add comment',
    data: { id: req.params.id }
  });
});

module.exports = router;
