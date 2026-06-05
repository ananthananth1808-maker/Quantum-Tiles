import { Card } from '../components/ui/card';

export default function CategoriesPage() {
  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glow backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.35em] text-gold/90">Categories</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Browse premium tile collections</h1>
        <p className="mt-4 text-white/70">Explore luxury finishes, curated themes, and elegant surface designs for every room.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {['Marble', 'Terracotta', 'Mosaic', 'Slate', 'Woodgrain', 'Metallic'].map((category) => (
          <Card key={category} className="rounded-[2rem] p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-gold/90">{category}</p>
            <h2 className="mt-4 text-2xl font-semibold text-white">{category} Tiles</h2>
            <p className="mt-3 text-sm text-white/70">Premium curated collections for modern, luxury interiors.</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
