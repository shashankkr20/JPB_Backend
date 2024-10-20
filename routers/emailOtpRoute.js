const express = require('express');
const { sendEmailOTP, verifyEmailOTP } = require('../controllers/emailOtpController');

const router = express.Router();


router.post('/send', sendEmailOTP);

router.post('/verify', verifyEmailOTP);

module.exports = router;
