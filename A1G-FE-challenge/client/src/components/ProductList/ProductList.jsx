import React, { useState } from "react";

const ProductList = ({ products, loading, error, onAddToCart }) => {
  const [qty, setQty] = useState({});

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error)
    return <div className="text-center text-danger py-5">Error: {error}</div>;

  const changeQty = (name, delta, stock) => {
    setQty((prev) => ({
      ...prev,
      [name]: Math.max(0, Math.min((prev[name] || 0) + delta, stock)),
    }));
  };

  return (
    <div className="container py-4">
      <h1 className="text-center text-secondary mb-4">Our Bakery Products</h1>
      <div className="row g-4">
        {products.map((p) => (
          <div key={p.name} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100">
              <img
                src={`/images/${p.name.toLowerCase()}.png`}
                className="card-img-top img-fluid w-50 mx-auto p-2"
                alt={p.name}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-secondary">{p.name}</h5>
                <p className="card-text text-warning fw-bold mb-2">
                  ${p.price.toFixed(2)}
                </p>
                <p className="text-muted">In stock: {p.stock}</p>

                <div className="btn-group mt-auto align-self-center">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => changeQty(p.name, -1, p.stock)}
                    disabled={(qty[p.name] || 0) <= 0}
                  >
                    -
                  </button>
                  <span className="btn btn-light disabled">
                    {qty[p.name] || 0}
                  </span>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => changeQty(p.name, 1, p.stock)}
                    disabled={(qty[p.name] || 0) >= p.stock}
                  >
                    +
                  </button>
                </div>

                <button
                  className="btn btn-primary mt-3"
                  onClick={() => {
                    onAddToCart(p, qty[p.name] || 1);
                    setQty((prev) => ({ ...prev, [p.name]: 0 }));
                  }}
                  disabled={p.stock === 0 || (qty[p.name] || 0) === 0}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
