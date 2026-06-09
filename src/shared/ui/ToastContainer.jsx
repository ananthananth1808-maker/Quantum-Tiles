import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from './ToastProvider';
import { Check, AlertCircle, Info, X } from 'lucide-react';

export default function Toast() {
  const { toasts, removeToast } = useToast();

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <Check className="h-5 w-5" />;
      case 'error':
        return <AlertCircle className="h-5 w-5" />;
      case 'info':
        return <Info className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200';
      case 'error':
        return 'bg-red-500/10 border-red-500/30 text-red-200';
      case 'info':
        return 'bg-blue-500/10 border-blue-500/30 text-blue-200';
      default:
        return 'bg-surface border-border text-textSecondary';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -20, x: 20 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center gap-3 rounded-3xl border px-5 py-4 backdrop-blur-sm ${getColor(toast.type)}`}
          >
            <div className="flex items-center gap-3 flex-1">
              {getIcon(toast.type)}
              <p className="text-sm font-medium">{toast.message}</p>
            </div>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-white/10 transition"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
