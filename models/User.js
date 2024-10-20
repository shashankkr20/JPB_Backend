const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  companyName: { type: String, required: true },
  companyEmail: { type: String, required: true,unique: true },
  employeeSize: { type: String, required: true },
  password: { type: String, required: true },  
  emailVerified: { type: Boolean, default: false },
  mobileVerified: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
