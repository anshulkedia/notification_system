const express = require('express');
const router = express.Router();
const controller = require('../controllers/notificationController');

router.post('/', controller.createNotification);
router.get('/unread/:userId', controller.getUnreadNotifications);
router.patch('/:id/read', controller.markAsRead);
router.post('/recommendations/:userId', controller.handleGenerateRecommendations);
router.get('/getall/:userId',controller.getAllNotifications);

module.exports = router;