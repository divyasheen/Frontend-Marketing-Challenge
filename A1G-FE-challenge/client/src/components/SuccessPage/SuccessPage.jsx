import React from 'react';
import { Link } from 'react-router-dom';
import './SuccessPage.css';

const SuccessPage = () => {
  return (
    <div className="success-container">
      <div className="success-content">
        
        <h1>Order received</h1>
        <img src="/images/fireworks.png" alt="Success" className="success-image" />
        <h2>Thank you!</h2>
        <p>We have successfully received your order.</p>
        <Link to="/products" className="back-button">
          Submit another order
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;