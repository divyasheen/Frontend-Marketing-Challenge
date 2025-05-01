import React from 'react';
import { Link } from 'react-router-dom';

const OrderSummary = ({ cart, total, onQuantityChange, onCheckout }) => (
  <div className="card mx-auto" style={{ maxWidth: '800px' }}>
    <div className="card-header bg-light text-center">
      <h2 className="mb-0 text-secondary">My Order</h2>
    </div>
    <div className="card-body">
      {cart.map(i => (
        <div key={i.name} className="d-flex align-items-center mb-4">
          {/* thumbnail */}
          <img
            src={`/images/${i.name.toLowerCase()}.png`}
            alt={i.name}
            className="me-3 border rounded"
            style={{ width: '80px', height: '80px' }}
          />

          {/* price */}
          <div>
            <h5 className="text-secondary">{i.name}</h5>
            <p className="mb-1">${i.price.toFixed(2)} each</p>
            <p className="fw-bold mb-1">
              Subtotal: ${(i.price * i.quantity).toFixed(2)}
            </p>
          </div>

          {/* quantity controls */}
          <div className="btn-group ms-auto">
            <button
              className="btn btn-outline-secondary"
              onClick={() => onQuantityChange(i.name, -1)}
              disabled={i.quantity <= 0}
            >
              -
            </button>
            <span className="btn btn-light disabled">{i.quantity}</span>
            <button
              className="btn btn-outline-secondary"
              onClick={() => onQuantityChange(i.name, 1)}
              disabled={i.quantity >= i.stock}  
            >
              +
            </button>
          </div>
        </div>
      ))}

      {/* total & actions */}
      <div className="d-flex justify-content-between border-top pt-3 mt-3">
        <span className="fw-bold text-secondary">Total</span>
        <span className="fw-bold text-secondary">${total.toFixed(2)}</span>
      </div>

      <button
        className="btn btn-primary w-100 mt-4"
        disabled={total === 0}
        onClick={onCheckout}
      >
        Order
      </button>

      <Link to="/products" className="btn btn-link w-100 mt-2">
        Continue Shopping
      </Link>
    </div>
  </div>
);

export default OrderSummary;
