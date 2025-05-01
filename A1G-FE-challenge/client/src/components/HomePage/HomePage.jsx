import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.scss';

const HomePage = () => (
  <div className="home-container">
    <Link to="/products" className="btn btn-lg btn-primary shop-button">
      OPEN
    </Link>
  </div>
);

export default HomePage;