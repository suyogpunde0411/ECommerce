import React from 'react';

function LandingPage({ onGetStarted }) {
  return (
    <div className="landing-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="highlight">CloudCart</span>
          </h1>
          <p className="hero-subtitle">
            Your one-stop destination for the best products on the internet. 
            Discover, shop, and manage your store with ease.
          </p>
          <div className="hero-actions">
            <button className="btn hero-btn" onClick={onGetStarted}>
              Get Started
            </button>
          </div>
        </div>
        <div className="hero-visuals">
          <div className="floating-card card-1">
            <div className="icon">🛍️</div>
            <p>Shop Anywhere</p>
          </div>
          <div className="floating-card card-2">
            <div className="icon">🚀</div>
            <p>Fast Delivery</p>
          </div>
          <div className="floating-card card-3">
            <div className="icon">🛡️</div>
            <p>Secure Payments</p>
          </div>
        </div>
      </div>
      
      <div className="features-section">
        <div className="feature">
          <h3>For Customers</h3>
          <p>Browse a wide variety of high-quality products from trusted vendors and enjoy a seamless checkout experience.</p>
        </div>
        <div className="feature">
          <h3>For Vendors</h3>
          <p>Easily list your products, manage your inventory, and reach a wider audience with our intuitive dashboard.</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
