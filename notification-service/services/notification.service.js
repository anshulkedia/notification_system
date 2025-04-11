// notification.service.js
const Notification = require('../models/Notification'); // Adjust if your path is different

async function createNotification(data) {
  try {
    const saved = await Notification.create(data);
    console.log('✅ Notification saved to DB:', saved);
    return saved;
  } catch (err) {
    console.error('❌ Error saving notification:', err.message);
  }
}

module.exports = { createNotification };