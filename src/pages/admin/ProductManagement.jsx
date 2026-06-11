import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Edit2, Trash2, Plus, Filter, X } from 'lucide-react';
import {
  useProducts,
  useUpdateProduct,
  useDeleteProduct,
  useSearchProducts,
  useProductsByCategory,
} from '../../entities/products/model/useProductQueries';
import { useToast } from '../../shared/ui/ToastProvider';
import EditProductModal from './EditProductModal';
import DeleteConfirmModal from './DeleteConfirmModal';

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

export default function ProductManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirmProduct, setDeleteConfirmProduct] = useState(null);

  const { data: products = [], isLoading: productsLoading } = useProducts();
  const { data: searchResults = [] } = useSearchProducts(
    searchTerm,
    !!searchTerm
  );
  const { data: categoryResults = [] } = useProductsByCategory(
    selectedCategory,
    !!selectedCategory
  );

  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();
  const { success, error } = useToast();

  // Determine which products to display
  const displayedProducts = useMemo(() => {
    if (searchTerm) return searchResults;
    if (selectedCategory) return categoryResults;
    return products;
  }, [searchTerm, selectedCategory, products, searchResults, categoryResults]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setSelectedCategory('');
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
    setSearchTerm('');
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleEditSubmit = async (updatedProduct) => {
    try {
      await updateMutation.mutateAsync({
        id: updatedProduct.id,
        product: {
          name: updatedProduct.name,
          description: updatedProduct.description,
          category: updatedProduct.category,
          price: Number(updatedProduct.price),
          stock: Number(updatedProduct.stock),
          image_url: updatedProduct.image_url,
        },
      });
      success(`✅ ${updatedProduct.name} updated successfully!`);
      setEditingProduct(null);
    } catch (err) {
      error(`❌ Failed to update product: ${err.message}`);
    }
  };

  const handleDeleteClick = (product) => {
    setDeleteConfirmProduct(product);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteMutation.mutateAsync(deleteConfirmProduct.id);
      success(`✅ ${deleteConfirmProduct.name} deleted successfully!`);
      setDeleteConfirmProduct(null);
    } catch (err) {
      error(`❌ Failed to delete product: ${err.message}`);
    }
  };

  const isLoading = productsLoading || updateMutation.isPending || deleteMutation.isPending;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
          Product Management
        </h1>
        <p className="text-gray-400 text-lg">
          Manage {displayedProducts.length} tile products
        </p>
      </motion.div>

      {/* Controls Section */}
      <motion.div
        className="space-y-4 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
          <input
            type="text"
            placeholder="Search products by name, description, or category..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full bg-slate-800/50 border border-cyan-500/30 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:bg-slate-800 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => handleSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <span className="flex items-center gap-2 text-sm font-medium text-gray-400 px-3 py-2">
            <Filter className="w-4 h-4" /> Categories:
          </span>
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => handleCategoryFilter(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white border border-cyan-400'
                  : 'bg-slate-800/40 text-gray-400 border border-cyan-500/20 hover:border-cyan-400/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
          {selectedCategory && (
            <motion.button
              onClick={() => setSelectedCategory('')}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-red-500/20 text-red-300 border border-red-500/50 hover:bg-red-500/30 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Clear Filter
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Products Table */}
      <motion.div
        className="relative bg-slate-800/40 backdrop-blur-xl border border-cyan-500/30 rounded-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        whileHover={{ borderColor: 'rgba(34, 211, 238, 0.5)' }}
      >
        {/* Neon Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-blue-500/0 rounded-2xl pointer-events-none" />

        {/* Loading State */}
        {isLoading && (
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-40">
            <motion.div
              className="flex flex-col items-center gap-4"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <motion.div
                className="w-12 h-12 border-3 border-cyan-400 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              <p className="text-cyan-300 font-medium">Processing...</p>
            </motion.div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left relative z-10">
            <thead>
              <tr className="border-b border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
                <th className="px-6 py-4 text-cyan-300 font-bold text-sm">Image</th>
                <th className="px-6 py-4 text-cyan-300 font-bold text-sm">Product Name</th>
                <th className="px-6 py-4 text-cyan-300 font-bold text-sm">Category</th>
                <th className="px-6 py-4 text-cyan-300 font-bold text-sm">Price</th>
                <th className="px-6 py-4 text-cyan-300 font-bold text-sm">Stock</th>
                <th className="px-6 py-4 text-cyan-300 font-bold text-sm">Actions</th>
              </tr>
            </thead>

            <tbody>
              <AnimatePresence mode="popLayout">
                {displayedProducts.length > 0 ? (
                  displayedProducts.map((product, index) => (
                    <motion.tr
                      key={product.id}
                      className="border-b border-cyan-500/10 hover:bg-cyan-500/10 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ backgroundColor: 'rgba(34, 211, 238, 0.08)' }}
                    >
                      {/* Image */}
                      <td className="px-6 py-4">
                        <motion.img
                          src={
                            product.image_url ||
                            'https://via.placeholder.com/80x80?text=No+Image'
                          }
                          alt={product.name}
                          className="h-16 w-16 rounded-lg object-cover border border-cyan-500/30"
                          whileHover={{ scale: 1.1 }}
                        />
                      </td>

                      {/* Name */}
                      <td className="px-6 py-4 text-white font-medium">{product.name}</td>

                      {/* Category */}
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/50">
                          {product.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4 text-green-400 font-bold">
                        ₹{Number(product.price).toLocaleString('en-IN')}
                      </td>

                      {/* Stock */}
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            product.stock > 20
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                              : product.stock > 0
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/50'
                                : 'bg-red-500/20 text-red-300 border border-red-500/50'
                          }`}
                        >
                          {product.stock}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <motion.button
                            onClick={() => handleEdit(product)}
                            className="p-2 bg-blue-600/40 hover:bg-blue-500/60 text-blue-300 rounded-lg transition-all border border-blue-500/30"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            title="Edit product"
                          >
                            <Edit2 className="w-4 h-4" />
                          </motion.button>

                          <motion.button
                            onClick={() => handleDeleteClick(product)}
                            className="p-2 bg-red-600/40 hover:bg-red-500/60 text-red-300 rounded-lg transition-all border border-red-500/30"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            title="Delete product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                      >
                        <p className="text-gray-400 text-lg">
                          {searchTerm || selectedCategory
                            ? 'No products found matching your filters'
                            : 'No products available'}
                        </p>
                      </motion.div>
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-6 py-4 border-t border-cyan-500/20 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 flex justify-between items-center">
          <p className="text-gray-400 text-sm">
            Showing <span className="text-cyan-300 font-bold">{displayedProducts.length}</span>{' '}
            products
          </p>
          {searchTerm && (
            <motion.button
              onClick={() => handleSearch('')}
              className="px-4 py-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 rounded-lg text-sm font-medium transition-all"
              whileHover={{ scale: 1.05 }}
            >
              Clear Search
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingProduct && (
          <EditProductModal
            product={editingProduct}
            onClose={() => setEditingProduct(null)}
            onSubmit={handleEditSubmit}
            isLoading={updateMutation.isPending}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmProduct && (
          <DeleteConfirmModal
            product={deleteConfirmProduct}
            onClose={() => setDeleteConfirmProduct(null)}
            onConfirm={handleDeleteConfirm}
            isLoading={deleteMutation.isPending}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
