import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import ProductList from './components/ProductList/ProductList';
import OrderSummary from './components/OrderSummary/OrderSummary';
import SuccessPage from './components/SuccessPage/SuccessPage';
import axios from 'axios';
import './App.css';

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/storage');
        setProducts(response.data.storage);
      } catch (err) {
         console.error("API Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.name === product.name);
      if (existingItem) {
        return prevCart.map(item =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };
  const updateQuantity = (productName, change) => {
    setCart(prevCart => {
      const updatedCart = prevCart.map(item => {
        if (item.name === productName) {
          const newQuantity = item.quantity + change;
          if (newQuantity <= 0) return null;
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean);

      return updatedCart;
    });
  };

  const placeOrder = async () => {
    try {
      const orderItems = cart.map(({ name, quantity }) => ({ name, quantity }));
      await axios.post('/api/order', { items: orderItems });
      setCart([]);
      navigate('/success');
    } catch (err) {
      alert(`Order failed: ${err.response?.data?.error || err.message}`);
    }
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route 
        path="/products" 
        element={
          <div className="products-container">
            <ProductList 
              products={products} 
              loading={loading} 
              error={error} 
              onAddToCart={addToCart}
            />
            {cart.length > 0 && (
              <button 
                onClick={() => navigate('/checkout')}
                className="checkout-btn"
              >
                Get your order ({cart.reduce((sum, item) => sum + item.quantity, 0)})
              </button>
            )}
          </div>
        } 
      />
      <Route 
        path="/checkout" 
        element={
          <OrderSummary 
            cart={cart}
            total={total}
            onQuantityChange={updateQuantity}
            onCheckout={placeOrder}
          />
        } 
      />
      <Route path="/success" element={<SuccessPage />} />
    </Routes>
  );
};

export default AppWrapper;