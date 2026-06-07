import { useState } from 'react';
import { motion } from 'framer-motion';
import { tilesCatalog, TILE_CATEGORIES } from '../../data/tilesCatalog';
import { useVisualizerStore } from '../../store/useVisualizerStore';

export default function TilePicker() {
  const { floorTile, wallTile, activeZone, applyTile } = useVisualizerStore();
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? tilesCatalog
    : tilesCatalog.filter(t => t.category === activeCategory);

  const activeTile = activeZone === 'floor' ? floorTile : wallTile;

  return (
    <div className="space-y-4">
      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {TILE_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-[#D4AF37] text-black'
                : 'bg-white/5 border border-white/10 text-white/50 hover:text-white hover:border-white/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tile grid */}
      <div className="grid grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[#D4AF37]/30">
        {filtered.map(tile => {
          const isSelected = activeTile?.id === tile.id;
          return (
            <motion.button
              key={tile.id}
              onClick={() => applyTile(tile)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={`relative overflow-hidden rounded-xl border text-left transition-all duration-200 ${
                isSelected
                  ? 'border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {/* Texture preview */}
              <div
                className="h-16 w-full"
                style={{
                  backgroundColor: tile.color,
                  backgroundImage: `url(${tile.textureUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              {/* Info */}
              <div className="bg-white/5 backdrop-blur-sm px-2.5 py-2">
                <p className="text-xs font-semibold text-white truncate">{tile.name}</p>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-[10px] text-white/40">{tile.category}</span>
                  <span className="text-[10px] text-[#D4AF37]/80">{tile.price}</span>
                </div>
              </div>
              {/* Selected badge */}
              {isSelected && (
                <div className="absolute top-2 right-2 bg-[#D4AF37] text-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  {activeZone}
                </div>
              )}
              {/* Tag pill */}
              {tile.tag && !isSelected && (
                <div className="absolute top-2 right-2 bg-black/50 text-white/70 text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm">
                  {tile.tag}
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Active tile info bar */}
      {activeTile && (
        <div className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-3 py-2.5">
          <div
            className="w-8 h-8 rounded-lg shrink-0 border border-white/10"
            style={{ backgroundColor: activeTile.color }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">{activeTile.name}</p>
            <p className="text-[10px] text-white/40">{activeZone === 'floor' ? 'Applied to Floor' : 'Applied to Wall'}</p>
          </div>
          <div className="text-xs text-[#D4AF37]">{activeTile.price}</div>
        </div>
      )}
    </div>
  );
}
