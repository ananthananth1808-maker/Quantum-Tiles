import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../shared/routes';
import {
  heroHeading,
  heroSubheading,
  heroImageScale,
  heroButtonStagger,
  staggerContainer,
} from '../shared/animations/variants';

export default function HomePage() {
  return (
    
    <main className="space-y-10 py-10">
      <motion.section
  className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border shadow-card min-h-[700px]"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        
      >
         <video
    autoPlay
    muted
    loop
    playsInline
    preload="auto"
    className="absolute inset-0 h-full w-full object-cover z-0"
  >
    <source src="/videos/hero.mp4" type="video/mp4" />
  </video>

  <div className="absolute inset-0 bg-black/30 z-[1]" />
        
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center relative z-20 p-10 ">
          {/* Left Content */}
          <div>
            {/* Tag */}
            <motion.p
              className="mb-4 text-sm uppercase tracking-[0.4em] text-primary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              Quantum Tiles
            </motion.p>

            {/* Main Heading */}
            <motion.h1
              className="text-5xl font-semibold leading-tight text-textPrimary sm:text-6xl"
              variants={heroHeading}
              initial="hidden"
              animate="visible"
            >
              Premium tile design meets AI visualization.
            </motion.h1>

            {/* Subheading */}
            <motion.p
              className="mt-6 max-w-xl text-lg leading-8 text-red"
              variants={heroSubheading}
              initial="hidden"
              animate="visible"
            >
              Discover curated tile collections, custom dashboards, and AI-powered room previews for modern interiors.
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="mt-10 flex flex-col gap-4 sm:flex-row"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div
                custom={0}
                variants={heroButtonStagger}
                initial="hidden"
                animate="visible"
              >
                <Link
                  to={AppRoutes.PRODUCTS}
                  className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white transition hover:bg-blue-600 hover:shadow-card-hover"
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Browse products
                  </motion.span>
                </Link>
              </motion.div>
              <motion.div
                custom={1}
                variants={heroButtonStagger}
                initial="hidden"
                animate="visible"
              >
                <Link
                  to={AppRoutes.LOGIN}
                  className="inline-flex items-center justify-center rounded-full border border-border bg-white px-8 py-4 text-sm font-semibold text-textPrimary transition hover:bg-blue-50 hover:border-primary/30"
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sign in
                  </motion.span>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Card */}
          <motion.div
            className="rounded-3xl border border-border bg-white p-8 shadow-card-hover"
            variants={heroImageScale}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              className="mb-4 text-sm uppercase tracking-[0.4em] text-primary font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
            >
              New feature
            </motion.p>
            <motion.h2
              className="text-3xl font-semibold text-textPrimary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
            >
              AI Visualizer
            </motion.h2>
            <motion.p
              className="mt-4 text-textSecondary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
            >
              Generate tile room mockups, preview finishes, and refine your layout with AI-powered design suggestions.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.7 }}
            >
              <Link
                to={AppRoutes.AI_VISUALIZER}
                className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Launch visualizer
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Showcase Video Section */}
<motion.section
  initial={{ opacity: 0, y: 80 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
  className="mx-auto max-w-6xl px-4"
>
  <div className="overflow-hidden rounded-3xl shadow-2xl border border-gray-200">
    <video
    controls
    autoPlay
    muted
    loop
    className="w-full h-[500px] rounded-3xl"
  >
    <source src="/videos/product.mp4" type="video/mp4" />
  </video>
  </div>

  <div className="text-center mt-8">
    <h2 className="text-4xl font-bold text-textPrimary">
      Experience Luxury Tiles
    </h2>

    <p className="mt-4 text-lg text-textSecondary max-w-3xl mx-auto">
      Explore our premium collection of marble, ceramic, and designer tiles
      crafted to transform modern interiors.
    </p>
  </div>
</motion.section>
       
    </main>
  );
}
