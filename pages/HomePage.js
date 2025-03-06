import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo-container">
          <h1>MediCare Pharmacy</h1>
        </div>
        <nav className="home-nav">
          <Link to="/login" className="nav-button">Login</Link>
          <Link to="/register" className="nav-button primary">Register</Link>
        </nav>
      </header>

      <section className="hero-section">
        <div className="hero-content">
          <h2>Welcome to MediCare Pharmacy</h2>
          <p>Your trusted partner for all your medication needs</p>
          <div className="cta-buttons">
            <Link to="/login" className="cta-button">Client Login</Link>
            <Link to="/login" className="cta-button secondary">Pharmacist Portal</Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>Our Services</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">💊</div>
            <h3>Online Prescriptions</h3>
            <p>Submit and renew your prescriptions online</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Home Delivery</h3>
            <p>Get medications delivered right to your doorstep</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👨‍⚕️</div>
            <h3>Pharmacist Consultation</h3>
            <p>Get expert advice from our licensed pharmacists</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Medication Reminders</h3>
            <p>Never miss a dose with our reminder system</p>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <p>&copy; 2025 MediCare Pharmacy. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact Us</a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;