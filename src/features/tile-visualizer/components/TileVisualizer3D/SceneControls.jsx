import { useRef, useEffect, useCallback } from 'react';
import { OrbitControls } from '@react-three/drei';
import { Maximize2, Minimize2 } from 'lucide-react';
import { useVisualizerStore } from '../../store/useVisualizerStore';

export function SceneOrbitControls() {
  return (
    <OrbitControls
      enableZoom
      enablePan
      enableRotate
      minDistance={1.5}
      maxDistance={12}
      maxPolarAngle={Math.PI * 0.85}
      dampingFactor={0.08}
      enableDamping
      target={[0, 0, 0]}
    />
  );
}

export function FullscreenButton({ canvasContainerRef }) {
  const { isFullscreen, setFullscreen } = useVisualizerStore();

  const toggle = useCallback(() => {
    const el = canvasContainerRef?.current;
    if (!document.fullscreenElement) {
      el?.requestFullscreen?.().then(() => setFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => setFullscreen(false)).catch(() => {});
    }
  }, [canvasContainerRef, setFullscreen]);

  useEffect(() => {
    const handler = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, [setFullscreen]);

  return (
    <button
      onClick={toggle}
      className="absolute top-3 right-3 z-20 w-9 h-9 rounded-xl bg-black/50 border border-white/10 text-white/60 hover:text-white hover:border-white/20 flex items-center justify-center backdrop-blur-sm transition"
      title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
    >
      {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
    </button>
  );
}
