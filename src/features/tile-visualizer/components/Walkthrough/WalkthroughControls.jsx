import { Play, Pause, RefreshCw, Zap } from 'lucide-react';
import { useVisualizerStore } from '../../store/useVisualizerStore';
import { TOTAL_DURATION } from './CameraPath';

export default function WalkthroughControls({ canvasRef }) {
  const {
    isWalkthroughPlaying,
    walkthroughProgress,
    walkthroughSpeed,
    setWalkthroughPlaying,
    setWalkthroughProgress,
    setWalkthroughSpeed,
  } = useVisualizerStore();

  const elapsed = walkthroughProgress * TOTAL_DURATION;
  const formatTime = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${Math.floor(s % 60).toString().padStart(2, '0')}`;

  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-sm space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Play / Pause */}
          <button
            onClick={() => setWalkthroughPlaying(!isWalkthroughPlaying)}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${
              isWalkthroughPlaying
                ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/30'
                : 'bg-white/10 text-white hover:bg-white/15'
            }`}
          >
            {isWalkthroughPlaying ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
          </button>

          {/* Reset */}
          <button
            onClick={() => { setWalkthroughPlaying(false); setWalkthroughProgress(0); }}
            className="w-9 h-9 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:border-white/20 flex items-center justify-center transition"
          >
            <RefreshCw size={14} />
          </button>

          {/* Status */}
          <div className="text-sm">
            <span className={isWalkthroughPlaying ? 'text-[#D4AF37]' : 'text-white/40'}>
              {isWalkthroughPlaying ? '● Recording…' : 'Paused'}
            </span>
          </div>
        </div>

        {/* Time */}
        <div className="text-sm text-white/40 font-mono">
          {formatTime(elapsed)} / {formatTime(TOTAL_DURATION)}
        </div>

        {/* Speed */}
        <div className="flex items-center gap-2">
          <Zap size={13} className="text-white/30" />
          <select
            value={walkthroughSpeed}
            onChange={e => setWalkthroughSpeed(Number(e.target.value))}
            className="bg-white/5 border border-white/10 text-white/60 text-xs rounded-lg px-2 py-1.5 outline-none hover:border-white/20 transition"
          >
            <option value={0.5}>0.5×</option>
            <option value={1}>1×</option>
            <option value={1.5}>1.5×</option>
            <option value={2}>2×</option>
          </select>
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-1">
        <div
          className="relative h-2 rounded-full bg-white/10 overflow-hidden cursor-pointer"
          onClick={e => {
            const rect = e.currentTarget.getBoundingClientRect();
            const p = (e.clientX - rect.left) / rect.width;
            setWalkthroughProgress(Math.max(0, Math.min(1, p)));
          }}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#D4AF37] to-[#f0d060] transition-all duration-100"
            style={{ width: `${walkthroughProgress * 100}%` }}
          />
        </div>
      </div>

      {/* Scene info */}
      <div className="grid grid-cols-3 gap-3">
        {['Camera Fly-Through', 'Cinematic Easing', '8 Key Frames'].map(label => (
          <div key={label} className="text-center p-2 rounded-xl bg-white/5 border border-white/10">
            <p className="text-[10px] text-white/40 uppercase tracking-wider">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
