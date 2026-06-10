import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoutes } from '../routes';
import { logout } from '../../entities/auth/model/authService';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, Database, FileText, Heart, LayoutDashboard, Layers, ListChecks, Settings, Sparkles, Users, LogOut, User } from 'lucide-react';

const customerItems = [
  { label: 'My Profile', icon: User, to: AppRoutes.CUSTOMER_DASHBOARD },
  { label: 'My Orders', icon: ListChecks, to: AppRoutes.CUSTOMER_ORDERS },
  { label: 'Saved Designs', icon: Sparkles, to: AppRoutes.DESIGN_EXPLORER },
  { label: 'Settings', icon: Settings, to: AppRoutes.SETTINGS },
];

const adminItems = [
  { label: 'Admin Dashboard', icon: LayoutDashboard, to: AppRoutes.ADMIN_DASHBOARD },
  { label: 'Products', icon: Layers, to: AppRoutes.ADMIN_PRODUCTS },
  { label: 'Orders', icon: ListChecks, to: AppRoutes.ADMIN_ORDERS },
  { label: 'Customers', icon: Users, to: AppRoutes.ADMIN_CUSTOMERS },
  { label: 'Inventory', icon: Database, to: AppRoutes.ADMIN_INVENTORY },
  { label: 'Analytics', icon: BarChart3, to: AppRoutes.ADMIN_ANALYTICS },
  { label: 'Settings', icon: Settings, to: AppRoutes.SETTINGS },
];

export default function ProfileDropdown({ role = 'guest' }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  const items = useMemo(() => (role === 'admin' ? adminItems : customerItems), [role]);

  useEffect(() => {
    const handleOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate(AppRoutes.LOGIN, { replace: true });
    setIsOpen(false);
  };

  if (role === 'guest') {
    return null;
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-textPrimary transition hover:bg-blue-50"
      >
        <User className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 z-50 mt-3 w-72 overflow-hidden rounded-3xl border border-border bg-white p-4 shadow-lg shadow-black/10 backdrop-blur-xl"
          >
            <div className="space-y-3">
              <div className="rounded-3xl bg-surface p-4 border border-border">
                <p className="text-sm uppercase tracking-[0.32em] text-primary">Account</p>
                <p className="mt-2 text-sm text-textSecondary">{role === 'admin' ? 'Admin access' : 'Customer access'}</p>
              </div>

              <div className="space-y-1">
                {items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      to={item.to}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 rounded-3xl px-4 py-3 text-sm text-textSecondary transition hover:bg-blue-50 hover:text-primary"
                    >
                      <Icon className="h-4 w-4 text-primary" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded-3xl bg-rose-50 px-4 py-3 text-sm text-rose-600 transition hover:bg-rose-100"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
