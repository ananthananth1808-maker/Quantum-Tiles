import { Card } from '../components/ui/card';

export default function CategoriesPage() {
  const categories = [
    {
      name: 'Marble',
      color: 'from-yellow-400 to-yellow-600',
      icon: '✨',
    },
    {
      name: 'Terracotta',
      color: 'from-orange-400 to-red-500',
      icon: '🧱',
    },
    {
      name: 'Mosaic',
      color: 'from-blue-500 to-cyan-500',
      icon: '🔷',
    },
    {
      name: 'Slate',
      color: 'from-gray-600 to-gray-800',
      icon: '🪨',
    },
    {
      name: 'Woodgrain',
      color: 'from-amber-600 to-yellow-700',
      icon: '🌳',
    },
    {
      name: 'Metallic',
      color: 'from-purple-500 to-pink-500',
      icon: '⚡',
    },
  ];

  return (
    <section className="space-y-10">
      
      {/* Hero Section */}
      <div className="rounded-[2rem] p-10 bg-gradient-to-r from-black via-gray-900 to-black shadow-2xl">
        <p className="text-sm uppercase tracking-[0.35em] text-yellow-400">
          Categories
        </p>

        <h1 className="mt-4 text-4xl font-bold text-white">
          Browse Premium Tile Collections
        </h1>

        <p className="mt-4 max-w-3xl text-gray-300">
          Explore luxury finishes, curated themes, and elegant surface
          designs crafted for modern interiors and architectural excellence.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <Card
            key={category.name}
            className="group overflow-hidden rounded-[2rem] border-0 bg-white shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            {/* Top Gradient Bar */}
            <div
              className={`h-3 bg-gradient-to-r ${category.color}`}
            />

            <div className="p-8">
              <div className="text-5xl">
                {category.icon}
              </div>

              <p className="mt-5 text-sm uppercase tracking-[0.35em] text-gray-500">
                Collection
              </p>

              <h2 className="mt-3 text-3xl font-bold text-gray-900">
                {category.name}
              </h2>

              <p className="mt-4 text-gray-600">
                Premium curated collections designed to bring luxury,
                durability, and timeless elegance to every space.
              </p>

              <button className="mt-6 rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition-all group-hover:bg-yellow-500 group-hover:text-black">
                Explore Collection →
              </button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}