const express = require('express');
const router = express.Router();
const { protect, authorize, requirePermission } = require('../middleware/auth');
const { validateVisitor } = require('../middleware/validation');
const {
  getVisitors,
  getVisitor,
  createVisitor,
  updateVisitorStatus,
  approveVisitor,
  cancelVisitor,
  getVisitorStats
} = require('../controllers/visitorController');

// All routes are protected
router.use(protect);

// @desc    Get all visitors
// @route   GET /api/visitors
// @access  Private
router.get('/', getVisitors);

// @desc    Get visitor statistics
// @route   GET /api/visitors/stats
// @access  Private (Management/Staff)
router.get('/stats', authorize('management', 'staff'), getVisitorStats);

// @desc    Get single visitor
// @route   GET /api/visitors/:id
// @access  Private
router.get('/:id', getVisitor);

// @desc    Create new visitor request
// @route   POST /api/visitors
// @access  Private
router.post('/', validateVisitor, createVisitor);

// @desc    Pre-approve visitor
// @route   PATCH /api/visitors/:id/approve
// @access  Private (Resident/Management)
router.patch('/:id/approve', authorize('resident', 'management'), approveVisitor);

// @desc    Cancel visitor request
// @route   PATCH /api/visitors/:id/cancel
// @access  Private
router.patch('/:id/cancel', cancelVisitor);

// @desc    Update visitor status (check-in/check-out)
// @route   PATCH /api/visitors/:id/status
// @access  Private (Staff/Management)
router.patch('/:id/status', authorize('staff', 'management'), updateVisitorStatus);

module.exports = router;
