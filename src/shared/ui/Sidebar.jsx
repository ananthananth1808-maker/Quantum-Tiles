import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppRoutes } from '../routes';
import { motion } from 'framer-motion';
import { BarChart3, Database, Heart, LayoutDashboard, Layers, ListChecks, PackagePlus, Settings, ShoppingCart, Sparkles, Users } from 'lucide-react';

const customerItems = [
  { label: 'Dashboard', to: AppRoutes.CUSTOMER_DASHBOARD, icon: LayoutDashboard },
  { label: 'Products', to: AppRoutes.PRODUCTS, icon: Layers },
  { label: 'Wishlist', to: AppRoutes.WISHLIST, icon: Heart },
  { label: 'Cart', to: AppRoutes.CART, icon: ShoppingCart },
  { label: 'Orders', to: AppRoutes.CUSTOMER_ORDERS, icon: ListChecks },
  { label: 'Saved Designs', to: AppRoutes.DESIGN_EXPLORER, icon: Sparkles },
  { label: 'AI Visualizer', to: AppRoutes.AI_VISUALIZER, icon: PackagePlus },
  { label: 'Settings', to: AppRoutes.SETTINGS, icon: Settings },
];

const adminItems = [
  { label: 'Dashboard', to: AppRoutes.ADMIN_DASHBOARD, icon: LayoutDashboard },
  { label: 'Products', to: AppRoutes.ADMIN_PRODUCTS, icon: Layers },
  { label: 'Orders', to: AppRoutes.ADMIN_ORDERS, icon: ListChecks },
  { label: 'Customers', to: AppRoutes.ADMIN_CUSTOMERS, icon: Users },
  { label: 'Inventory', to: AppRoutes.ADMIN_INVENTORY, icon: Database },
  { label: 'Invoices', to: AppRoutes.ADMIN_INVOICES, icon: PackagePlus },
  { label: 'Analytics', to: AppRoutes.ADMIN_ANALYTICS, icon: BarChart3 },
  { label: 'Settings', to: AppRoutes.SETTINGS, icon: Settings },
];

export default function Sidebar({ role = 'customer', collapsed = false, onToggle }) {
  const location = useLocation();
  const items = useMemo(() => (role === 'admin' ? adminItems : customerItems), [role]);
  const activePath = location.pathname;

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed left-0 top-[5rem] hidden h-[calc(100vh-5rem)] flex-col overflow-hidden border-r border-white/10 bg-slate-950/95 p-4 shadow-2xl shadow-black/30 backdrop-blur-xl md:flex"
      style={{ width: collapsed ? 80 : 280 }}
    >
      <div className="mb-6 flex items-center gap-3 px-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gold text-navy">QT</div>
        {!collapsed ? (
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-gold/90">Quantum Tiles</p>
            <p className="text-xs text-white/60">Premium workspace</p>
          </div>
        ) : null}
      </div>

      <nav className="flex-1 space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activePath === item.to || activePath.startsWith(item.to);
          return (
            <Link
              key={item.label}
              to={item.to}
              className={`group flex items-center gap-3 rounded-3xl px-3 py-3 text-sm transition ${isActive ? 'bg-gold/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
            >
              <Icon className="h-5 w-5 text-gold" />
              {!collapsed ? <span>{item.label}</span> : null}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 flex items-center justify-center">
        <button
          type="button"
          onClick={onToggle}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition hover:bg-white/10"
        >
          <span>{collapsed ? 'Expand' : 'Collapse'}</span>
          <Settings className="h-4 w-4 text-gold" />
        </button>
      </div>
    </motion.aside>
  );
}
