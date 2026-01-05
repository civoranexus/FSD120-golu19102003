const { body, validationResult } = require('express-validator');

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(error => ({
        field: error.path || error.param,
        message: error.msg,
        value: error.value
      }))
    });
  }
  next();
};

// User registration validation
const validateUserRegistration = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  body('phone')
    .matches(/^[6-9]\d{9}$/)
    .withMessage('Please provide a valid 10-digit phone number'),
  body('role')
    .isIn(['resident', 'management', 'staff'])
    .withMessage('Role must be resident, management, or staff'),
  body('unit')
    .optional()
    .isMongoId()
    .withMessage('Unit must be a valid MongoDB ID'),
  handleValidationErrors
];

// User login validation
const validateUserLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

// Visitor validation
const validateVisitor = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('phone')
    .matches(/^[6-9]\d{9}$/)
    .withMessage('Please provide a valid 10-digit phone number'),
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('purpose')
    .isIn(['personal', 'delivery', 'service', 'business', 'emergency', 'other'])
    .withMessage('Purpose must be one of: personal, delivery, service, business, emergency, other'),
  body('host')
    .isMongoId()
    .withMessage('Host must be a valid MongoDB ID'),
  body('hostUnit')
    .isMongoId()
    .withMessage('Host unit must be a valid MongoDB ID'),
  body('expectedArrival')
    .isISO8601()
    .withMessage('Expected arrival must be a valid date'),
  body('vehicleNumber')
    .optional()
    .matches(/^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{1,4}$/)
    .withMessage('Please provide a valid vehicle number'),
  handleValidationErrors
];

// Maintenance request validation
const validateMaintenance = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Title must be between 5 and 200 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('category')
    .isIn(['plumbing', 'electrical', 'carpentry', 'painting', 'hvac', 'elevator', 'security', 'cleaning', 'pest_control', 'landscaping', 'other'])
    .withMessage('Please select a valid category'),
  body('priority')
    .isIn(['low', 'medium', 'high', 'urgent'])
    .withMessage('Priority must be low, medium, high, or urgent'),
  body('unit')
    .isMongoId()
    .withMessage('Unit must be a valid MongoDB ID'),
  handleValidationErrors
];

// Unit validation
const validateUnit = [
  body('unitNumber')
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('Unit number is required and must be less than 20 characters'),
  body('type')
    .isIn(['flat', 'villa', 'penthouse', 'shop', 'office'])
    .withMessage('Unit type must be flat, villa, penthouse, shop, or office'),
  body('block')
    .trim()
    .notEmpty()
    .withMessage('Block is required'),
  body('floor')
    .isInt({ min: 0 })
    .withMessage('Floor must be a non-negative integer'),
  body('area')
    .isFloat({ min: 0 })
    .withMessage('Area must be a positive number'),
  body('bedrooms')
    .isInt({ min: 0 })
    .withMessage('Number of bedrooms must be a non-negative integer'),
  body('bathrooms')
    .isInt({ min: 0 })
    .withMessage('Number of bathrooms must be a non-negative integer'),
  body('monthlyMaintenance')
    .isFloat({ min: 0 })
    .withMessage('Monthly maintenance must be a positive number'),
  handleValidationErrors
];

// Billing validation
const validateBilling = [
  body('type')
    .isIn(['maintenance', 'parking', 'penalty', 'utility', 'other'])
    .withMessage('Bill type must be maintenance, parking, penalty, utility, or other'),
  body('unit')
    .isMongoId()
    .withMessage('Unit must be a valid MongoDB ID'),
  body('billedTo')
    .isMongoId()
    .withMessage('Billed to must be a valid MongoDB ID'),
  body('billingPeriod.from')
    .isISO8601()
    .withMessage('Billing period start date must be valid'),
  body('billingPeriod.to')
    .isISO8601()
    .withMessage('Billing period end date must be valid'),
  body('dueDate')
    .isISO8601()
    .withMessage('Due date must be valid'),
  body('items')
    .isArray({ min: 1 })
    .withMessage('At least one item is required'),
  body('items.*.description')
    .trim()
    .notEmpty()
    .withMessage('Item description is required'),
  body('items.*.unitPrice')
    .isFloat({ min: 0 })
    .withMessage('Item unit price must be positive'),
  body('items.*.quantity')
    .isFloat({ min: 0 })
    .withMessage('Item quantity must be positive'),
  handleValidationErrors
];

// Communication validation
const validateCommunication = [
  body('type')
    .isIn(['announcement', 'notice', 'emergency', 'reminder', 'discussion', 'complaint', 'suggestion'])
    .withMessage('Type must be announcement, notice, emergency, reminder, discussion, complaint, or suggestion'),
  body('title')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Title must be between 5 and 200 characters'),
  body('content')
    .trim()
    .isLength({ min: 10, max: 5000 })
    .withMessage('Content must be between 10 and 5000 characters'),
  body('category')
    .isIn(['general', 'maintenance', 'security', 'parking', 'events', 'rules', 'finance', 'other'])
    .withMessage('Please select a valid category'),
  body('priority')
    .isIn(['low', 'medium', 'high', 'urgent'])
    .withMessage('Priority must be low, medium, high, or urgent'),
  body('targetAudience')
    .isIn(['all_residents', 'all_owners', 'all_tenants', 'management', 'staff', 'specific_units', 'specific_users'])
    .withMessage('Please select a valid target audience'),
  handleValidationErrors
];

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validateVisitor,
  validateMaintenance,
  validateUnit,
  validateBilling,
  validateCommunication,
  handleValidationErrors
};
