import { motion } from 'framer-motion';
import { Sofa, BedDouble, ChefHat, Bath } from 'lucide-react';
import { useVisualizerStore } from '../../store/useVisualizerStore';
import { roomTemplates } from '../../data/roomTemplates';

const ICONS = { Sofa, BedDouble, ChefHat, Bath };

export default function RoomSelector() {
  const { activeRoom, setRoom } = useVisualizerStore();

  return (
    <div className="flex flex-wrap gap-3">
      {roomTemplates.map((room) => {
        const Icon = ICONS[room.icon];
        const isActive = activeRoom.id === room.id;
        return (
          <motion.button
            key={room.id}
            onClick={() => setRoom(room)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`relative flex items-center gap-2.5 rounded-2xl border px-4 py-3 text-sm font-medium transition-all duration-300 ${
              isActive
                ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#D4AF37] shadow-lg shadow-[#D4AF37]/10'
                : 'border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:text-white'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="room-selector-pill"
                className="absolute inset-0 rounded-2xl bg-[#D4AF37]/10"
              />
            )}
            {Icon && <Icon size={16} className="relative z-10 shrink-0" />}
            <span className="relative z-10">{room.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
