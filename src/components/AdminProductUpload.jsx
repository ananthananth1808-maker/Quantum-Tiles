import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cloud,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

const AdminProductUpload = ({ onSubmit = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

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

  // Handle drag and drop
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  };

  const processFile = (file) => {
    const validFormats = ['image/jpeg', 'image/png', 'image/webp'];

    if (!validFormats.includes(file.type)) {
      setErrorMessage('Please upload JPG, PNG, or WEBP format');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('File size must be less than 5MB');
      return;
    }

    setImage(file);
    setErrorMessage('');

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.category || !formData.price || !image) {
      setErrorMessage('Please fill all required fields');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Call parent onSubmit if provided
      if (onSubmit) {
        await onSubmit({ ...formData, image });
      }

      setUploadSuccess(true);
      setErrorMessage('');

      // Reset form
      setTimeout(() => {
        setFormData({
          name: '',
          category: '',
          price: '',
          stock: '',
          description: '',
        });
        setImage(null);
        setImagePreview(null);
        setUploadSuccess(false);
      }, 2000);
    } catch (error) {
      setErrorMessage('Upload failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      category: '',
      price: '',
      stock: '',
      description: '',
    });
    setImage(null);
    setImagePreview(null);
    setErrorMessage('');
    setUploadSuccess(false);
  };

  // Floating particles animation
  const particles = Array.from({ length: 8 });

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden p-4 sm:p-6 lg:p-8">
      {/* Floating Particles Background */}
      <AnimatePresence>
        {particles.map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-20"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(index) * 100, 0],
            }}
            transition={{
              duration: 4 + index * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              left: `${(index * 12.5) + 10}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </AnimatePresence>

      {/* Gradient Background Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />

      <motion.div
        className="relative max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header Section */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <motion.div
            className="flex items-center justify-center gap-2 mb-4"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-6 h-6 text-cyan-400" />
            <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Upload Product
            </h2>
            <Sparkles className="w-6 h-6 text-cyan-400" />
          </motion.div>
          <p className="text-gray-400 text-lg">
            Add new products to your inventory
          </p>
        </motion.div>

        {/* Main Glass Card */}
        <motion.div
          className="relative bg-slate-800/40 backdrop-blur-xl border border-cyan-500/30 rounded-[2rem] p-8 lg:p-10 shadow-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ borderColor: 'rgba(34, 211, 238, 0.5)' }}
        >
          {/* Neon Border Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-blue-500/0 rounded-[2rem] pointer-events-none" />

          <form onSubmit={handleSubmit} className="relative space-y-8">
            {/* Image Upload Area */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {imagePreview ? (
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400/50 p-4">
                  <motion.img
                    src={imagePreview}
                    alt="Product preview"
                    className="w-full h-64 sm:h-80 object-cover rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <motion.button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-6 right-6 bg-red-500/90 hover:bg-red-600 text-white rounded-full p-2 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              ) : (
                <motion.div
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
                    isDragging
                      ? 'border-cyan-400 bg-cyan-500/20'
                      : 'border-cyan-500/50 bg-slate-700/30 hover:bg-slate-700/50 hover:border-cyan-400'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Upload Icon Animation */}
                  <motion.div
                    className="flex justify-center mb-4"
                    animate={{ y: isDragging ? -10 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <Cloud className="w-16 h-16 text-cyan-400 opacity-70" />
                    </motion.div>
                  </motion.div>

                  <p className="text-white font-semibold text-lg mb-2">
                    Drag & Drop Product Image
                  </p>
                  <p className="text-gray-400 text-sm mb-4">
                    or click to select from your computer
                  </p>
                  <p className="text-cyan-400/70 text-xs">
                    Supported formats: JPG, PNG, WEBP (Max 5MB)
                  </p>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </motion.div>
              )}
            </motion.div>

            {/* Form Grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {/* Product Name */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-cyan-300 mb-3">
                  Product Name *
                </label>
                <motion.input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Premium Marble White"
                  className="w-full bg-slate-700/40 border border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:bg-slate-700/60 transition-all"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-cyan-300 mb-3">
                  Category *
                </label>
                <motion.select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700/40 border border-cyan-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:bg-slate-700/60 transition-all"
                  whileFocus={{ scale: 1.02 }}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </motion.select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-cyan-300 mb-3">
                  Price (₹) *
                </label>
                <motion.input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="2499"
                  className="w-full bg-slate-700/40 border border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:bg-slate-700/60 transition-all"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-semibold text-cyan-300 mb-3">
                  Stock Quantity
                </label>
                <motion.input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  placeholder="100"
                  className="w-full bg-slate-700/40 border border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:bg-slate-700/60 transition-all"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>

              {/* Description */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-cyan-300 mb-3">
                  Description
                </label>
                <motion.textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter product details and specifications..."
                  rows="4"
                  className="w-full bg-slate-700/40 border border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:bg-slate-700/60 transition-all resize-none"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
            </motion.div>

            {/* Error Message */}
            <AnimatePresence>
              {errorMessage && (
                <motion.div
                  className="flex items-center gap-3 bg-red-500/20 border border-red-500/50 rounded-xl p-4"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="text-red-300">{errorMessage}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <motion.div
              className="flex gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.button
                type="submit"
                disabled={isLoading}
                className="flex-1 relative group bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold py-3 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                whileHover={{ scale: !isLoading ? 1.02 : 1 }}
                whileTap={{ scale: !isLoading ? 0.98 : 1 }}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity -translate-x-full group-hover:translate-x-full duration-500" />

                <motion.div
                  className="flex items-center justify-center gap-2 relative"
                  animate={isLoading ? { y: [0, -3, 0] } : {}}
                  transition={{
                    duration: 0.6,
                    repeat: isLoading ? Infinity : 0,
                  }}
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      <span>Save Product</span>
                    </>
                  )}
                </motion.div>
              </motion.button>

              <motion.button
                type="button"
                onClick={handleCancel}
                disabled={isLoading}
                className="px-8 py-3 border-2 border-gray-500 hover:border-gray-400 text-gray-300 hover:text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: !isLoading ? 1.02 : 1 }}
                whileTap={{ scale: !isLoading ? 0.98 : 1 }}
              >
                Cancel
              </motion.button>
            </motion.div>
          </form>

          {/* Success State Overlay */}
          <AnimatePresence>
            {uploadSuccess && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-[2rem] flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="text-center"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    type: 'spring',
                    stiffness: 100,
                  }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 0.6,
                      repeat: 2,
                    }}
                  >
                    <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                  </motion.div>
                  <p className="text-white font-bold text-xl">
                    Product Added Successfully!
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Decorative Bottom Elements */}
        <motion.div
          className="mt-8 flex justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-cyan-400/50"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminProductUpload;
