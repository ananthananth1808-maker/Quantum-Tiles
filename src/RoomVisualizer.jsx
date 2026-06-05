import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';

const recommendations = [
  {
    id: 1,
    name: 'Quantum Pearl Mosaic',
    score: 98,
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    name: 'Midnight Slate',
    score: 92,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    name: 'Luxe Coastal Marble',
    score: 89,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    name: 'Terracotta Glow',
    score: 85,
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80',
  },
];

export default function RoomVisualizer() {
  const [preview, setPreview] = useState(null);
  const [appliedTile, setAppliedTile] = useState(null);

  const handleImageChange = useCallback((file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      const file = event.dataTransfer.files?.[0];
      if (file) handleImageChange(file);
    },
    [handleImageChange],
  );

  const handleUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) handleImageChange(file);
  };

  return (
    <div className="min-h-screen bg-navy text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-navy/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-gold/90">Quantum Tiles</p>
            <h1 className="text-2xl font-semibold text-white sm:text-3xl">AI Room Visualizer</h1>
          </div>
          <Button variant="ghost" className="hidden md:inline-flex">Save Design</Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 md:px-8">
        <div className="grid gap-8 xl:grid-cols-[1.7fr_1fr]">
          <section className="space-y-8">
            <Card className="space-y-6 p-8 bg-white/10 backdrop-blur-xl">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-gold/90">Visualizer</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">Upload your room image</h2>
                </div>
                <div className="rounded-full bg-white/5 px-4 py-2 text-sm text-white/70">Futuristic AI dashboard</div>
              </div>

              <div
                onDrop={handleDrop}
                onDragOver={(event) => event.preventDefault()}
                className="relative overflow-hidden rounded-[2rem] border-2 border-dashed border-white/15 bg-white/5 px-6 py-16 text-center transition hover:border-gold/70"
              >
                <div className="mx-auto max-w-lg">
                  <p className="text-sm uppercase tracking-[0.35em] text-gold/90">Drag & Drop</p>
                  <h3 className="mt-4 text-2xl font-semibold text-white">Upload a room photo to preview tiles in real time</h3>
                  <p className="mt-4 text-sm leading-7 text-white/70">Supported formats: JPG, PNG. The AI will recommend the best tile finishes for your space.</p>
                  <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-center">
                    <Button className="px-6 py-3">Upload Image</Button>
                    <label className="cursor-pointer rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white transition hover:border-gold/70">
                      <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                      Choose File
                    </label>
                  </div>
                </div>
              </div>

              {preview ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5"
                  >
                    <div className="p-5">
                      <p className="text-sm uppercase tracking-[0.32em] text-gold/90">Before</p>
                    </div>
                    <img src={preview} alt="Room before" className="h-[360px] w-full object-cover" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5"
                  >
                    <div className="p-5">
                      <p className="text-sm uppercase tracking-[0.32em] text-gold/90">After</p>
                    </div>
                    <div className="relative h-[360px] bg-navy/20">
                      <img src={preview} alt="Room after" className="h-full w-full object-cover opacity-90" />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                      <div className="absolute bottom-6 left-6 rounded-3xl bg-black/50 px-4 py-3 backdrop-blur-xl text-white">
                        <p className="text-sm uppercase tracking-[0.28em] text-gold/90">Applied Tile</p>
                        <p className="mt-2 text-lg font-semibold">{appliedTile?.name || 'Quantum Pearl Mosaic'}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ) : null}
            </Card>

            <Card className="space-y-6 p-8 bg-white/10 backdrop-blur-xl">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-gold/90">AI Recommendations</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">Smart tile matches for your room</h2>
                </div>
                <span className="rounded-full bg-white/5 px-4 py-2 text-sm text-white/70">Match confidence</span>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
                {recommendations.map((tile) => (
                  <motion.div
                    key={tile.id}
                    whileHover={{ y: -5 }}
                    className="rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-glow backdrop-blur-xl"
                  >
                    <div className="relative overflow-hidden rounded-[1.75rem]">
                      <img src={tile.image} alt={tile.name} className="h-48 w-full object-cover transition duration-500 hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="text-sm uppercase tracking-[0.28em] text-gold/90">Match {tile.score}%</p>
                        <h3 className="mt-2 text-xl font-semibold">{tile.name}</h3>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-col gap-3">
                      <Button
                        className="w-full px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em]"
                        onClick={() => setAppliedTile(tile)}
                      >
                        Apply Tile
                      </Button>
                      <Button variant="ghost" className="w-full px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em]">
                        Save Design
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </section>

          <aside className="space-y-6">
            <Card className="space-y-6 p-6 backdrop-blur-xl bg-white/10">
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.32em] text-gold/90">Quick Actions</p>
                <div className="rounded-[2rem] border border-white/10 bg-navy/60 p-5">
                  <p className="text-sm uppercase tracking-[0.32em] text-gold/90">Current Tile</p>
                  <p className="mt-3 text-xl font-semibold text-white">{appliedTile?.name || 'Quantum Pearl Mosaic'}</p>
                  <p className="mt-2 text-sm text-white/70">This AI-picked tile is optimized for contrast, tone, and room atmosphere.</p>
                </div>
                <div className="grid gap-4">
                  <Button className="w-full px-5 py-4 text-base font-semibold uppercase tracking-[0.18em]">Preview in Room</Button>
                  <Button variant="ghost" className="w-full px-5 py-4 text-base font-semibold uppercase tracking-[0.18em]">Download Moodboard</Button>
                </div>
              </div>
            </Card>

            <Card className="space-y-5 p-6 backdrop-blur-xl bg-white/10">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-gold/90">Room Score</p>
                <div className="mt-4 rounded-[1.75rem] bg-white/5 p-5">
                  <div className="flex items-center justify-between text-white/80">
                    <span>Harmony</span>
                    <span>92%</span>
                  </div>
                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-11/12 rounded-full bg-gold" />
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-gold/90">Insights</p>
                <ul className="mt-4 space-y-3 text-sm text-white/70">
                  <li className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3">Glassmorphism styling enhances visual clarity.</li>
                  <li className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3">AI suggests matching tiles for premium interiors.</li>
                  <li className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3">Apply the tile instantly to preview your space.</li>
                </ul>
              </div>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
}
