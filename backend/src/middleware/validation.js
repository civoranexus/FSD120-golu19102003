const { body, validationResult } = require('express-validator');
const DOMPurify = require('isomorphic-dompurify');
const he = require('he');

// XSS protection middleware
const xssProtection = (req, res, next) => {
  const sanitizeObject = (obj) => {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map(sanitizeObject);
    }

    const sanitized = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === 'string') {
          // Decode HTML entities first
          const decoded = he.decode(obj[key]);
          // Then sanitize HTML
          sanitized[key] = DOMPurify.sanitize(decoded, {
            ALLOWED_TAGS: [],
            ALLOWED_ATTR: []
          });
        } else if (typeof obj[key] === 'object') {
          sanitized[key] = sanitizeObject(obj[key]);
        } else {
          sanitized[key] = obj[key];
        }
      }
    }
    return sanitized;
  };

  // Sanitize request body
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }

  // Sanitize query parameters
  if (req.query) {
    req.query = sanitizeObject(req.query);
  }

  // Sanitize URL parameters
  if (req.params) {
    req.params = sanitizeObject(req.params);
  }

  next();
};

// Common validation rules
const validationRules = {
  // User validation
  user: {
    name: [
      body('name')
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('Name must be between 1 and 100 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Name can only contain letters and spaces')
    ],
    email: [
      body('email')
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage('Please enter a valid email address')
        .isLength({ max: 255 })
        .withMessage('Email cannot exceed 255 characters')
    ],
    password: [
      body('password')
        .isLength({ min: 8, max: 128 })
        .withMessage('Password must be between 8 and 128 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character')
    ],
    phone: [
      body('phone')
        .optional()
        .trim()
        .isMobilePhone('en-IN')
        .withMessage('Please enter a valid Indian phone number')
    ],
    role: [
      body('role')
        .isIn(['Resident', 'Management', 'Staff'])
        .withMessage('Invalid role specified')
    ],
    unit: [
      body('unit')
        .trim()
        .isLength({ min: 1, max: 20 })
        .withMessage('Unit must be between 1 and 20 characters')
        .matches(/^[A-Za-z0-9\-]+$/)
        .withMessage('Unit can only contain letters, numbers, and hyphens')
    ]
  },

  // Visitor validation
  visitor: {
    name: [
      body('name')
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('Visitor name must be between 1 and 100 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Visitor name can only contain letters and spaces')
    ],
    email: [
      body('email')
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage('Please enter a valid email address')
    ],
    phone: [
      body('phone')
        .trim()
        .isMobilePhone('en-IN')
        .withMessage('Please enter a valid Indian phone number')
    ],
    purpose: [
      body('purpose')
        .trim()
        .isLength({ min: 1, max: 200 })
        .withMessage('Purpose must be between 1 and 200 characters')
    ],
    unit: [
      body('unit')
        .trim()
        .isLength({ min: 1, max: 20 })
        .withMessage('Unit must be between 1 and 20 characters')
    ],
    hostName: [
      body('hostName')
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('Host name must be between 1 and 100 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Host name can only contain letters and spaces')
    ],
    vehicleNumber: [
      body('vehicleNumber')
        .optional()
        .trim()
        .matches(/^[A-Za-z0-9\- ]+$/)
        .withMessage('Vehicle number can only contain letters, numbers, hyphens, and spaces')
    ],
    notes: [
      body('notes')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Notes cannot exceed 500 characters')
    ]
  },

  // Maintenance validation
  maintenance: {
    title: [
      body('title')
        .trim()
        .isLength({ min: 1, max: 200 })
        .withMessage('Title must be between 1 and 200 characters')
    ],
    description: [
      body('description')
        .trim()
        .isLength({ min: 1, max: 1000 })
        .withMessage('Description must be between 1 and 1000 characters')
    ],
    category: [
      body('category')
        .isIn(['Electrical', 'Plumbing', 'HVAC', 'Carpentry', 'Painting', 'General'])
        .withMessage('Invalid category specified')
    ],
    priority: [
      body('priority')
        .isIn(['Low', 'Medium', 'High', 'Critical'])
        .withMessage('Invalid priority specified')
    ],
    unit: [
      body('unit')
        .trim()
        .isLength({ min: 1, max: 20 })
        .withMessage('Unit must be between 1 and 20 characters')
    ],
    contactName: [
      body('contactName')
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('Contact name must be between 1 and 100 characters')
    ],
    contactPhone: [
      body('contactPhone')
        .trim()
        .isMobilePhone('en-IN')
        .withMessage('Please enter a valid Indian phone number')
    ],
    contactEmail: [
      body('contactEmail')
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage('Please enter a valid email address')
    ]
  },

  // Finance validation
  finance: {
    unit: [
      body('unit')
        .trim()
        .isLength({ min: 1, max: 20 })
        .withMessage('Unit must be between 1 and 20 characters')
    ],
    type: [
      body('type')
        .isIn(['Maintenance', 'Parking', 'Water', 'Electricity', 'Other'])
        .withMessage('Invalid type specified')
    ],
    amount: [
      body('amount')
        .trim()
        .matches(/^\d+(\.\d{1,2})?$/)
        .withMessage('Please enter a valid amount')
        .custom((value) => {
          const amount = parseFloat(value);
          if (amount < 0 || amount > 999999.99) {
            throw new Error('Amount must be between 0 and 999999.99');
          }
          return true;
        })
    ],
    cardNumber: [
      body('cardNumber')
        .optional()
        .trim()
        .matches(/^\d{16}$/)
        .withMessage('Card number must be 16 digits')
    ],
    cardName: [
      body('cardName')
        .optional()
        .trim()
        .isLength({ min: 1, max: 100 })
        .withMessage('Cardholder name must be between 1 and 100 characters')
        .matches(/^[a-zA-Z\s]+$/)
        .withMessage('Cardholder name can only contain letters and spaces')
    ],
    expiryDate: [
      body('expiryDate')
        .optional()
        .trim()
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/)
        .withMessage('Expiry date must be in MM/YY format')
    ],
    cvv: [
      body('cvv')
        .optional()
        .trim()
        .matches(/^\d{3,4}$/)
        .withMessage('CVV must be 3 or 4 digits')
    ],
    upiId: [
      body('upiId')
        .optional()
        .trim()
        .matches(/^[a-zA-Z0-9.\-_]+@[a-zA-Z0-9.\-_]+$/)
        .withMessage('Please enter a valid UPI ID')
    ]
  },

  // Communication validation
  communication: {
    title: [
      body('title')
        .trim()
        .isLength({ min: 1, max: 200 })
        .withMessage('Title must be between 1 and 200 characters')
    ],
    content: [
      body('content')
        .trim()
        .isLength({ min: 1, max: 2000 })
        .withMessage('Content must be between 1 and 2000 characters')
    ],
    type: [
      body('type')
        .isIn(['Notice', 'Meeting', 'Event', 'Alert'])
        .withMessage('Invalid type specified')
    ],
    priority: [
      body('priority')
        .isIn(['Low', 'Medium', 'High', 'Critical'])
        .withMessage('Invalid priority specified')
    ],
    category: [
      body('category')
        .optional()
        .isIn(['General', 'Maintenance', 'Security', 'Finance', 'Events'])
        .withMessage('Invalid category specified')
    ]
  }
};

// Validation error handler
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg,
        value: error.value
      }))
    });
  }
  next();
};

// Validation middleware factory
const validate = (rules) => {
  return [
    ...rules,
    handleValidationErrors
  ];
};

// Custom validation functions
const customValidators = {
  // Validate Indian phone number
  isValidIndianPhone: (phone) => {
    return /^[6-9]\d{9}$/.test(phone.replace(/\D/g, ''));
  },

  // Validate vehicle number
  isValidVehicleNumber: (vehicleNumber) => {
    return /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/.test(vehicleNumber.toUpperCase().replace(/[^A-Z0-9]/g, ''));
  },

  // Validate unit number
  isValidUnit: (unit) => {
    return /^[A-Za-z]-\d{3}$/.test(unit);
  },

  // Validate password strength
  isStrongPassword: (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasNonalphas = /\W/.test(password);
    
    return password.length >= minLength && 
           hasUpperCase && 
           hasLowerCase && 
           hasNumbers && 
           hasNonalphas;
  },

  // Validate file upload
  isValidFile: (file, allowedTypes = [], maxSize = 5 * 1024 * 1024) => {
    if (!file) return false;
    
    // Check file size
    if (file.size > maxSize) return false;
    
    // Check file type
    if (allowedTypes.length > 0 && !allowedTypes.includes(file.mimetype)) {
      return false;
    }
    
    return true;
  }
};

module.exports = {
  xssProtection,
  validationRules,
  handleValidationErrors,
  validate,
  customValidators
};
