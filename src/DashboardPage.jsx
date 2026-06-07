import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { AppRoutes } from './shared/routes';

const navItems = [
  { label: 'Dashboard', to: AppRoutes.CUSTOMER_DASHBOARD, badge: null },
  { label: 'Orders', to: AppRoutes.CUSTOMER_ORDERS, badge: 3 },
  { label: 'Wishlist', to: AppRoutes.WISHLIST, badge: 12 },
  { label: 'Saved Designs', to: AppRoutes.DESIGN_EXPLORER, badge: null },
  { label: 'Profile', to: AppRoutes.HOME, badge: null },
];
const stats = [
  { label: 'Total Orders', value: 28, icon: '🛒' },
  { label: 'Wishlist Count', value: 12, icon: '🤍' },
  { label: 'Saved Designs', value: 7, icon: '🖼️' },
];
const recentOrders = [
  { id: '#QT-1024', product: 'Luxe Arctic Marble', date: 'May 18, 2026', status: 'Delivered', amount: '$149.00' },
  { id: '#QT-1032', product: 'Noir Velvet Slate', date: 'May 25, 2026', status: 'In Transit', amount: '$224.00' },
  { id: '#QT-1041', product: 'Terracotta Glow', date: 'Jun 02, 2026', status: 'Processing', amount: '$95.00' },
];
const orderStatus = [
  { label: 'Processing', count: 3 },
  { label: 'Shipped', count: 2 },
  { label: 'Delivered', count: 18 },
  { label: 'Returned', count: 1 },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background text-textPrimary">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-6 px-6 py-6 md:grid-cols-[280px_1fr] md:px-8">
        <aside className="space-y-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.35em] text-gold/90">Quantum Tiles</p>
            <h2 className="text-3xl font-semibold text-white">Customer Dashboard</h2>
            <p className="text-sm leading-6 text-white/70">Overview of your orders, wishlist, and saved designs.</p>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="flex w-full items-center justify-between rounded-3xl bg-white/5 px-5 py-4 text-left text-sm font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                <span>{item.label}</span>
                {item.badge ? <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-white/80">{item.badge}</span> : null}
              </Link>
            ))}
          </nav>

          <div className="rounded-[2rem] border border-border bg-surface p-5">
            <p className="text-sm uppercase tracking-[0.32em] text-gold/90">Download Invoice</p>
            <p className="mt-3 text-sm text-white/70">Access the latest order invoice or download your purchase history.</p>
            <Button className="mt-4 w-full px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em]">Download</Button>
          </div>
        </aside>

        <main className="space-y-6">
          <section className="grid gap-6 md:grid-cols-3">
            {stats.map((stat) => (
              <Card key={stat.label} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
                <div className="flex items-center justify-between gap-4">
                  <div className="rounded-3xl bg-white/5 p-4 text-2xl">{stat.icon}</div>
                  <div className="text-right">
                    <p className="text-sm uppercase tracking-[0.32em] text-gold/90">{stat.label}</p>
                    <p className="mt-3 text-3xl font-semibold text-white">{stat.value}</p>
                  </div>
                </div>
              </Card>
            ))}
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
            <Card className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-gold/90">Recent Orders</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">Latest purchases</h3>
                </div>
                <Button variant="ghost" className="text-sm uppercase tracking-[0.18em]">View All Orders</Button>
              </div>

              <div className="mt-6 overflow-hidden rounded-[2rem] border border-border bg-surface">
                <table className="min-w-full text-left text-sm text-white/70">
                  <thead className="border-b border-white/10 text-white/60">
                    <tr>
                      <th className="px-5 py-4">Order</th>
                      <th className="px-5 py-4">Product</th>
                      <th className="px-5 py-4">Date</th>
                      <th className="px-5 py-4">Status</th>
                      <th className="px-5 py-4 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-white/10 last:border-none">
                        <td className="px-5 py-4 font-semibold text-white">{order.id}</td>
                        <td className="px-5 py-4">{order.product}</td>
                        <td className="px-5 py-4">{order.date}</td>
                        <td className="px-5 py-4">{order.status}</td>
                        <td className="px-5 py-4 text-right font-semibold text-white">{order.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <Card className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-gold/90">Order Status</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">Current progress</h3>
                </div>
                <Button variant="ghost" className="text-sm uppercase tracking-[0.18em]">Track</Button>
              </div>

              <div className="mt-6 space-y-4">
                {orderStatus.map((status) => (
                  <div key={status.label} className="rounded-[2rem] border border-border bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm uppercase tracking-[0.32em] text-gold/90">{status.label}</p>
                        <p className="mt-2 text-xl font-semibold text-white">{status.count} orders</p>
                      </div>
                      <div className="h-3 w-28 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full w-3/4 rounded-full bg-gold" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
}
