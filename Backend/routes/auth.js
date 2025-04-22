const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/verify-otp', authController.verifyOtp);
router.post('/login', authController.login);
router.post('/send-reset-otp', authController.sendResetOtp);
router.post('/reset-password', authController.resetPassword);

module.exports = router;
