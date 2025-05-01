import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShopProvider } from './contexts/ShopContext';
import HomePage from './components/HomePage/HomePage';
import ProductList from './components/ProductList/ProductList';
import OrderSummary from './components/OrderSummary/OrderSummary';
import SuccessPage from './components/SuccessPage/SuccessPage';
import './scss/App.scss';

const App = () => {
  return (
    <ShopProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/checkout" element={<OrderSummary />} />
            <Route path="/success" element={<SuccessPage />} />
          </Routes>
        </div>
      </Router>
    </ShopProvider>
  );
};

export default App;