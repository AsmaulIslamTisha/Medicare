// SelectionPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SelectionPage = () => {
  const navigate = useNavigate();

  return (
    <div className="selection-container">
      <h2>Welcome to MediConnect</h2>
      <div className="selection-buttons">
        <button 
          className="selection-btn user-btn"
          onClick={() => navigate('/user-login')}
        >
          User Login
        </button>
        <button 
          className="selection-btn pharma-btn"
          onClick={() => navigate('/pharmacist-login')}
        >
          Pharmacist Login
        </button>
      </div>
    </div>
  );
};

// UserLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log('User login attempt:', formData);
  };

  return (
    <div className="login-container">
      <h2>User Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Login</button>
        <div className="form-links">
          <a href="#" onClick={() => navigate('/forgot-password')}>Forgot Password?</a>
          <a href="#" onClick={() => navigate('/signup')}>New User? Sign Up</a>
        </div>
      </form>
    </div>
  );
};

// PharmacistLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PharmacistLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    licenseNumber: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log('Pharmacist login attempt:', formData);
  };

  return (
    <div className="login-container">
      <h2>Pharmacist Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        {error && <div className="error-message">{error}</div>}
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>License Number</label>
          <input
            type="text"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Login</button>
        <div className="form-links">
          <a href="#" onClick={() => navigate('/forgot-password')}>Forgot Password?</a>
          <a href="#" onClick={() => navigate('/pharmacist-signup')}>New Pharmacist? Sign Up</a>
        </div>
      </form>
    </div>
  );
};

// ForgotPassword.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add password reset logic here
    setMessage('Password reset link has been sent to your email');
  };

  return (
    <div className="login-container">
      <h2>Forgot Password</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        {message && <div className="success-message">{message}</div>}
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Reset Password</button>
        <div className="form-links">
          <a href="#" onClick={() => navigate(-1)}>Back to Login</a>
        </div>
      </form>
    </div>
  );
};

export { SelectionPage, UserLogin, PharmacistLogin, ForgotPassword };
