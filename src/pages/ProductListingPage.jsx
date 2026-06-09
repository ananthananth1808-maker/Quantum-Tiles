import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../entities/products/api";
import { productKeys } from "../entities/products/model";
import { SearchBar } from "../components/SearchBar";
import { FilterPanel } from "../components/FilterPanel";
import { SortOptions } from "../components/SortOptions";
import { EmptyState } from "../components/EmptyState";
import { motion } from "framer-motion";

export default function ProductListingPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: productKeys.list({}),
    queryFn: getProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category).filter(Boolean));
    return Array.from(cats).sort();
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description?.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter((product) => product.category === selectedCategory);
    }

    // Sort
    if (sortBy === "price-low") {
      result.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === "price-high") {
      result.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.created_at || 0) - new Date(a.created_at || 0)
      );
    }

    return result;
  }, [products, searchQuery, selectedCategory, sortBy]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedCategory("");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl mx-auto mt-10">
        <h2 className="text-red-800 font-semibold mb-2">Failed to Load Products</h2>
        <p className="text-red-700 text-sm mb-4">{error?.message || 'An error occurred while fetching products'}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products available at the moment</p>
      </div>
    );
  }

  return (
    <div className="bg-red-50 min-h-screen py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
       
        {/* Header */}
        <motion.div
  className="mb-10"
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
          <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">
            Our Products
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Browse our collection of premium tiles
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8 bg-azure-50 rounded-lg p-4">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              placeholder="Search products by name or description..."
            />
          </div>
       </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden lg:block color-blue bg-orange-50">
            <FilterPanel
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              resultCount={filteredProducts.length}
            />
          </div>

          {/* Products Grid Area */}
          <div className="lg:col-span-3">
            {/* Top Bar: Mobile Filter Toggle + Sort */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="lg:hidden px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700"
              >
                {showMobileFilters ? '✕ Hide Filters' : '⊕ Show Filters'}
              </button>

              <div className="flex-1 sm:flex-none">
                <SortOptions sortBy={sortBy} onSortChange={setSortBy} />
              </div>
            </div>

            {/* Mobile Filters */}
            {showMobileFilters && (
              <div className="lg:hidden mb-8">
                <FilterPanel
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  resultCount={filteredProducts.length}
                />
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <EmptyState
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
                onReset={handleReset}
              />
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                  >
                    <div className="relative w-full h-56 bg-gray-200 overflow-hidden group">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/300x240?text=Product+Image';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500">
                          No Image
                        </div>
                      )}
                    </div>

                    <div className="p-5 flex flex-col flex-grow">
                      <div className="flex-grow">
                        <h2 className="text-lg font-semibold mb-2 line-clamp-2 text-gray-800">
                          {product.name || 'Unnamed Product'}
                        </h2>

                        {product.category && (
                          <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium mb-3 w-fit capitalize">
                            {product.category}
                          </span>
                        )}

                        {product.description && (
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {product.description}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col gap-4 pt-4 border-t border-gray-200">
                        <p className="text-2xl font-bold text-blue-600">
                          {product.price ? `₹${product.price.toLocaleString()}` : 'N/A'}
                        </p>

                        <button
                          onClick={() => navigate(`/products/${product.id}`)}
                          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition text-sm font-medium"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}