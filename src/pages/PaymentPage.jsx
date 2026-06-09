import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [checkoutData, setCheckoutData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    console.log('PaymentPage mounted', { locationState: location.state });

    // Get checkout data from state or sessionStorage
    const data = location.state?.checkoutData || 
      JSON.parse(sessionStorage.getItem('checkoutData') || 'null');

    if (!data) {
      console.warn('No checkout data found - redirecting to cart');
      navigate('/cart');
      return;
    }

    setCheckoutData(data);
    console.log('Checkout data loaded:', data);
  }, [navigate, location.state]);

  const handleProcessPayment = async () => {
    console.log('Process Payment clicked', { checkoutData });
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Payment processed successfully');
      
      // Clear checkout data
      sessionStorage.removeItem('checkoutData');
      
      // Navigate to order confirmation
      navigate('/customer/orders', { 
        state: { 
          orderSuccess: true,
          orderData: checkoutData 
        } 
      });
    } catch (error) {
      console.error('Payment error:', error);
      setIsProcessing(false);
    }
  };

  if (!checkoutData) {
    return (
      <div className="min-h-screen bg-background text-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
          <p>Loading payment details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-textPrimary">
      <header className="sticky top-0 z-40 border-b border-border bg-white backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-gold/90">Quantum Tiles</p>
            <h1 className="text-2xl font-semibold tracking-tight text-black sm:text-3xl">Payment</h1>
          </div>
          <Button 
            variant="ghost" 
            className="hidden md:inline-flex"
            onClick={() => navigate('/checkout')}
          >
            Back to Checkout
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="rounded-[2.5rem] border border-border bg-white/5 p-6 md:p-8 shadow-card"
        >
          <div className="mb-10">
            <p className="text-sm uppercase tracking-[0.32em] text-gold/90">Payment Processing</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-black">
              Complete your payment
            </h2>
          </div>

          <div className="grid gap-8 xl:grid-cols-[1.6fr_0.9fr]">
            <section className="space-y-8">
              {/* Shipping Summary */}
              <Card className="space-y-6 p-8">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-gold/90">Delivery Details</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-black">
                    Shipping Information
                  </h3>
                </div>

                <div className="space-y-4 border-t border-white/10 pt-5">
                  <div>
                    <p className="text-sm text-black/60">Name</p>
                    <p className="text-lg font-semibold text-black">
                      {checkoutData.shipping.firstName} {checkoutData.shipping.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-black/60">Email</p>
                    <p className="text-lg font-semibold text-black">{checkoutData.shipping.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-black/60">Phone</p>
                    <p className="text-lg font-semibold text-black">{checkoutData.shipping.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-black/60">Address</p>
                    <p className="text-lg font-semibold text-black">
                      {checkoutData.shipping.addressLine1}
                      {checkoutData.shipping.addressLine2 && `, ${checkoutData.shipping.addressLine2}`}
                    </p>
                    <p className="text-lg font-semibold text-black">
                      {checkoutData.shipping.city}, {checkoutData.shipping.state} {checkoutData.shipping.pincode}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Payment Method */}
              <Card className="space-y-6 p-8">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-gold/90">Payment Method</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-black">
                    {checkoutData.paymentMethod.toUpperCase()}
                  </h3>
                </div>

                <div className="rounded-2xl bg-gold/10 border border-gold/20 p-4">
                  <p className="text-sm text-gold/80">
                    ℹ️ Your payment will be processed securely. This is a demo checkout - no real payment will be charged.
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleProcessPayment}
                  disabled={isProcessing}
                  className={`w-full py-4 px-6 rounded-2xl font-semibold text-base uppercase tracking-[0.18em] transition-all ${
                    isProcessing
                      ? 'bg-white/10 text-white/50 cursor-not-allowed opacity-60'
                      : 'bg-gold text-navy hover:bg-gold/90 active:bg-gold/80 shadow-lg shadow-gold/20'
                  }`}
                >
                  {isProcessing ? 'Processing...' : 'Pay Now'}
                </motion.button>
              </Card>
            </section>

            {/* Order Summary */}
            <aside className="space-y-6">
              <Card className="space-y-6 p-8 sticky top-24">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-gold/90">Order Summary</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-black">
                    Your items
                  </h3>
                </div>

                {/* Items */}
                <div className="space-y-3 border-t border-white/10 pt-5">
                  {checkoutData.orderItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-black">{item.name}</p>
                        <p className="text-xs text-black/60">Qty: {item.qty}</p>
                      </div>
                      <span className="text-sm font-semibold text-gold">
                        ₹{(item.price * item.qty).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-3 border-t border-white/10 pt-5 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-white/70">Subtotal</span>
                    <span className="font-medium text-black">
                      ₹{checkoutData.subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-white/70">Tax (18%)</span>
                    <span className="font-medium text-black">
                      ₹{checkoutData.tax.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-white/70">Delivery</span>
                    <span className="font-medium text-black">
                      ₹{checkoutData.delivery.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Final Total */}
                <div className="border-t border-white/10 pt-5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-base font-semibold text-black">Total</span>
                    <span className="text-2xl font-bold text-gold">
                      ₹{checkoutData.total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Security */}
                <div className="flex items-center justify-center gap-2 text-xs text-black/60">
                  <span>🔒</span>
                  <span>100% Secure Payment</span>
                </div>
              </Card>
            </aside>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
