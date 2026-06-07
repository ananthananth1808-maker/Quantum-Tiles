import { Link } from 'react-router-dom';
import { AppRoutes } from '../shared/routes';

export default function HomePage() {
  return (
    <main className="space-y-10 py-10">
      <section className="mx-auto max-w-6xl rounded-3xl border border-border bg-surface p-10 shadow-card">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.4em] text-primary">Quantum Tiles</p>
            <h1 className="text-5xl font-semibold leading-tight text-textPrimary sm:text-6xl">
              Premium tile design meets AI visualization.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-textSecondary">
              Discover curated tile collections, custom dashboards, and AI-powered room previews for modern interiors.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                to={AppRoutes.PRODUCTS}
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white transition hover:bg-blue-600 hover:shadow-card-hover"
              >
                Browse products
              </Link>
              <Link
                to={AppRoutes.LOGIN}
                className="inline-flex items-center justify-center rounded-full border border-border bg-white px-8 py-4 text-sm font-semibold text-textPrimary transition hover:bg-blue-50 hover:border-primary/30"
              >
                Sign in
              </Link>
            </div>
          </div>
          <div className="rounded-3xl border border-border bg-white p-8 shadow-card-hover">
            <p className="mb-4 text-sm uppercase tracking-[0.4em] text-primary font-semibold">New feature</p>
            <h2 className="text-3xl font-semibold text-textPrimary">AI Visualizer</h2>
            <p className="mt-4 text-textSecondary">
              Generate tile room mockups, preview finishes, and refine your layout with AI-powered design suggestions.
            </p>
            <Link
              to={AppRoutes.AI_VISUALIZER}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
            >
              Launch visualizer
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
