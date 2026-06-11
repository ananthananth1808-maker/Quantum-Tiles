import { motion } from 'framer-motion';
import { AlertCircle, Trash2, X } from 'lucide-react';

export default function DeleteConfirmModal({
  product,
  onClose,
  onConfirm,
  isLoading,
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-md bg-slate-800/40 backdrop-blur-xl border border-red-500/30 rounded-2xl p-8 relative overflow-hidden"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Neon Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/10 to-orange-500/0 rounded-2xl pointer-events-none" />

        {/* Close Button */}
        <motion.button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-slate-700/50 hover:bg-slate-600 text-white rounded-full transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <X className="w-5 h-5" />
        </motion.button>

        <div className="relative z-10 text-center">
          {/* Warning Icon */}
          <motion.div
            className="flex justify-center mb-6"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="p-4 bg-red-500/20 rounded-full border border-red-500/50">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
          </motion.div>

          {/* Message */}
          <h2 className="text-2xl font-bold text-white mb-3">Delete Product?</h2>
          <p className="text-gray-400 mb-6">
            Are you sure you want to delete{' '}
            <span className="text-red-300 font-semibold">{product.name}</span>? This action
            cannot be undone.
          </p>

          {/* Product Info */}
          <div className="bg-slate-700/20 border border-cyan-500/20 rounded-xl p-4 mb-8">
            <div className="flex items-center gap-4">
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-16 h-16 rounded-lg object-cover border border-cyan-500/30"
                  onError={(e) => {
                    e.target.src =
                      'https://via.placeholder.com/64x64?text=No+Image';
                  }}
                />
              )}
              <div className="text-left flex-1">
                <p className="font-bold text-white">{product.name}</p>
                <p className="text-sm text-gray-400">
                  Category: {product.category}
                </p>
                <p className="text-sm text-green-400 font-medium">
                  ₹{Number(product.price).toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <motion.button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-6 py-3 border-2 border-gray-500 hover:border-gray-400 text-gray-300 hover:text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: !isLoading ? 1.02 : 1 }}
              whileTap={{ scale: !isLoading ? 0.98 : 1 }}
            >
              Cancel
            </motion.button>

            <motion.button
              type="button"
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-3 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: !isLoading ? 1.02 : 1 }}
              whileTap={{ scale: !isLoading ? 0.98 : 1 }}
            >
              <Trash2 className="w-5 h-5" />
              {isLoading ? 'Deleting...' : 'Delete'}
            </motion.button>
          </div>

          {/* Warning Text */}
          <p className="text-xs text-red-400/70 mt-6">
            ⚠️ This action is permanent and cannot be reversed.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
