import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import ProductList from './components/ProductList/ProductList';
import OrderSummary from './components/OrderSummary/OrderSummary';
import SuccessPage from './components/SuccessPage/SuccessPage';
import axios from 'axios';
import './scss/App.scss';


const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await axios.get('/api/storage');
        setProducts(data.storage);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const found = prev.find(i => i.name === product.name);
      if (found) {
        return prev.map(i =>
          i.name === product.name ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
  };

  const updateQuantity = (name, change) => {
    setCart(prev =>
      prev
        .map(i =>
          i.name === name
            ? { ...i, quantity: Math.max(i.quantity + change, 0) }
            : i
        )
        .filter(i => i.quantity > 0)
    );
  };

  const placeOrder = async () => {
    try {
      const items = cart.map(({ name, quantity }) => ({ name, quantity }));
      await axios.post('/api/order', { items });
      setCart([]);
      navigate('/success');
    } catch (err) {
      alert(`Order failed: ${err.message}`);
    }
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route
        path="/products"
        element={
          <div className="container-fluid position-relative min-vh-100 pb-5">
            <ProductList
              products={products}
              loading={loading}
              error={error}
              onAddToCart={addToCart}
            />

            {cart.length > 0 && (
              <button
                className="btn btn-primary position-fixed bottom-0 end-0 m-4 rounded-pill shadow"
                onClick={() => navigate('/checkout')}
              >
                Grab your order ({cart.reduce((s, i) => s + i.quantity, 0)})
              </button>
            )}
          </div>
        }
      />

      <Route
        path="/checkout"
        element={
          <div className="container py-5">
            <OrderSummary
              cart={cart}
              total={total}
              onQuantityChange={updateQuantity}
              onCheckout={placeOrder}
            />
          </div>
        }
      />

      <Route path="/success" element={<SuccessPage />} />
    </Routes>
  );
};

export default AppWrapper;