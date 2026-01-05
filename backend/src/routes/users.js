const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// All routes are protected
router.use(protect);

// @desc    Get all users (management/staff only)
// @route   GET /api/users
// @access  Private (Management/Staff)
router.get('/', authorize('management', 'staff'), (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Users route - Get all users',
    data: []
  });
});

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private
router.get('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Users route - Get single user',
    data: { id: req.params.id }
  });
});

module.exports = router;
