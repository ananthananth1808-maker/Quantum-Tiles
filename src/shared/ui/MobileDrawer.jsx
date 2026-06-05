import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../routes';
import { Home, Layers, Heart, ShoppingCart, ListChecks, Sparkles, Settings, LayoutDashboard, Users, Database, FileText, BarChart3, X, Search, Bell } from 'lucide-react';

const generalItems = [
  { label: 'Home', to: AppRoutes.HOME, icon: Home },
  { label: 'Products', to: AppRoutes.PRODUCTS, icon: Layers },
  { label: 'AI Visualizer', to: AppRoutes.AI_VISUALIZER, icon: Sparkles },
  { label: 'Design Explorer', to: AppRoutes.DESIGN_EXPLORER, icon: Search },
  { label: 'Categories', to: AppRoutes.CATEGORIES, icon: Layers },
  { label: 'About', to: AppRoutes.ABOUT, icon: Bell },
];

const customerItems = [
  { label: 'Dashboard', to: AppRoutes.CUSTOMER_DASHBOARD, icon: LayoutDashboard },
  { label: 'Products', to: AppRoutes.PRODUCTS, icon: Layers },
  { label: 'Wishlist', to: AppRoutes.WISHLIST, icon: Heart },
  { label: 'Cart', to: AppRoutes.CART, icon: ShoppingCart },
  { label: 'Orders', to: AppRoutes.CUSTOMER_ORDERS, icon: ListChecks },
  { label: 'Saved Designs', to: AppRoutes.DESIGN_EXPLORER, icon: Sparkles },
  { label: 'AI Visualizer', to: AppRoutes.AI_VISUALIZER, icon: Search },
  { label: 'Settings', to: AppRoutes.SETTINGS, icon: Settings },
];

const adminItems = [
  { label: 'Dashboard', to: AppRoutes.ADMIN_DASHBOARD, icon: LayoutDashboard },
  { label: 'Products', to: AppRoutes.ADMIN_PRODUCTS, icon: Layers },
  { label: 'Orders', to: AppRoutes.ADMIN_ORDERS, icon: ListChecks },
  { label: 'Customers', to: AppRoutes.ADMIN_CUSTOMERS, icon: Users },
  { label: 'Inventory', to: AppRoutes.ADMIN_INVENTORY, icon: Database },
  { label: 'Invoices', to: AppRoutes.ADMIN_INVOICES, icon: FileText },
  { label: 'Analytics', to: AppRoutes.ADMIN_ANALYTICS, icon: BarChart3 },
  { label: 'Settings', to: AppRoutes.SETTINGS, icon: Settings },
];

export default function MobileDrawer({ open, onClose, role = 'guest' }) {
  const items = role === 'admin' ? adminItems : role === 'customer' ? customerItems : [];

  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xl">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="absolute left-0 top-0 h-full w-4/5 max-w-sm border-r border-white/10 bg-slate-950/95 p-6 shadow-2xl shadow-black/40"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-gold">Quantum Tiles</p>
                <p className="text-xs text-white/60">Mobile navigation</p>
              </div>
              <button type="button" onClick={onClose} className="rounded-full border border-white/10 bg-white/5 p-2 text-white transition hover:bg-white/10">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.32em] text-gold/90">Quick links</p>
              </div>
              {generalItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    onClick={onClose}
                    to={item.to}
                    className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
                  >
                    <Icon className="h-4 w-4 text-gold" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {role !== 'guest' ? (
                <div>
                  <p className="mb-3 text-xs uppercase tracking-[0.32em] text-gold/90">Workspace</p>
                  <div className="space-y-2">
                    {items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.label}
                          onClick={onClose}
                          to={item.to}
                          className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
                        >
                          <Icon className="h-4 w-4 text-gold" />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
