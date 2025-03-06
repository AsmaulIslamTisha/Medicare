import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('client');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    // Here you would typically connect to your backend API
    console.log('Login attempt', { email, password, userType });
    
    // For demo purposes - simulate login
    const mockUser = {
      id: 1,
      email: email,
      role: userType,
      name: 'Test User'
    };
    
    localStorage.setItem('user', JSON.stringify(mockUser));
    localStorage.setItem('token', 'mock-jwt-token');
    
    // Redirect based on role
    window.location.href = `/${userType}`;
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1>MediCare Pharmacy</h1>
        <div className="user-type-selector">
          <button 
            className={userType === 'client' ? 'active' : ''} 
            onClick={() => setUserType('client')}
          >
            User
          </button>
          <button 
            className={userType === 'pharmacist' ? 'active' : ''} 
            onClick={() => setUserType('pharmacist')}
          >
            Pharmacist
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <h2>{userType === 'client' ? 'User Login' : 'Pharmacist Login'}</h2>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button type="submit" className="login-button">Log In</button>
          
          <div className="form-footer">
            <Link to="/forgot-password" className="forgot-password-link">
              Forgot Password?
            </Link>
            <Link to="/register" className="register-link">
              Don't have an account? Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;