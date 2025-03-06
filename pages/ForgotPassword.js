import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('client');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email) {
      setMessage('Please enter your email address');
      return;
    }
    
    // Here you would typically connect to your backend API
    console.log('Password reset request', { email, userType });
    
    // Show success message (in a real app, this would happen after API response)
    setIsSubmitted(true);
    setMessage('Password reset instructions have been sent to your email');
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-form-container">
        <h1>MediCare Pharmacy</h1>
        
        <div className="user-type-selector">
          <button 
            className={userType === 'client' ? 'active' : ''} 
            onClick={() => setUserType('client')}
          >
            Client
          </button>
          <button 
            className={userType === 'pharmacist' ? 'active' : ''} 
            onClick={() => setUserType('pharmacist')}
          >
            Pharmacist
          </button>
        </div>
        
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="forgot-password-form">
            <h2>Forgot Password</h2>
            
            {message && <div className="message">{message}</div>}
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                required
              />
            </div>
            
            <button type="submit" className="reset-button">Reset Password</button>
            
            <div className="form-footer">
              <Link to="/login" className="back-to-login">
                Back to Login
              </Link>
            </div>
          </form>
        ) : (
          <div className="success-message-container">
            <div className="success-message">{message}</div>
            <Link to="/login" className="back-to-login">
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;