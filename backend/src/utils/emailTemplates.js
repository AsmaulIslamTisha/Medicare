const getVerificationEmail = (email, token) => {
    const verificationLink = `http://localhost:5000/api/auth/verify/${token}`;
    
    return {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Email Verification',
      html: `
        <h1>Verify Your Email</h1>
        <p>Please click the link below to verify your email address. This link will expire in 5 minutes.</p>
        <a href="${verificationLink}">Verify Email</a>
      `
    };
  };
  
  const getPasswordResetEmail = (email, token) => {
    const resetLink = `http://localhost:5000/api/auth/reset-password/${token}`;
    
    return {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Password Reset Request',
      html: `
        <h1>Reset Your Password</h1>
        <p>Please click the link below to reset your password. This link will expire in 5 minutes.</p>
        <a href="${resetLink}">Reset Password</a>
      `
    };
  };
  
  module.exports = {
    getVerificationEmail,
    getPasswordResetEmail
  };
