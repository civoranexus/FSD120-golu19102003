const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// All routes are protected and require management role
router.use(protect);
router.use(authorize('management'));

// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard
// @access  Private (Management)
router.get('/dashboard', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Admin route - Get dashboard statistics',
    data: {
      totalUsers: 0,
      totalUnits: 0,
      activeVisitors: 0,
      pendingMaintenance: 0,
      totalRevenue: 0
    }
  });
});

// @desc    Get system reports
// @route   GET /api/admin/reports
// @access  Private (Management)
router.get('/reports', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Admin route - Get system reports',
    data: []
  });
});

module.exports = router;
