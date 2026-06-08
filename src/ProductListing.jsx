import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { ProductCard } from './components/ProductCard';
import { products, categories, colors, sizes, materials } from './entities/products/model/products';
import {
  pageVariants,
  scrollRevealFadeUp,
  scrollRevealFadeLeft,
  staggerContainer,
  staggerItemFadeUp,
  productGridStagger,
} from './shared/animations/variants';

export default function ProductListing() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [color, setColor] = useState('All');
  const [size, setSize] = useState('All');
  const [material, setMaterial] = useState('All');
  const [price, setPrice] = useState(180);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = search
        ? product.name.toLowerCase().includes(search.toLowerCase()) || product.description.toLowerCase().includes(search.toLowerCase())
        : true;
      const matchesCategory = category === 'All' || product.category === category;
      const matchesColor = color === 'All' || product.color === color;
      const matchesSize = size === 'All' || product.size === size;
      const matchesMaterial = material === 'All' || product.material === material;
      const matchesPrice = product.price <= price;
      return matchesSearch && matchesCategory && matchesColor && matchesSize && matchesMaterial && matchesPrice;
    });
  }, [search, category, color, size, material, price]);

  return (
    <motion.div
      className="min-h-screen bg-background text-textPrimary"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <header className="sticky top-0 z-40 border-b border-border glass-navbar">
        <motion.div
          className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8"
          variants={scrollRevealFadeUp}
          initial="hidden"
          animate="visible"
        >
          <div>
            <motion.p
              className="text-sm uppercase tracking-[0.35em] text-primary"
              variants={staggerItemFadeUp}
            >
              Quantum Tiles
            </motion.p>
            <motion.h1
              className="text-2xl font-semibold tracking-tight text-textPrimary sm:text-3xl"
              variants={staggerItemFadeUp}
            >
              Premium Product Showcase
            </motion.h1>
          </div>
          <Button variant="ghost" className="hidden md:inline-flex">Login</Button>
        </motion.div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 md:px-8">
        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          <motion.aside
            className="space-y-6"
            variants={scrollRevealFadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Card className="space-y-6">
              <div>
                <label htmlFor="search" className="mb-3 block text-sm uppercase tracking-[0.32em] text-primary">
                  Search
                </label>
                <motion.div
                  className="relative rounded-3xl border border-border bg-surface px-4 py-3 text-textPrimary focus-within:border-primary/80"
                  whileFocus={{ borderColor: '#2563EB', boxShadow: '0 0 20px rgba(37, 99, 235, 0.2)' }}
                  transition={{ duration: 0.3 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-textSecondary">
                    <path d="M21 21l-4.35-4.35" />
                    <circle cx="10" cy="10" r="6" />
                  </svg>
                  <input
                    id="search"
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search tiles"
                    className="w-full bg-transparent pl-10 text-sm text-textPrimary placeholder:text-textSecondary focus:outline-none"
                  />
                </motion.div>
              </div>

              <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm uppercase tracking-[0.32em] text-primary">Category</p>
                </div>
                <div className="grid gap-3">
                  {categories.map((item) => (
                    <motion.button
                      key={item}
                      type="button"
                      variants={staggerItemFadeUp}
                      onClick={() => setCategory(item)}
                      whileHover={{ scale: 1.02 }}
                      className={`rounded-3xl border px-4 py-3 text-left text-sm transition ${category === item ? 'border-primary bg-blue-50 text-primary' : 'border-border text-textSecondary hover:border-primary/30 hover:text-textPrimary'}`}
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={scrollRevealFadeUp} className="space-y-4" initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <div className="flex items-center justify-between">
                  <p className="text-sm uppercase tracking-[0.32em] text-primary">Price Range</p>
                  <span className="text-sm text-textSecondary">₹{price.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="18000"
                  step="500"
                  value={price}
                  onChange={(event) => setPrice(Number(event.target.value))}
                  className="w-full accent-primary"
                />
              </motion.div>

              <motion.div variants={scrollRevealFadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <p className="mb-4 text-sm uppercase tracking-[0.32em] text-primary">Color</p>
                <div className="flex flex-wrap gap-3">
                  {['All', ...colors].map((item) => (
                    <motion.button
                      key={item}
                      type="button"
                      variants={staggerItemFadeUp}
                      onClick={() => setColor(item)}
                      whileHover={{ scale: 1.05 }}
                      className={`rounded-full px-4 py-2 text-sm transition ${color === item ? 'bg-primary text-white' : 'bg-surface text-textSecondary border border-border hover:bg-blue-50 hover:text-primary'}`}
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={scrollRevealFadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <p className="mb-4 text-sm uppercase tracking-[0.32em] text-primary">Tile Size</p>
                <div className="grid gap-3">
                  {['All', ...sizes].map((item) => (
                    <motion.button
                      key={item}
                      type="button"
                      variants={staggerItem}
                      onClick={() => setSize(item)}
                      whileHover={{ scale: 1.02 }}
                      className={`rounded-3xl border px-4 py-3 text-left text-sm transition ${size === item ? 'border-primary bg-blue-50 text-primary' : 'border-border text-textSecondary hover:border-primary/30 hover:text-textPrimary'}`}
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={scrollRevealFadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <p className="mb-4 text-sm uppercase tracking-[0.32em] text-primary">Material</p>
                <div className="grid gap-3">
                  {['All', ...materials].map((item) => (
                    <motion.button
                      key={item}
                      type="button"
                      variants={staggerItem}
                      onClick={() => setMaterial(item)}
                      whileHover={{ scale: 1.02 }}
                      className={`rounded-3xl border px-4 py-3 text-left text-sm transition ${material === item ? 'border-primary bg-blue-50 text-primary' : 'border-border text-textSecondary hover:border-primary/30 hover:text-textPrimary'}`}
                    >
                      {item}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </Card>
          </motion.aside>

          <section className="space-y-8">
            <motion.div
              className="rounded-[2rem] border border-border bg-white p-8 shadow-card backdrop-blur-xl"
              variants={scrollRevealFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-primary">Tile Marketplace</p>
                  <h2 className="mt-3 text-3xl font-semibold text-textPrimary">Handpicked tile products for premium interiors.</h2>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-primary border border-border">{filteredProducts.length} products</span>
                  <Button variant="ghost">Clear Filters</Button>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
              variants={productGridStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {filteredProducts.map((product) => (
                <motion.div key={product.id} variants={staggerItemFadeUp}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </section>
        </div>
      </main>
    </motion.div>
  );
}
