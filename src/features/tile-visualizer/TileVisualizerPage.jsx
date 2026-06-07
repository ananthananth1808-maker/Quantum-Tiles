import { lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Box, Film, Video, Sparkles } from 'lucide-react';
import { VisualizerProvider, useVisualizerStore } from './store/useVisualizerStore';

const Designer2DPanel = lazy(() => import('./components/TileDesigner2D/Designer2DPanel'));
const Visualizer3DPanel = lazy(() => import('./components/TileVisualizer3D/Visualizer3DPanel'));
const WalkthroughPanel = lazy(() => import('./components/Walkthrough/WalkthroughPanel'));
const VideoExportPanel = lazy(() => import('./components/VideoExport/VideoExportPanel'));
const AIPreviewPanel = lazy(() => import('./components/AIPreview/AIPreviewPanel'));

const TABS = [
  { id: '2d', label: '2D Designer', Icon: Layers },
  { id: '3d', label: '3D Visualizer', Icon: Box },
  { id: 'walkthrough', label: 'Walkthrough', Icon: Film },
  { id: 'export', label: 'Export', Icon: Video },
  { id: 'ai', label: 'AI Preview', Icon: Sparkles },
];

function PanelLoader() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-[#D4AF37]/30 border-t-[#D4AF37] animate-spin" />
        <p className="text-sm text-white/30 uppercase tracking-widest">Loading…</p>
      </div>
    </div>
  );
}

function VisualizerContent() {
  const { mode, setMode } = useVisualizerStore();

  const panels = {
    '2d': <Designer2DPanel />,
    '3d': <Visualizer3DPanel />,
    'walkthrough': <WalkthroughPanel />,
    'export': <VideoExportPanel />,
    'ai': <AIPreviewPanel />,
  };

  return (
    <div className="min-h-screen bg-[#060d1f] text-white">
      {/* Hero header */}
      <div className="relative overflow-hidden border-b border-white/10">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 via-transparent to-[#1e3a8a]/10 pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-96 h-40 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 py-8 md:px-8">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-[#D4AF37]/70">Quantum Tiles</p>
              <h1 className="mt-2 text-4xl font-bold text-white sm:text-5xl">
                Tile Visualizer
              </h1>
              <p className="mt-2 text-sm text-white/40 max-w-md">
                Design, visualize and export — 2D and 3D tile experiences for every room
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Real-Time', 'HDR Lighting', 'AI-Powered', 'Video Export'].map(badge => (
                <span key={badge} className="text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/40">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Tab navigation */}
          <div className="mt-8 flex gap-1 overflow-x-auto pb-px scrollbar-none">
            {TABS.map(({ id, label, Icon }) => {
              const isActive = mode === id;
              return (
                <motion.button
                  key={id}
                  onClick={() => setMode(id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium shrink-0 transition-all duration-300 ${
                    isActive
                      ? 'text-black'
                      : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-tab-bg"
                      className="absolute inset-0 rounded-xl bg-[#D4AF37]"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <Icon size={15} className="relative z-10 shrink-0" />
                  <span className="relative z-10">{label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Panel content */}
      <main className="mx-auto max-w-7xl px-6 py-8 md:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Suspense fallback={<PanelLoader />}>
              {panels[mode]}
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function TileVisualizerPage() {
  return (
    <VisualizerProvider>
      <VisualizerContent />
    </VisualizerProvider>
  );
}
