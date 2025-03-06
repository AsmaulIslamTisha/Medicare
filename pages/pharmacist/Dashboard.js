import React from 'react';

const PharmacistDashboard = () => {
  // This is a placeholder component
  // You'll need to implement the full pharmacist dashboard
  return (
    <div className="pharmacist-dashboard">
      <h1>Pharmacist Dashboard</h1>
      <p>Welcome to your pharmacist dashboard</p>
      <button 
        onClick={() => {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          window.location.href = '/login';
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default PharmacistDashboard;