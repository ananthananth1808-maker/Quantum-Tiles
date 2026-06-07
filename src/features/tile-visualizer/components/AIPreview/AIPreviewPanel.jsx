import ImageUpload from './ImageUpload';
import AIRecommendations from './AIRecommendations';
import { Sparkles, Upload, Cpu } from 'lucide-react';

export default function AIPreviewPanel() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]/80">AI Room Preview</p>
        <h2 className="mt-1 text-2xl font-semibold text-white">Smart Tile Matching</h2>
        <p className="mt-1 text-sm text-white/40">Upload your room — AI suggests the perfect tile combinations</p>
      </div>

      {/* How it works */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Upload, step: '01', label: 'Upload Room Photo' },
          { icon: Cpu, step: '02', label: 'AI Analyzes Style' },
          { icon: Sparkles, step: '03', label: 'Get Matched Tiles' },
        ].map(({ icon: Icon, step, label }) => (
          <div key={step} className="flex flex-col items-center gap-2 rounded-2xl bg-white/5 border border-white/10 p-4 text-center">
            <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
              <Icon size={16} className="text-[#D4AF37]" />
            </div>
            <div>
              <p className="text-[10px] text-white/30 uppercase tracking-widest">{step}</p>
              <p className="text-xs text-white/70 font-medium">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Upload zone */}
      <div className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-sm space-y-5">
        <p className="text-xs uppercase tracking-widest text-white/30">Your Room</p>
        <ImageUpload />
      </div>

      {/* AI Recommendations */}
      <div className="rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-sm">
        <AIRecommendations />
      </div>
    </div>
  );
}
