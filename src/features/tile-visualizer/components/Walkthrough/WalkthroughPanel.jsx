import { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import RoomScene from '../TileVisualizer3D/RoomScene';
import LightingSetup from '../TileVisualizer3D/LightingSetup';
import WalkthroughCamera from './WalkthroughCamera';
import WalkthroughControls from './WalkthroughControls';
import { useVisualizerStore } from '../../store/useVisualizerStore';

function SceneLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#060d1f]/80 z-10">
      <Loader2 className="animate-spin text-[#D4AF37]" size={32} />
    </div>
  );
}

export default function WalkthroughPanel() {
  const { activeRoom, floorTile, wallTile } = useVisualizerStore();
  const canvasRef = useRef(null);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]/80">Animation Walkthrough</p>
        <h2 className="mt-1 text-2xl font-semibold text-white">Cinematic Room Tour</h2>
        <p className="mt-1 text-sm text-white/40">Auto camera flies through your tiled room</p>
      </div>

      <motion.div
        ref={canvasRef}
        className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#060d1f]"
        style={{ height: 480 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Suspense fallback={<SceneLoader />}>
          <Canvas
            shadows
            camera={{ position: [0, 1.5, 6], fov: 55 }}
            gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
            style={{ background: '#060d1f' }}
          >
            <LightingSetup ambientIntensity={activeRoom?.ambientIntensity ?? 0.5} />
            <RoomScene />
            <WalkthroughCamera />
          </Canvas>
        </Suspense>
      </motion.div>

      <WalkthroughControls canvasRef={canvasRef} />
    </div>
  );
}
