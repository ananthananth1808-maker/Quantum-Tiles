import { useState } from 'react';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';

const orders = [
  {
    id: '#QT-1058',
    customer: 'Sophie Lane',
    amount: '$318.00',
    date: 'Jun 12, 2026',
    status: 'Pending',
    email: 'sophie@example.com',
    phone: '+1 412-555-0198',
    address: '172 Maple Lane, Seattle, WA',
  },
  {
    id: '#QT-1049',
    customer: 'Mia West',
    amount: '$224.00',
    date: 'Jun 08, 2026',
    status: 'Delivered',
    email: 'mia.west@example.com',
    phone: '+1 415-555-0173',
    address: '84 Pine Street, San Francisco, CA',
  },
  {
    id: '#QT-1052',
    customer: 'Ethan Cole',
    amount: '$149.00',
    date: 'Jun 09, 2026',
    status: 'Shipped',
    email: 'ethan.cole@example.com',
    phone: '+1 617-555-0121',
    address: '241 Oak Avenue, Boston, MA',
  },
  {
    id: '#QT-1061',
    customer: 'Avery Quinn',
    amount: '$192.00',
    date: 'Jun 13, 2026',
    status: 'Packed',
    email: 'avery.quinn@example.com',
    phone: '+1 202-555-0154',
    address: '13 Spruce Dr, Washington, DC',
  },
];

const statusColors = {
  Pending: 'bg-amber-500/15 text-amber-200',
  Confirmed: 'bg-blue-500/15 text-blue-200',
  Packed: 'bg-violet-500/15 text-violet-200',
  Shipped: 'bg-sky-500/15 text-sky-200',
  Delivered: 'bg-emerald-500/15 text-emerald-200',
};

export default function AdminOrderManagementPage() {
  const [selectedOrder, setSelectedOrder] = useState(orders[0]);

  return (
    <div className="min-h-screen bg-navy text-white">
      <div className="mx-auto max-w-7xl px-6 py-8 md:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-gold/90">Order Management</p>
            <h1 className="mt-3 text-4xl font-semibold text-white">Admin Order Control</h1>
          </div>
          <Button variant="ghost" className="text-sm uppercase tracking-[0.18em]">Export Orders</Button>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
          <Card className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-gold/90">Order List</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">Track every order</h2>
              </div>
              <div className="rounded-full bg-white/5 px-4 py-2 text-sm text-white/70">{orders.length} orders</div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/10 text-left text-sm text-white/70">
                <thead className="border-b border-white/10 text-white/60">
                  <tr>
                    <th className="px-4 py-4">Order ID</th>
                    <th className="px-4 py-4">Customer</th>
                    <th className="px-4 py-4">Amount</th>
                    <th className="px-4 py-4">Date</th>
                    <th className="px-4 py-4">Status</th>
                    <th className="px-4 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-white/5">
                      <td className="px-4 py-4 font-semibold text-white">{order.id}</td>
                      <td className="px-4 py-4">{order.customer}</td>
                      <td className="px-4 py-4">{order.amount}</td>
                      <td className="px-4 py-4">{order.date}</td>
                      <td className="px-4 py-4">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusColors[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-2">
                          <Button
                            type="button"
                            variant="ghost"
                            className="px-3 py-2 text-xs uppercase tracking-[0.16em]"
                            onClick={() => setSelectedOrder(order)}
                          >
                            View
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl">
            <div className="mb-6">
              <p className="text-sm uppercase tracking-[0.32em] text-gold/90">Customer Details</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">{selectedOrder.customer}</h2>
            </div>
            <div className="space-y-4 rounded-[2rem] border border-white/10 bg-navy/40 p-5">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-gold/90">Order ID</p>
                <p className="mt-2 text-lg text-white">{selectedOrder.id}</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-gold/90">Email</p>
                <p className="mt-2 text-lg text-white">{selectedOrder.email}</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-gold/90">Phone</p>
                <p className="mt-2 text-lg text-white">{selectedOrder.phone}</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-gold/90">Address</p>
                <p className="mt-2 text-lg text-white">{selectedOrder.address}</p>
              </div>
            </div>

            <div className="mt-6 space-y-5 rounded-[2rem] border border-white/10 bg-navy/40 p-5">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-gold/90">Current Status</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {['Pending', 'Confirmed', 'Packed', 'Shipped', 'Delivered'].map((status) => (
                    <button
                      key={status}
                      type="button"
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${selectedOrder.status === status ? 'bg-gold text-navy' : 'bg-white/5 text-white/70 hover:bg-white/10'}`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-4">
                <p className="text-sm uppercase tracking-[0.32em] text-gold/90">Order Summary</p>
                <div className="mt-4 grid gap-3 text-sm text-white/70">
                  <div className="flex items-center justify-between">
                    <span>Amount</span>
                    <span>{selectedOrder.amount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Date</span>
                    <span>{selectedOrder.date}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Status</span>
                    <span>{selectedOrder.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
