import { motion } from "framer-motion";
import { Card } from "./components/ui/card";
import { Button } from "./components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const stats = [
  {
    title: "Total Revenue",
    value: "₹12.8L",
    icon: "💰",
    growth: "+18%"
  },
  {
    title: "Orders",
    value: "1,248",
    icon: "📦",
    growth: "+12%"
  },
  {
    title: "Customers",
    value: "842",
    icon: "👥",
    growth: "+9%"
  },
  {
    title: "Products",
    value: "156",
    icon: "🧱",
    growth: "+4%"
  }
];
const revenueData = [
  { month: "Jan", revenue: 120000 },
  { month: "Feb", revenue: 180000 },
  { month: "Mar", revenue: 240000 },
  { month: "Apr", revenue: 320000 },
  { month: "May", revenue: 410000 },
  { month: "Jun", revenue: 520000 },
];

const recentOrders = [
  {
    id: "#QT1024",
    customer: "Arun Kumar",
    total: "₹24,500",
    status: "Delivered"
  },
  {
    id: "#QT1025",
    customer: "Vignesh",
    total: "₹18,200",
    status: "Processing"
  },
  {
    id: "#QT1026",
    customer: "Karthik",
    total: "₹31,000",
    status: "Shipped"
  }
];

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-4 sm:px-6 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 sm:mb-8 rounded-[2rem] border border-white/10 bg-white/5 p-5 sm:p-8 backdrop-blur-xl"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
          Admin Dashboard
        </h1>

        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-white/70">
          Manage products, orders, customers and analytics.
        </p>
      </motion.div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <motion.div
            key={item.title}
            whileHover={{ y: -5 }}
          >
            <Card className="rounded-[2rem] border border-white/10 bg-white/5 p-5 sm:p-6 backdrop-blur-xl">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-1">
                  <p className="text-cyan-400 text-xs uppercase tracking-wider">
                    {item.title}
                  </p>

                  <h2 className="mt-2 sm:mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                    {item.value}
                  </h2>

                  <p className="mt-1 sm:mt-2 text-sm text-green-400">
                    {item.growth}
                  </p>
                </div>

                <div className="text-3xl sm:text-5xl">
                  {item.icon}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 sm:mt-8 h-60 sm:h-72 md:h-80 rounded-xl bg-white/5 p-3 sm:p-4 overflow-x-auto">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

            <XAxis
              dataKey="month"
              stroke="#94A3B8"
              tick={{ fontSize: 12 }}
            />

            <YAxis
              stroke="#94A3B8"
              tick={{ fontSize: 12 }}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#06B6D4"
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <Card className="mt-6 sm:mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-4 sm:p-8 backdrop-blur-xl overflow-x-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Recent Orders
          </h2>

          <Button>
            View All
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[400px]">
            <thead>
              <tr className="text-white/60 border-b border-white/10">
                <th className="text-left py-3 sm:py-4 px-2 sm:px-0 text-xs sm:text-sm">Order</th>
                <th className="text-left py-3 sm:py-4 px-2 sm:px-0 text-xs sm:text-sm">Customer</th>
                <th className="text-left py-3 sm:py-4 px-2 sm:px-0 text-xs sm:text-sm">Amount</th>
                <th className="text-left py-3 sm:py-4 px-2 sm:px-0 text-xs sm:text-sm">Status</th>
              </tr>
            </thead>

            <tbody>
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-t border-white/10 hover:bg-white/5 transition"
                >
                  <td className="py-3 sm:py-4 px-2 sm:px-0 text-white text-sm">
                    {order.id}
                  </td>

                  <td className="py-3 sm:py-4 px-2 sm:px-0 text-white text-sm">
                    {order.customer}
                  </td>

                  <td className="py-3 sm:py-4 px-2 sm:px-0 text-white text-sm">
                    {order.total}
                  </td>

                  <td className="py-3 sm:py-4 px-2 sm:px-0 text-cyan-400 text-sm">
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid gap-3 sm:gap-6 mt-6 sm:mt-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Button className="h-12 sm:h-16 rounded-2xl text-sm sm:text-base">
          Add Product
        </Button>

        <Button className="h-12 sm:h-16 rounded-2xl text-sm sm:text-base">
          Manage Orders
        </Button>

        <Button className="h-12 sm:h-16 rounded-2xl text-sm sm:text-base">
          View Analytics
        </Button>
      </div>
    </div>
  );
}