import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { addToCart } from './entities/cart/model/cartService';
import { getProductById } from './entities/products/model/products';

const tabs = ['Description', 'Specifications', 'Reviews'];

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = getProductById(productId);
  const [activeImage, setActiveImage] = useState(product?.images?.[0] ?? '');
  const [activeTab, setActiveTab] = useState('Description');

  useEffect(() => {
    if (product?.images?.length) {
      setActiveImage(product.images[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-navy text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-gold/90">Product Not Found</p>
          <h1 className="mt-4 text-3xl font-semibold text-white">Unable to locate this tile.</h1>
          <Button className="mt-8" onClick={() => navigate('/products')}>
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-navy/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-gold/90">Quantum Tiles</p>
            <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Product Details</h1>
          </div>
          <Button variant="ghost" className="hidden md:inline-flex">
            Wishlist
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 md:px-8">
        <div className="grid gap-10 xl:grid-cols-[1.05fr_0.95fr]">
          <section className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 shadow-glow"
            >
              <img src={activeImage} alt={product.name} className="h-[560px] w-full object-cover object-center" />
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-4">
              {product.images.map((image) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveImage(image)}
                  className={`overflow-hidden rounded-3xl border transition ${activeImage === image ? 'border-gold ring-2 ring-gold/20' : 'border-white/10 hover:border-white/20'}`}
                >
                  <img src={image} alt="Thumbnail" className="h-28 w-full object-cover transition-all duration-500 hover:scale-105" />
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-8">
            <Card className="space-y-8 p-8">
              <div className="space-y-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-gold/90">Tile Name</p>
                    <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">{product.name}</h2>
                  </div>
                  <div className="rounded-full bg-white/5 px-5 py-3 text-lg font-semibold text-gold shadow-glow">₹{product.price.toLocaleString('en-IN')}</div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 text-white/80">
                    {[...Array(5)].map((_, index) => (
                      <span key={index} className={`text-lg ${index < Math.round(product.rating) ? 'text-gold' : 'text-white/20'}`}>
                        ★
                      </span>
                    ))}
                    <span className="text-sm">{product.rating} ({product.reviews} reviews)</span>
                  </div>
                  <div className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200">{product.availability}</div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-navy/50 p-6">
                  <p className="text-sm uppercase tracking-[0.32em] text-gold/90">Dimensions</p>
                  <p className="mt-3 text-lg font-semibold text-white">{product.dimensions}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-navy/50 p-6">
                  <p className="text-sm uppercase tracking-[0.32em] text-gold/90">Material</p>
                  <p className="mt-3 text-lg font-semibold text-white">{product.material}</p>
                </div>
                <div className="col-span-2 rounded-3xl border border-white/10 bg-navy/50 p-6">
                  <p className="text-sm uppercase tracking-[0.32em] text-gold/90">Finish</p>
                  <p className="mt-3 text-lg font-semibold text-white">{product.finish}</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Button
                  className="w-full px-6 py-4 text-base font-semibold uppercase tracking-[0.18em]"
                  onClick={() => {
                    addToCart(product);
                    navigate('/customer/cart');
                  }}
                >
                  Add To Cart
                </Button>
                <Button variant="ghost" className="w-full px-6 py-4 text-base font-semibold uppercase tracking-[0.18em] text-white/90">
                  Buy Now
                </Button>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button variant="ghost" className="px-6 py-3 text-sm uppercase tracking-[0.18em]">Wishlist</Button>
                <Button variant="ghost" className="px-6 py-3 text-sm uppercase tracking-[0.18em]">View In Room</Button>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex flex-wrap gap-3 border-b border-white/10 pb-4">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`rounded-full px-5 py-2 text-sm font-semibold transition ${activeTab === tab ? 'bg-gold text-navy' : 'bg-white/5 text-white/70 hover:bg-white/10'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="mt-6 space-y-6 text-sm leading-7 text-white/80">
                {activeTab === 'Description' && <p>{product.description}</p>}

                {activeTab === 'Specifications' && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {product.specs.map((item) => (
                      <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                        <p className="text-sm uppercase tracking-[0.28em] text-gold/80">{item.label}</p>
                        <p className="mt-3 text-base font-semibold text-white">{item.value}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'Reviews' && (
                  <div className="space-y-6">
                    {product.reviewsList.map((item) => (
                      <div key={item.name} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <p className="font-semibold text-white">{item.name}</p>
                            <p className="text-sm text-white/60">{Array.from({ length: 5 }, (_, index) => (
                              <span key={index} className={`text-base ${index < item.rating ? 'text-gold' : 'text-white/20'}`}>
                                ★
                              </span>
                            ))}</p>
                          </div>
                        </div>
                        <p className="mt-4 text-sm leading-7 text-white/80">{item.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}
