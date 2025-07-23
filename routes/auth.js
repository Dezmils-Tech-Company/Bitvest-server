 // routes/auth.js
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const { text } = require('express');

let otpStore = {};

const is18 = dob => {
  const age = new Date().getFullYear() - new Date(dob).getFullYear();
  return age >= 18;
};

const generateReferralCode = () => {
  return Math.random().toString(36).substr(2, 8); // or use uuid
};

router.post('/register', async (req, res) => {
  const { fullName, username, email, phone, country, dob, password, referredBy } = req.body;

  try {
    if (country !== 'South Africa')
      return res.status(400).json({ error: 'Only South African users allowed.' });
    if (!is18(dob)) return res.status(400).json({ error: 'You must be 18 or older.' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already exists. Please log in.' });

    // Function to generate OTP
    const generateOTP = () => {
      return Math.floor(100000 + Math.random() * 900000).toString();
    };

    const otp = generateOTP();
    const saltRounds = 10; // Recommended: use a value between 10 and 12
    const hashedOtp = await bcrypt.hash(otp, saltRounds);

    const otpExpirationTime = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    // **CRITICAL CHANGE:** Store *only* the OTP and expiration *before* verification
    otpStore[email] = {
      otp: hashedOtp,
      otpExpires: otpExpirationTime,
      userData: { fullName, username, phone, country, dob, password, referredBy }, //Store the user's data here
    };

    // Simulated OTP email
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use your email service
      auth: {
        user: 'bitvestorinvestment@gmail.com', // Your email
        pass: 'adre oqog dtoq mugq', // Your email password
      },
    });

    const mailOptions = {
      from: 'bitvestorinvestment@gmail.com', // Sender address
      to: email,
      subject: 'Your OTP Code',
      html:
        `<h1>Welcome to Bitvest!</h1>
        <h4>Your OTP is: <strong>${otp}</strong>. It is valid for 10 minutes. Please do not share it with anyone.</h4>
        <p>You are joining Bitvest. The leading Investment Platform in the market. If you did not request this, please ignore this email and take all necessary security measures.</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: 'Failed to send OTP', error: error.message });
      }
      console.log('Email sent: ' + info.response);
      res.status(200).json({ message: 'OTP sent to email. Please verify.', email }); // Send email to the client
    });
  } catch (err) {
    console.error('Registration error: ' + err);
    res.status(500).json({ message: 'Registration failed', error: err });
  }
});

// Verify OTP Route
router.post('/verify', async (req, res) => {
  try {
    const { email, otp } = req.body;

    // 1. Retrieve data from store
    const storedData = otpStore[email];

    if (!storedData) {
      return res.status(404).json({ message: 'User data not found. Please register again.' });
    }

    // 2. Check whether code has expired
    if (storedData.otpExpires < Date.now()) {
      delete otpStore[email];
      return res.status(400).json({ message: 'Code has expired.' });
    }

    // 3. Verify the OTP
    const isMatch = await bcrypt.compare(otp, storedData.otp);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // OTP is valid, now create the user
    const { fullName, username, phone, country, dob, password, referredBy } = storedData.userData;

    const referralCode = generateReferralCode();  // Get a referral code.

    const user = new User({
      fullName,
      username,
      email,
      phone,
      country,
      dob,
      password,  // Password is already hashed
      referralCode,
      referredBy,
    });

    await user.save();

    // Remove the OTP from the store after successful verification and user creation
    delete otpStore[email];

    // Optional: Create and return a JWT here (for authentication)

    res.status(201).json({ message: 'User registered successfully!' });

  } catch (err) {
    console.error('Verification error: ' + err);
    res.status(500).json({ message: 'Verification failed', error: err });
  }
});

// API endpoint to validate JWT tokens
router.get('/validate-token', (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token (Bearer <token>)

    if (!token) {
        return res.status(401).json({ message: 'Authentication token is missing' }); // 401 Unauthorized
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error("Token verification error:", err); // Log the error for debugging

            if (err.name === 'TokenExpiredError') {
                return res.status(403).json({ message: 'Authentication token has expired' }); // 403 Forbidden (Expired)
            } else if (err.name === 'JsonWebTokenError') {
                return res.status(401).json({ message: 'Invalid authentication token' }); // 401 Unauthorized (Invalid) - consistent with missing token case.
            } else {
                return res.status(403).json({ message: 'Authentication failed' }); // Generic 403 Forbidden
            }
        }

        // Token is valid: Return user data from the token payload
        res.json({
            message: 'Authentication token is valid',
            user: user // The decoded user data from the JWT
        });
    });
});

        
      // Login Route
      router.post('/login', async (req, res) => {
        try {
          const { username, password } = req.body;


              // 1. Find the User by Username
              const user = await User.findOne({ username });
              if (!user) {
                return res.status(401).json({ message: 'not registered' });
              }
      
              // 2. Compare Passwords
              const isPasswordValid = await bcrypt.compare(password, user.password);
              if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
              } 
      
              // 3. Generate JWT Token
               const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '0.5h' });
              res.json({ token }); // Adjust expiration as needed
              

              // 4. Respond with Token
              res.status(200).json({ message: 'Login successful', token: token });
      
            } catch (error) {
              res.status(500).json({ message: 'Login failed' });
            }
          });


module.exports = router;