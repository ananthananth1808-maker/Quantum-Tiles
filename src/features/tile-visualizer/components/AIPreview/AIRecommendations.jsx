import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { useVisualizerStore } from '../../store/useVisualizerStore';

export default function AIRecommendations() {
  const { aiRecommendations, uploadedRoomImage, applyTile, setMode } = useVisualizerStore();

  if (!uploadedRoomImage) return null;

  if (aiRecommendations.length === 0) {
    return (
      <div className="flex items-center justify-center gap-3 py-10 text-white/30">
        <Sparkles size={18} className="animate-pulse text-[#D4AF37]" />
        <span className="text-sm">AI is analyzing your room…</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles size={16} className="text-[#D4AF37]" />
        <p className="text-xs uppercase tracking-widest text-white/50">AI Recommendations</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {aiRecommendations.map((tile, i) => (
          <motion.div
            key={tile.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-[#D4AF37]/40 transition-all duration-300 group"
          >
            {/* Texture */}
            <div className="relative h-28 overflow-hidden">
              <div
                className="absolute inset-0 group-hover:scale-105 transition-transform duration-500"
                style={{
                  backgroundColor: tile.color,
                  backgroundImage: `url(${tile.textureUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              {/* Match score */}
              <div className="absolute top-2 left-2 bg-[#D4AF37] text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                {tile.score}% Match
              </div>
              <div className="absolute top-2 right-2 bg-black/50 text-white/70 text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm">
                #{i + 1}
              </div>
            </div>

            <div className="p-3 space-y-2.5">
              <div>
                <p className="text-sm font-semibold text-white">{tile.name}</p>
                <p className="text-[10px] text-[#D4AF37]/70 mt-0.5">{tile.reason}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => { applyTile(tile); setMode('3d'); }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-wider hover:bg-[#D4AF37]/90 transition"
                >
                  <CheckCircle2 size={11} /> Apply
                </button>
                <button
                  onClick={() => { applyTile(tile); setMode('2d'); }}
                  className="flex-1 py-2 rounded-xl bg-white/10 border border-white/10 text-white/60 text-xs hover:text-white hover:border-white/20 transition"
                >
                  2D View
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
