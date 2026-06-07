import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Video, Square, Download, AlertCircle, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import RoomScene from '../TileVisualizer3D/RoomScene';
import LightingSetup from '../TileVisualizer3D/LightingSetup';
import WalkthroughCamera from '../Walkthrough/WalkthroughCamera';
import { startRecording, stopRecording, downloadVideo, isRecordingSupported } from '../../utils/videoRecorder';
import { useVisualizerStore } from '../../store/useVisualizerStore';

export default function VideoExportPanel() {
  const { isRecording, setRecording, setWalkthroughPlaying, activeRoom, isWalkthroughPlaying } = useVisualizerStore();
  const [timer, setTimer] = useState(0);
  const [lastVideoUrl, setLastVideoUrl] = useState(null);
  const [error, setError] = useState('');
  const canvasRef = useRef(null);
  const timerRef = useRef(null);
  const supported = isRecordingSupported();

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => setTimer(t => t + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  const formatTime = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  const handleStartRecording = () => {
    setError('');
    if (!supported) { setError('MediaRecorder is not supported in this browser.'); return; }
    const canvas = canvasRef.current?.querySelector('canvas');
    if (!canvas) { setError('Canvas not found. Please wait for the scene to load.'); return; }
    try {
      startRecording(canvas);
      setTimer(0);
      setRecording(true);
      setWalkthroughPlaying(true);
    } catch (e) {
      setError(String(e.message || e));
    }
  };

  const handleStopRecording = async () => {
    setWalkthroughPlaying(false);
    setRecording(false);
    const result = await stopRecording();
    if (result?.url) {
      setLastVideoUrl(result.url);
      downloadVideo(result.url);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]/80">Video Export</p>
        <h2 className="mt-1 text-2xl font-semibold text-white">Record 3D Walkthrough</h2>
        <p className="mt-1 text-sm text-white/40">Capture a WebM video of the cinematic room tour</p>
      </div>

      {/* 3D Canvas for recording */}
      <div ref={canvasRef} className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#060d1f]" style={{ height: 400 }}>
        {/* Recording indicator */}
        {isRecording && (
          <div className="absolute top-3 left-3 z-20 flex items-center gap-2 bg-red-500/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">REC {formatTime(timer)}</span>
          </div>
        )}
        <Suspense fallback={
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white/30 text-sm">Loading scene…</p>
          </div>
        }>
          <Canvas
            shadows
            camera={{ position: [0, 1.5, 6], fov: 55 }}
            gl={{ antialias: true, alpha: false, preserveDrawingBuffer: true }}
            style={{ background: '#060d1f' }}
          >
            <LightingSetup ambientIntensity={activeRoom?.ambientIntensity ?? 0.5} />
            <RoomScene />
            <WalkthroughCamera />
          </Canvas>
        </Suspense>
      </div>

      {/* Controls */}
      <div className="rounded-2xl bg-white/5 border border-white/10 p-5 space-y-4 backdrop-blur-sm">
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex items-start gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl p-3"
            >
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-3 flex-wrap">
          {!isRecording ? (
            <button
              onClick={handleStartRecording}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#D4AF37] text-black font-semibold text-sm hover:bg-[#D4AF37]/90 transition shadow-lg shadow-[#D4AF37]/20"
            >
              <Video size={16} /> Start Recording
            </button>
          ) : (
            <button
              onClick={handleStopRecording}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-500 text-white font-semibold text-sm hover:bg-red-600 transition shadow-lg shadow-red-500/20 animate-pulse"
            >
              <Square size={16} fill="white" /> Stop & Download
            </button>
          )}

          {lastVideoUrl && !isRecording && (
            <button
              onClick={() => downloadVideo(lastVideoUrl)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 border border-white/10 text-white text-sm hover:bg-white/15 transition"
            >
              <Download size={15} /> Re-download
            </button>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Format', value: 'WebM / VP9' },
            { label: 'Frame Rate', value: '30 FPS' },
            { label: 'Bitrate', value: '5 Mbps' },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
              <p className="text-[10px] uppercase tracking-widest text-white/30">{label}</p>
              <p className="text-sm font-semibold text-white mt-1">{value}</p>
            </div>
          ))}
        </div>

        {!supported && (
          <p className="text-xs text-yellow-400/60 flex items-center gap-1.5">
            <AlertCircle size={12} /> MediaRecorder not supported. Use Chrome/Edge for recording.
          </p>
        )}
      </div>
    </div>
  );
}
