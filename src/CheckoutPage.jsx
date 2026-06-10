import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { AppRoutes } from './shared/routes';

const steps = ['Shipping', 'Payment', 'Review'];
const paymentMethods = [
  { id: 'upi', name: 'UPI', description: 'Google Pay, PhonePe, BHIM', icon: '📱' },
  { id: 'card', name: 'Credit/Debit Card', description: 'Visa, Mastercard, Rupay', icon: '💳' },
  { id: 'netbanking', name: 'Net Banking', description: 'All major banks', icon: '🏦' },
  { id: 'cod', name: 'Cash on Delivery', description: 'Pay when you receive', icon: '🚚' },
];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formErrors, setFormErrors] = useState({});
  const [shipping, setShipping] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
  });

  const orderItems = [
    { name: 'Luxe Arctic Marble', qty: 1, price: 1299 },
    { name: 'Noir Velvet Slate', qty: 2, price: 9296 },
  ];
  const subtotal = orderItems.reduce((total, item) => total + item.price * item.qty, 0);
  const tax = Math.round(subtotal * 0.18);
  const delivery = 299;
  const total = subtotal + tax + delivery;

  const validateField = (name, value) => {
    const errors = { ...formErrors };
    
    // List of required fields
    const requiredFields = ['firstName', 'email', 'phone', 'addressLine1', 'city', 'state', 'pincode'];
    
    switch (name) {
      case 'email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.email = 'Invalid email address';
        } else {
          delete errors.email;
        }
        break;
      case 'phone':
        if (value && !/^\d{10}$/.test(value.replace(/\D/g, ''))) {
          errors.phone = 'Phone number must be 10 digits';
        } else {
          delete errors.phone;
        }
        break;
      case 'pincode':
        if (value && !/^\d{6}$/.test(value)) {
          errors.pincode = 'Pincode must be 6 digits';
        } else {
          delete errors.pincode;
        }
        break;
      default:
        // Only validate required fields
        if (requiredFields.includes(name)) {
          if (!value) {
            errors[name] = 'This field is required';
          } else {
            delete errors[name];
          }
        }
    }
    
    setFormErrors(errors);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShipping({ ...shipping, [name]: value });
    validateField(name, value);
  };

  const isAddressComplete = shipping.firstName && shipping.email && shipping.phone && 
    shipping.addressLine1 && shipping.city && shipping.state && shipping.pincode &&
    Object.keys(formErrors).length === 0;

  const handlePlaceOrder = (e) => {
    e?.preventDefault();
    console.log('Place Order clicked', {
      isAddressComplete,
      formErrors,
      shippingDetails: shipping,
      paymentMethod,
      total,
    });

    if (!isAddressComplete) {
      console.warn('Form is incomplete - cannot proceed', { formErrors, shipping });
      return;
    }

    // Store checkout data in sessionStorage for next page
    const checkoutData = {
      shipping,
      paymentMethod,
      subtotal,
      tax,
      delivery,
      total,
      orderItems,
      timestamp: new Date().toISOString(),
    };
    sessionStorage.setItem('checkoutData', JSON.stringify(checkoutData));
    console.log('Checkout data saved:', checkoutData);

    // Increment step
    setActiveStep(1);
    console.log('Moving to payment step');

    // Navigate to payment page
    setTimeout(() => {
      console.log('Navigating to payment page');
      navigate(AppRoutes.PAYMENT, { state: { checkoutData } });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background text-textPrimary bg-gradient-to-br from-slate-950 via-blue-950 to-black">
      <header className="sticky top-0 z-40 border-b border-border bg-white backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-gold/90">Quantum Tiles</p>
            <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Checkout</h1>
          </div>
          <Button variant="ghost" className="hidden md:inline-flex">
            Back to Cart
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
          {/* Progress Steps */}
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between text-white">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-gold/90">Secure Checkout</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                Complete your order
              </h2>
            </div>
            <div className="hidden gap-2 rounded-full bg-white/5 px-4 py-3 text-sm border border-white/10 sm:flex text-white">
              {steps.map((step, index) => (
                <div key={step} className="flex items-center gap-2 border-white">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full border-white text-sm font-semibold transition ${
                      index === activeStep
                        ? 'border-2 border-white text-white'
                        : index < activeStep
                        ? 'border-2 border-white text-white'
                        : 'border-2 border-white text-white/50'
                    }`}
                  >
                    {index < activeStep ? '✓' : index + 1}
                  </span>
                  <span
                    className={`hidden sm:inline text-sm font-medium transition ${
                      index <= activeStep ? 'text-white' : 'text-white'
                    }`}
                  >
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-8 xl:grid-cols-[1.6fr_0.9fr]">
            <section className="space-y-8">
              {/* Shipping Address Section */}
              <Card className="space-y-6 p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-white/10  ">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-white">Delivery Address</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                    Enter your shipping details
                  </h3>
                </div>

                {/* Name Fields */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-white">
                      First Name <span className="text-red-400">*</span>
                    </span>
                    <input
                      type="text"
                      name="firstName"
                      value={shipping.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter first name"
                      className={`w-full rounded-2xl border-2 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 transition focus:outline-none ${
                        formErrors.firstName
                          ? 'border-red-500/50 focus:border-red-400'
                          : 'border-white/10 focus:border-gold'
                      }`}
                    />
                    {formErrors.firstName && (
                      <p className="text-xs text-red-400">{formErrors.firstName}</p>
                    )}
                  </label>
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-white">
                      Last Name <span className="text-red-400">*</span>
                    </span>
                    <input
                      type="text"
                      name="lastName"
                      value={shipping.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter last name"
                      className="w-full rounded-2xl border-2 border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 transition focus:border-gold focus:outline-none"
                    />
                  </label>
                </div>

                {/* Email and Phone */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-white">
                      Email <span className="text-red-400">*</span>
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={shipping.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className={`w-full rounded-2xl border-2 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 transition focus:outline-none ${
                        formErrors.email
                          ? 'border-red-500/50 focus:border-red-400'
                          : 'border-white/10 focus:border-gold'
                      }`}
                    />
                    {formErrors.email && (
                      <p className="text-xs text-red-400">{formErrors.email}</p>
                    )}
                  </label>
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-white">
                      Phone <span className="text-red-400">*</span>
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={shipping.phone}
                      onChange={handleInputChange}
                      placeholder="10-digit mobile number"
                      className={`w-full rounded-2xl border-2 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 transition focus:outline-none ${
                        formErrors.phone
                          ? 'border-red-500/50 focus:border-red-400'
                          : 'border-white/10 focus:border-gold'
                      }`}
                    />
                    {formErrors.phone && (
                      <p className="text-xs text-red-400">{formErrors.phone}</p>
                    )}
                  </label>
                </div>

                {/* Address Lines */}
                <div className="space-y-4">
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-white">
                      Address Line 1 <span className="text-red-400">*</span>
                    </span>
                    <input
                      type="text"
                      name="addressLine1"
                      value={shipping.addressLine1}
                      onChange={handleInputChange}
                      placeholder="House no., building name, street"
                      className={`w-full rounded-2xl border-2 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 transition focus:outline-none ${
                        formErrors.addressLine1
                          ? 'border-red-500/50 focus:border-red-400'
                          : 'border-white/10 focus:border-gold'
                      }`}
                    />
                    {formErrors.addressLine1 && (
                      <p className="text-xs text-red-400">{formErrors.addressLine1}</p>
                    )}
                  </label>
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-white">Address Line 2</span>
                    <input
                      type="text"
                      name="addressLine2"
                      value={shipping.addressLine2}
                      onChange={handleInputChange}
                      placeholder="Apt, unit, suite, etc. (optional)"
                      className="w-full rounded-2xl border-2 border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white transition focus:border-gold focus:outline-none"
                    />
                  </label>
                </div>

                {/* City, State, Pincode */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-white">
                      City <span className="text-red-400">*</span>
                    </span>
                    <input
                      type="text"
                      name="city"
                      value={shipping.city}
                      onChange={handleInputChange}
                      placeholder="City name"
                      className={`w-full rounded-2xl border-2 bg-white/5 px-4 py-3 text-white placeholder:text-white transition focus:outline-none ${
                        formErrors.city
                          ? 'border-red-500/50 focus:border-red-400'
                          : 'border-white/10 focus:border-gold'
                      }`}
                    />
                    {formErrors.city && (
                      <p className="text-xs text-red-400">{formErrors.city}</p>
                    )}
                  </label>
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-white">
                      State <span className="text-red-400">*</span>
                    </span>
                    <input
                      type="text"
                      name="state"
                      value={shipping.state}
                      onChange={handleInputChange}
                      placeholder="State name"
                      className={`w-full rounded-2xl border-2 bg-white/5 px-4 py-3 text-white placeholder:text-white transition focus:outline-none ${
                        formErrors.state
                          ? 'border-red-500/50 focus:border-red-400'
                          : 'border-white/10 focus:border-gold'
                      }`}
                    />
                    {formErrors.state && (
                      <p className="text-xs text-red-400">{formErrors.state}</p>
                    )}
                  </label>
                  <label className="space-y-2">
                    <span className="text-sm font-medium text-white">
                      Pincode <span className="text-white">*</span>
                    </span>
                    <input
                      type="text"
                      name="pincode"
                      value={shipping.pincode}
                      onChange={handleInputChange}
                      placeholder="6-digit pincode"
                      className={`w-full rounded-2xl border-2 bg-white/5 px-4 py-3 text-white placeholder:text-white transition focus:outline-none ${
                        formErrors.pincode
                          ? 'border-red-500/50 focus:border-red-400'
                          : 'border-white/10 focus:border-gold'
                      }`}
                    />
                    {formErrors.pincode && (
                      <p className="text-xs text-red-400">{formErrors.pincode}</p>
                    )}
                  </label>
                </div>
              </Card>

              {/* Payment Methods Section */}
              <Card className="space-y-6 p-8 bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-white/10">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-white">Payment Method</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                    Choose your payment option
                  </h3>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {paymentMethods.map((method) => (
                    <motion.button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative rounded-2xl border-2 p-5 text-left transition-all ${
                        paymentMethod === method.id
                          ? 'border-gold bg-gold/10 shadow-lg shadow-gold/20'
                          : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.08]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-2xl">{method.icon}</div>
                        </div>
                       <div
  className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
    paymentMethod === method.id
      ? 'border-blue-600 bg-blue-600'
      : 'border-gray-400'
  }`}
>
  {paymentMethod === method.id && (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  )}
</div>
                      </div>
                      <p className="mt-4 text-sm font-semibold text-white">{method.name}</p>
                      <p className="mt-1 text-xs text-white/60">{method.description}</p>
                    </motion.button>
                  ))}
                </div>

                {/* Payment Info Message */}
                <div className="rounded-2xl bg-gold/10 border border-gold/20 p-4">
                  <p className="text-sm text-white">
                    💡 Your payment information is encrypted and secure. We never store your card details.
                  </p>
                </div>
              </Card>
            </section>

            {/* Order Summary Sidebar */}
            <aside className="space-y-6">
              <Card className="space-y-6 p-8 sticky top-24 bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-white/10">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-white">Order Summary</p>
                  <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                    Your items
                  </h3>
                </div>

                {/* Order Items */}
                <div className="space-y-3 border-t border-white/10 pt-5">
                  {orderItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">{item.name}</p>
                        <p className="text-xs text-white">Qty: {item.qty}</p>
                      </div>
                      <span className="text-sm font-semibold text-white">
                        ₹{(item.price * item.qty).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 border-t border-white pt-5 text-sm">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-white">Subtotal</span>
                    <span className="font-medium text-white">
                      ₹{subtotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-white">Tax (18%)</span>
                    <span className="font-medium text-white">
                      ₹{tax.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-white">Delivery Charge</span>
                    <span className="font-medium text-white">
                      ₹{delivery.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="border-t border-white/10 pt-5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-base font-semibold text-white">Total</span>
                    <span className="text-2xl font-bold text-white">
                      ₹{total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Place Order Button */}
                <motion.button
                  whileHover={isAddressComplete ? { scale: 1.02 } : {}}
                  whileTap={isAddressComplete ? { scale: 0.98 } : {}}
                  onClick={(e) => isAddressComplete && handlePlaceOrder(e)}
                  disabled={!isAddressComplete}
                  type="button"
                  className={`w-full py-4 px-6 rounded-2xl border-white font-semibold text-base uppercase tracking-[0.18em] while-hover transition-all ${
                    isAddressComplete
                      ? 'bg-gold text-white hover:bg-green active:bg-gold/80 shadow-lg shadow-gold/20 cursor-pointer'
                      : 'bg-white/10 text-white cursor-not-allowed opacity-60'
                  }`}
                >
                  {isAddressComplete ? 'Place Order' : 'Complete Address'}
                </motion.button>

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-2 text-xs text-white">
                  <span>🔒</span>
                  <span>100% Secure Checkout</span>
                </div>
              </Card>
            </aside>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
