import React from 'react';

const ClientDashboard = () => {
  // This is a placeholder component
  // You'll need to implement the full client dashboard
  return (
    <div className="client-dashboard">
      <h1>Client Dashboard</h1>
      <p>Welcome to your client dashboard</p>
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

export default ClientDashboard;