import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { addToCart } from '../entities/cart/model/cartService';
import { hoverLift } from '../shared/animations/variants';

export function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleQuickView = () => {
    navigate(`/products/${product.id}`);
  };

  const handleAddToCart = () => {
    addToCart(product);
    navigate('/customer/cart');
  };

  return (
    <motion.article
      variants={hoverLift}
      whileHover="whileHover"
      className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-glow transition-shadow duration-300"
    >
      <div className="relative overflow-hidden bg-navy">
        <motion.img
          src={product.image}
          alt={product.name}
          className="h-80 w-full object-cover transition-transform duration-700"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.7 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/10 to-transparent" />
        <motion.button
          type="button"
          className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
          whileHover={{ scale: 1.15, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Add to wishlist"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.button>
      </div>

      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <motion.p
              className="text-xs uppercase tracking-[0.28em] text-gold/90"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {product.category}
            </motion.p>
            <motion.h3
              className="mt-3 text-xl font-semibold text-white"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {product.name}
            </motion.h3>
          </div>
          <motion.span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${product.stock === 'In Stock' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-amber-500/15 text-amber-300'}`}
            whileHover={{ scale: 1.05 }}
          >
            {product.stock}
          </motion.span>
        </div>

        <motion.p
          className="text-sm leading-6 text-white/70"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {product.description}
        </motion.p>

        <div className="flex items-center justify-between gap-4">
          <div>
            <motion.p
              className="text-2xl font-semibold text-white"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              ₹{product.price.toLocaleString('en-IN')}
            </motion.p>
            <motion.p
              className="text-sm text-white/60"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {product.size} · {product.material}
            </motion.p>
          </div>
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button
              variant="ghost"
              className="px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]"
              onClick={handleQuickView}
            >
              Quick View
            </Button>
            <Button
              className="px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em]"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}
