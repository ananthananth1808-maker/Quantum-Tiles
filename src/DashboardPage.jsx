import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { AppRoutes } from './shared/routes';


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
    <div className="relative z-0 bg-gradient-to-br from-slate-950 via-blue-950 to-black text-white w-full min-h-screen">

      {/* Background Glow */}
      <div className="absolute right-0 bottom-20 h-48 sm:h-72 w-48 sm:w-72 rounded-full bg-purple-500/20 blur-[80px] sm:blur-[120px]" />
      <div className="absolute left-1/2 top-0 h-72 sm:h-96 w-72 sm:w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[100px] sm:blur-[150px]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto w-full min-h-screen gap-6 px-4 py-6 sm:px-6 md:px-8 lg:px-6"
      >
        {/* Main Content */}
        <main className="space-y-6">
          {/* Stats */}
          <section className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
              >
                <Card className="rounded-[2rem] border border-white/20 bg-white/10 p-4 sm:p-6 backdrop-blur-xl shadow-2xl">
                  <div className="flex flex-col items-center text-center gap-3 sm:gap-4">
                    
                    <div className="rounded-3xl bg-white/10 p-3 sm:p-4 text-2xl sm:text-3xl">
                      {stat.icon}
                    </div>

                    <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                      {stat.label}
                    </p>

                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold">
                      {stat.value}
                    </h3>

                  </div>
                </Card>

              </motion.div>
            ))}
          </section>

          <div className="rounded-[2rem] border border-white/20 bg-white/10 p-4 sm:p-5 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
              Download Invoice
            </p>

            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-300">
              Access latest invoices or complete purchase history.
            </p>

            <Button className="mt-3 sm:mt-5 w-full transition-all duration-300 hover:scale-105">
              Download
            </Button>
          </div>

          {/* Orders + Status */}
          <section className="grid gap-6 grid-cols-1 lg:grid-cols-[1.3fr_0.9fr]">

            {/* Recent Orders */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <Card className="rounded-[2rem] border border-white/20 bg-white/10 p-4 sm:p-6 backdrop-blur-xl shadow-2xl overflow-hidden">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                      Recent Orders
                    </p>

                    <h3 className="mt-2 sm:mt-3 text-lg sm:text-2xl font-bold">
                      Latest Purchases
                    </h3>
                  </div>

                  <Button variant="ghost" className="text-xs sm:text-sm">
                    View All Orders
                  </Button>
                </div>

                <div className="overflow-x-auto rounded-3xl border border-white/20">
                  <table className="w-full text-left text-xs sm:text-sm min-w-[500px]">
                    <thead className="bg-white/5">
                      <tr>
                        <th className="px-3 sm:px-5 py-3 sm:py-4">Order</th>
                        <th className="px-3 sm:px-5 py-3 sm:py-4">Product</th>
                        <th className="px-3 sm:px-5 py-3 sm:py-4">Date</th>
                        <th className="px-3 sm:px-5 py-3 sm:py-4">Status</th>
                        <th className="px-3 sm:px-5 py-3 sm:py-4 text-right">Amount</th>
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
                          <td className="px-3 sm:px-5 py-3 sm:py-4 font-semibold">
                            {order.id}
                          </td>

                          <td className="px-3 sm:px-5 py-3 sm:py-4">
                            {order.product}
                          </td>

                          <td className="px-3 sm:px-5 py-3 sm:py-4">
                            {order.date}
                          </td>

                          <td className="px-3 sm:px-5 py-3 sm:py-4">
                            {order.status}
                          </td>

                          <td className="px-3 sm:px-5 py-3 sm:py-4 text-right font-semibold">
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
              <Card className="rounded-[2rem] border border-white/20 bg-white/10 p-4 sm:p-6 backdrop-blur-xl shadow-2xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                      Order Status
                    </p>

                    <h3 className="mt-2 sm:mt-3 text-lg sm:text-2xl font-bold">
                      Current Progress
                    </h3>
                  </div>

                  <Button variant="ghost" className="text-xs sm:text-sm">
                    Track
                  </Button>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {orderStatus.map((status, index) => (
                    <motion.div
                      key={status.label}
                      whileHover={{
                        scale: 1.03,
                        x: 5,
                      }}
                      className="rounded-3xl border border-white/20 bg-white/10 p-3 sm:p-4"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                            {status.label}
                          </p>

                          <h4 className="mt-1 sm:mt-2 text-base sm:text-xl font-bold">
                            {status.count} Orders
                          </h4>
                        </div>

                        <div className="w-32">
                          <div className="h-2 sm:h-3 overflow-hidden rounded-full bg-white/10">
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