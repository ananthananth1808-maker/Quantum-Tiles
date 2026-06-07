import { useRef, useState, useCallback } from 'react';
import { useVisualizerStore } from '../../store/useVisualizerStore';

export default function BeforeAfterSlider() {
  const { floorTile, wallTile, activeRoom } = useVisualizerStore();
  const [sliderPos, setSliderPos] = useState(50);
  const isDragging = useRef(false);
  const containerRef = useRef(null);

  const updateSlider = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  const onMouseDown = () => { isDragging.current = true; };
  const onMouseMove = (e) => { if (isDragging.current) updateSlider(e.clientX); };
  const onMouseUp = () => { isDragging.current = false; };
  const onTouchMove = (e) => { if (e.touches[0]) updateSlider(e.touches[0].clientX); };

  const roomBg = activeRoom?.wallColor || '#1e293b';

  // "Before" — plain room colour; "After" — applied tiles
  const beforeStyle = { background: roomBg };
  const afterFloorStyle = { background: floorTile?.color || '#D4AF37', backgroundImage: `url(${floorTile?.textureUrl})`, backgroundSize: 'cover' };
  const afterWallStyle  = { background: wallTile?.color  || '#334155', backgroundImage: `url(${wallTile?.textureUrl})`,  backgroundSize: 'cover' };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-widest text-white/40">Before / After Comparison</span>
        <span className="text-[10px] text-white/30">Drag the slider</span>
      </div>

      <div
        ref={containerRef}
        className="relative h-64 overflow-hidden rounded-2xl border border-white/10 cursor-ew-resize select-none"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchMove={onTouchMove}
        onTouchEnd={onMouseUp}
      >
        {/* After layer (full width, clipped to left of slider) */}
        <div className="absolute inset-0 flex flex-col">
          <div className="flex-1" style={afterWallStyle} />
          <div className="flex-[0.8]" style={afterFloorStyle} />
        </div>

        {/* Before layer (right of slider) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
        >
          <div className="absolute inset-0" style={beforeStyle} />
          {/* grid lines for empty room */}
          <svg className="absolute inset-0 w-full h-full opacity-10">
            <defs>
              <pattern id="ba-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#fff" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ba-grid)" />
          </svg>
        </div>

        {/* Slider line + handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-[#D4AF37] z-20"
          style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
        >
          {/* Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#D4AF37] border-2 border-white shadow-lg flex items-center justify-center z-30">
            <svg width="16" height="10" viewBox="0 0 16 10">
              <path d="M0 5 L5 0 M0 5 L5 10 M16 5 L11 0 M16 5 L11 10" stroke="#000" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute bottom-3 left-3 bg-black/60 text-white text-[10px] px-2.5 py-1 rounded-full uppercase tracking-widest backdrop-blur-sm z-10">Before</div>
        <div className="absolute bottom-3 right-3 bg-[#D4AF37]/80 text-black text-[10px] px-2.5 py-1 rounded-full uppercase tracking-widest backdrop-blur-sm z-10">After</div>
      </div>
    </div>
  );
}
