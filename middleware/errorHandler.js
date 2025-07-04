// signup-backend/middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
};

module.exports = errorHandler;
// This middleware logs the error stack to the console and sends a JSON response with a 500 status code.
// It can be used in your Express app to handle errors globally.