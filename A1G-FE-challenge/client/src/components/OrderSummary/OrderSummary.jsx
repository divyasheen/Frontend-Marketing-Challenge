import React from 'react';
import { Link } from 'react-router-dom';
import './OrderSummary.css';

const OrderSummary = ({ cart, total, onQuantityChange, onCheckout }) => {
  return (
    <div className="order-summary-container">
      <h1>My Order</h1>
      <div className="order-items">
        {cart.map(item => (
          <div key={item.name} className="order-item">
            <div className="item-left">
              <img 
                src={`/images/${item.name.toLowerCase()}.png`} 
                alt={item.name}
                className="order-item-image"
              />
              <div className="item-info">
                <h3>{item.name}</h3>
                <p>${item.price.toFixed(2)} each</p>
                <p className="item-subtotal">Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
            <div className="quantity-control">
              <button onClick={() => onQuantityChange(item.name, -1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => onQuantityChange(item.name, 1)}>+</button>
            </div>
          </div>
        ))}
      </div>
      <div className="order-total">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <button 
        onClick={onCheckout}
        disabled={total === 0}
        className="place-order-btn"
      >
        Order
      </button>
      <Link to="/products" className="continue-shopping">
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSummary;