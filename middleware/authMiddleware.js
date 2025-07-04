    // middleware/authMiddleware.js
    const jwt = require('jsonwebtoken');
    const config = require('../config');

    const authenticateToken = (req, res, next) => {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

      if (token == null) return res.sendStatus(401); // Unauthorized

      jwt.verify(token, config.jwtSecret, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user;
        next();
      });
    };

    module.exports = { authenticateToken };
    // This middleware checks for a valid JWT token in the Authorization header.
    // If the token is valid, it attaches the user information to the request object and calls