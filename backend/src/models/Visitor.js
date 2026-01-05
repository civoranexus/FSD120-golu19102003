const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Visitor name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[6-9]\d{9}$/, 'Please enter a valid 10-digit phone number']
  },
  email: {
    type: String,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  purpose: {
    type: String,
    required: [true, 'Purpose of visit is required'],
    enum: ['personal', 'delivery', 'service', 'business', 'emergency', 'other'],
    default: 'personal'
  },
  purposeDetails: {
    type: String,
    maxlength: [200, 'Purpose details cannot exceed 200 characters']
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Host is required']
  },
  hostUnit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Unit',
    required: [true, 'Host unit is required']
  },
  visitDate: {
    type: Date,
    required: [true, 'Visit date is required'],
    default: Date.now
  },
  expectedArrival: {
    type: Date,
    required: [true, 'Expected arrival time is required']
  },
  expectedDeparture: {
    type: Date
  },
  actualArrival: {
    type: Date,
    default: null
  },
  actualDeparture: {
    type: Date,
    default: null
  },
  vehicleNumber: {
    type: String,
    trim: true,
    uppercase: true,
    match: [/^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{1,4}$/, 'Please enter a valid vehicle number']
  },
  idProof: {
    type: {
      type: String,
      enum: ['aadhaar', 'pan', 'driving_license', 'voter_id', 'passport', 'other'],
      required: function() { return this.isPreApproved; }
    },
    number: {
      type: String,
      required: function() { return this.isPreApproved; }
    },
    photo: {
      type: String
    }
  },
  status: {
    type: String,
    enum: ['pre_approved', 'pending', 'checked_in', 'checked_out', 'cancelled'],
    default: 'pending'
  },
  isPreApproved: {
    type: Boolean,
    default: false
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  checkedInBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  checkedOutBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  companions: [{
    name: { type: String, required: true, trim: true },
    age: { type: Number, min: 0, max: 120 },
    relation: { type: String, trim: true }
  }],
  gateEntryLogs: [{
    timestamp: { type: Date, default: Date.now },
    action: { type: String, enum: ['entry', 'exit'], required: true },
    gateNumber: { type: String, required: true },
    staff: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    remarks: { type: String, maxlength: [200, 'Remarks cannot exceed 200 characters'] }
  }]
}, {
  timestamps: true
});

// Virtual for duration of visit
visitorSchema.virtual('visitDuration').get(function() {
  if (this.actualArrival && this.actualDeparture) {
    return this.actualDeparture - this.actualArrival;
  }
  return null;
});

// Index for efficient queries
visitorSchema.index({ host: 1, visitDate: -1 });
visitorSchema.index({ status: 1, visitDate: -1 });
visitorSchema.index({ phone: 1 });
visitorSchema.index({ vehicleNumber: 1 });

// Pre-save middleware to set actual arrival on check-in
visitorSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'checked_in' && !this.actualArrival) {
    this.actualArrival = new Date();
  }
  if (this.isModified('status') && this.status === 'checked_out' && !this.actualDeparture) {
    this.actualDeparture = new Date();
  }
  next();
});

module.exports = mongoose.model('Visitor', visitorSchema);
