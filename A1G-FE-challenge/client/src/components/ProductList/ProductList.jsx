import React, { useState } from 'react';
import './ProductList.css';

const ProductList = ({ products, loading, error, onAddToCart }) => {
  const [quantities, setQuantities] = useState({});

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  const handleQuantityChange = (productName, change) => {
    setQuantities(prev => {
      const current = prev[productName] || 0;
      const product = products.find(p => p.name === productName);
      const newQuantity = Math.max(0, Math.min(current + change, product.stock));
      
      return {
        ...prev,
        [productName]: newQuantity
      };
    });
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.name] || 1;
    onAddToCart(product, quantity);
    setQuantities(prev => ({ ...prev, [product.name]: 0 }));
  };

  return (
    <div className="product-list">
      <h1>Our Bakery Products</h1>
      <div className="products-grid">
        {products.map((product) => {
          const currentQuantity = quantities[product.name] || 0;
          
          return (
            <div key={product.name} className={`product-card ${product.stock === 0 ? 'out-of-stock' : ''}`}>
              <img 
                src={`/images/${product.name.toLowerCase()}.png`} 
                alt={product.name} 
                className="product-image"
              />
              <h3>{product.name}</h3>
              <p className="price">${product.price.toFixed(2)}</p>
              <p className="stock">In stock: {product.stock}</p>
              
              <div className="quantity-selector">
                <button 
                  onClick={() => handleQuantityChange(product.name, -1)}
                  disabled={currentQuantity <= 0}
                  className="quantity-btn"
                >
                  -
                </button>
                <span className="quantity-display">{currentQuantity}</span>
                <button 
                  onClick={() => handleQuantityChange(product.name, 1)}
                  disabled={currentQuantity >= product.stock}
                  className="quantity-btn"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleAddToCart(product)}
                disabled={product.stock === 0 || currentQuantity === 0}
                className="add-to-cart-btn"
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;