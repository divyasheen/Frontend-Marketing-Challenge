import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="hero-image">
        <div className="hero-content">
          <h1>Welcome to Our Bakery</h1>
          <p>Freshly baked goods every day</p>
          <Link to="/products" className="shop-button">
            Open the Bakery
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;