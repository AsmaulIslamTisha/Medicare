import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Register from './pages/Register';
import ClientDashboard from './pages/client/Dashboard';
import PharmacistDashboard from './pages/pharmacist/Dashboard';
import './App.css';

function App() {
  // Simple authentication check (should be replaced with proper auth logic)
  const isAuthenticated = () => {
    return localStorage.getItem('user') !== null;
  };

  // Simple role check (should be replaced with proper role verification)
  const getUserRole = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).role : null;
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected client routes */}
          <Route 
            path="/client/*" 
            element={
              isAuthenticated() && getUserRole() === 'client' ? 
              <ClientDashboard /> : 
              <Navigate to="/login" replace />
            } 
          />
          
          {/* Protected pharmacist routes */}
          <Route 
            path="/pharmacist/*" 
            element={
              isAuthenticated() && getUserRole() === 'pharmacist' ? 
              <PharmacistDashboard /> : 
              <Navigate to="/login" replace />
            } 
          />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;