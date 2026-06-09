import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppRoutes } from '../../shared/routes';
import AppLayout from '../layout/AppLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { AdminRoute } from './AdminRoute';
import { CustomerRoute } from './CustomerRoute';
import Loader from '../../shared/ui/Loader';
import TestimonialsPage from "../../pages/TestimonialsPage";

const HomePage = lazy(() => import('../../pages/HomePage'));
const LoginPage = lazy(() => import('../../pages/LoginPage'));
const RegisterPage = lazy(() => import('../../pages/RegisterPage'));
const ProductListingPage = lazy(() => import('../../pages/ProductListingPage'));
const ProductDetailsPage = lazy(() => import('../../pages/ProductDetailsPage'));
const CartPage = lazy(() => import('../../pages/CartPage'));
const CheckoutPage = lazy(() => import('../../pages/CheckoutPage'));
const PaymentPage = lazy(() => import('../../pages/PaymentPage'));
const CategoriesPage = lazy(() => import('../../pages/CategoriesPage'));
const AboutPage = lazy(() => import('../../pages/AboutPage'));
const SettingsPage = lazy(() => import('../../pages/SettingsPage'));
const CustomerDashboardPage = lazy(() => import('../../pages/CustomerDashboardPage'));
const CustomerOrdersPage = lazy(() => import('../../pages/CustomerOrdersPage'));
const WishlistPage = lazy(() => import('../../pages/WishlistPage'));
const AdminDashboardPage = lazy(() => import('../../pages/AdminDashboardPage'));
const AdminProductsPage = lazy(() => import('../../pages/AdminProductsPage'));
const AdminOrdersPage = lazy(() => import('../../pages/AdminOrdersPage'));
const AdminCustomersPage = lazy(() => import('../../pages/AdminCustomersPage'));
const AdminInventoryPage = lazy(() => import('../../pages/AdminInventoryPage'));
const AdminInvoicesPage = lazy(() => import('../../pages/AdminInvoicesPage'));
const AdminAnalyticsPage = lazy(() => import('../../pages/AdminAnalyticsPage'));
const AIVisualizerPage = lazy(() => import('../../pages/AIVisualizerPage'));
const DesignExplorerPage = lazy(() => import('../../pages/DesignExplorerPage'));
const TileVisualizerPage = lazy(() => import('../../pages/TileVisualizerPage'));
const SearchPage = lazy(() => import('../../pages/SearchPage'));
const NotificationsPage = lazy(() => import('../../pages/NotificationsPage'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage'));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path={AppRoutes.HOME} element={<HomePage />} />
            <Route path={AppRoutes.PRODUCTS} element={<ProductListingPage />} />
            <Route path={AppRoutes.PRODUCT_DETAILS} element={<ProductDetailsPage />} />
            <Route path={AppRoutes.CATEGORIES} element={<CategoriesPage />} />
            <Route
  path="/testimonials"
  element={<TestimonialsPage />}
/>
            <Route path={AppRoutes.ABOUT} element={<AboutPage />} />
            <Route path={AppRoutes.SEARCH} element={<SearchPage />} />
            <Route path={AppRoutes.NOTIFICATIONS} element={<NotificationsPage />} />
            <Route path={AppRoutes.SETTINGS} element={<SettingsPage />} />
            <Route path={AppRoutes.CART} element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
            <Route path={AppRoutes.CHECKOUT} element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
            <Route path="/payment" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
            <Route
              path={AppRoutes.CUSTOMER_DASHBOARD}
              element={<CustomerRoute><CustomerDashboardPage /></CustomerRoute>}
            />
            <Route
              path={AppRoutes.CUSTOMER_ORDERS}
              element={<CustomerRoute><CustomerOrdersPage /></CustomerRoute>}
            />
            <Route
              path={AppRoutes.WISHLIST}
              element={<CustomerRoute><WishlistPage /></CustomerRoute>}
            />
            <Route
              path={AppRoutes.ADMIN_DASHBOARD}
              element={<AdminRoute><AdminDashboardPage /></AdminRoute>}
            />
            <Route
              path={AppRoutes.ADMIN_PRODUCTS}
              element={<AdminRoute><AdminProductsPage /></AdminRoute>}
            />
            <Route
              path={AppRoutes.ADMIN_ORDERS}
              element={<AdminRoute><AdminOrdersPage /></AdminRoute>}
            />
            <Route
              path={AppRoutes.ADMIN_CUSTOMERS}
              element={<AdminRoute><AdminCustomersPage /></AdminRoute>}
            />
            <Route
              path={AppRoutes.ADMIN_INVENTORY}
              element={<AdminRoute><AdminInventoryPage /></AdminRoute>}
            />
            <Route
              path={AppRoutes.ADMIN_INVOICES}
              element={<AdminRoute><AdminInvoicesPage /></AdminRoute>}
            />
            <Route
              path={AppRoutes.ADMIN_ANALYTICS}
              element={<AdminRoute><AdminAnalyticsPage /></AdminRoute>}
            />
            <Route path={AppRoutes.AI_VISUALIZER} element={<AIVisualizerPage />} />
            <Route path={AppRoutes.DESIGN_EXPLORER} element={<DesignExplorerPage />} />
            <Route path={AppRoutes.TILE_VISUALIZER} element={<TileVisualizerPage />} />
            <Route path={AppRoutes.NOT_FOUND} element={<NotFoundPage />} />
          </Route>
          <Route path={AppRoutes.LOGIN} element={<LoginPage />} />
          <Route path={AppRoutes.REGISTER} element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
