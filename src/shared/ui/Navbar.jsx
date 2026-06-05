import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../routes';
import { isAdmin, isAuthenticated, isCustomer } from '../../entities/auth/model/authService';
import ProfileDropdown from './ProfileDropdown';
import { Search, ShoppingCart, Heart, Bell, Menu } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { fadeInDown, staggerContainer, staggerItem } from '../../shared/animations/variants';

const centerLinks = [
  { label: 'Home', to: AppRoutes.HOME },
  { label: 'Products', to: AppRoutes.PRODUCTS },
  { label: 'AI Visualizer', to: AppRoutes.AI_VISUALIZER },
  { label: 'Design Explorer', to: AppRoutes.DESIGN_EXPLORER },
  { label: 'Categories', to: AppRoutes.CATEGORIES },
  { label: 'About', to: AppRoutes.ABOUT },
];

export default function Navbar({ onOpenMobile }) {
  const authenticated = isAuthenticated();
  const admin = isAdmin();
  const customer = isCustomer();
  const role = admin ? 'admin' : customer ? 'customer' : 'guest';

  return (
    <motion.header
      initial="hidden"
      animate="visible"
      variants={fadeInDown}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-navy/95 shadow-glow backdrop-blur-xl"
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
            className="inline-flex h-11 w-11 items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 md:hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Menu className="h-5 w-5" />
          </motion.button>

          <motion.div variants={staggerItem} whileHover={{ scale: 1.05 }}>
            <Link to={AppRoutes.HOME} className="flex items-center gap-3 text-base font-semibold uppercase tracking-[0.18em] text-gold">
              <span className="flex h-11 w-11 items-center justify-center rounded-3xl bg-gold text-navy">QT</span>
              <span className="hidden sm:inline">Quantum Tiles</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Center Navigation Links */}
        <motion.nav
          className="hidden flex-1 items-center justify-center gap-6 text-sm font-medium text-white/70 lg:flex"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {centerLinks.map((item) => (
            <motion.div key={item.label} variants={staggerItem}>
              <Link to={item.to} className="relative group text-white/70 transition-colors hover:text-gold">
                {item.label}
                <motion.span
                  className="absolute -bottom-1 left-0 h-0.5 bg-gold"
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
          {/* Search */}
          <motion.div variants={staggerItem} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              to={AppRoutes.SEARCH}
              className="inline-flex h-11 w-11 items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 hover:border-gold/50"
            >
              <Search className="h-5 w-5" />
            </Link>
          </motion.div>

          {/* Cart */}
          <motion.div variants={staggerItem} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              to={AppRoutes.CART}
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 hover:border-gold/50"
            >
              <ShoppingCart className="h-5 w-5" />
              <motion.span
                className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1.5 text-[10px] font-semibold text-navy"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
              >
                3
              </motion.span>
            </Link>
          </motion.div>

          {/* Wishlist */}
          <motion.div variants={staggerItem} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              to={AppRoutes.WISHLIST}
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 hover:border-gold/50"
            >
              <Heart className="h-5 w-5" />
              <motion.span
                className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1.5 text-[10px] font-semibold text-navy"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
              >
                5
              </motion.span>
            </Link>
          </motion.div>

          {/* Notifications */}
          <motion.div variants={staggerItem} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Link
              to={AppRoutes.NOTIFICATIONS}
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 hover:border-gold/50"
            >
              <Bell className="h-5 w-5" />
              <motion.span
                className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1.5 text-[10px] font-semibold text-navy"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
              >
                2
              </motion.span>
            </Link>
          </motion.div>

          {/* Profile / Auth */}
          {authenticated ? (
            <motion.div variants={staggerItem}>
              <ProfileDropdown role={role} />
            </motion.div>
          ) : (
            <motion.div variants={staggerItem} className="hidden items-center gap-2 md:flex">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to={AppRoutes.LOGIN} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10">
                  Login
                </Link>
              </motion.div>
              <Button variant="solid" className="rounded-full px-4 py-2 text-sm font-semibold">Register</Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.header>
  );
}
