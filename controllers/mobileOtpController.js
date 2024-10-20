const twilio = require('twilio');
const bcrypt = require('bcryptjs');


let otpStorage = {};


const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = twilio(accountSid, authToken);

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); 
}


exports.sendMobileOTP = async (req, res) => {
  const { mobile } = req.body;

mob=`+91${mobile}`
// console.log(mob)
  if (!mob) {
    return res.status(400).json({ message: 'Mobile number is required' });
  }

  const otp = generateOTP();
  const hashedOTP = await bcrypt.hash(otp, 10);
  
 
  otpStorage[mob] = { otp: hashedOTP, expires: Date.now() + 10 * 60 * 1000 }; 

  try {
    await client.messages.create({
      body: `Your OTP code is ${otp}`,
      from: '+18586098326', 
      to: mob
    });
    res.status(200).json({ message: 'OTP sent to mobile.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send OTP', error: err.message });
  }
};


exports.verifyMobileOTP = async (req, res) => {
    
  const { mobile, otp } = req.body;
  // console.log(mobile+otp)
    mob=`+91${mobile}`
  if (!otpStorage[mob]) {
    return res.status(400).json({ message: 'No OTP found for this mobile number' });
  }

  const storedOTP = otpStorage[mob];

  if (Date.now() > storedOTP.expires) {
    return res.status(400).json({ message: 'OTP has expired' });
  }

  const isMatch = await bcrypt.compare(otp, storedOTP.otp);

  if (isMatch) {
    delete otpStorage[mob]; 
    res.status(200).json({ message: 'OTP verified successfully' });
  } else {
    res.status(400).json({ message: 'Invalid OTP' });
  }
};
