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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-6">
            <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
      >
        <h1 className="text-5xl font-bold text-white">
          Admin Dashboard
        </h1>

        <p className="mt-4 text-white/70">
          Manage products, orders, customers and analytics.
        </p>
      </motion.div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <motion.div
            key={item.title}
            whileHover={{ y: -5 }}
          >
            <Card className="rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-cyan-400 text-sm uppercase">
                    {item.title}
                  </p>

                  <h2 className="mt-3 text-4xl font-bold text-white">
                    {item.value}
                  </h2>

                  <p className="mt-2 text-green-400">
                    {item.growth}
                  </p>
                </div>

                <div className="text-5xl">
                  {item.icon}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
           <div className="mt-6 h-80 rounded-xl bg-white/5 p-4">
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={revenueData}>
      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

      <XAxis
        dataKey="month"
        stroke="#94A3B8"
      />

      <YAxis
        stroke="#94A3B8"
      />

      <Tooltip />

      <Line
        type="monotone"
        dataKey="revenue"
        stroke="#06B6D4"
        strokeWidth={4}
        dot={{ r: 6 }}
      />
    </LineChart>
  </ResponsiveContainer>
</div>
            <Card className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">
            Recent Orders
          </h2>

          <Button>
            View All
          </Button>
        </div>

        <table className="w-full mt-6">
          <thead>
            <tr className="text-white/60">
              <th className="text-left py-4">Order</th>
              <th className="text-left py-4">Customer</th>
              <th className="text-left py-4">Amount</th>
              <th className="text-left py-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {recentOrders.map((order) => (
              <tr
                key={order.id}
                className="border-t border-white/10"
              >
                <td className="py-4 text-white">
                  {order.id}
                </td>

                <td className="text-white">
                  {order.customer}
                </td>

                <td className="text-white">
                  {order.total}
                </td>

                <td className="text-cyan-400">
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
            <div className="grid gap-6 mt-8 md:grid-cols-3">
        <Button className="h-16 rounded-2xl">
          Add Product
        </Button>

        <Button className="h-16 rounded-2xl">
          Manage Orders
        </Button>

        <Button className="h-16 rounded-2xl">
          View Analytics
        </Button>
      </div>
          </div>
  );
}