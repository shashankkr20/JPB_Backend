const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { name, phone, companyName, companyEmail, employeeSize, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      phone,
      companyName,
      companyEmail,
      employeeSize,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { companyEmail, password } = req.body;

  try {
    // console.log(companyEmail);
    const user = await User.findOne({ companyEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    if (!user.emailVerified || !user.mobileVerified) {
      return res.status(403).json({
        message: 'Please verify both your email and mobile number to log in.'
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const userData = user.toObject();
    delete userData.password;

    return res.status(200).json({ token, message: 'Login successful.', user: userData });

  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ message: 'Server error.', error: error.message });
  }
};
