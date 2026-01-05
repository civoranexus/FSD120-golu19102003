const mongoose = require('mongoose');

const communicationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, 'Communication type is required'],
    enum: ['announcement', 'notice', 'emergency', 'reminder', 'discussion', 'complaint', 'suggestion'],
    default: 'announcement'
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    maxlength: [5000, 'Content cannot exceed 5000 characters']
  },
  category: {
    type: String,
    enum: ['general', 'maintenance', 'security', 'parking', 'events', 'rules', 'finance', 'other'],
    default: 'general'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Sender is required']
  },
  recipients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  targetAudience: {
    type: String,
    enum: ['all_residents', 'all_owners', 'all_tenants', 'management', 'staff', 'specific_units', 'specific_users'],
    default: 'all_residents'
  },
  specificUnits: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Unit'
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'scheduled', 'archived'],
    default: 'draft'
  },
  publishAt: {
    type: Date
  },
  expiresAt: {
    type: Date
  },
  attachments: [{
    filename: { type: String, required: true },
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    uploadedAt: { type: Date, default: Date.now }
  }],
  likes: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    likedAt: { type: Date, default: Date.now }
  }],
  comments: [{
    content: { type: String, required: true, maxlength: [1000, 'Comment cannot exceed 1000 characters'] },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    replies: [{
      content: { type: String, required: true, maxlength: [1000, 'Reply cannot exceed 1000 characters'] },
      author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      createdAt: { type: Date, default: Date.now },
      likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    }]
  }],
  views: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    viewedAt: { type: Date, default: Date.now }
  }],
  notifications: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    sentAt: { type: Date, default: Date.now },
    method: { type: String, enum: ['email', 'sms', 'push', 'in_app'] },
    status: { type: String, enum: ['sent', 'delivered', 'read', 'failed'], default: 'sent' }
  }],
  isPinned: {
    type: Boolean,
    default: false
  },
  pinnedUntil: {
    type: Date
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  moderation: {
    isModerated: { type: Boolean, default: false },
    moderatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    moderatedAt: { type: Date },
    action: { type: String, enum: ['approved', 'rejected', 'edited'] },
    reason: { type: String, maxlength: [500, 'Moderation reason cannot exceed 500 characters'] }
  }
}, {
  timestamps: true
});

// Virtual for engagement metrics
communicationSchema.virtual('engagement').get(function() {
  return {
    views: this.views.length,
    likes: this.likes.length,
    comments: this.comments.reduce((sum, comment) => sum + comment.replies.length + 1, 0),
    totalInteractions: this.views.length + this.likes.length + this.comments.reduce((sum, comment) => sum + comment.replies.length + 1, 0)
  };
});

// Pre-save middleware to handle scheduled publishing
communicationSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'published' && !this.publishAt) {
    this.publishAt = new Date();
  }
  
  // Auto unpinned when expired
  if (this.isPinned && this.pinnedUntil && new Date() > this.pinnedUntil) {
    this.isPinned = false;
  }
  
  next();
});

// Index for efficient queries
communicationSchema.index({ type: 1, status: 1 });
communicationSchema.index({ sender: 1, createdAt: -1 });
communicationSchema.index({ targetAudience: 1, status: 1 });
communicationSchema.index({ category: 1, priority: 1 });
communicationSchema.index({ publishAt: -1 });
communicationSchema.index({ isPinned: 1, pinnedUntil: 1 });

module.exports = mongoose.model('Communication', communicationSchema);
