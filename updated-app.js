// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SelectionPage, UserLogin, PharmacistLogin, ForgotPassword } from './components/auth';
import Signup from './Signup';
import PharmacistSignup from './PharmacistSignup';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SelectionPage />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/pharmacist-login" element={<PharmacistLogin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pharmacist-signup" element={<PharmacistSignup />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
