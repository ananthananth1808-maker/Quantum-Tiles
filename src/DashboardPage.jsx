import { Link } from 'react-router-dom';
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
  {
    id: '#QT-1024',
    product: 'Luxe Arctic Marble',
    date: 'May 18, 2026',
    status: 'Delivered',
    amount: '$149.00',
  },
  {
    id: '#QT-1032',
    product: 'Noir Velvet Slate',
    date: 'May 25, 2026',
    status: 'In Transit',
    amount: '$224.00',
  },
  {
    id: '#QT-1041',
    product: 'Terracotta Glow',
    date: 'Jun 02, 2026',
    status: 'Processing',
    amount: '$95.00',
  },
];

const orderStatus = [
  { label: 'Processing', count: 3, width: '30%' },
  { label: 'Shipped', count: 2, width: '45%' },
  { label: 'Delivered', count: 18, width: '85%' },
  { label: 'Returned', count: 1, width: '15%' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function DashboardPage() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-black text-white w-full">

      {/* Background Glow */}
      <div className="absolute left-10 top-20 h-72 w-72 rounded-full bg-blue-500/20 blur-[120px]" />
      <div className="absolute right-10 bottom-20 h-72 w-72 rounded-full bg-purple-500/20 blur-[120px]" />
      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[150px]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-6 px-6 py-8 md:grid-cols-[280px_1fr]"
      >
        {/* Sidebar */}
        <motion.aside
          variants={itemVariants}
          className="space-y-6 rounded-[2rem] border border-white/20 bg-white/10 p-6 backdrop-blur-xl shadow-2xl"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-cyan-300">
              Quantum Tiles
            </p>

            <h2 className="mt-4 text-3xl font-bold">
              Customer Dashboard
            </h2>

            <p className="mt-3 text-sm text-gray-300">
              Overview of your orders, wishlist and saved designs.
            </p>
          </div>

          <nav className="space-y-3">
            {navItems.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{
                  scale: 1.03,
                  x: 5,
                }}
              >
                <Link
                  to={item.to}
                  className="flex items-center justify-between rounded-2xl bg-white/10 px-5 py-4 text-sm font-semibold transition-all duration-300 hover:bg-blue-500/30"
                >
                  <span>{item.label}</span>

                  {item.badge && (
                    <span className="rounded-full bg-cyan-500 px-2 py-1 text-xs font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="rounded-[2rem] border border-white/20 bg-white/10 p-5 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
              Download Invoice
            </p>

            <p className="mt-3 text-sm text-gray-300">
              Access latest invoices or complete purchase history.
            </p>

            <Button className="mt-5 w-full transition-all duration-300 hover:scale-105">
              Download
            </Button>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="space-y-6">
          {/* Stats */}
          <section className="grid gap-6 md:grid-cols-3">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
              >
                <Card className="rounded-[2rem] border border-white/20 bg-white/10 p-6 backdrop-blur-xl shadow-2xl">
                  <div className="flex items-center justify-between">
                    <div className="rounded-3xl bg-white/10 p-4 text-3xl">
                      {stat.icon}
                    </div>

                    <div className="text-right">
                      <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                        {stat.label}
                      </p>

                      <h3 className="mt-3 text-4xl font-bold">
                        {stat.value}
                      </h3>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </section>

          {/* Orders + Status */}
          <section className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">

            {/* Recent Orders */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <Card className="rounded-[2rem] border border-white/20 bg-white/10 p-6 backdrop-blur-xl shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                      Recent Orders
                    </p>

                    <h3 className="mt-3 text-2xl font-bold">
                      Latest Purchases
                    </h3>
                  </div>

                  <Button variant="ghost">
                    View All Orders
                  </Button>
                </div>

                <div className="mt-6 overflow-hidden rounded-3xl border border-white/20">
                  <table className="min-w-full text-left text-sm">
                    <thead className="bg-white/5">
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
                        <motion.tr
                          key={order.id}
                          whileHover={{
                            backgroundColor:
                              'rgba(255,255,255,0.08)',
                          }}
                          className="border-t border-white/10"
                        >
                          <td className="px-5 py-4 font-semibold">
                            {order.id}
                          </td>

                          <td className="px-5 py-4">
                            {order.product}
                          </td>

                          <td className="px-5 py-4">
                            {order.date}
                          </td>

                          <td className="px-5 py-4">
                            {order.status}
                          </td>

                          <td className="px-5 py-4 text-right font-semibold">
                            {order.amount}
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </motion.div>

            {/* Order Status */}
            <motion.div variants={itemVariants}>
              <Card className="rounded-[2rem] border border-white/20 bg-white/10 p-6 backdrop-blur-xl shadow-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                      Order Status
                    </p>

                    <h3 className="mt-3 text-2xl font-bold">
                      Current Progress
                    </h3>
                  </div>

                  <Button variant="ghost">
                    Track
                  </Button>
                </div>

                <div className="mt-6 space-y-4">
                  {orderStatus.map((status, index) => (
                    <motion.div
                      key={status.label}
                      whileHover={{
                        scale: 1.03,
                        x: 5,
                      }}
                      className="rounded-3xl border border-white/20 bg-white/10 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                            {status.label}
                          </p>

                          <h4 className="mt-2 text-xl font-bold">
                            {status.count} Orders
                          </h4>
                        </div>

                        <div className="w-32">
                          <div className="h-3 overflow-hidden rounded-full bg-white/10">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{
                                width: status.width,
                              }}
                              transition={{
                                duration: 1.2,
                                delay: index * 0.2,
                              }}
                              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

          </section>
        </main>
      </motion.div>
    </div>
  );
}