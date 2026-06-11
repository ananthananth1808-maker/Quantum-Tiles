import { motion } from 'framer-motion';
import ProductManagement from './ProductManagement';

/**
 * Example Admin Page showcasing the Product Management Module
 *
 * This page demonstrates:
 * - ProductManagement component integration
 * - Layout with header and content
 * - Animation wrappers
 * - Toast notifications
 * - React Query setup
 *
 * Usage:
 * <AdminProductsPage />
 */
export default function AdminProductsPage() {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Top Navigation */}
      <motion.nav
        className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-lg border-b border-cyan-500/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-lg">
                <p className="text-sm text-cyan-300 font-medium">
                  Product Management
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <ProductManagement />
      </motion.main>
    </motion.div>
  );
}

/**
 * Integration Guide:
 *
 * 1. In your main App.jsx, ensure QueryClient is set up:
 *
 * import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
 * import { ToastProvider } from './shared/ui/ToastProvider';
 * import AdminProductsPage from './pages/admin/AdminProductsPage';
 *
 * const queryClient = new QueryClient();
 *
 * function App() {
 *   return (
 *     <QueryClientProvider client={queryClient}>
 *       <ToastProvider>
 *         <AdminProductsPage />
 *       </ToastProvider>
 *     </QueryClientProvider>
 *   );
 * }
 *
 * 2. Set up your Supabase table:
 *
 * CREATE TABLE products (
 *   id BIGINT PRIMARY KEY,
 *   name VARCHAR(255) NOT NULL,
 *   description TEXT,
 *   category VARCHAR(100),
 *   price DECIMAL(10, 2) NOT NULL,
 *   stock INT DEFAULT 0,
 *   image_url TEXT,
 *   created_at TIMESTAMP DEFAULT NOW(),
 *   updated_at TIMESTAMP DEFAULT NOW()
 * );
 *
 * 3. Add environment variables to .env.local:
 *
 * VITE_SUPABASE_URL=https://xxx.supabase.co
 * VITE_SUPABASE_ANON_KEY=eyJ...
 *
 * 4. That's it! The ProductManagement component handles everything:
 *    - Fetching products
 *    - Searching
 *    - Filtering
 *    - Editing
 *    - Deleting
 *    - Notifications
 *    - Loading states
 */
