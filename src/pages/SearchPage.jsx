export default function SearchPage() {
  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-glow backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.35em] text-gold/90">Search</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Find premium tiles instantly</h1>
        <p className="mt-4 max-w-3xl text-white/70">
          Search curated collections, finishes, and AI layouts across the Quantum Tiles catalog.
        </p>
      </div>
      <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-glow">
        <label className="block text-sm font-semibold uppercase tracking-[0.32em] text-white/70">Search catalog</label>
        <div className="mt-4 flex gap-3">
          <input
            type="search"
            placeholder="Search tiles, collections, or designs..."
            className="w-full rounded-3xl border border-border bg-surface px-5 py-4 text-textPrimary outline-none transition focus:border-primary focus:ring-2 focus:ring-blue-100"
          />
          <button className="rounded-3xl bg-gold px-6 py-4 text-sm font-semibold text-navy transition hover:bg-amber-300">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
