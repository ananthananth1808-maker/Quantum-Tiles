import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { isAdmin, isAuthenticated, isCustomer } from '../../entities/auth/model/authService';
import Navbar from '../../shared/ui/Navbar';
import Sidebar from '../../shared/ui/Sidebar';
import MobileDrawer from '../../shared/ui/MobileDrawer';
import { AppRoutes } from '../../shared/routes';

export default function AppLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  const authenticated = isAuthenticated();
  const role = isAdmin() ? 'admin' : isCustomer() ? 'customer' : 'guest';

  // Check if current page needs sidebar padding
  const isDashboard = [
    AppRoutes.CUSTOMER_DASHBOARD,
    AppRoutes.CUSTOMER_ORDERS,
    AppRoutes.ADMIN_DASHBOARD,
    AppRoutes.ADMIN_PRODUCTS,
    AppRoutes.ADMIN_ORDERS,
    AppRoutes.ADMIN_CUSTOMERS,
    AppRoutes.ADMIN_INVENTORY,
    AppRoutes.ADMIN_INVOICES,
    AppRoutes.ADMIN_ANALYTICS,
  ].some(route => location.pathname.startsWith(route));

  const shouldAddTopPadding = true;

  const sidebarPaddingClass = authenticated 
    ? sidebarCollapsed 
      ? 'md:pl-[80px]' 
      : 'md:pl-[280px]'
    : '';

  return (
    <div className="min-h-screen bg-background text-textPrimary">
      <Navbar onOpenMobile={() => setDrawerOpen(true)} />
      {authenticated ? (
        <Sidebar role={role} collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((value) => !value)} />
      ) : null}

      <main
        className={`min-h-screen pb-10 transition-all duration-300 ${!isDashboard ? 'px-4 md:px-6' : ''} ${shouldAddTopPadding ? 'pt-[5.5rem]' : ''} ${sidebarPaddingClass}`}
      >
        <Outlet />
      </main>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} role={role} />
    </div>
  );
}
