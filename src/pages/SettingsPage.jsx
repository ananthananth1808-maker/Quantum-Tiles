export default function SettingsPage() {
  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-glow backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.35em] text-gold/90">Settings</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">Control your Quantum Tiles experience</h1>
        <p className="mt-4 max-w-3xl text-white/70">
          Adjust your account preferences, notification settings, and dashboard appearance for a premium workspace experience.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {['Account', 'Notifications', 'Security', 'Appearance'].map((section) => (
          <div key={section} className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-glow">
            <p className="text-sm uppercase tracking-[0.32em] text-gold/90">{section}</p>
            <p className="mt-3 text-white/70">Manage {section.toLowerCase()} controls, secure access, and keep your workspace in sync.</p>
          </div>
        ))}
      </div>
    </section>
  );
}
