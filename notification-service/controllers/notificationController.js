const Notification = require('../models/Notification')
const { generateAndStoreRecommendations } = require('../services/recommendation.service');


// Create a new notification
exports.createNotification = async (req, res) => {
  try {
    const { userId, type, content } = req.body;
    const notification = new Notification({ userId, type, content });
    await notification.save();
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create notification' });
  }
};

// Fetch unread notifications for a user
exports.getUnreadNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ userId, read: false });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
};

// Mark a notification as read
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );
    if (!notification) return res.status(404).json({ error: 'Notification not found' });

    res.status(200).json(notification);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update notification' });
  }
};
//recommendations
exports.handleGenerateRecommendations = async (req, res) => {
  const { userId } = req.params;

  try {
    await generateAndStoreRecommendations(userId);
    res.status(200).json({ message: `Recommendations generated for user ${userId}` });
  } catch (error) {
    console.error('❌ Error generating recommendations:', error);
    res.status(500).json({ error: 'Failed to generate recommendations' });
  }
};
//get all notifications - read and unread
exports.getAllNotifications = async (req, res) => {
  const { userId } = req.params;
  try {
    const notifications = await Notification.find({ userId });
    res.json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not retrieve notifications' });
  }
};
