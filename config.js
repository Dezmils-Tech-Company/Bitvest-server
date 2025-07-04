    // config.js
    require('dotenv').config(); // Load environment variables from .env file

    module.exports = {
      port: process.env.PORT || 5000,
      jwtSecret: process.env.JWT_SECRET || 'Ezra@12352', // Change this to a strong, random value!
      emailUser: process.env.EMAIL_USER,
      emailPassword: process.env.EMAIL_PASSWORD,
      dbURI: process.env.MONGODB_URI || 'mongodb+srv://dezezra05:hbmDPWbFwiADG805@cluster0.j0stdef.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', // Replace with your MongoDB URI
    };
