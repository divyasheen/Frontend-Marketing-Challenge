import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ShopContext = createContext();

export function ShopProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        .map(item =>
          item.name === name
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter(item => item.quantity > 0)  
    );
  };

  const placeOrder = async () => {
    try {
      const items = cart.map(({ name, quantity }) => ({ name, quantity }));
      await axios.post('/api/order', { items });
      setCart([]);
      return true;
    } catch (err) {
      throw new Error(`Order failed: ${err.message}`);
    }
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        loading,
        error,
        total,
        addToCart,
        updateQuantity,
        placeOrder
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  return useContext(ShopContext);
}