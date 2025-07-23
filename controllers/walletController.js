const User = require('../models/User');
const Transaction = require('../models/Transaction');
const nodemailer = require('nodemailer');

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

exports.withdrawFunds = async(req, res) => {
  const { amount} = req.body;
  const user = await User.findById(req.user.id);
  user.walletBalance -= amount;
  const transaction = new Transaction({ user: user._id, type: 'debit', amount, description: 'Funds Withdrawn' });
  const email = user.email;
  await transaction.save();
  user.transactions.push(transaction);
  await user.save();
  res.json({ message: 'Funds withdrawn successfully', balance: user.walletBalance });
  const date = new Date().toLocaleString();
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'bitvestorinvestment@gmail.com',
        pass: 'adre oqog dtoq mugq', // App password, not your Gmail password
      },
    });

    const mailOptions = {
      from: 'bitvestorinvestment@gmail.com',
      to: email,
      subject: 'Withdrawal Confirmation',
      html: `<h3>Withdrawal of $${amount} confirmed</h3><p>Date     Time:{date}</p>`,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Withdrawal successful ' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Email sending failed' });
  }

  

};
