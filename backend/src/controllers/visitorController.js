const Visitor = require('../models/Visitor');
const User = require('../models/User');
const Unit = require('../models/Unit');

// @desc    Get all visitors (with filtering)
// @route   GET /api/visitors
// @access  Private
const getVisitors = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      host,
      dateFrom,
      dateTo,
      search
    } = req.query;

    // Build filter object
    const filter = {};
    
    if (status) filter.status = status;
    if (host) filter.host = host;
    
    // Date range filter
    if (dateFrom || dateTo) {
      filter.visitDate = {};
      if (dateFrom) filter.visitDate.$gte = new Date(dateFrom);
      if (dateTo) filter.visitDate.$lte = new Date(dateTo);
    }
    
    // Search filter
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { vehicleNumber: { $regex: search, $options: 'i' } }
      ];
    }

    // Role-based filtering
    if (req.user.role === 'resident') {
      filter.host = req.user._id;
    }

    const visitors = await Visitor.find(filter)
      .populate('host', 'name phone')
      .populate('hostUnit', 'unitNumber block floor')
      .populate('checkedInBy', 'name')
      .populate('checkedOutBy', 'name')
      .sort({ visitDate: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Visitor.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: {
        visitors,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get visitors error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching visitors'
    });
  }
};

// @desc    Get single visitor
// @route   GET /api/visitors/:id
// @access  Private
const getVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id)
      .populate('host', 'name phone email')
      .populate('hostUnit', 'unitNumber block floor')
      .populate('checkedInBy', 'name')
      .populate('checkedOutBy', 'name')
      .populate('approvedBy', 'name')
      .populate('gateEntryLogs.staff', 'name');

    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: 'Visitor not found'
      });
    }

    // Check access permissions
    if (req.user.role === 'resident' && visitor.host._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.status(200).json({
      success: true,
      data: { visitor }
    });
  } catch (error) {
    console.error('Get visitor error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching visitor'
    });
  }
};

// @desc    Create new visitor request
// @route   POST /api/visitors
// @access  Private
const createVisitor = async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      purpose,
      purposeDetails,
      expectedArrival,
      expectedDeparture,
      vehicleNumber,
      idProof,
      companions,
      notes
    } = req.body;

    // Get user's unit
    let hostUnit = req.user.unit;
    if (req.user.role === 'resident' && !hostUnit) {
      return res.status(400).json({
        success: false,
        message: 'Please assign a unit to your profile first'
      });
    }

    const visitor = new Visitor({
      name,
      phone,
      email,
      purpose,
      purposeDetails,
      host: req.user._id,
      hostUnit,
      expectedArrival: new Date(expectedArrival),
      expectedDeparture: expectedDeparture ? new Date(expectedDeparture) : null,
      vehicleNumber,
      idProof,
      companions: companions || [],
      notes,
      status: 'pending',
      isPreApproved: false
    });

    await visitor.save();

    // Populate visitor data for response
    await visitor.populate('host', 'name phone');
    await visitor.populate('hostUnit', 'unitNumber block floor');

    res.status(201).json({
      success: true,
      message: 'Visitor request created successfully',
      data: { visitor }
    });
  } catch (error) {
    console.error('Create visitor error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error creating visitor request'
    });
  }
};

// @desc    Update visitor status (check-in/check-out)
// @route   PATCH /api/visitors/:id/status
// @access  Private (Staff/Management)
const updateVisitorStatus = async (req, res) => {
  try {
    const { status, gateNumber, remarks } = req.body;
    const visitorId = req.params.id;

    const visitor = await Visitor.findById(visitorId);
    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: 'Visitor not found'
      });
    }

    // Validate status transitions
    const validTransitions = {
      'pending': ['pre_approved', 'checked_in', 'cancelled'],
      'pre_approved': ['checked_in', 'cancelled'],
      'checked_in': ['checked_out'],
      'checked_out': [],
      'cancelled': []
    };

    if (!validTransitions[visitor.status].includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status transition from ${visitor.status} to ${status}`
      });
    }

    // Update visitor status
    visitor.status = status;
    
    // Add gate entry log for check-in/check-out
    if (status === 'checked_in' || status === 'checked_out') {
      visitor.gateEntryLogs.push({
        timestamp: new Date(),
        action: status === 'checked_in' ? 'entry' : 'exit',
        gateNumber: gateNumber || 'Main Gate',
        staff: req.user._id,
        remarks: remarks || ''
      });

      if (status === 'checked_in') {
        visitor.checkedInBy = req.user._id;
        visitor.actualArrival = new Date();
      } else if (status === 'checked_out') {
        visitor.checkedOutBy = req.user._id;
        visitor.actualDeparture = new Date();
      }
    }

    await visitor.save();

    // Populate updated visitor data
    await visitor.populate('host', 'name phone');
    await visitor.populate('hostUnit', 'unitNumber block floor');
    await visitor.populate('checkedInBy', 'name');
    await visitor.populate('checkedOutBy', 'name');

    res.status(200).json({
      success: true,
      message: `Visitor ${status.replace('_', ' ')} successfully`,
      data: { visitor }
    });
  } catch (error) {
    console.error('Update visitor status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating visitor status'
    });
  }
};

// @desc    Pre-approve visitor
// @route   PATCH /api/visitors/:id/approve
// @access  Private (Resident/Management)
const approveVisitor = async (req, res) => {
  try {
    const visitorId = req.params.id;

    const visitor = await Visitor.findById(visitorId);
    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: 'Visitor not found'
      });
    }

    // Check permissions
    if (req.user.role === 'resident' && visitor.host.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only approve your own visitors'
      });
    }

    if (visitor.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Visitor cannot be approved in current status'
      });
    }

    visitor.status = 'pre_approved';
    visitor.isPreApproved = true;
    visitor.approvedBy = req.user._id;

    await visitor.save();

    await visitor.populate('host', 'name phone');
    await visitor.populate('hostUnit', 'unitNumber block floor');
    await visitor.populate('approvedBy', 'name');

    res.status(200).json({
      success: true,
      message: 'Visitor pre-approved successfully',
      data: { visitor }
    });
  } catch (error) {
    console.error('Approve visitor error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error approving visitor'
    });
  }
};

// @desc    Cancel visitor request
// @route   PATCH /api/visitors/:id/cancel
// @access  Private
const cancelVisitor = async (req, res) => {
  try {
    const visitorId = req.params.id;

    const visitor = await Visitor.findById(visitorId);
    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: 'Visitor not found'
      });
    }

    // Check permissions
    if (req.user.role === 'resident' && visitor.host.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You can only cancel your own visitors'
      });
    }

    if (['checked_out', 'cancelled'].includes(visitor.status)) {
      return res.status(400).json({
        success: false,
        message: 'Visitor cannot be cancelled in current status'
      });
    }

    visitor.status = 'cancelled';

    await visitor.save();

    res.status(200).json({
      success: true,
      message: 'Visitor request cancelled successfully'
    });
  } catch (error) {
    console.error('Cancel visitor error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error cancelling visitor'
    });
  }
};

// @desc    Get visitor statistics
// @route   GET /api/visitors/stats
// @access  Private (Management/Staff)
const getVisitorStats = async (req, res) => {
  try {
    const { period = 'today' } = req.query;
    
    let dateFilter = {};
    const now = new Date();
    
    switch (period) {
      case 'today':
        dateFilter = {
          $gte: new Date(now.setHours(0, 0, 0, 0)),
          $lt: new Date(now.setHours(23, 59, 59, 999))
        };
        break;
      case 'week':
        dateFilter = {
          $gte: new Date(now.setDate(now.getDate() - 7)),
          $lt: new Date()
        };
        break;
      case 'month':
        dateFilter = {
          $gte: new Date(now.setMonth(now.getMonth() - 1)),
          $lt: new Date()
        };
        break;
      default:
        dateFilter = {
          $gte: new Date(now.setHours(0, 0, 0, 0)),
          $lt: new Date(now.setHours(23, 59, 59, 999))
        };
    }

    const stats = await Visitor.aggregate([
      {
        $match: {
          visitDate: dateFilter
        }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const totalVisitors = await Visitor.countDocuments({
      visitDate: dateFilter
    });

    const activeVisitors = await Visitor.countDocuments({
      status: 'checked_in'
    });

    res.status(200).json({
      success: true,
      data: {
        totalVisitors,
        activeVisitors,
        stats,
        period
      }
    });
  } catch (error) {
    console.error('Get visitor stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching visitor statistics'
    });
  }
};

module.exports = {
  getVisitors,
  getVisitor,
  createVisitor,
  updateVisitorStatus,
  approveVisitor,
  cancelVisitor,
  getVisitorStats
};
