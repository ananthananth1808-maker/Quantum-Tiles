export default function AboutPage() {
  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-glow backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.35em] text-gold/90">About Quantum Tiles</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Luxury tile design for modern spaces.</h1>
        <p className="mt-4 max-w-3xl text-white/70">
          Quantum Tiles is a premium experience for architects, designers, and homeowners who want sophisticated tile collections,
          intelligent design tools, and seamless commerce.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {['Vision', 'Design', 'Craftsmanship', 'Innovation'].map((item) => (
          <div key={item} className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-glow">
            <p className="text-sm uppercase tracking-[0.32em] text-gold/90">{item}</p>
            <p className="mt-3 text-white/70">Premium details that elevate every project and create immersive tile experiences.</p>
          </div>
        ))}
      </div>
    </section>
  );
}
