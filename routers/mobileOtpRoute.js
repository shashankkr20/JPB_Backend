const express = require('express');
const { sendMobileOTP, verifyMobileOTP } = require('../controllers/mobileOtpController');

const router = express.Router();


router.post('/send', sendMobileOTP);


router.post('/verify', verifyMobileOTP);

module.exports = router;
