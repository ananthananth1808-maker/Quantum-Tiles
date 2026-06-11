import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Save } from 'lucide-react';

const categories = [
  'Marble',
  'Granite',
  'Ceramic',
  'Porcelain',
  'Mosaic',
  'Glass Tiles',
  'Stone',
  'Premium',
];

export default function EditProductModal({ product, onClose, onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    id: product.id,
    name: product.name || '',
    description: product.description || '',
    category: product.category || '',
    price: product.price || '',
    stock: product.stock || '',
    image_url: product.image_url || '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }
    if (formData.stock && Number(formData.stock) < 0) {
      newErrors.stock = 'Stock cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-800/40 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-8 relative"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Neon Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-blue-500/0 rounded-2xl pointer-events-none" />

        {/* Close Button */}
        <motion.button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 bg-slate-700/50 hover:bg-slate-600 text-white rounded-full transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <X className="w-5 h-5" />
        </motion.button>

        <div className="relative z-10">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
              Edit Product
            </h2>
            <p className="text-gray-400">Update product information and details</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-semibold text-cyan-300 mb-3">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className={`w-full bg-slate-700/40 border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:bg-slate-700/60 transition-all ${
                  errors.name
                    ? 'border-red-500/50 focus:border-red-400'
                    : 'border-cyan-500/30 focus:border-cyan-400'
                }`}
              />
              {errors.name && <p className="text-red-400 text-sm mt-2">{errors.name}</p>}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-cyan-300 mb-3">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                rows="4"
                className="w-full bg-slate-700/40 border border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:bg-slate-700/60 transition-all resize-none"
              />
            </div>

            {/* Category and Price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-cyan-300 mb-3">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full bg-slate-700/40 border rounded-xl px-4 py-3 text-white focus:outline-none focus:bg-slate-700/60 transition-all ${
                    errors.category
                      ? 'border-red-500/50 focus:border-red-400'
                      : 'border-cyan-500/30 focus:border-cyan-400'
                  }`}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-400 text-sm mt-2">{errors.category}</p>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-cyan-300 mb-3">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  step="0.01"
                  className={`w-full bg-slate-700/40 border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:bg-slate-700/60 transition-all ${
                    errors.price
                      ? 'border-red-500/50 focus:border-red-400'
                      : 'border-cyan-500/30 focus:border-cyan-400'
                  }`}
                />
                {errors.price && <p className="text-red-400 text-sm mt-2">{errors.price}</p>}
              </div>
            </div>

            {/* Stock and Image URL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Stock */}
              <div>
                <label className="block text-sm font-semibold text-cyan-300 mb-3">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="0"
                  className={`w-full bg-slate-700/40 border rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:bg-slate-700/60 transition-all ${
                    errors.stock
                      ? 'border-red-500/50 focus:border-red-400'
                      : 'border-cyan-500/30 focus:border-cyan-400'
                  }`}
                />
                {errors.stock && <p className="text-red-400 text-sm mt-2">{errors.stock}</p>}
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-semibold text-cyan-300 mb-3">
                  Image URL
                </label>
                <input
                  type="url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full bg-slate-700/40 border border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:bg-slate-700/60 transition-all"
                />
              </div>
            </div>

            {/* Image Preview */}
            {formData.image_url && (
              <motion.div
                className="rounded-xl overflow-hidden border border-cyan-500/30 bg-slate-700/20 p-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-sm text-gray-400 mb-2">Image Preview:</p>
                <img
                  src={formData.image_url}
                  alt="Preview"
                  className="h-40 object-cover rounded-lg w-full"
                  onError={(e) => {
                    e.target.src =
                      'https://via.placeholder.com/400x200?text=Invalid+Image+URL';
                  }}
                />
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <motion.button
                type="submit"
                disabled={isLoading}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold py-3 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: !isLoading ? 1.02 : 1 }}
                whileTap={{ scale: !isLoading ? 0.98 : 1 }}
              >
                <Save className="w-5 h-5" />
                {isLoading ? 'Saving...' : 'Save Changes'}
              </motion.button>

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
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}
