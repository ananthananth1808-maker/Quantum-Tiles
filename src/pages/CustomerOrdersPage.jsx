export default function CustomerOrdersPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-16 text-textPrimary">
      <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-slate-950/80 p-10 shadow-2xl shadow-black/20">
        <h1 className="text-4xl font-semibold">Customer orders</h1>
        <p className="mt-4 text-slate-300">
          Track your past purchases, shipping status, and order details in one place.
        </p>
        <div className="mt-10 rounded-3xl border border-white/10 bg-slate-900/80 p-8">
          <p className="text-slate-400">No orders yet? Start shopping to see your order history.</p>
        </div>
      </div>
    </main>
  );
}
