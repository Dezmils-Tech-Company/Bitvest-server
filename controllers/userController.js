exports.getProfile = async (req, res) => {
  try {
    // req.user is added by verifyToken middleware
    const user = req.user;
    res.status(200).json({
      username: user.username,
      email: user.email,
      phone: user.phone,
      walletBalance: user.walletBalance,
      referralCode: user.referralCode,
      referrals: user.referrals,
      referredBy: user.referredBy,
      firstName: user.firstName,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
