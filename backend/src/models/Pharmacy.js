const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const pharmacySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  address: {
    type: String,
    required: true
  },
  licenseNumber: {
    type: String,
    required: true,
    unique: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  verificationTokenExpiry: Date,
  resetPasswordToken: String,
  resetPasswordExpiry: Date
}, { timestamps: true });

pharmacySchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

pharmacySchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const Pharmacy = mongoose.model('Pharmacy', pharmacySchema);

module.exports = Pharmacy;
