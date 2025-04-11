const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: {
    type: String, // You can change to mongoose.Schema.Types.ObjectId if you're referencing the User model directly
    required: true,
  },
  type: {
    type: String,
    enum: ['promotion', 'order_update', 'recommendation'],
    required: true,
  },
  content: {
    type: mongoose.Schema.Types.Mixed, // Can be plain text or JSON
    required: true,
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
  read: {
    type: Boolean,
    default: false,
  },
});

module.exports =
  mongoose.models.Notification ||
  mongoose.model('Notification', notificationSchema);