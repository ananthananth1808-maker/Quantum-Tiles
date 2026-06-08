/**
 * ANIMATION SHOWCASE COMPONENT
 * 
 * This example component demonstrates all premium animation patterns available.
 * Use this as a reference when creating new sections.
 * 
 * To use: import and add <AnimationShowcase /> to any page
 */

import { motion } from 'framer-motion';
import {
  scrollRevealFadeUp,
  scrollRevealFadeLeft,
  scrollRevealFadeRight,
  staggerContainer,
  staggerItemFadeUp,
  productCardFadeIn,
  productCardHover,
  imageZoom,
  premiumButtonHover,
  featureCardStagger,
} from '../animations/variants';

export function AnimationShowcase() {
  const features = [
    { id: 1, title: 'Fast Loading', description: 'Optimized for speed' },
    { id: 2, title: 'Responsive', description: 'Works on all devices' },
    { id: 3, title: 'Beautiful', description: 'Modern design' },
  ];

  return (
    <div className="space-y-20 py-20">
      {/* 1. SCROLL REVEAL - FADE UP */}
      <section className="mx-auto max-w-4xl px-4">
        <motion.div
          variants={scrollRevealFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="rounded-2xl bg-blue-50 p-8 border border-blue-200"
        >
          <h2 className="text-3xl font-bold text-textPrimary mb-4">
            Scroll Reveal - Fade Up
          </h2>
          <p className="text-textSecondary">
            This section fades in from bottom when scrolling into view.
            The animation only triggers once due to `once: true`.
          </p>
        </motion.div>
      </section>

      {/* 2. SCROLL REVEAL - SIDE TO SIDE */}
      <section className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            variants={scrollRevealFadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-2xl bg-emerald-50 p-8 border border-emerald-200"
          >
            <h3 className="text-2xl font-bold text-textPrimary mb-4">
              Fade From Left
            </h3>
            <p className="text-textSecondary">
              Animates in from the left side of the viewport.
            </p>
          </motion.div>

          <motion.div
            variants={scrollRevealFadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-2xl bg-purple-50 p-8 border border-purple-200"
          >
            <h3 className="text-2xl font-bold text-textPrimary mb-4">
              Fade From Right
            </h3>
            <p className="text-textSecondary">
              Animates in from the right side of the viewport.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. STAGGER ANIMATIONS */}
      <section className="mx-auto max-w-4xl px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            variants={staggerItemFadeUp}
            className="text-3xl font-bold text-textPrimary mb-8"
          >
            Staggered Feature Cards
          </motion.h2>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                variants={staggerItemFadeUp}
                className="rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 p-6 border border-blue-200"
              >
                <div className="text-3xl font-bold text-primary mb-3">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="font-semibold text-textPrimary mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-textSecondary">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 4. PRODUCT CARD ANIMATION */}
      <section className="mx-auto max-w-4xl px-4">
        <motion.h2
          variants={scrollRevealFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl font-bold text-textPrimary mb-8"
        >
          Product Card - Hover Effect
        </motion.h2>

        <motion.div
          variants={productCardFadeIn}
          whileHover={productCardHover.whileHover}
          whileTap={productCardHover.whileTap}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="rounded-2xl overflow-hidden border border-border bg-white shadow-card cursor-pointer"
        >
          {/* Image with zoom effect */}
          <div className="relative overflow-hidden bg-gray-100 h-64">
            <motion.img
              src="https://images.unsplash.com/photo-1617638924702-92d37921f45d?w=500&h=300&fit=crop"
              alt="Product"
              variants={imageZoom}
              initial="initial"
              whileHover="whileHover"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-6">
            <motion.p
              variants={staggerItemFadeUp}
              className="text-sm uppercase tracking-wider text-primary font-semibold"
            >
              Premium Tile
            </motion.p>
            <motion.h3
              variants={staggerItemFadeUp}
              className="text-xl font-bold text-textPrimary mt-2 mb-2"
            >
              Marble Effect Tile
            </motion.h3>
            <motion.p
              variants={staggerItemFadeUp}
              className="text-textSecondary text-sm mb-4"
            >
              Beautiful marble-effect ceramic tile with premium finish.
            </motion.p>
            <motion.p
              variants={staggerItemFadeUp}
              className="text-2xl font-bold text-primary"
            >
              ₹2,499
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* 5. BUTTON ANIMATIONS */}
      <section className="mx-auto max-w-4xl px-4">
        <motion.h2
          variants={scrollRevealFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl font-bold text-textPrimary mb-8"
        >
          Button Hover Effects
        </motion.h2>

        <div className="flex flex-wrap gap-4">
          <motion.button
            variants={premiumButtonHover}
            whileHover="whileHover"
            whileTap="whileTap"
            className="px-8 py-3 bg-primary text-white rounded-full font-semibold shadow-lg"
          >
            Premium Hover
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 border-2 border-primary text-primary rounded-full font-semibold"
          >
            Secondary Button
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02, rotate: 2 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold"
          >
            Gradient + Rotate
          </motion.button>
        </div>
      </section>

      {/* 6. IMAGE ZOOM EFFECT */}
      <section className="mx-auto max-w-4xl px-4">
        <motion.h2
          variants={scrollRevealFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl font-bold text-textPrimary mb-8"
        >
          Image Zoom Effect
        </motion.h2>

        <div className="relative overflow-hidden rounded-2xl h-96 bg-gray-100">
          <motion.img
            src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=400&fit=crop"
            alt="Room with tiles"
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover cursor-pointer"
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-black/40 flex items-center justify-center"
          >
            <p className="text-white text-2xl font-bold">Hover to zoom</p>
          </motion.div>
        </div>
      </section>

      {/* 7. FEATURE CARDS WITH CUSTOM STAGGER */}
      <section className="mx-auto max-w-6xl px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2
            variants={staggerItemFadeUp}
            className="text-3xl font-bold text-textPrimary mb-12 text-center"
          >
            Why Choose Quantum Tiles
          </motion.h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: '🎨', title: 'Beautiful Designs', desc: 'Premium collection' },
              { icon: '⚡', title: 'Fast Delivery', desc: 'Quick shipping' },
              { icon: '✅', title: 'Quality Assured', desc: '100% authentic' },
              { icon: '💰', title: 'Best Price', desc: 'Competitive rates' },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={featureCardStagger(index)}
                className="rounded-2xl bg-white p-6 border border-border shadow-card text-center"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-textPrimary mb-2">{item.title}</h3>
                <p className="text-sm text-textSecondary">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default AnimationShowcase;
