const User = require('../models/User');
const Transaction = require('../models/Transaction');

exports.getWallet = async (req, res) => {
  const user = await User.findById(req.user.id).populate('transactions');
  res.json({ balance: user.walletBalance, transactions: user.transactions });
};

exports.addFunds = async (req, res) => {
  const { amount } = req.body;
  const user = await User.findById(req.user.id);
  user.walletBalance += amount;
  const transaction = new Transaction({ user: user._id, type: 'credit', amount, description: 'Funds added' });
  await transaction.save();
  user.transactions.push(transaction);
  await user.save();
  res.json({ message: 'Funds added successfully', balance: user.walletBalance });
};
