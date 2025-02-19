const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET || 'your-jwt-secret',
    { expiresIn: '72h' }
  );
};

const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

module.exports = {
  generateToken,
  generateVerificationToken
};