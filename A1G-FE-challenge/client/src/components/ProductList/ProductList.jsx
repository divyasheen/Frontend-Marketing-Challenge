import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../../contexts/ShopContext';

const ProductList = () => {
  const { products, cart, loading, error, addToCart } = useShop();
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  const handleQuantityChange = (productName, change, stock) => {
    setQuantities(prev => ({
      ...prev,
      [productName]: Math.max(0, Math.min((prev[productName] || 0) + change, stock))
    }));
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.name] || 1;
    if (quantity > 0) {
      addToCart(product, quantity);
      setQuantities(prev => ({ ...prev, [product.name]: 0 }));
    }
  };

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <div className="text-center text-danger py-5">Error: {error}</div>;

  return (
    <div className="container py-4">
      <h1 className="text-center text-secondary mb-4">Our Bakery Products</h1>
      <div className="row g-4">
        {products.map(product => (
          <div key={product.name} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card h-100">
              <img
                src={`/images/${product.name.toLowerCase()}.png`}
                className="card-img-top img-fluid w-50 mx-auto p-2"
                alt={product.name}
                loading="lazy"
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-secondary">{product.name}</h5>
                <p className="card-text text-warning fw-bold mb-2">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-muted">In stock: {product.stock}</p>

                <div className="btn-group mt-auto align-self-center">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => handleQuantityChange(product.name, -1, product.stock)}
                    disabled={(quantities[product.name] || 0) <= 0}
                  >
                    -
                  </button>
                  <span className="btn btn-light disabled">
                    {quantities[product.name] || 0}
                  </span>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => handleQuantityChange(product.name, 1, product.stock)}
                    disabled={(quantities[product.name] || 0) >= product.stock}
                  >
                    +
                  </button>
                </div>

                <button
                  className="btn btn-primary mt-3"
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0 || (quantities[product.name] || 0) === 0}
                >
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <button
          className="btn btn-primary position-fixed bottom-0 end-0 m-4 rounded-pill shadow"
          onClick={() => navigate('/checkout')}
        >
          Grab Your Order ({cart.reduce((sum, item) => sum + item.quantity, 0)})
        </button>
      )}
    </div>
  );
};

export default ProductList;