const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');
const verifyToken  = require('../middlewares/authMiddleware');

router.get('/wallet', verifyToken, walletController.getWallet);
router.post('/wallet/add', verifyToken, walletController.addFunds);

module.exports = router;