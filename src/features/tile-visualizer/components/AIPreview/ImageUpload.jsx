import { useCallback, useRef } from 'react';
import { Upload, ImagePlus } from 'lucide-react';
import { useVisualizerStore } from '../../store/useVisualizerStore';

export default function ImageUpload() {
  const { setUploadedImage, uploadedRoomImage, generateAiRecommendations } = useVisualizerStore();
  const inputRef = useRef(null);

  const processFile = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target.result);
      // Simulate AI processing delay
      setTimeout(() => generateAiRecommendations(), 1200);
    };
    reader.readAsDataURL(file);
  }, [setUploadedImage, generateAiRecommendations]);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    processFile(e.dataTransfer.files?.[0]);
  }, [processFile]);

  const onFileChange = (e) => processFile(e.target.files?.[0]);

  return (
    <div className="space-y-4">
      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="relative overflow-hidden rounded-2xl border-2 border-dashed border-white/15 bg-white/5 p-8 text-center cursor-pointer hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/5 transition-all duration-300 group"
      >
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
            <ImagePlus size={24} className="text-[#D4AF37]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Drag & drop your room photo</p>
            <p className="text-xs text-white/40 mt-1">or click to browse · JPG, PNG, WEBP</p>
          </div>
        </div>
      </div>

      {/* Preview */}
      {uploadedRoomImage && (
        <div className="relative rounded-2xl overflow-hidden border border-white/10">
          <img src={uploadedRoomImage} alt="Uploaded room" className="w-full max-h-52 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3">
            <span className="bg-green-500/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
              ✓ AI Analyzing…
            </span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); setUploadedImage(null); }}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/50 text-white/70 hover:text-white flex items-center justify-center text-sm backdrop-blur-sm transition"
          >×</button>
        </div>
      )}
    </div>
  );
}
