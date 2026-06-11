import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminProductUpload from '../../components/AdminProductUpload';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { supabase } from '../../shared/api/supabase';
import { X } from 'lucide-react';

// Sample products for demo
const sampleProducts = [
  {
    id: 1,
    name: 'Premium Marble White',
    category: 'Marble',
    price: 2499,
    stock: 45,
    image:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=400',
  },
  {
    id: 2,
    name: 'Royal Granite Black',
    category: 'Granite',
    price: 1899,
    stock: 12,
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400',
  },
  {
    id: 3,
    name: 'Ceramic Elegance Blue',
    category: 'Ceramic',
    price: 1299,
    stock: 67,
    image:
      'https://images.unsplash.com/photo-1577720643272-265f434fd4da?w=400',
  },
  {
    id: 4,
    name: 'Glass Mosaic',
    category: 'Glass Tiles',
    price: 3299,
    stock: 23,
    image:
      'https://images.unsplash.com/photo-1534797264081-b4b0b61b5f34?w=400',
  },
];

export default function AdminProductsPageWithUpload() {
  const [products, setProducts] = useState(sampleProducts);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [search, setSearch] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  // Filter products based on search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.category.toLowerCase().includes(search.toLowerCase())
  );

  // Handle product upload
  const handleProductUpload = async (formData) => {
    setIsSubmitting(true);

    try {
      // Handle image upload to Supabase Storage if using it
      // let imageUrl = formData.image.name;
      // if (formData.image) {
      //   const { data, error } = await supabase.storage
      //     .from('product-images')
      //     .upload(
      //       `products/${Date.now()}_${formData.image.name}`,
      //       formData.image
      //     );

      //   if (error) throw error;
      //   imageUrl = data.path;
      // }

      // Save to Supabase database
      // const { error: dbError } = await supabase.from('products').insert([
      //   {
      //     name: formData.name,
      //     category: formData.category,
      //     price: Number(formData.price),
      //     stock: Number(formData.stock) || 0,
      //     description: formData.description,
      //     image_url: imageUrl,
      //   },
      // ]);

      // if (dbError) throw dbError;

      // For demo: add to local state
      const newProduct = {
        id: Math.max(...products.map((p) => p.id), 0) + 1,
        name: formData.name,
        category: formData.category,
        price: Number(formData.price),
        stock: Number(formData.stock) || 0,
        image: formData.image ? URL.createObjectURL(formData.image) : '',
        description: formData.description,
      };

      setProducts([...products, newProduct]);

      // Show success notification
      setNotification({
        type: 'success',
        message: `✅ ${formData.name} added successfully!`,
      });

      // Close modal after a delay
      setTimeout(() => {
        setShowUploadModal(false);
      }, 1500);

      // Clear notification
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    } catch (error) {
      console.error('Error uploading product:', error);
      setNotification({
        type: 'error',
        message: '❌ Failed to upload product. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
    setNotification({
      type: 'info',
      message: '🗑️ Product deleted',
    });
    setTimeout(() => setNotification(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header Section */}
      <motion.div
        className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-cyan-500/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Product Management
              </h1>
              <p className="text-gray-400 mt-2">
                Manage and upload your tile products
              </p>
            </div>

            <motion.button
              onClick={() => setShowUploadModal(true)}
              className="relative px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:from-cyan-400 hover:to-blue-400 transition-all overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center gap-2">
                <span>+ Add Product</span>
              </span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search products by name or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800/50 border border-cyan-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:bg-slate-800 transition-all"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="group relative bg-slate-800/40 backdrop-blur-xl border border-cyan-500/20 rounded-xl overflow-hidden hover:border-cyan-400/50 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{
                    borderColor: 'rgba(34, 211, 238, 0.5)',
                    boxShadow:
                      '0 0 20px rgba(34, 211, 238, 0.2)',
                  }}
                >
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />

                    {/* Stock Badge */}
                    <div className="absolute top-3 right-3">
                      <motion.span
                        className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                          product.stock > 20
                            ? 'bg-green-500/30 text-green-300 border border-green-400/50'
                            : 'bg-red-500/30 text-red-300 border border-red-400/50'
                        }`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: index * 0.05 + 0.2 }}
                      >
                        {product.stock} in stock
                      </motion.span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-bold text-white mb-1 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-cyan-400/70 mb-3">
                      {product.category}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold text-cyan-400">
                        ₹{product.price.toLocaleString()}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <motion.div
                      className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ y: 10 }}
                      whileHover={{ y: 0 }}
                    >
                      <motion.button
                        className="flex-1 px-3 py-2 bg-blue-600/50 hover:bg-blue-500 text-white text-sm font-semibold rounded-lg transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Edit
                      </motion.button>

                      <motion.button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="flex-1 px-3 py-2 bg-red-600/50 hover:bg-red-500 text-white text-sm font-semibold rounded-lg transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Delete
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-gray-400 text-lg">
              {search ? 'No products found matching your search' : 'No products yet. Start by adding one!'}
            </p>
          </motion.div>
        )}

        {/* Stats Card */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {[
            { label: 'Total Products', value: products.length },
            { label: 'Categories', value: new Set(products.map((p) => p.category)).size },
            { label: 'Total Stock', value: products.reduce((sum, p) => sum + p.stock, 0) },
            { label: 'Total Value', value: `₹${products.reduce((sum, p) => sum + p.price * p.stock, 0).toLocaleString()}` },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="bg-slate-800/50 border border-cyan-500/20 rounded-xl p-4 text-center hover:border-cyan-400/50 transition-all"
              whileHover={{ borderColor: 'rgba(34, 211, 238, 0.5)' }}
            >
              <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
              <p className="text-2xl font-bold text-cyan-400">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              className="relative w-full max-h-[95vh] overflow-y-auto"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                onClick={() => setShowUploadModal(false)}
                className="fixed top-4 right-4 z-60 p-2 bg-slate-800/80 hover:bg-slate-700 text-white rounded-full transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-6 h-6" />
              </motion.button>

              <AdminProductUpload onSubmit={handleProductUpload} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notifications */}
      <AnimatePresence>
        {notification && (
          <motion.div
            className={`fixed bottom-6 right-6 p-4 rounded-xl backdrop-blur-xl border ${
              notification.type === 'success'
                ? 'bg-green-500/20 border-green-400/50'
                : notification.type === 'error'
                  ? 'bg-red-500/20 border-red-400/50'
                  : 'bg-blue-500/20 border-blue-400/50'
            } text-white`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
