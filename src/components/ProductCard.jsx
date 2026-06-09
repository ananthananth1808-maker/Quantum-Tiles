import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { LazyImage } from './LazyImage';
import { useCart } from '../entities/cart/model/CartProvider';
import { useToast } from '../shared/ui/ToastProvider';
import { productCardFadeIn, productCardHover, imageZoom } from '../shared/animations/variants';

function ProductCardComponent({ product }) {
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const { addToast } = useToast();

  const handleQuickView = () => {
    navigate(`/products/${product.id}`);
  };

  const handleAddToCart = () => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    
    if (existingItem) {
      addToast(`${product.name} quantity increased!`, 'success');
    } else {
      addToast(`${product.name} added to cart!`, 'success');
    }
    
    addToCart(product, 1);
  };

  return (
    <motion.article
      variants={productCardFadeIn}
      whileHover={productCardHover.whileHover}
      whileTap={productCardHover.whileTap}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="group overflow-hidden rounded-[2rem] border border-border bg-white shadow-card transition-shadow duration-300"
    >
      <div className="relative overflow-hidden bg-gray-100">
        <LazyImage
          src={product.image || product.image_url}
          alt={product.name}
          className="h-80 w-full object-cover transition-transform duration-600 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <motion.button
          type="button"
          className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-white/80 text-primary transition hover:bg-white"
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
              className="text-xs uppercase tracking-[0.28em] text-primary"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {product.category}
            </motion.p>
            <motion.h3
              className="mt-3 text-xl font-semibold text-textPrimary"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {product.name}
            </motion.h3>
          </div>
          <motion.span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${product.stock === 'In Stock' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}
            whileHover={{ scale: 1.05 }}
          >
            {product.stock}
          </motion.span>
        </div>

        <motion.p
          className="text-sm leading-6 text-textSecondary"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {product.description}
        </motion.p>

        <div className="flex items-center justify-between gap-4">
          <div>
            <motion.p
              className="text-2xl font-semibold text-textPrimary"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              ₹{product.price.toLocaleString('en-IN')}
            </motion.p>
            <motion.p
              className="text-sm text-textSecondary"
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

export const ProductCard = memo(ProductCardComponent);
        <motion.button
          type="button"
          className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-white/80 text-primary transition hover:bg-white"
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
              className="text-xs uppercase tracking-[0.28em] text-primary"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {product.category}
            </motion.p>
            <motion.h3
              className="mt-3 text-xl font-semibold text-textPrimary"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {product.name}
            </motion.h3>
          </div>
          <motion.span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${product.stock === 'In Stock' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}
            whileHover={{ scale: 1.05 }}
          >
            {product.stock}
          </motion.span>
        </div>

        <motion.p
          className="text-sm leading-6 text-textSecondary"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {product.description}
        </motion.p>

        <div className="flex items-center justify-between gap-4">
          <div>
            <motion.p
              className="text-2xl font-semibold text-textPrimary"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              ₹{product.price.toLocaleString('en-IN')}
            </motion.p>
            <motion.p
              className="text-sm text-textSecondary"
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
