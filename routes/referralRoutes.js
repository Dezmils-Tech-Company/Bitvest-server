// backend/routes/referralRoutes.js
const express = require('express');
const router = express.Router();
const referralController = require('../controllers/referralController');
const { verifyToken } = require('../middleware/authMiddleware');

// @route   GET /api/referral/generate
router.get('/generate', verifyToken, referralController.generateReferralCode);

// @route   GET /api/referral/link/:referralCode
router.get('/link/:referralCode', referralController.getReferralLink);

// @route   GET /api/referral/details/:referralCode
router.get('/details/:referralCode', referralController.getReferrerDetails);

// @route   POST /api/referral/track
router.post('/track', referralController.trackReferral);

// @route   GET /api/referral/rewards
router.get('/rewards', verifyToken, referralController.getReferralRewards);

module.exports = router;
