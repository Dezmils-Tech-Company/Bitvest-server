import resend from '../utils/resend.js';

export const sendOTPEmail = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const response = await resend.emails.send({
      from: 'dez.ezra05@gmail.com)',
      to: email,
      subject: 'Your OTP Code',
      html: `<p>Your OTP is <strong>${otp}</strong></p>`
    });

    res.status(200).json({ success: true, id: response.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Failed to send OTP' });
  }
};
