const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  phone: String,
  country: String,
  dob: Date,
  password: String,
  referralCode: { type: String, unique: true },
  balance: { type: Number, default: 0 }
});
module.exports = mongoose.model('User', UserSchema);