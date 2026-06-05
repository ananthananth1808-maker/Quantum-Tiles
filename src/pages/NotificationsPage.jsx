export default function NotificationsPage() {
  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-glow backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.35em] text-gold/90">Notifications</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Recent activity</h1>
        <p className="mt-4 max-w-3xl text-white/70">
          Review the latest alerts, updates, and order notifications for your Quantum Tiles workspace.
        </p>
      </div>
      <div className="grid gap-4">
        {[
          { title: 'Order shipped', message: 'Your Noir Velvet Slate order is on its way.', time: '2h ago' },
          { title: 'Design saved', message: 'Saved design “Modern Marble Room” is ready for review.', time: '5h ago' },
          { title: 'Feature update', message: 'AI Visualizer now supports custom lighting presets.', time: '1d ago' },
        ].map((item) => (
          <div key={item.title} className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-glow">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                <p className="mt-2 text-sm text-white/70">{item.message}</p>
              </div>
              <span className="text-xs uppercase tracking-[0.28em] text-white/50">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
