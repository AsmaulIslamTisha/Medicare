const { body } = require('express-validator');

const userValidationRules = () => {
  return [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Invalid email address'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
    body('address').trim().notEmpty().withMessage('Address is required'),
  ];
};

const pharmacyValidationRules = () => {
  return [
    body('name').trim().notEmpty().withMessage('Pharmacy name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Invalid email address'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
    body('address').trim().notEmpty().withMessage('Address is required'),
    body('licenseNumber').trim().notEmpty().withMessage('License number is required'),
  ];
};

module.exports = {
  userValidationRules,
  pharmacyValidationRules
};