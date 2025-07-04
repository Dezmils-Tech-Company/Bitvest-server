const express = require('express');
const router = express.Router();
const { getProfile } = require('../controllers/userController');
const verifyToken = require('../middlewares/authMiddleware');

// Protected route to get profile
router.get('/profile', verifyToken, getProfile);

module.exports = router;