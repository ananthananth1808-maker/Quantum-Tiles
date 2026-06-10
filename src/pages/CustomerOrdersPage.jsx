import { useEffect, useState } from "react";

export default function CustomerOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(savedOrders);
  }, []);

  return (
    <main className="min-h-screen bg-background px-6 py-16 text-textPrimary">
      <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-slate-950/80 p-10 shadow-2xl shadow-black/20">
        <h1 className="text-4xl font-semibold">Customer Orders</h1>

        <p className="mt-4 text-slate-300">
          Track your past purchases, shipping status, and order details.
        </p>

        <div className="mt-10 rounded-3xl border border-white/10 bg-slate-900/80 p-8">
          {orders.length === 0 ? (
            <p className="text-slate-400">
              No orders yet? Start shopping to see your order history.
            </p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-2xl border border-white/10 bg-slate-800 p-4"
                >
                  <h3 className="text-xl font-semibold">
                    {order.product}
                  </h3>

                  <p className="text-slate-300">
                      Price: ₹{order.total?.toLocaleString("en-IN")}
                  </p>

                  <p className="text-green-400">
                    Status: {order.status}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}