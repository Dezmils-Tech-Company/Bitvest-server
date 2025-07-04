exports.getProfile = async (req, res) => {
  try {
    // req.user is added by verifyToken middleware
    const user = req.user;
    res.status(200).json({
      name: user.fullName,
      email: user.email,
      phone: user.phone,
      balance: user.balance,
      loanLimit: user.loanLimit,
      activeSubscription: user.activeSubscription,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
