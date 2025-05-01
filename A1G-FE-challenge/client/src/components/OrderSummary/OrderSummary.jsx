import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../../contexts/ShopContext';

const OrderSummary = () => {
  const { cart, total, updateQuantity, placeOrder } = useShop();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      await placeOrder();
      navigate('/success');
    } catch (err) {
      alert(`Order failed: ${err.message}`);
    }
  };

  const handleDecrement = (name) => {
    updateQuantity(name, -1);
  };

  if (cart.length === 0) {
    return (
      <div className="card mx-auto my-5" style={{ maxWidth: '800px' }}>
        <div className="card-body text-center py-5">
          <h3 className="text-secondary mb-4">Your cart is empty</h3>
          <Link to="/products" className="btn btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="card mx-auto" style={{ maxWidth: '800px' }}>
        <div className="card-header bg-light text-center">
          <h2 className="mb-0 text-secondary">My Order</h2>
        </div>
        <div className="card-body">
          {cart.map(item => (
            <div key={item.name} className="d-flex align-items-center mb-4">
              <img
                src={`/images/${item.name.toLowerCase()}.png`}
                alt={item.name}
                className="me-3 border rounded"
                style={{ width: '80px', height: '80px' }}
                loading="lazy"
              />

              <div className="flex-grow-1">
                <h5 className="text-secondary">{item.name}</h5>
                <p className="mb-1">${item.price.toFixed(2)} each</p>
                <p className="fw-bold mb-1">
                  Subtotal: ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>

              <div className="btn-group ms-3">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => handleDecrement(item.name)}
                >
                  -
                </button>
                <span className="btn btn-light disabled">{item.quantity}</span>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => updateQuantity(item.name, 1)}
                  disabled={item.quantity >= item.stock}
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <div className="d-flex justify-content-between border-top pt-3 mt-3">
            <span className="fw-bold text-secondary">Total</span>
            <span className="fw-bold text-secondary">${total.toFixed(2)}</span>
          </div>

          <button
            className="btn btn-primary w-100 mt-4 py-2"
            onClick={handleCheckout}
            disabled={cart.length === 0}
          >
            Order
          </button>

          <Link to="/products" className="btn btn-outline-secondary w-100 mt-3">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;