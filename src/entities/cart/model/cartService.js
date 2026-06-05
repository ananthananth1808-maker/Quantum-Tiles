const CART_STORAGE_KEY = 'quantum_tiles_cart';

const loadCart = () => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load cart from storage', error);
    return [];
  }
};

const saveCart = (cart) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  return cart;
};

export const getCart = () => loadCart();

export const setCart = (cartItems) => saveCart(cartItems);

export const clearCart = () => saveCart([]);

export const addToCart = (product, quantity = 1) => {
  const cart = loadCart();
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    const updatedCart = cart.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
    );
    return saveCart(updatedCart);
  }

  const newItem = {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    quantity,
  };

  return saveCart([...cart, newItem]);
};

export const updateCartQuantity = (id, amount) => {
  const cart = loadCart();
  const updated = cart
    .map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item))
    .filter((item) => item.quantity > 0);

  return saveCart(updated);
};

export const removeFromCart = (id) => {
  const cart = loadCart();
  const updated = cart.filter((item) => item.id !== id);
  return saveCart(updated);
};
