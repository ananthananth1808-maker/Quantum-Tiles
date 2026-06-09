import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { getCart, removeFromCart as removeFromCartService, updateCartQuantity as updateCartQuantityService, addToCart as addToCartService, clearCart as clearCartService } from './cartService';

const CartContext = createContext();
const CART_UPDATE_EVENT = 'cart-update';

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load cart from localStorage on mount
  useEffect(() => {
    const items = getCart();
    setCartItems(items);
    setLoading(false);

    // Listen for storage changes (when cart is updated from other tabs/windows)
    const handleStorageChange = (e) => {
      if (e.key === 'quantum_tiles_cart') {
        setCartItems(getCart());
      }
    };

    // Listen for custom cart update events (same window)
    const handleCartUpdate = () => {
      setCartItems(getCart());
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener(CART_UPDATE_EVENT, handleCartUpdate);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener(CART_UPDATE_EVENT, handleCartUpdate);
    };
  }, []);

  const addToCart = useCallback((product, quantity = 1) => {
    const updated = addToCartService(product, quantity);
    setCartItems(updated);
  }, []);

  const removeItem = useCallback((id) => {
    const updated = removeFromCartService(id);
    setCartItems(updated);
  }, []);

  const updateQuantity = useCallback((id, amount) => {
    const updated = updateCartQuantityService(id, amount);
    setCartItems(updated);
  }, []);

  const clearCart = useCallback(() => {
    const updated = clearCartService();
    setCartItems(updated);
  }, []);

  const cartCount = cartItems.length;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, cartCount, totalItems, loading, addToCart, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
