import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { getCart, removeFromCart, updateCartQuantity } from './entities/cart/model/cartService';

export default function CartPage() {
  const [cartItems, setCartItems] = useState(() => getCart());
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  const subtotal = useMemo(() => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0), [cartItems]);
  const tax = useMemo(() => Math.round(subtotal * 0.08), [subtotal]);
  const delivery = useMemo(() => (subtotal > 0 ? 24 : 0), [subtotal]);
  const total = subtotal + tax + delivery - discount;

  const updateQuantity = (id, amount) => {
    const updatedItems = updateCartQuantity(id, amount);
    setCartItems(updatedItems);
  };

  const removeItem = (id) => {
    const updatedItems = removeFromCart(id);
    setCartItems(updatedItems);
  };

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'QUANTUM20') {
      setDiscount(20);
    }
  };

  return (
    <div className="min-h-screen bg-navy text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-navy/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-gold/90">Quantum Tiles</p>
            <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Shopping Cart</h1>
          </div>
          <Button variant="ghost" className="hidden md:inline-flex">Continue Shopping</Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 md:px-8">
        <div className="grid gap-8 xl:grid-cols-[1.4fr_0.9fr]">
          <section className="space-y-6">
            <Card className="space-y-6 p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-gold/90">Your Cart</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">Review your selected tiles.</h2>
                </div>
                <p className="rounded-full bg-white/5 px-4 py-2 text-sm text-white/80">{cartItems.length} items</p>
              </div>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-4 md:grid-cols-[160px_minmax(0,1fr)_auto]"
                  >
                    <div className="overflow-hidden rounded-3xl bg-navy">
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm uppercase tracking-[0.32em] text-gold/90">{item.material}</p>
                          <h3 className="mt-2 text-xl font-semibold text-white">{item.name}</h3>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-sm font-semibold text-white/70 transition hover:text-white"
                        >
                          Remove
                        </button>
                      </div>
                      <p className="text-sm text-white/60">Size: {item.size}</p>
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="h-10 w-10 rounded-full bg-white/5 text-lg text-white transition hover:bg-white/10"
                          >
                            −
                          </button>
                          <span className="min-w-[36px] text-center text-lg font-semibold text-white">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="h-10 w-10 rounded-full bg-white/5 text-lg text-white transition hover:bg-white/10"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-xl font-semibold text-white">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </section>

          <aside className="space-y-6">
            <Card className="space-y-6 p-6">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.32em] text-gold/90">Order Summary</p>
                <div className="space-y-3 text-sm text-white/70">
                  <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Tax</span>
                    <span>₹{tax.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Delivery Charge</span>
                    <span>₹{delivery.toLocaleString('en-IN')}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex items-center justify-between text-emerald-300">
                      <span>Coupon Discount</span>
                      <span>-₹{discount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xl font-semibold text-white">
                  <span>Total</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </Card>

            <Card className="space-y-6 p-6">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.32em] text-gold/90">Coupon</p>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(event) => setCoupon(event.target.value)}
                    placeholder="Enter coupon code"
                    className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
                  />
                  <Button variant="ghost" className="px-6 py-3 text-sm uppercase tracking-[0.18em]" onClick={applyCoupon}>
                    Apply
                  </Button>
                </div>
                <p className="text-sm text-white/60">Use code <span className="font-semibold text-white">QUANTUM20</span> for $20 off.</p>
              </div>
            </Card>

            <Card className="space-y-4 bg-white/5 p-6">
              <Button className="w-full px-6 py-4 text-base font-semibold uppercase tracking-[0.18em]">Proceed To Checkout</Button>
              <Button variant="ghost" className="w-full px-6 py-4 text-base font-semibold uppercase tracking-[0.18em]">Continue Shopping</Button>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
}
