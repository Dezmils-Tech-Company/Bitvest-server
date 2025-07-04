    // models/Referral.js
    const mongoose = require('mongoose'); // Import mongoose for MongoDB interaction

    const referralSchema = new mongoose.Schema({
      // Define the schema for the Referral model
      referrer: {
        type: mongoose.Schema.ObjectId, // Store the ObjectId of the referrer
        ref: 'User', // Reference the User model
        required: true, // Required field
      },
      referredUser: {
        type: mongoose.Schema.ObjectId, // Store the ObjectId of the referred user
        ref: 'User', // Reference the User model
      },
      referralCode: {
        type: String, // Data type is String
        required: true, // Required field
      },
      createdAt: {
        type: Date, // Data type is Date
        default: Date.now, // Default value is the current date and time
      },
      status: {
        type: String, // Data type is String
        enum: ['pending', 'completed'], // Allowed values are 'pending' and 'completed'
        default: 'pending', // Default value is 'pending'
      },
    });

    module.exports = mongoose.model('Referral', referralSchema); // Export the Referral model
// This code defines a Mongoose schema for a referral system, where each referral has a referrer, a referred user, a unique referral code, and timestamps for creation. The status of the referral can be either 'pending' or 'completed'.