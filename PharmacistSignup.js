import React, { useState } from 'react';
import './App.css';  // Make sure you import the CSS file

const PharmacistSignup = () => {
  // State variables for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pharmacyName, setPharmacyName] = useState('');
  const [pharmacyLocation, setPharmacyLocation] = useState('');
  const [pharmacyLicense, setPharmacyLicense] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation checks
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // You can perform API calls here to send pharmacist data to the server.
    alert('Pharmacist Signup successful!');
    setError('');
  };

  return (
    <div className="signup-container">
      <h2>Pharmacist Signup for Medicare</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="input-group">
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter your email" 
            required
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter your password" 
            required
          />
        </div>
        <div className="input-group">
          <label>Confirm Password:</label>
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            placeholder="Confirm your password" 
            required
          />
        </div>
        <div className="input-group">
          <label>Pharmacy Name:</label>
          <input 
            type="text" 
            value={pharmacyName} 
            onChange={(e) => setPharmacyName(e.target.value)} 
            placeholder="Enter your pharmacy name" 
            required
          />
        </div>
        <div className="input-group">
          <label>Pharmacy Location (Address):</label>
          <textarea 
            value={pharmacyLocation} 
            onChange={(e) => setPharmacyLocation(e.target.value)} 
            placeholder="Enter your pharmacy location" 
            required
          />
        </div>
        <div className="input-group">
          <label>Pharmacy License Number:</label>
          <input 
            type="text" 
            value={pharmacyLicense} 
            onChange={(e) => setPharmacyLicense(e.target.value)} 
            placeholder="Enter your pharmacy license number" 
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-btn">Signup</button>
      </form>
    </div>
  );
};

export default PharmacistSignup;