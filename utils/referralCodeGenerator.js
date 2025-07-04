// utils/referralCodeGenerator.js
const { nanoid } = require('nanoid'); // Import the nanoid function for generating unique IDs

exports.generateReferralCode = () => {
  // Define a function to generate a referral code
  return nanoid(10); // Generate a 10-character unique referral code using nanoid
};
