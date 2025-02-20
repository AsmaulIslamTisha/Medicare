const User = require('../models/User');
const Pharmacy = require('../models/Pharmacy');
const { validationResult } = require('express-validator');
const { generateToken, generateVerificationToken } = require('../utils/tokens');
const { getVerificationEmail, getPasswordResetEmail } = require('../utils/emailTemplates');
const transporter = require('../config/email');


const registerUser = async (req, res) => {

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, address } = req.body;
   
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const verificationToken = generateVerificationToken();
    const verificationTokenExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

   
    const user = new User({
      name,
      email,
      password,
      address,
      verificationToken,
      verificationTokenExpiry
    });

    await user.save();

    await transporter.sendMail(getVerificationEmail(email, verificationToken));

    res.status(201).json({
      message: 'User registered successfully. Please check your email for verification.'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }

};


const registerPharmacy = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, address, licenseNumber } = req.body;


    const existingPharmacy = await Pharmacy.findOne({ 
      $or: [{ email }, { licenseNumber }] 
    });
    if (existingPharmacy) {
      return res.status(400).json({ message: 'Pharmacy already exists' });
    }


    const verificationToken = generateVerificationToken();
    const verificationTokenExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  
    const pharmacy = new Pharmacy({
      name,
      email,
      password,
      address,
      licenseNumber,
      verificationToken,
      verificationTokenExpiry
    });

    await pharmacy.save();

  
    await transporter.sendMail(getVerificationEmail(email, verificationToken));

    res.status(201).json({
      message: 'Pharmacy registered successfully. Please check your email for verification.'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params; 
    
    let user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      user = await Pharmacy.findOne({
        verificationToken: token,
        verificationTokenExpiry: { $gt: Date.now() }
      });
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification token' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;
    await user.save();

    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    let isPharmacy = false;

    if (!user) {
      user = await Pharmacy.findOne({ email });
      isPharmacy = true;
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.isVerified) {
      return res.status(401).json({ message: 'Please verify your email before logging in' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        type: isPharmacy ? 'pharmacy' : 'user'
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const forgotPassword = async (req, res) => {

  try {
    const { email } = req.body;

    let user = await User.findOne({ email });
    
    if (!user) {
      user = await Pharmacy.findOne({ email });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = generateVerificationToken();
    const resetTokenExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiry = resetTokenExpiry;
    await user.save();

    await transporter.sendMail(getPasswordResetEmail(email, resetToken));

    res.json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    let user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: Date.now() }
    });

    if (!user) {
      user = await Pharmacy.findOne({
        resetPasswordToken: token,
        resetPasswordExpiry: { $gt: Date.now() }
      });
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  registerUser,
  registerPharmacy,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword
};
