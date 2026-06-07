import { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import RoomScene from './RoomScene';
import LightingSetup from './LightingSetup';
import { SceneOrbitControls, FullscreenButton } from './SceneControls';
import TilePicker from '../TileDesigner2D/TilePicker';
import RoomSelector from '../TileDesigner2D/RoomSelector';
import { useVisualizerStore } from '../../store/useVisualizerStore';

function SceneLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#060d1f]/80 z-10">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="animate-spin text-[#D4AF37]" size={32} />
        <p className="text-sm text-white/40 uppercase tracking-widest">Loading Scene…</p>
      </div>
    </div>
  );
}

export default function Visualizer3DPanel() {
  const containerRef = useRef(null);
  const { activeRoom, floorTile, wallTile } = useVisualizerStore();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]/80">3D Visualizer</p>
        <h2 className="mt-1 text-2xl font-semibold text-white">Interactive 3D Room</h2>
        <p className="mt-1 text-sm text-white/40">Orbit · Zoom · Pan — change tiles in real time</p>
      </div>

      {/* Room selector */}
      <div>
        <p className="mb-3 text-xs uppercase tracking-widest text-white/30">Room Type</p>
        <RoomSelector />
      </div>

      {/* Main layout */}
      <div className="grid gap-6 xl:grid-cols-[1fr_280px]">
        {/* 3D Canvas */}
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#060d1f]"
          style={{ height: 480 }}
        >
          <FullscreenButton canvasContainerRef={containerRef} />

          {/* Control hint overlay */}
          <div className="absolute bottom-3 left-3 z-10 flex gap-2 pointer-events-none">
            {['Drag: Orbit', 'Scroll: Zoom', 'Right-Drag: Pan'].map(hint => (
              <span key={hint} className="bg-black/50 text-white/40 text-[10px] px-2.5 py-1 rounded-full backdrop-blur-sm uppercase tracking-wider">
                {hint}
              </span>
            ))}
          </div>

          <Suspense fallback={<SceneLoader />}>
            <Canvas
              shadows
              camera={{ position: [3, 2, 5], fov: 55 }}
              gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
              style={{ background: '#060d1f' }}
            >
              <LightingSetup ambientIntensity={activeRoom?.ambientIntensity ?? 0.5} />
              <RoomScene />
              <SceneOrbitControls />
            </Canvas>
          </Suspense>
        </motion.div>

        {/* 3D Tile Picker sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur-sm"
        >
          <p className="mb-4 text-xs uppercase tracking-widest text-white/40">Tile Palette</p>
          <TilePicker />
        </motion.div>
      </div>

      {/* Current tile status */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Floor', tile: floorTile },
          { label: 'Wall', tile: wallTile },
        ].map(({ label, tile }) => (
          <div key={label} className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 p-3">
            <div className="w-10 h-10 rounded-lg shrink-0 border border-white/10 overflow-hidden">
              {tile?.textureUrl
                ? <img src={tile.textureUrl} className="w-full h-full object-cover" alt={tile.name} />
                : <div style={{ background: tile?.color }} className="w-full h-full" />
              }
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-widest text-white/40">{label}</p>
              <p className="text-sm font-medium text-white truncate">{tile?.name || '—'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
