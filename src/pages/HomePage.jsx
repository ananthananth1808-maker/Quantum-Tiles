import { Link } from 'react-router-dom';
import { AppRoutes } from '../shared/routes';

export default function HomePage() {
  return (
    <main className="space-y-10 py-10">
      <section className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-slate-950/80 p-10 shadow-2xl shadow-black/20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.4em] text-gold">Quantum Tiles</p>
            <h1 className="text-5xl font-semibold leading-tight text-white sm:text-6xl">
              Premium tile design meets AI visualization.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Discover curated tile collections, custom dashboards, and AI-powered room previews for modern interiors.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                to={AppRoutes.PRODUCTS}
                className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-4 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
              >
                Browse products
              </Link>
              <Link
                to={AppRoutes.LOGIN}
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Sign in
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-xl shadow-black/20">
            <p className="mb-4 text-sm uppercase tracking-[0.4em] text-slate-400">New feature</p>
            <h2 className="text-3xl font-semibold text-white">AI Visualizer</h2>
            <p className="mt-4 text-slate-300">
              Generate tile room mockups, preview finishes, and refine your layout with AI-powered design suggestions.
            </p>
            <Link
              to={AppRoutes.AI_VISUALIZER}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            >
              Launch visualizer
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
