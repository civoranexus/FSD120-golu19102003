const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
  unitNumber: {
    type: String,
    required: [true, 'Unit number is required'],
    trim: true,
    unique: true,
    uppercase: true
  },
  type: {
    type: String,
    enum: ['flat', 'villa', 'penthouse', 'shop', 'office'],
    required: [true, 'Unit type is required'],
    default: 'flat'
  },
  block: {
    type: String,
    required: [true, 'Block is required'],
    trim: true,
    uppercase: true
  },
  floor: {
    type: Number,
    required: [true, 'Floor is required'],
    min: 0
  },
  area: {
    type: Number,
    required: [true, 'Area is required'],
    min: 0
  },
  bedrooms: {
    type: Number,
    required: [true, 'Number of bedrooms is required'],
    min: 0
  },
  bathrooms: {
    type: Number,
    required: [true, 'Number of bathrooms is required'],
    min: 0
  },
  owners: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  tenants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  isOccupied: {
    type: Boolean,
    default: false
  },
  monthlyMaintenance: {
    type: Number,
    required: [true, 'Monthly maintenance amount is required'],
    min: 0
  },
  parkingSlots: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['active', 'inactive', 'maintenance'],
    default: 'active'
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  }
}, {
  timestamps: true
});

// Virtual for total residents
unitSchema.virtual('totalResidents').get(function() {
  return this.owners.length + this.tenants.length;
});

// Index for efficient queries
unitSchema.index({ unitNumber: 1 });
unitSchema.index({ block: 1, floor: 1 });
unitSchema.index({ status: 1 });

module.exports = mongoose.model('Unit', unitSchema);
