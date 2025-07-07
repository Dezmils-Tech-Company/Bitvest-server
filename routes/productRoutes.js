const express = require('express');
const productController = require('../controllers/productController');
const verifyToken  = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', productController.getAllProducts, verifyToken);

module.exports = router;
// This code defines a route for handling product-related requests.