const productModel = require('../models/productModel');

const getAllProducts = (req, res, next) => {
  try {
    const products = productModel.getProducts(); // Get products from the module
    res.json(products);
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};

module.exports = {
  getAllProducts,
};
// This code defines a controller for handling product-related requests.