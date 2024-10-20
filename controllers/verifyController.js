const User = require('../models/User');

exports.verifyBoth = async (req, res) => {
  
  const { companyEmail } = req.body;
  // console.log(companyEmail);

  if (!companyEmail) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const user = await User.findOne({ companyEmail });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.emailVerified = true;
    user.mobileVerified = true;

    await user.save();

    const { password, ...userData } = user.toObject();
    res.status(200).json({ message: 'User verification successful', user: userData });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during verification', error: error.message });
  }
};
