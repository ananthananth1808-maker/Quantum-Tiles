import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { login, register as registerUser } from './entities/auth/model/authService';
import { AppRoutes } from './shared/routes';

const features = [
  'Premium Tile Collections',
  'AI Room Visualizer',
  '2D & 3D Design Explorer',
  'Secure Online Ordering',
];

// Validation patterns
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\d\s\-().+]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/;

const toastVariants = {
  success: 'bg-emerald-500/10 border-emerald-400/30 text-emerald-100',
  error: 'bg-rose-500/10 border-rose-400/30 text-rose-100',
};

export default function AuthPage({ initialTab = 'login' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  const password = watch('password', '');

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3800);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [toast]);

  const mockDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleLogin = async (data) => {
    setLoading(true);
    await mockDelay(1200);
    setLoading(false);

    if (EMAIL_REGEX.test(data.email) && data.password && data.password.length >= 6) {
      const user = login({
        email: data.email,
        role: data.email.includes('admin') ? 'admin' : 'customer',
      });
      setToast({ type: 'success', message: `Welcome back, ${user.email}! Redirecting...` });
      reset();
      navigate(user.role === 'admin' ? AppRoutes.ADMIN_DASHBOARD : AppRoutes.CUSTOMER_DASHBOARD);
    } else {
      setToast({ type: 'error', message: 'Invalid email or password. Please try again.' });
    }
  };

  const handleRegister = async (data) => {
    setLoading(true);
    await mockDelay(1400);
    setLoading(false);

    // Validate all fields
    const isValid = 
      data.name && 
      data.name.trim().length >= 2 &&
      EMAIL_REGEX.test(data.email) && 
      PHONE_REGEX.test(data.phone) &&
      data.password && 
      data.password.length >= 8 &&
      data.password === data.confirmPassword;

    if (isValid) {
      const user = registerUser({
        name: data.name.trim(),
        email: data.email,
        phone: data.phone,
        role: 'customer',
      });
      setToast({ type: 'success', message: `Account created for ${user.email}! Redirecting...` });
      reset();
      navigate(user.role === 'admin' ? AppRoutes.ADMIN_DASHBOARD : AppRoutes.CUSTOMER_DASHBOARD);
    } else {
      setToast({ type: 'error', message: 'Please fill all fields correctly and try again.' });
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    await mockDelay(1000);
    setLoading(false);
    setToast({ type: 'success', message: 'Google login successful. Welcome to Quantum Tiles!' });
  };

  const handleForgotPassword = async () => {
    setLoading(true);
    await mockDelay(1000);
    setLoading(false);
    setToast({ type: 'success', message: 'Password reset link sent to your email.' });
  };

  return (
    <div className="min-h-screen bg-background text-black">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col md:flex-row">
        <motion.section
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex-1 bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(15,23,42,0.78))] bg-cover bg-center px-6 py-12 text-white md:px-12 lg:px-16"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=80)' }}
        >
          <div className="absolute inset-0 bg-black/5" />
          <div className="relative z-10 flex h-full flex-col justify-between gap-10">
            <div className="max-w-xl">
              <p className="text-sm uppercase tracking-[0.35em] text-white">Quantum Tiles</p>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Transform Your Space with Premium Tiles</h1>
              <p className="mt-6 text-base leading-7 text-white sm:text-lg">
                Explore luxury tile collections, AI-powered room visualization, and seamless online tile shopping.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature) => (
                <div key={feature} className="rounded-[2rem] border border-border bg-surface p-5 backdrop-blur-xl">
                  <p className="text-sm font-semibold text-black">✓ {feature}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 px-4 py-8 sm:px-6 md:px-10 lg:px-14 md:py-12"
        >
          <div className="mx-auto max-w-2xl">
            <Card className="rounded-[2rem] border border-white/10 bg-white shadow-glow text-black px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
              <div className="mb-8 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
                {['login', 'register'].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-full px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold transition ${activeTab === tab ? 'bg-primary text-black shadow-md' : 'bg-surface text-black border border-border hover:bg-blue-50'}`}
                  >
                    {tab === 'login' ? 'Login' : 'Register'}
                  </button>
                ))}
              </div>

              <div className="space-y-6">
                {activeTab === 'login' ? (
                  <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
                    <div className="space-y-4">
                      <label className="block text-xs sm:text-sm font-medium text-slate-700">Email</label>
                      <input
                        type="email"
                        placeholder="you@quantumtiles.com"
                        className="w-full rounded-3xl border border-border bg-surface px-4 py-3 text-black outline-none transition focus:border-primary focus:ring-2 focus:ring-blue-100"
                        {...register('email', {
                          required: 'Email is required',
                          pattern: { value: EMAIL_REGEX, message: 'Please enter a valid email address' },
                        })}
                      />
                      {errors.email && <p className="text-xs text-rose-600">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-4">
                      <label className="block text-xs sm:text-sm font-medium text-slate-700">Password</label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter your password"
                          className="w-full rounded-3xl border border-border bg-surface px-4 py-3 pr-28 text-black outline-none transition focus:border-primary focus:ring-2 focus:ring-blue-100"
                          {...register('password', {
                            required: 'Password is required',
                            minLength: { value: 6, message: 'Password must be at least 6 characters' },
                          })}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((value) => !value)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-3 py-2 text-xs text-slate-700 transition hover:bg-white/20"
                        >
                          {showPassword ? 'Hide' : 'Show'}
                        </button>
                      </div>
                      {errors.password && <p className="text-xs text-rose-600">{errors.password.message}</p>}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-slate-700">
                      <label className="inline-flex items-center gap-2">
                        <input type="checkbox" className="h-4 w-4 rounded border-border bg-surface accent-primary" />
                        Remember Me
                      </label>
                      <button type="button" onClick={handleForgotPassword} className="text-primary transition hover:text-blue-700">
                        Forgot Password?
                      </button>
                    </div>

                    <div className="space-y-4">
                      <Button type="submit" className="w-full px-5 py-3 text-base font-semibold uppercase tracking-[0.18em]">
                        {loading ? 'Signing in...' : 'Login'}
                      </Button>
                      <Button type="button" variant="ghost" className="w-full px-5 py-3 text-base font-semibold uppercase tracking-[0.18em] text-black" onClick={handleGoogleLogin}>
                        {loading ? 'Please wait...' : 'Continue with Google'}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">
                    <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                      <label className="space-y-2 text-xs sm:text-sm text-slate-700">
                        <span className="font-medium">Full Name</span>
                        <input
                          type="text"
                          placeholder="John Doe"
                          className="w-full rounded-3xl border border-border bg-surface px-4 py-3 text-black outline-none transition focus:border-primary focus:ring-2 focus:ring-blue-100"
                          {...register('name', {
                            required: 'Full name is required',
                            minLength: { value: 2, message: 'Name must be at least 2 characters' },
                            maxLength: { value: 50, message: 'Name must not exceed 50 characters' },
                            pattern: { value: /^[a-zA-Z\s]*$/, message: 'Name can only contain letters and spaces' },
                          })}
                        />
                        {errors.name && <p className="text-xs text-rose-600">{errors.name.message}</p>}
                      </label>
                      <label className="space-y-2 text-xs sm:text-sm text-slate-700">
                        <span className="font-medium">Phone Number</span>
                        <input
                          type="tel"
                          placeholder="(123) 456-7890"
                          className="w-full rounded-3xl border border-border bg-surface px-4 py-3 text-black outline-none transition focus:border-primary focus:ring-2 focus:ring-blue-100"
                          {...register('phone', {
                            required: 'Phone number is required',
                            pattern: { value: PHONE_REGEX, message: 'Please enter a valid phone number' },
                            minLength: { value: 10, message: 'Phone number must be at least 10 digits' },
                          })}
                        />
                        {errors.phone && <p className="text-xs text-rose-600">{errors.phone.message}</p>}
                      </label>
                    </div>

                    <div className="space-y-4">
                      <label className="block text-xs sm:text-sm font-medium text-slate-700">Email</label>
                      <input
                        type="email"
                        placeholder="you@quantumtiles.com"
                        className="w-full rounded-3xl border border-border bg-surface px-4 py-3 text-black outline-none transition focus:border-primary focus:ring-2 focus:ring-blue-100"
                        {...register('email', {
                          required: 'Email is required',
                          pattern: { value: EMAIL_REGEX, message: 'Please enter a valid email address' },
                        })}
                      />
                      {errors.email && <p className="text-xs text-rose-600">{errors.email.message}</p>}
                    </div>

                    <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                      <label className="space-y-2 text-xs sm:text-sm text-slate-700">
                        <span className="font-medium">Password</span>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Create a password"
                          className="w-full rounded-3xl border border-border bg-surface px-4 py-3 text-black outline-none transition focus:border-primary focus:ring-2 focus:ring-blue-100"
                          {...register('password', {
                            required: 'Password is required',
                            minLength: { value: 8, message: 'Password must be at least 8 characters' },
                            maxLength: { value: 128, message: 'Password must not exceed 128 characters' },
                          })}
                        />
                      </label>
                      <label className="space-y-2 text-xs sm:text-sm text-slate-700">
                        <span className="font-medium">Confirm Password</span>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Confirm your password"
                          className="w-full rounded-3xl border border-border bg-surface px-4 py-3 text-black outline-none transition focus:border-primary focus:ring-2 focus:ring-blue-100"
                          {...register('confirmPassword', {
                            required: 'Please confirm your password',
                            validate: (value) => value === password || 'Passwords do not match',
                          })}
                        />
                      </label>
                    </div>
                    {errors.password?.message && <p className="text-xs text-rose-600">{errors.password.message}</p>}
                    {errors.confirmPassword?.message && <p className="text-xs text-rose-600">{errors.confirmPassword.message}</p>}

                    <div className="space-y-4">
                      <Button type="submit" className="w-full px-5 py-3 text-base font-semibold uppercase tracking-[0.18em]">
                        {loading ? 'Creating account...' : 'Create Account'}
                      </Button>
                      <Button type="button" variant="ghost" className="w-full px-5 py-3 text-base font-semibold uppercase tracking-[0.18em] text-black" onClick={handleGoogleLogin}>
                        {loading ? 'Please wait...' : 'Continue with Google'}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </Card>
          </div>
        </motion.section>
      </div>

      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`fixed bottom-6 right-6 z-50 rounded-3xl border px-5 py-4 text-sm ring-1 ring-white/10 ${toastVariants[toast.type]}`}
        >
          {toast.message}
        </motion.div>
      )}
    </div>
  );
}
