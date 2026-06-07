import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { isAdmin, isAuthenticated, isCustomer } from '../../entities/auth/model/authService';
import Navbar from '../../shared/ui/Navbar';
import Sidebar from '../../shared/ui/Sidebar';
import MobileDrawer from '../../shared/ui/MobileDrawer';

export default function AppLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const authenticated = isAuthenticated();
  const role = isAdmin() ? 'admin' : isCustomer() ? 'customer' : 'guest';

  return (
    <div className="min-h-screen bg-background text-textPrimary">
      <Navbar onOpenMobile={() => setDrawerOpen(true)} />
      {authenticated ? (
        <Sidebar role={role} collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((value) => !value)} />
      ) : null}

      <main
        className="min-h-screen px-4 pb-10 pt-[5.5rem] transition-all duration-300 md:px-6"
        style={{ paddingLeft: authenticated ? (sidebarCollapsed ? 80 : 280) : undefined }}
      >
        <Outlet />
      </main>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} role={role} />
    </div>
  );
}
