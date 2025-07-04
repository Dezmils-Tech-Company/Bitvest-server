
    // controllers/referralController.js
    const User = require('../models/User'); // Import the User model
    const Referral = require('../models/Referral'); // Import the Referral model
    const { generateReferralCode } = require('../utils/referralCodeGenerator'); // Import the referral code generator

    // @desc    Generate referral code for a user
    // @route   GET /api/referral/generate
    // @access  Private
    exports.generateReferralCode = async (req, res) => {
      // Define an asynchronous function to generate a referral code for a user
      try {
        const user = await User.findById(req.user.id); // Find the user by ID

        if (!user) {
          return res.status(404).json({ message: 'User not found' }); // Send a 404 Not Found response if the user is not found
        }

        // Generate referral code
        let referralCode = generateReferralCode(); // Generate a new referral code
        while (await User.findOne({ referralCode })) {
          referralCode = generateReferralCode(); // Ensure uniqueness
        }

        user.referralCode = referralCode; // Assign the generated referral code to the user
        await user.save(); // Save the updated user

        res.json({ referralCode }); // Send the referral code as a JSON response
      } catch (err) {
        console.error(err.message); // Log the error message
        res.status(500).send('Server error'); // Send a 500 Server Error response
      }
    };

    // @desc    Get referral link
    // @route   GET /api/referral/link/:referralCode
    // @access  Public
    exports.getReferralLink = (req, res) => {
      // Define a function to generate a referral link
      const { referralCode } = req.params; // Extract the referral code from the request parameters
      const baseUrl = process.env.BASE_URL; // Your frontend URL
      const referralLink = `${baseUrl}/register?referralCode=${referralCode}`; // Construct the referral link

      res.json({ referralLink }); // Send the referral link as a JSON response
    };

    // @desc    Get referrer details
    // @route   GET /api/referral/details/:referralCode
    // @access  Public
    exports.getReferrerDetails = async (req, res) => {
      // Define an asynchronous function to get the details of the referrer
      const { referralCode } = req.params; // Extract the referral code from the request parameters

      try {
        const user = await User.findOne({ referralCode }); // Find the user with the given referral code
        if (!user) {
          return res.status(404).json({ message: 'Referral code not found' }); // Send a 404 Not Found response if the referral code is not found
        }

        res.json({
          name: user.name,
          email: user.email, // Or exclude email as needed
        }); // Send the referrer's details as a JSON response
      } catch (err) {
        console.error(err.message); // Log the error message
        res.status(500).send('Server error'); // Send a 500 Server Error response
      }
    };

    // @desc    Track referral (when a user signs up using a referral link)
    // @route   POST /api/referral/track
    // @access  Public (but should ideally be called internally after user registration)
    exports.trackReferral = async (req, res) => {
      // Define an asynchronous function to track a referral
      const { referrerCode, referredUserId } = req.body; // Extract the referrer code and referred user ID from the request body

      try {
        const referrer = await User.findOne({ referralCode: referrerCode }); // Find the referrer by referral code
        const referredUser = await User.findById(referredUserId); // Find the referred user by ID

        if (!referrer || !referredUser) {
          return res.status(404).json({ message: 'Referrer or referred user not found' }); // Send a 404 Not Found response if either the referrer or referred user is not found
        }

        // Create referral document
        const referral = new Referral({
          referrer: referrer._id,
          referredUser: referredUser._id,
          referralCode: referrerCode,
        });

        await referral.save(); // Save the referral record

        // Update referrer's referral count
        referrer.referralCount++; // Increment the referrer's referral count
        await referrer.save(); // Save the updated referrer

        // Update the referred user to know who referred them
        referredUser.referredBy = referrer._id; // Store the referrer's ID in the referred user's record
        await referredUser.save(); // Save the updated referred user

        res.status(200).json({ message: 'Referral tracked successfully' }); // Send a 200 OK response with a success message
      } catch (err) {
        console.error(err.message); // Log the error message
        res.status(500).send('Server error'); // Send a 500 Server Error response
      }
    };

    // @desc    Get referral rewards for a user
    // @route   GET /api/referral/rewards
    // @access  Private
    exports.getReferralRewards = async (req, res) => {
      // Define an asynchronous function to get the referral rewards for a user
      try {
        const user = await User.findById(req.user.id); // Find the user by ID

        if (!user) {
          return res.status(404).json({ message: 'User not found' }); // Send a 404 Not Found response if the user is not found
        }

        res.json({ rewardsEarned: user.rewardsEarned }); // Send the user's rewards as a JSON response
      } catch (err) {
        console.error(err.message); // Log the error message
        res.status(500).send('Server error'); // Send a 500 Server Error response
      }
    };
    