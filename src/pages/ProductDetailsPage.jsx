import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getProductById, getRelatedProducts } from '../entities/products/api';
import { productKeys } from '../entities/products/model';
import { LazyImage } from '../components/LazyImage';
import { useCart } from '../entities/cart/model/CartProvider';
import { useToast } from '../shared/ui/ToastProvider';
import { AppRoutes } from '../shared/routes';
import { useState } from 'react';

export default function ProductDetailsPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const { addToast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const {
    data: product,
    isLoading: productLoading,
    error: productError,
  } = useQuery({
    queryKey: productKeys.detail(productId),
    queryFn: () => getProductById(productId),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });

  const {
    data: relatedProducts = [],
    isLoading: relatedLoading,
  } = useQuery({
    queryKey: productKeys.relatedByCategory(product?.category),
    queryFn: () => getRelatedProducts(product?.category, productId, 4),
    enabled: !!product?.category && !!productId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });

  const handleAddToCart = () => {
    console.log('Add to Cart clicked', { product, productId, quantity, stock: product?.stock });
    
    if (!product) {
      console.error('Product not loaded yet');
      addToast('Product not loaded', 'error');
      return;
    }

    const existingItem = cartItems.find((item) => item.id === product.id);
    
    if (product.stock <= 0) {
      console.warn('Product out of stock - allowing pre-order', { productName: product.name, stock: product.stock });
      if (!existingItem) {
        addToast(`${product.name} pre-order added to cart!`, 'info');
      } else {
        addToast(`${product.name} quantity increased!`, 'success');
      }
    } else {
      if (existingItem) {
        addToast(`${product.name} quantity increased!`, 'success');
      } else {
        addToast(`${product.name} added to cart!`, 'success');
      }
    }
    
    addToCart(product, quantity);
    console.log(`Added ${product.name} to cart with quantity: ${quantity}`);
  };

  const handleBuyNow = () => {
    console.log('Buy Now clicked', { product, productId, quantity, stock: product?.stock });
    
    if (!product) {
      console.error('Product not loaded yet');
      addToast('Product not loaded', 'error');
      return;
    }

    const existingItem = cartItems.find((item) => item.id === product.id);
    
    if (product.stock <= 0) {
      console.warn('Product out of stock - allowing pre-order', { productName: product.name, stock: product.stock });
      if (!existingItem) {
        addToast(`${product.name} pre-order added to cart!`, 'info');
      } else {
        addToast(`${product.name} quantity increased!`, 'success');
      }
    } else {
      if (existingItem) {
        addToast(`${product.name} quantity increased!`, 'success');
      } else {
        addToast(`${product.name} added to cart!`, 'success');
      }
    }
    
    addToCart(product, quantity);
    console.log(`Item added to cart, navigating to checkout from ProductDetailsPage`);
    
    // Navigate to checkout with a small delay to ensure cart is updated
    setTimeout(() => {
      console.log(`Navigation attempt to: ${AppRoutes.CHECKOUT}`);
      navigate(AppRoutes.CHECKOUT);
    }, 100);
  };
  if (productLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (productError) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 md:py-12 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 md:p-8 text-center">
            <h2 className="text-red-800 font-semibold text-xl md:text-2xl mb-2">Product Not Found</h2>
            <p className="text-red-700 mb-6 text-sm md:text-base">{productError?.message || 'Unable to load product details'}</p>
            <button
              onClick={() => navigate('/products')}
              className="bg-red-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg hover:bg-red-700 active:bg-red-800 transition-all duration-200 font-semibold text-base md:text-lg"
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8 flex flex-wrap items-center text-xs md:text-sm text-gray-600 gap-2">
          <button
            onClick={() => navigate('/products')}
            className="hover:text-blue-600 transition font-medium px-2 py-1 rounded hover:bg-gray-100"
          >
            Products
          </button>
          <span className="mx-1">/</span>
          <button
            onClick={() => navigate(`/categories`)}
            className="hover:text-blue-600 transition font-medium capitalize px-2 py-1 rounded hover:bg-gray-100"
          >
            {product.category}
          </button>
          <span className="mx-1">/</span>
          <span className="text-gray-800 font-medium px-2 py-1 truncate">{product.name}</span>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm">
            {product.image_url ? (
              <LazyImage
                src={product.image_url}
                alt={product.name}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
              />
            ) : (
              <div className="w-full h-64 md:h-96 bg-gray-300 rounded-lg flex items-center justify-center text-gray-500 text-sm md:text-base">
                No Image Available
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-block px-3 md:px-4 py-1 md:py-2 bg-blue-100 text-blue-700 rounded-full text-xs md:text-sm font-medium capitalize">
                {product.category}
              </span>
            </div>

            {/* Product Name */}
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Rating & Reviews (Optional) */}
            <div className="flex items-center mb-6 flex-wrap gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-lg md:text-xl text-yellow-400">★</span>
                ))}
              </div>
              <span className="text-gray-600 text-xs md:text-sm">(124 reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-2 md:gap-4 flex-wrap">
                <span className="text-3xl md:text-4xl font-bold text-blue-600">
                  ₹{product.price ? product.price.toLocaleString() : 'N/A'}
                </span>
                {product.stock && (
                  <span className={`text-xs md:text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-gray-700 mb-8 leading-relaxed text-sm md:text-lg">
                {product.description}
              </p>
            )}

            {/* SKU (if available) */}
            {product.sku && (
              <div className="mb-6 pb-6 border-b border-gray-200">
                <p className="text-gray-600 text-xs md:text-sm">
                  <span className="font-medium">SKU:</span> {product.sku}
                </p>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm md:text-base font-medium text-gray-700 mb-3">
                Quantity:
              </label>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 md:px-4 py-2 md:py-3 text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 font-bold text-lg"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-14 md:w-16 text-center border-l border-r border-gray-300 py-2 md:py-3 focus:outline-none focus:border-blue-600 text-base md:text-lg font-semibold"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 md:px-4 py-2 md:py-3 text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 font-bold text-lg"
                  >
                    +
                  </button>
                </div>
                <span className="text-gray-600 text-sm md:text-base">
                  {quantity > 1 && `₹${(product.price * quantity).toLocaleString()} total`}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6 w-full">
              <button
                onClick={handleAddToCart}
                disabled={!product || productLoading}
                className={`flex-1 py-3 px-4 md:py-4 md:px-6 rounded-lg font-semibold text-base md:text-lg transition-all duration-200 ${
                  !product || productLoading
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400 active:scale-95'
                }`}
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!product || productLoading}
                className={`flex-1 py-3 px-4 md:py-4 md:px-6 rounded-lg font-semibold text-base md:text-lg transition-all duration-200 ${
                  !product || productLoading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 active:scale-95'
                }`}
              >
                Checkout
              </button>
            </div>

            {/* Wishlist Button */}
            <button className="w-full py-3 px-4 md:py-3 md:px-6 text-base md:text-lg rounded-lg border-2 border-gray-300 text-gray-600 hover:text-red-600 hover:border-red-600 transition-all duration-200 font-medium">
              ♡ Add to Wishlist
            </button>
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-gray-200">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-900">
              Related Products
            </h2>

            {relatedLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <button
                    key={relatedProduct.id}
                    onClick={() => navigate(`/products/${relatedProduct.id}`)}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group active:scale-95"
                  >
                    <div className="relative w-full h-40 md:h-48 bg-gray-200 overflow-hidden">
                      {relatedProduct.image_url ? (
                        <img
                          src={relatedProduct.image_url}
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm md:text-base">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="p-3 md:p-4">
                      <h3 className="font-semibold text-gray-800 line-clamp-2 text-sm md:text-base mb-2">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-blue-600 font-bold text-base md:text-lg">
                        ₹{relatedProduct.price?.toLocaleString()}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Product Details Tabs (Optional Enhanced Section) */}
        <div className="mt-12 md:mt-16 bg-white rounded-xl md:rounded-2xl p-4 md:p-8 shadow-sm">
          <div className="border-b border-gray-200 mb-6 md:mb-8">
            <div className="flex gap-4 md:gap-8 overflow-x-auto">
              <button className="pb-3 md:pb-4 border-b-2 border-blue-600 text-blue-600 font-medium whitespace-nowrap text-sm md:text-base px-2 py-1">
                Specifications
              </button>
              <button className="pb-3 md:pb-4 text-gray-600 hover:text-gray-800 font-medium whitespace-nowrap text-sm md:text-base px-2 py-1 transition-colors">
                Shipping Info
              </button>
              <button className="pb-3 md:pb-4 text-gray-600 hover:text-gray-800 font-medium whitespace-nowrap text-sm md:text-base px-2 py-1 transition-colors">
                Returns
              </button>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 text-base md:text-lg">Product Details</h3>
            <div className="space-y-3 text-gray-700 text-sm md:text-base">
              {product.description && (
                <p>
                  <span className="font-medium">Description:</span> {product.description}
                </p>
              )}
              {product.category && (
                <p>
                  <span className="font-medium">Category:</span> {product.category}
                </p>
              )}
              {product.sku && (
                <p>
                  <span className="font-medium">SKU:</span> {product.sku}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
