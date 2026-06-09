import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { AppRoutes } from './shared/routes';

const navItems = [
  { label: 'Dashboard', to: AppRoutes.ADMIN_DASHBOARD },
  { label: 'Products', to: AppRoutes.ADMIN_PRODUCTS },
  { label: 'Orders', to: AppRoutes.ADMIN_ORDERS },
  { label: 'Customers', to: AppRoutes.ADMIN_CUSTOMERS },
  { label: 'Inventory', to: AppRoutes.ADMIN_INVENTORY },
  { label: 'Invoices', to: AppRoutes.ADMIN_INVOICES },
  { label: 'Analytics', to: AppRoutes.ADMIN_ANALYTICS },
];
const stats = [
  { label: 'Total Revenue', value: '$1.24M', detail: '+12.4% this month' },
  { label: 'Total Orders', value: '3,842', detail: '+8.7% this month' },
  { label: 'Total Customers', value: '1,480', detail: '+5.2% this month' },
  { label: 'Total Products', value: '312', detail: '+2.1% this month' },
];

const revenueSeries = [
  { month: 'Jan', value: 82 },
  { month: 'Feb', value: 96 },
  { month: 'Mar', value: 112 },
  { month: 'Apr', value: 130 },
  { month: 'May', value: 145 },
  { month: 'Jun', value: 168 },
  { month: 'Jul', value: 190 },
];

const salesTrends = [
  { label: 'Tiles', value: 48 },
  { label: 'Accessories', value: 32 },
  { label: 'Design Services', value: 20 },
];

const inventoryStatus = [
  { label: 'In Stock', value: 58 },
  { label: 'Low Stock', value: 27 },
  { label: 'Out of Stock', value: 15 },
];

const recentOrders = [
  { id: '#QT-1049', customer: 'Mia West', total: '$224.00', status: 'Delivered', date: 'Jun 08' },
  { id: '#QT-1052', customer: 'Ethan Cole', total: '$149.00', status: 'Processing', date: 'Jun 09' },
  { id: '#QT-1056', customer: 'Avery Quinn', total: '$318.00', status: 'Shipped', date: 'Jun 10' },
];

const lowStock = [
  { name: 'Noir Velvet Slate', sku: 'NVS-182', stock: 14, reorder: '$75' },
  { name: 'Sahara Terracotta', sku: 'STR-311', stock: 9, reorder: '$63' },
  { name: 'Ivory Linen Mosaic', sku: 'ILM-240', stock: 6, reorder: '$48' },
];

function ChartBar({ height, label }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative flex h-44 w-10 items-end rounded-3xl bg-blue-100">
        <div className="absolute inset-x-0 bottom-0 rounded-3xl bg-primary" style={{ height: `${height}%` }} />
      </div>
      <span className="text-xs uppercase tracking-[0.28em] text-black">{label}</span>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-background" style={{ color: '#000000' }}>
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-6 px-6 py-6 md:grid-cols-[280px_1fr] md:px-8">
        <aside className="space-y-8 rounded-[2rem] border border-border bg-surface p-6 shadow-card backdrop-blur-xl">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.35em] text-black">Quantum Tiles</p>
            <h1 className="text-3xl font-semibold text-black">Admin Dashboard</h1>
            <p className="text-sm leading-6 text-black">Full SaaS control panel for your tile business.</p>
          </div>

          <nav className="space-y-2">
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                to={item.to}
                className={`flex w-full items-center justify-between rounded-3xl px-5 py-4 text-left text-sm font-semibold transition ${index === 0 ? 'bg-blue-50 text-black' : 'bg-surface text-black hover:bg-blue-50 hover:text-black'}`}
              >
                <span>{item.label}</span>
                {item.label === 'Orders' && <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-black">3</span>}
              </Link>
            ))}
          </nav>

          <div className="rounded-[2rem] border border-border bg-blue-50 p-5">
            <p className="text-sm uppercase tracking-[0.32em] text-black">Need help?</p>
            <p className="mt-3 text-sm text-black">Contact support for analytics setup or platform questions.</p>
            <Button variant="ghost" className="mt-4 w-full px-4 py-3 text-sm uppercase tracking-[0.18em]">Support</Button>
          </div>
        </aside>

        <main className="space-y-6">
          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <Card key={stat.label} className="rounded-[2rem] border border-border bg-white p-6 shadow-card backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.32em] text-black">{stat.label}</p>
                <p className="mt-4 text-3xl font-semibold text-black">{stat.value}</p>
                <p className="mt-2 text-sm text-black">{stat.detail}</p>
              </Card>
            ))}
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
            <Card className="rounded-[2rem] border border-border bg-white p-6 shadow-card backdrop-blur-xl">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-black">Revenue Analytics</p>
                  <h2 className="mt-3 text-2xl font-semibold text-black">Monthly revenue growth</h2>
                </div>
                <Button variant="ghost" className="text-sm uppercase tracking-[0.18em]">Export</Button>
              </div>
              <div className="mt-8 overflow-hidden rounded-[2rem] border border-border bg-surface p-6">
                <div className="mb-6 flex items-center justify-between gap-4 text-black">
                  <span>Revenue</span>
                  <span>+18.2%</span>
                </div>
                <div className="grid grid-cols-7 gap-4">
                  {revenueSeries.map((item) => (
                    <div key={item.month} className="space-y-3 text-center">
                      <div className="mx-auto h-44 w-9 rounded-3xl bg-blue-100">
                        <div className="mx-auto h-full w-full rounded-3xl bg-primary" style={{ height: `${item.value}%` }} />
                      </div>
                      <span className="text-xs text-black">{item.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <div className="grid gap-6">
              <Card className="rounded-[2rem] border border-border bg-white p-6 shadow-card backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.32em] text-black">Sales Trends</p>
                <h3 className="mt-3 text-2xl font-semibold text-black">Category performance</h3>
                <div className="mt-8 space-y-4">
                  {salesTrends.map((item) => (
                    <div key={item.label} className="space-y-2">
                      <div className="flex items-center justify-between text-sm text-black">
                        <span>{item.label}</span>
                        <span>{item.value}%</span>
                      </div>
                      <div className="h-3 rounded-full bg-blue-100">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${item.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="rounded-[2rem] border border-border bg-white p-6 shadow-card backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.32em] text-black">Inventory Status</p>
                <h3 className="mt-3 text-2xl font-semibold text-black">Stock health overview</h3>
                <div className="mt-8 space-y-4">
                  {inventoryStatus.map((item) => (
                    <div key={item.label} className="space-y-2">
                      <div className="flex items-center justify-between text-sm text-black">
                        <span>{item.label}</span>
                        <span>{item.value}%</span>
                      </div>
                      <div className="h-3 rounded-full bg-blue-100">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${item.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <Card className="rounded-[2rem] border border-border bg-white p-6 shadow-card backdrop-blur-xl">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-black">Recent Orders</p>
                  <h3 className="mt-3 text-2xl font-semibold text-black">Latest order activity</h3>
                </div>
                <Button variant="ghost" className="text-sm uppercase tracking-[0.18em]">View All</Button>
              </div>
              <div className="mt-6 overflow-hidden rounded-[2rem] border border-border bg-surface">
                <table className="min-w-full text-left text-sm text-black">
                  <thead className="border-b border-border text-black bg-blue-50 font-semibold">
                    <tr>
                      <th className="px-5 py-4">Order</th>
                      <th className="px-5 py-4">Customer</th>
                      <th className="px-5 py-4">Date</th>
                      <th className="px-5 py-4">Status</th>
                      <th className="px-5 py-4 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-border last:border-none hover:bg-blue-50">
                        <td className="px-5 py-4 font-semibold text-black">{order.id}</td>
                        <td className="px-5 py-4">{order.customer}</td>
                        <td className="px-5 py-4">{order.date}</td>
                        <td className="px-5 py-4">{order.status}</td>
                        <td className="px-5 py-4 text-right font-semibold text-black">{order.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <Card className="rounded-[2rem] border border-border bg-white p-6 shadow-card backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.32em] text-black">Low Stock Products</p>
                  <h3 className="mt-3 text-2xl font-semibold text-black">Reorder before sellout</h3>
                </div>
                <Button variant="ghost" className="text-sm uppercase tracking-[0.18em]">Manage Stock</Button>
              </div>
              <div className="mt-6 space-y-4">
                {lowStock.map((item) => (
                  <div key={item.sku} className="rounded-[1.75rem] border border-border bg-surface p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-semibold text-black">{item.name}</p>
                        <p className="text-sm text-black">SKU: {item.sku}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-black">Stock: {item.stock}</p>
                        <p className="text-sm text-black">Reorder: {item.reorder}</p>
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
