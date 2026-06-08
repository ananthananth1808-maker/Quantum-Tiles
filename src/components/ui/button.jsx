import { motion } from 'framer-motion';
import { premiumButtonHover, ghostButtonHover } from '../../shared/animations/variants';

export function Button({ children, variant = 'solid', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 relative overflow-hidden';
  const styles = {
    solid: 'bg-primary text-white shadow-lg hover:shadow-card-hover hover:bg-blue-600',
    ghost: 'border border-border bg-surface text-textPrimary hover:bg-blue-50 hover:border-primary/30',
  };

  const animationVariants = variant === 'solid' ? premiumButtonHover : ghostButtonHover;

  return (
    <motion.button
      variants={animationVariants}
      whileHover="whileHover"
      whileTap="whileTap"
      className={`${base} ${styles[variant]} ${className}`}
      {...props}
    >
      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 bg-white/0"
        whileHover={{ opacity: 0.1 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
