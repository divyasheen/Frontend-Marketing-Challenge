import React from "react";
import { Link } from "react-router-dom";

const SuccessPage = () => (
  <div className="d-flex vh-100 align-items-center justify-content-center bg-light">
    <div
      className="text-center p-4 bg-white rounded shadow"
      style={{ maxWidth: "400px" }}
    >
      <h1 className="h4 text-secondary mb-3">Order Received</h1>
      <img
        src="/images/fireworks.png"
        alt="Success"
        className="mb-4"
        style={{ width: "80px", height: "80px" }}
      />

      <p className="mb-4">
        <span className="d-block fw-bold fs-4 text-dark mb-2">Thank you!</span>
        We have successfully received your order.
      </p>
      <Link to="/products" className="btn btn-primary">
        Submit Another Order
      </Link>
    </div>
  </div>
);

export default SuccessPage;
