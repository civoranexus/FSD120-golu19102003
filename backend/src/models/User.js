const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
    select: false // Don't include password in queries by default
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: ['Resident', 'Management', 'Staff'],
    default: 'Resident'
  },
  unit: {
    type: String,
    required: [true, 'Unit is required'],
    trim: true,
    maxlength: [20, 'Unit cannot exceed 20 characters']
  },
  phone: {
    type: String,
    trim: true,
    match: [/^[6-9]\d{9}$/, 'Please enter a valid 10-digit phone number']
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  profilePicture: {
    type: String,
    default: ''
  },
  lastLogin: {
    type: Date,
    default: null
  },
  refreshTokens: [{
    token: String,
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 604800 // 7 days
    }
  }],
  passwordResetToken: {
    type: String,
    default: null
  },
  passwordResetExpires: {
    type: Date,
    default: null
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationToken: {
    type: String,
    default: null
  },
  twoFactorEnabled: {
    type: Boolean,
    default: false
  },
  twoFactorSecret: {
    type: String,
    default: null
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ status: 1 });
userSchema.index({ unit: 1 });

// Virtual for user's full profile
userSchema.virtual('profile').get(function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    role: this.role,
    unit: this.unit,
    phone: this.phone,
    status: this.status,
    profilePicture: this.profilePicture,
    lastLogin: this.lastLogin,
    createdAt: this.createdAt,
    emailVerified: this.emailVerified,
    twoFactorEnabled: this.twoFactorEnabled
  };
});

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified
  if (!this.isModified('password')) return next();
  
  try {
    // Hash password with cost factor
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS) || 12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Pre-save middleware to update lastLogin on status change to Active
userSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'Active' && !this.lastLogin) {
    this.lastLogin = new Date();
  }
  next();
});

// Instance method to check password
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

// Instance method to generate auth tokens
userSchema.methods.generateAuthTokens = function() {
  const jwt = require('jsonwebtoken');
  
  const accessToken = jwt.sign(
    { id: this._id, email: this.email, role: this.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '24h' }
  );
  
  const refreshToken = jwt.sign(
    { id: this._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d' }
  );
  
  // Store refresh token
  this.refreshTokens.push({ token: refreshToken });
  
  return { accessToken, refreshToken };
};

// Instance method to remove refresh token
userSchema.methods.removeRefreshToken = function(token) {
  this.refreshTokens = this.refreshTokens.filter(rt => rt.token !== token);
  return this.save();
};

// Instance method to clear all refresh tokens
userSchema.methods.clearRefreshTokens = function() {
  this.refreshTokens = [];
  return this.save();
};

// Static method to find user by email with password
userSchema.statics.findByEmailWithPassword = function(email) {
  return this.findOne({ email }).select('+password');
};

// Static method to find active users
userSchema.statics.findActive = function() {
  return this.find({ status: 'Active' });
};

// Static method to get user statistics
userSchema.statics.getStatistics = function() {
  return this.aggregate([
    {
      $group: {
        _id: null,
        totalUsers: { $sum: 1 },
        activeUsers: {
          $sum: { $cond: [{ $eq: ['$status', 'Active'] }, 1, 0] }
        },
        inactiveUsers: {
          $sum: { $cond: [{ $eq: ['$status', 'Inactive'] }, 1, 0] }
        },
        residents: {
          $sum: { $cond: [{ $eq: ['$role', 'Resident'] }, 1, 0] }
        },
        management: {
          $sum: { $cond: [{ $eq: ['$role', 'Management'] }, 1, 0] }
        },
        staff: {
          $sum: { $cond: [{ $eq: ['$role', 'Staff'] }, 1, 0] }
        }
      }
    }
  ]);
};

// Method to get user's permissions based on role
userSchema.methods.getPermissions = function() {
  const permissions = {
    Resident: [
      'view_own_profile',
      'update_own_profile',
      'create_visitor_request',
      'create_maintenance_request',
      'view_own_bills',
      'make_payments',
      'view_announcements',
      'create_discussion_post',
      'book_facilities'
    ],
    Management: [
      'view_all_users',
      'manage_users',
      'view_all_visitors',
      'manage_visitors',
      'view_all_maintenance',
      'manage_maintenance',
      'view_all_bills',
      'manage_bills',
      'create_announcements',
      'manage_announcements',
      'view_reports',
      'manage_facilities',
      'view_system_stats'
    ],
    Staff: [
      'view_assigned_visitors',
      'manage_gate_access',
      'view_assigned_maintenance',
      'update_maintenance_status',
      'view_announcements',
      'manage_facilities_booking'
    ]
  };
  
  return permissions[this.role] || [];
};

const User = mongoose.model('User', userSchema);

module.exports = User;
