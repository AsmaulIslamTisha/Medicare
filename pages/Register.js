import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'client',
    phone: '',
    address: '',
    licenseNumber: ''
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleUserTypeChange = (type) => {
    setFormData(prevState => ({
      ...prevState, 
      userType: type
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    // Here you would typically connect to your backend API
    console.log('Registration attempt', formData);
    
    // Simulate successful registration
    setSuccess(true);
    setError('');
    
    // In a real app, you'd redirect after successful API response
    setTimeout(() => {
      window.location.href = '/login';
    }, 2000);
  };

  return (
    <div className="register-container">
      <div className="register-form-container">
        <h1>MediCare Pharmacy</h1>
        
        {success ? (
          <div className="success-message-container">
            <div className="success-message">Registration successful! Redirecting to login...</div>
          </div>
        ) : (
          <>
            <div className="user-type-selector">
              <button 
                className={formData.userType === 'client' ? 'active' : ''} 
                onClick={() => handleUserTypeChange('client')}
                type="button"
              >
                Client
              </button>
              <button 
                className={formData.userType === 'pharmacist' ? 'active' : ''} 
                onClick={() => handleUserTypeChange('pharmacist')}
                type="button"
              >
                Pharmacist
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="register-form">
              <h2>{formData.userType === 'client' ? 'Client Registration' : 'Pharmacist Registration'}</h2>
              
              {error && <div className="error-message">{error}</div>}
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              
              {formData.userType === 'client' && (
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    required
                  ></textarea>
                </div>
              )}
              
              {formData.userType === 'pharmacist' && (
                <div className="form-group">
                  <label htmlFor="licenseNumber">License Number</label>
                  <input
                    type="text"
                    id="licenseNumber"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <button type="submit" className="register-button">Register</button>
              
              <div className="form-footer">
                <Link to="/login" className="login-link">
                  Already have an account? Login
                </Link>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Register;