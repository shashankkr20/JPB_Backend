const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config()
let otpStorage = {};

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_HOST,
        pass: process.env.EMAIL_PASS,
    },
});

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

exports.sendEmailOTP = async (req, res) => {
  const { email } = req.body;
  // console.log(email);
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const otp = generateOTP();
  const hashedOTP = await bcrypt.hash(otp, 10);

  otpStorage[email] = { otp: hashedOTP, expires: Date.now() + 10 * 60 * 1000 };

  const mailOptions = {
    from: process.env.EMAIL_HOST,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'OTP sent to email.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send OTP', error: err.message });
  }
};

exports.verifyEmailOTP = async (req, res) => {
  const { email, otp } = req.body;

  if (!otpStorage[email]) {
    return res.status(400).json({ message: 'No OTP found for this email' });
  }

  const storedOTP = otpStorage[email];

  if (Date.now() > storedOTP.expires) {
    return res.status(400).json({ message: 'OTP has expired' });
  }

  const isMatch = await bcrypt.compare(otp, storedOTP.otp);

  if (isMatch) {
    delete otpStorage[email];
    res.status(200).json({ message: 'OTP verified successfully' });
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
  }
};
