import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../routes';
import { isAdmin, isAuthenticated, isCustomer } from '../../entities/auth/model/authService';
import { useCart } from '../../entities/cart/model/CartProvider';
import ProfileDropdown from './ProfileDropdown';
import { Search, ShoppingCart, Heart, Bell, Menu } from 'lucide-react';
import { navbarSlideDown, staggerContainer, staggerItem } from '../../shared/animations/variants';

const centerLinks = [
  { label: 'Home', to: AppRoutes.HOME },
  { label: 'Products', to: AppRoutes.PRODUCTS },
  { label: 'AI Visualizer', to: AppRoutes.AI_VISUALIZER },
  { label: 'Categories', to: AppRoutes.CATEGORIES },
  { label: 'Testimonials', to: AppRoutes.TESTIMONIALS },
  { label: 'About', to: AppRoutes.ABOUT },
];

export default function Navbar({ onOpenMobile }) {
  const authenticated = isAuthenticated();
  const admin = isAdmin();
  const customer = isCustomer();
  const role = admin ? 'admin' : customer ? 'customer' : 'guest';
  const { totalItems } = useCart();

  return (
    
    <motion.header
      initial="hidden"
      animate="visible"
      variants={navbarSlideDown}
      className="glass-navbar fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
        {/* Logo Section */}
        <motion.div
          className="flex items-center gap-3"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.button
            variants={staggerItem}
            type="button"
            onClick={onOpenMobile}
            className="inline-flex h-11 w-11 items-center justify-center rounded-3xl border border-border bg-surface text-textPrimary transition hover:bg-blue-50 hover:border-blue-300 md:hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Menu className="h-5 w-5" />
          </motion.button>

          <motion.div variants={staggerItem} whileHover={{ scale: 1.05 }}>
            <Link to={AppRoutes.HOME} className="flex items-center gap-3 text-base font-semibold uppercase tracking-[0.18em] text-primary">
            <img src="/images/qt.jpeg" alt="Logo" className="h-8 w-15 rounded-full object-cover" />
              <span className="hidden sm:inline">Quantum Tiles</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Center Navigation Links */}
        <motion.nav
          className="hidden flex-1 items-center justify-center gap-6 text-sm font-medium text-textSecondary lg:flex"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {centerLinks.map((item) => (
            <motion.div key={item.label} variants={staggerItem}>
              <Link to={item.to} className="relative group text-textSecondary transition-colors hover:text-primary">
                {item.label}
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-primary"
                  initial={{ width: '0%' }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          ))}
        </motion.nav>

        {/* Right Icons Section */}
        <motion.div
          className="flex items-center gap-2"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
         

         

         
          {/* Profile / Auth */}
          {authenticated ? (
            <motion.div variants={staggerItem}>
              <ProfileDropdown role={role} />
            </motion.div>
          ) : (
            <motion.div variants={staggerItem} className="hidden items-center gap-2 md:flex color-primary">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to={AppRoutes.LOGIN} className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-semibold text-textPrimary transition hover:bg-blue-50 hover:border-primary/30">
                  Login
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to={AppRoutes.REGISTER} className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90">
                  Register
                </Link>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.header>
  );
}
