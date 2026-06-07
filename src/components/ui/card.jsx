export function Card({ children, className = '' }) {
  return (
    <div className={`rounded-3xl border border-border bg-white p-6 shadow-card backdrop-blur-xl ${className}`}>
      {children}
    </div>
  );
}

