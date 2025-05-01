import React from 'react';
import { Link } from 'react-router-dom';
import './OrderSummary.css';

const OrderSummary = ({ cart, total, onQuantityChange, onCheckout }) => {
  return (
    <div className="checkout-container">
      <h1>Your Order</h1>
      <div className="order-items">
        {cart.map(item => (
          <div key={item.name} className="order-item">
            <img 
              src={`/images/${item.name.toLowerCase()}.png`} 
              alt={item.name}
              className="order-item-image"
            />
            <div className="item-details">
              <h3>{item.name}</h3>
              <p>${item.price.toFixed(2)} each</p>
              <div className="quantity-control">
                <button onClick={() => onQuantityChange(item.name, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => onQuantityChange(item.name, 1)}>+</button>
              </div>
              <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="order-total">
        <h2>Total: ${total.toFixed(2)}</h2>
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
    </div>
  );
};

export default OrderSummary;