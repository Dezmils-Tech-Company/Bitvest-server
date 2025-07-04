const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth'); // Import the routes
 const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const { authenticateToken } = require('./middleware/authMiddleware'); // Import the authentication middleware
 

dotenv.config();

const app = express();
connectDB(); // <--- CALL IT HERE

app.use(cors({origin: '*'})); // Enable CORS for all origins
app.use(express.json());


// Routes
app.use('/api/auth', authRoutes); // Use the auth routes

app.use('/api/user', userRoutes); // Use the user routes
// product routes
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


