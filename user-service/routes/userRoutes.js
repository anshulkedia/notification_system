const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');
const { verifyToken } = require('../utils/jwt');

router.post('/register', controller.registerUser);
router.post('/login', controller.loginUser);
router.put('/preferences', verifyToken, controller.updatePreferences);
router.get('/me', verifyToken, controller.getProfile);

module.exports = router;