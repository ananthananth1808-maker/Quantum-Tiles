import { Link } from 'react-router-dom';
import { AppRoutes } from '../shared/routes';

export default function NotFoundPage() {
  return (
    <div className="grid min-h-screen place-items-center bg-navy px-6 py-16 text-white">
      <div className="max-w-xl rounded-3xl border border-white/10 bg-slate-950/80 p-12 text-center shadow-2xl shadow-black/20">
        <p className="text-sm uppercase tracking-[0.4em] text-gold">404 error</p>
        <h1 className="mt-6 text-5xl font-semibold">Page not found</h1>
        <p className="mt-4 text-slate-300">
          The route you are looking for does not exist. Use the navigation below to get back to the shop.
        </p>
        <Link
          to={AppRoutes.HOME}
          className="mt-8 inline-flex items-center justify-center rounded-full bg-gold px-8 py-4 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}
