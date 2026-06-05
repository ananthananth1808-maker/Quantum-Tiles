export default function WishlistPage() {
  return (
    <main className="min-h-screen bg-navy px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-slate-950/80 p-10 shadow-2xl shadow-black/20">
        <h1 className="text-4xl font-semibold">Saved wishlist</h1>
        <p className="mt-4 text-slate-300">
          Save your favorite tile sets and revisit them when you're ready to build the perfect room.
        </p>
        <div className="mt-10 rounded-3xl border border-white/10 bg-slate-900/80 p-8">
          <p className="text-slate-400">Your wishlist is empty. Add premium tiles from the shop to save them here.</p>
        </div>
      </div>
    </main>
  );
}
