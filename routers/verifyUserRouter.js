const express = require('express');
const { verifyBoth } = require('../controllers/verifyController');

const router = express.Router();

router.post('/verify-both', verifyBoth);
console.log("iamin")

module.exports = router;
