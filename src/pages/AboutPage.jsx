export default function AboutPage() {
  return (
    <section className="space-y-10 bg-gradient-to-b from-white via-yellow-50 to-gray-100 p-6 rounded-3xl">
      
      {/* Hero Section */}
      <div className="rounded-[2rem] border border-yellow-400/30 p-10 bg-gradient-to-r from-black via-gray-900 to-black shadow-2xl">
        <p className="text-sm uppercase tracking-[0.35em] text-yellow-400">
          About Quantum Tiles
        </p>

        <h1 className="mt-4 text-4xl md:text-5xl font-bold text-white">
          Luxury Tile Design for Modern Spaces
        </h1>

        <p className="mt-5 max-w-3xl text-gray-300 leading-relaxed">
          Quantum Tiles is a premium experience for architects, designers,
          and homeowners who want sophisticated tile collections,
          intelligent design tools, and seamless commerce.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Vision",
            color: "from-yellow-400 to-yellow-600",
          },
          {
            title: "Design",
            color: "from-blue-500 to-cyan-500",
          },
          {
            title: "Craftsmanship",
            color: "from-purple-500 to-pink-500",
          },
          {
            title: "Innovation",
            color: "from-green-500 to-emerald-500",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-[2rem] overflow-hidden shadow-xl hover:scale-105 transition-all duration-300"
          >
            <div className={`h-2 bg-gradient-to-r ${item.color}`} />

            <div className="bg-white p-8 border border-gray-200">
              <p className="text-sm uppercase tracking-[0.32em] text-gray-500">
                {item.title}
              </p>

              <p className="mt-4 text-gray-700 leading-relaxed">
                Premium details that elevate every project and create
                immersive tile experiences.
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}