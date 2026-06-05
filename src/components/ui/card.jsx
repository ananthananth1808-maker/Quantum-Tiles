export function Card({ children, className = '' }) {
  return (
    <div className={`rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-xl ${className}`}>
      {children}
    </div>
  );
}

