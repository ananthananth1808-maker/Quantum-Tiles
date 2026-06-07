import { motion } from 'framer-motion';
import { Download, RotateCcw } from 'lucide-react';
import RoomSelector from './RoomSelector';
import RoomCanvas from './RoomCanvas';
import TilePicker from './TilePicker';
import BeforeAfterSlider from './BeforeAfterSlider';
import { useVisualizerStore } from '../../store/useVisualizerStore';
import { getDefaultFloorTile, getDefaultWallTile } from '../../data/tilesCatalog';

export default function Designer2DPanel() {
  const { floorTile, wallTile, setFloorTile, setWallTile } = useVisualizerStore();

  const handleReset = () => {
    setFloorTile(getDefaultFloorTile());
    setWallTile(getDefaultWallTile());
  };

  const handleSave = () => {
    const data = {
      floorTile: floorTile?.name,
      wallTile: wallTile?.name,
      timestamp: new Date().toLocaleString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quantum-tiles-design.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]/80">2D Designer</p>
          <h2 className="mt-1 text-2xl font-semibold text-white">Design Your Room</h2>
          <p className="mt-1 text-sm text-white/40">Click a zone, pick a tile, see it instantly</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white/60 hover:text-white hover:border-white/20 transition"
          >
            <RotateCcw size={14} /> Reset
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D4AF37] text-black text-sm font-semibold hover:bg-[#D4AF37]/90 transition shadow-lg shadow-[#D4AF37]/20"
          >
            <Download size={14} /> Save Design
          </button>
        </div>
      </div>

      {/* Room Selector */}
      <div>
        <p className="mb-3 text-xs uppercase tracking-widest text-white/30">Select Room</p>
        <RoomSelector />
      </div>

      {/* Main layout: Canvas + Picker side by side on wide screens */}
      <div className="grid gap-6 xl:grid-cols-[1fr_280px]">
        {/* Canvas */}
        <div className="space-y-4">
          <RoomCanvas />
          
          {/* Tile summary */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Floor Tile', tile: floorTile },
              { label: 'Wall Tile', tile: wallTile },
            ].map(({ label, tile }) => (
              <div key={label} className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 p-3">
                <div
                  className="w-10 h-10 rounded-lg shrink-0 border border-white/10"
                  style={{ backgroundColor: tile?.color || '#1e293b' }}
                />
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-widest text-white/40">{label}</p>
                  <p className="text-sm font-medium text-white truncate">{tile?.name || '—'}</p>
                  <p className="text-[10px] text-[#D4AF37]/60">{tile?.price || ''}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tile Picker */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur-sm"
        >
          <p className="mb-4 text-xs uppercase tracking-widest text-white/40">Tile Palette</p>
          <TilePicker />
        </motion.div>
      </div>

      {/* Before / After Slider */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-sm"
      >
        <BeforeAfterSlider />
      </motion.div>
    </div>
  );
}
