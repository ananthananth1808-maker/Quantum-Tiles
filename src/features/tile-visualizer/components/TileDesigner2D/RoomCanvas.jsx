import { useEffect, useRef, useState } from 'react';
import { useVisualizerStore } from '../../store/useVisualizerStore';

export default function RoomCanvas() {
  const { activeRoom, floorTile, wallTile, activeZone, setActiveZone } = useVisualizerStore();
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef(null);

  // Zoom with mouse wheel
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e) => {
      e.preventDefault();
      setZoom((z) => Math.min(2.5, Math.max(0.5, z - e.deltaY * 0.001)));
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const { svgProps } = activeRoom;
  const fw = svgProps.floorWidth;
  const fh = svgProps.floorHeight;
  const ww = svgProps.wallWidth;
  const wh = svgProps.wallHeight;
  const totalH = wh + fh + 40;
  const totalW = Math.max(fw, ww) + 40;

  // Build repeating tile pattern
  const makePattern = (tile, id) => (
    <pattern id={id} patternUnits="userSpaceOnUse" width="48" height="48">
      <rect width="48" height="48" fill={tile?.color || '#1e293b'} />
      <rect x="1" y="1" width="46" height="46" fill={tile?.color || '#1e293b'} opacity="0.85" />
      <line x1="0" y1="0" x2="48" y2="0" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      <line x1="0" y1="0" x2="0" y2="48" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      {/* subtle inner highlight */}
      <rect x="2" y="2" width="44" height="44" fill="transparent"
        stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
    </pattern>
  );

  return (
    <div className="space-y-4">
      {/* Zoom indicator */}
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-widest text-white/40">
          Room Preview · Scroll to zoom
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom(z => Math.max(0.5, z - 0.1))}
            className="w-7 h-7 rounded-full bg-white/10 text-white/60 hover:text-white hover:bg-white/20 flex items-center justify-center text-sm transition"
          >−</button>
          <span className="text-xs text-white/40 w-12 text-center">{Math.round(zoom * 100)}%</span>
          <button
            onClick={() => setZoom(z => Math.min(2.5, z + 0.1))}
            className="w-7 h-7 rounded-full bg-white/10 text-white/60 hover:text-white hover:bg-white/20 flex items-center justify-center text-sm transition"
          >+</button>
          <button
            onClick={() => setZoom(1)}
            className="px-3 h-7 rounded-full bg-white/10 text-white/60 hover:text-white hover:bg-white/20 text-xs transition"
          >Reset</button>
        </div>
      </div>

      {/* Canvas Area */}
      <div
        ref={containerRef}
        className="relative overflow-auto rounded-2xl border border-white/10 bg-[#060d1f] flex items-center justify-center"
        style={{ minHeight: 360 }}
      >
        <svg
          width={totalW * zoom}
          height={totalH * zoom}
          viewBox={`0 0 ${totalW} ${totalH}`}
          style={{ display: 'block', transition: 'width 0.2s, height 0.2s' }}
        >
          <defs>
            {makePattern(wallTile, 'wallPattern')}
            {makePattern(floorTile, 'floorPattern')}
            {/* Ceiling */}
            <pattern id="ceilingPat" patternUnits="userSpaceOnUse" width="60" height="60">
              <rect width="60" height="60" fill="#0a0f1a" />
              <line x1="0" y1="0" x2="60" y2="0" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              <line x1="0" y1="0" x2="0" y2="60" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            </pattern>
            <linearGradient id="wallOverlay" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(0,0,0,0.3)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </linearGradient>
            <linearGradient id="floorOverlay" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(0,0,0,0)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.4)" />
            </linearGradient>
          </defs>

          {/* Ceiling strip */}
          <rect x="20" y="10" width={ww} height="20" fill="url(#ceilingPat)" />
          <text x={20 + ww / 2} y="24" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.25)" fontFamily="Inter,sans-serif">CEILING</text>

          {/* Wall */}
          <rect
            x="20" y="30" width={ww} height={wh}
            fill="url(#wallPattern)"
            className="cursor-pointer"
            style={{ outline: 'none' }}
            onClick={() => setActiveZone('wall')}
          />
          <rect x="20" y="30" width={ww} height={wh} fill="url(#wallOverlay)" />
          {activeZone === 'wall' && (
            <rect x="20" y="30" width={ww} height={wh}
              fill="none" stroke="#D4AF37" strokeWidth="2.5" strokeDasharray="6 3" rx="2" />
          )}
          <text x={20 + ww / 2} y={30 + wh / 2 + 5} textAnchor="middle" fontSize="11"
            fill={activeZone === 'wall' ? '#D4AF37' : 'rgba(255,255,255,0.35)'} fontFamily="Inter,sans-serif" fontWeight="600">
            WALL — {wallTile?.name || '—'}
          </text>

          {/* Divider */}
          <line x1="20" y1={30 + wh} x2={20 + ww} y2={30 + wh} stroke="rgba(212,175,55,0.4)" strokeWidth="1.5" />

          {/* Floor */}
          <rect
            x="20" y={30 + wh} width={fw} height={fh}
            fill="url(#floorPattern)"
            className="cursor-pointer"
            onClick={() => setActiveZone('floor')}
          />
          <rect x="20" y={30 + wh} width={fw} height={fh} fill="url(#floorOverlay)" />
          {activeZone === 'floor' && (
            <rect x="20" y={30 + wh} width={fw} height={fh}
              fill="none" stroke="#D4AF37" strokeWidth="2.5" strokeDasharray="6 3" rx="2" />
          )}
          <text x={20 + fw / 2} y={30 + wh + fh / 2 + 5} textAnchor="middle" fontSize="11"
            fill={activeZone === 'floor' ? '#D4AF37' : 'rgba(255,255,255,0.35)'} fontFamily="Inter,sans-serif" fontWeight="600">
            FLOOR — {floorTile?.name || '—'}
          </text>
        </svg>
      </div>

      {/* Zone toggles */}
      <div className="flex gap-3">
        {['floor', 'wall'].map(zone => (
          <button
            key={zone}
            onClick={() => setActiveZone(zone)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium uppercase tracking-widest transition-all duration-300 ${
              activeZone === zone
                ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20'
                : 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/20'
            }`}
          >
            {zone}
          </button>
        ))}
      </div>
    </div>
  );
}
