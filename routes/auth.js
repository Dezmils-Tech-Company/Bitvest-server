 // routes/auth.js
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');

const is18 = dob => {
  const age = new Date().getFullYear() - new Date(dob).getFullYear();
  return age >= 18;
};

router.post('/register', async (req, res) => {
  const { fullName, username, email, phone, country, dob,password } = req.body;
if (country !== 'South Africa') return res.status(400).json({ error: 'Only South African users allowed.' });
  if (!is18(dob)) return res.status(400).json({ error: 'You must be 18 or older.' });

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ error: 'Email already exists' });

  const hashedPass = await bcrypt.hash(password, 10);

  const user = new User({ fullName, username, email, phone, country, dob, password: hashedPass });
 

  
  // Function to generate OTP
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const otp = generateOTP();
  const saltRounds = 10; // Recommended: use a value between 10 and 12
  const hashedOtp = await bcrypt.hash(otp, saltRounds);

   const otpExpirationTime = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now
  user.otp = hashedOtp;
  user.otpExpires = otpExpirationTime;

  // Simulated OTP email
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service
    auth: {
      user: 'dez.ezra05@gmail.com', // Your email
      pass: 'ueau dfsp jlcu stzw', // Your email password
    }
  });

  const mailOptions = {
    from: 'dez.ezra05@gmail.com', // Sender address
    to: email,
    subject: 'Your OTP Code',
    html: `<h3>Your OTP is: ${otp}</h3>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Failed to send OTP', error: error.message });
    }
    res.status(200).json({ message: 'OTP sent to email', token });
  });
 
  

   await user.save();
});


      // Verify OTP Route
      router.post('/verify', async (req, res) => {
        try {
          const { email, otp } = req.body;
  
          // 1. Find the User
          const user = await User.findOne({ email });
          if (!user) {
            return res.status(404).json({ message: 'User not found.' });
          }
  
        

        // 3. Update User (e.g., set `isVerified: true`) -  Remove OTP
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

          // 4. Respond with Success
          res.status(200).json({ message: 'OTP verified successfully.' });
  
        } catch (error) {
          console.error('OTP verification error:', error);
          res.status(500).json({ message: 'OTP verification failed.' });
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