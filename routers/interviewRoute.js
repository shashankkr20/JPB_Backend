const express = require('express');
const router = express.Router();
const { createInterview, getInterviews } = require('../controllers/interviewController');
const { verifyToken } = require('../middleware/authMiddleware');
const { sendNotification } = require('../controllers/interviewController');


router.post('/add',verifyToken, createInterview);



router.post('/fetch',verifyToken, getInterviews);
router.post('/notify',verifyToken,sendNotification)

module.exports = router;
