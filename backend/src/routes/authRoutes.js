const express = require('express');
const router = express.Router();
const { userValidationRules, pharmacyValidationRules } = require('../middleware/validation');
const auth = require('../middleware/auth');

const {
  registerUser,
  registerPharmacy,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword
} = require('../controllers/authController');

router.post('/register/user', userValidationRules(), registerUser);
router.post('/register/pharmacy', pharmacyValidationRules(), registerPharmacy);

router.get('/verify/:token', verifyEmail);

router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

router.post('/logout', auth, (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
