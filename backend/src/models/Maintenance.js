const mongoose = require('mongoose');

const maintenanceSchema = new mongoose.Schema({
  ticketNumber: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['plumbing', 'electrical', 'carpentry', 'painting', 'hvac', 'elevator', 'security', 'cleaning', 'pest_control', 'landscaping', 'other'],
    default: 'other'
  },
  priority: {
    type: String,
    required: [true, 'Priority is required'],
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Requested by user is required']
  },
  unit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Unit',
    required: [true, 'Unit is required']
  },
  status: {
    type: String,
    enum: ['pending', 'assigned', 'in_progress', 'completed', 'cancelled', 'reopened'],
    default: 'pending'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  assignedAt: {
    type: Date
  },
  startedAt: {
    type: Date
  },
  completedAt: {
    type: Date
  },
  estimatedCost: {
    type: Number,
    min: 0
  },
  actualCost: {
    type: Number,
    min: 0
  },
  materials: [{
    name: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 0 },
    unit: { type: String, required: true, enum: ['pcs', 'kg', 'liters', 'meters', 'sqft', 'other'] },
    cost: { type: Number, min: 0 }
  }],
  attachments: [{
    filename: { type: String, required: true },
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    uploadedAt: { type: Date, default: Date.now }
  }],
  workLog: [{
    timestamp: { type: Date, default: Date.now },
    action: { type: String, required: true, enum: ['created', 'assigned', 'started', 'progress_update', 'completed', 'cancelled', 'reopened'] },
    description: { type: String, required: true, maxlength: [500, 'Work log description cannot exceed 500 characters'] },
    staff: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    attachments: [{ type: String }]
  }],
  rating: {
    score: { type: Number, min: 1, max: 5 },
    feedback: { type: String, maxlength: [500, 'Feedback cannot exceed 500 characters'] },
    ratedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    ratedAt: { type: Date }
  },
  recurring: {
    isRecurring: { type: Boolean, default: false },
    frequency: { type: String, enum: ['daily', 'weekly', 'monthly', 'quarterly', 'yearly'] },
    nextDue: { type: Date },
    endDate: { type: Date }
  },
  notes: {
    type: String,
    maxlength: [1000, 'Notes cannot exceed 1000 characters']
  }
}, {
  timestamps: true
});

// Generate ticket number before saving
maintenanceSchema.pre('save', async function(next) {
  if (this.isNew && !this.ticketNumber) {
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    const count = await this.constructor.countDocuments({
      createdAt: {
        $gte: new Date(year, new Date().getMonth(), 1),
        $lt: new Date(year, new Date().getMonth() + 1, 1)
      }
    });
    this.ticketNumber = `MT${year}${month}${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

// Virtual for duration
maintenanceSchema.virtual('duration').get(function() {
  if (this.startedAt && this.completedAt) {
    return this.completedAt - this.startedAt;
  }
  if (this.assignedAt && this.completedAt) {
    return this.completedAt - this.assignedAt;
  }
  return null;
});

// Index for efficient queries
maintenanceSchema.index({ ticketNumber: 1 });
maintenanceSchema.index({ requestedBy: 1, status: 1 });
maintenanceSchema.index({ unit: 1, status: 1 });
maintenanceSchema.index({ assignedTo: 1, status: 1 });
maintenanceSchema.index({ category: 1, status: 1 });
maintenanceSchema.index({ priority: 1, status: 1 });

module.exports = mongoose.model('Maintenance', maintenanceSchema);
