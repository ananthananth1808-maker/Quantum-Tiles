import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';

const steps = ['Shipping', 'Payment', 'Review'];
const paymentMethods = ['UPI', 'Card', 'Cash On Delivery'];

export default function CheckoutPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [shipping, setShipping] = useState({ name: '', phone: '', address: '', city: '', state: '', pincode: '' });
  const [paymentMethod, setPaymentMethod] = useState('Card');

  const orderItems = [
    { name: 'Luxe Arctic Marble', qty: 1, price: 149 },
    { name: 'Noir Velvet Slate', qty: 2, price: 112 },
  ];
  const subtotal = orderItems.reduce((total, item) => total + item.price * item.qty, 0);
  const tax = Math.round(subtotal * 0.08);
  const delivery = 24;
  const total = subtotal + tax + delivery;

  return (
    <div className="min-h-screen bg-navy text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-navy/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-gold/90">Quantum Tiles</p>
            <h1 className="text-2xl font-semibold text-white sm:text-3xl">Checkout</h1>
          </div>
          <Button variant="ghost" className="hidden md:inline-flex">Back to Cart</Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-[2.5rem] border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl"
        >
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-gold/90">Multi-step checkout</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">Complete your order with confidence</h2>
            </div>
            <div className="hidden gap-4 rounded-full bg-navy/50 px-4 py-3 text-sm text-white/70 sm:flex">
              {steps.map((step, index) => (
                <div key={step} className="flex items-center gap-2">
                  <span className={`flex h-9 w-9 items-center justify-center rounded-full border ${index === activeStep ? 'border-gold bg-gold text-navy' : 'border-white/15 text-white/70'}`}>{index + 1}</span>
                  <span className={index === activeStep ? 'text-white' : 'text-white/70'}>{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-8 xl:grid-cols-[1.6fr_0.9fr]">
            <section className="space-y-8">
              <Card className="space-y-6 p-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.32em] text-gold/90">Shipping Information</p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">Enter your delivery details</h3>
                  </div>
                  <div className="rounded-full bg-white/5 px-4 py-2 text-sm text-white/70">Step 1 of 3</div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2 text-sm text-white/80">
                    <span>Name</span>
                    <input
                      type="text"
                      value={shipping.name}
                      onChange={(event) => setShipping({ ...shipping, name: event.target.value })}
                      placeholder="Enter full name"
                      className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
                    />
                  </label>
                  <label className="space-y-2 text-sm text-white/80">
                    <span>Phone</span>
                    <input
                      type="tel"
                      value={shipping.phone}
                      onChange={(event) => setShipping({ ...shipping, phone: event.target.value })}
                      placeholder="Enter phone number"
                      className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
                    />
                  </label>
                  <label className="md:col-span-2 space-y-2 text-sm text-white/80">
                    <span>Address</span>
                    <input
                      type="text"
                      value={shipping.address}
                      onChange={(event) => setShipping({ ...shipping, address: event.target.value })}
                      placeholder="Street address, house no."
                      className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
                    />
                  </label>
                  <label className="space-y-2 text-sm text-white/80">
                    <span>City</span>
                    <input
                      type="text"
                      value={shipping.city}
                      onChange={(event) => setShipping({ ...shipping, city: event.target.value })}
                      placeholder="City"
                      className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
                    />
                  </label>
                  <label className="space-y-2 text-sm text-white/80">
                    <span>State</span>
                    <input
                      type="text"
                      value={shipping.state}
                      onChange={(event) => setShipping({ ...shipping, state: event.target.value })}
                      placeholder="State"
                      className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
                    />
                  </label>
                  <label className="space-y-2 text-sm text-white/80">
                    <span>Pincode</span>
                    <input
                      type="text"
                      value={shipping.pincode}
                      onChange={(event) => setShipping({ ...shipping, pincode: event.target.value })}
                      placeholder="Postal code"
                      className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
                    />
                  </label>
                </div>
              </Card>

              <Card className="space-y-6 p-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.32em] text-gold/90">Payment Method</p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">Choose a secure payment option</h3>
                  </div>
                  <div className="rounded-full bg-white/5 px-4 py-2 text-sm text-white/70">Step 2 of 3</div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`rounded-[2rem] border p-5 text-left transition ${paymentMethod === method ? 'border-gold bg-gold/10 text-white' : 'border-white/10 bg-white/5 text-white/80 hover:border-white/20'}`}
                    >
                      <p className="text-sm uppercase tracking-[0.35em] text-gold/90">{method}</p>
                      <p className="mt-4 text-lg font-semibold text-white">{method === 'Card' ? 'Visa, Mastercard' : method === 'UPI' ? 'Google Pay, PhonePe' : 'Pay on Delivery'}</p>
                    </button>
                  ))}
                </div>
              </Card>
            </section>

            <aside className="space-y-6">
              <Card className="space-y-6 p-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.32em] text-gold/90">Order Summary</p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">Your selected tiles</h3>
                  </div>
                  <div className="rounded-full bg-white/5 px-4 py-2 text-sm text-white/70">Step 3 of 3</div>
                </div>

                <div className="space-y-4 border-t border-white/10 pt-5 text-sm text-white/70">
                  <div className="flex items-center justify-between gap-4">
                    <span>Luxe Arctic Marble</span>
                    <span>$149.00</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span>Noir Velvet Slate x2</span>
                    <span>$224.00</span>
                  </div>
                </div>

                <div className="space-y-3 border-t border-white/10 pt-5 text-sm text-white/70">
                  <div className="flex items-center justify-between gap-4">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span>Delivery</span>
                    <span>${delivery.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-5 text-xl font-semibold text-white">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <Button className="w-full px-6 py-4 text-base font-semibold uppercase tracking-[0.18em]">Place Order</Button>
              </Card>
            </aside>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
