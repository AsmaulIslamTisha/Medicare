import React, { useState } from 'react';
import './App.css';  // Make sure you import the CSS file

const Signup = () => {
  // Set up state variables for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation checks
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // You can perform API calls here to send user data to the server.
    alert('Signup successful!');
    setError('');
  };

  return (
    <div className="signup-container">
      <h2>Signup for Medicare</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="input-group">
          <label>Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Enter your name" 
            required
          />
        </div>
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
          <label>Home Address:</label>
          <textarea 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
            placeholder="Enter your home address" 
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-btn">Signup</button>
      </form>
    </div>
  );
};

export default Signup;