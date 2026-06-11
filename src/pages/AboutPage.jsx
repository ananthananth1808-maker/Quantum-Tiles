import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../shared/routes";


export default function AboutPage() {
  const navigate = useNavigate();
  return (
    <section className="space-y-10">
      
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
      {/* Our Blogs & Works */}
<div className="rounded-[2rem] bg-white p-10 shadow-xl border border-gray-200">
  <p className="text-sm uppercase tracking-[0.35em] text-yellow-600">
    Our Blogs & Works
  </p>

  <h2 className="mt-3 text-3xl font-bold text-gray-900">
    Explore Our Latest Projects
  </h2>

  <p className="mt-4 text-gray-600 max-w-3xl">
    Discover premium tile installations, luxury interiors,
    design inspirations, and expert tips from Quantum Tiles.
  </p>

  <div className="mt-10 grid gap-8 md:grid-cols-3">

    {/* Blog Card 1 */}
    <div className="overflow-hidden rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl transition">
      <video
        controls
        muted
        className="h-56 w-full object-cover"
      >
        <source src="/videos/living.mp4" type="video/mp4" />
      </video>

      <div className="p-6">
        <h3 className="text-xl font-semibold">
          Luxury Living Room Transformation
        </h3>

        <p className="mt-3 text-gray-600">
          Premium marble tiles used to create a modern and elegant living room.
        </p>
      </div>
    </div>

    {/* Blog Card 2 */}
    <div className="overflow-hidden rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl transition">
      <video
        controls
        muted
        className="h-56 w-full object-cover"
      >
        <source src="/videos/kitchen.mp4" type="video/mp4" />
      </video>

      <div className="p-6">
        <h3 className="text-xl font-semibold">
          Modern Kitchen Design
        </h3>

        <p className="mt-3 text-gray-600">
          Designer wall tiles combined with contemporary kitchen interiors.
        </p>
      </div>
    </div>

    {/* Blog Card 3 */}
    <div className="overflow-hidden rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl transition">
      <video
        controls
        muted
        className="h-56 w-full object-cover"
      >
        <source src="/videos/bathroom.mp4" type="video/mp4" />
      </video>

      <div className="p-6">
        <h3 className="text-xl font-semibold">
          Premium Bathroom Collection
        </h3>

        <p className="mt-3 text-gray-600">
          Elegant bathroom interiors crafted using luxury tile collections.
        </p>
      </div>
    </div>

  </div>
</div>
<div className="rounded-[2rem] bg-gradient-to-r from-black via-gray-900 to-black p-10 shadow-2xl">
  <p className="text-sm uppercase tracking-[0.35em] text-yellow-400">
    Success Stories
  </p>

  <h2 className="mt-3 text-4xl font-bold text-white">
    Trusted By Thousands
  </h2>

  <div className="mt-10 grid gap-6 md:grid-cols-3">

    <div className="rounded-3xl bg-white/10 p-8 backdrop-blur">
      <h3 className="text-4xl font-bold text-yellow-400">
        50K+
      </h3>
      <p className="mt-3 text-gray-300">
        Happy Customers
      </p>
    </div>

    <div className="rounded-3xl bg-white/10 p-8 backdrop-blur">
      <h3 className="text-4xl font-bold text-yellow-400">
        4.9★
      </h3>
      <p className="mt-3 text-gray-300">
        Customer Rating
      </p>
    </div>

    <div className="rounded-3xl bg-white/10 p-8 backdrop-blur">
      <h3 className="text-4xl font-bold text-yellow-400">
        98%
      </h3>
      <p className="mt-3 text-gray-300">
        Satisfaction Rate
      </p>
    </div>

  </div>
</div>
<div className="rounded-[2rem] bg-white p-10 shadow-xl">
  <h2 className="text-4xl font-bold text-center text-gray-900">
    Why Choose Quantum Tiles?
  </h2>

  <div className="mt-10 grid gap-6 md:grid-cols-4">

    <div className="text-center">
      <div className="text-5xl">🏆</div>
      <h3 className="mt-4 font-semibold">
        Premium Quality
      </h3>
    </div>

    <div className="text-center">
      <div className="text-5xl">🎨</div>
      <h3 className="mt-4 font-semibold">
        Modern Designs
      </h3>
    </div>

    <div className="text-center">
      <div className="text-5xl">🚚</div>
      <h3 className="mt-4 font-semibold">
        Fast Delivery
      </h3>
    </div>

    <div className="text-center">
      <div className="text-5xl">🤖</div>
      <h3 className="mt-4 font-semibold">
        AI Visualizer
      </h3>
    </div>

  </div>
</div>
{/* Our Works Section */}
<div className="rounded-[2rem] bg-white p-10 shadow-xl border border-gray-200">
  <p className="text-sm uppercase tracking-[0.35em] text-yellow-600">
    Our Works
  </p>

  <h2 className="mt-3 text-4xl font-bold text-gray-900">
    Featured Project Showcase
  </h2>

  <p className="mt-4 text-gray-600 max-w-3xl">
    Explore some of our premium tile installations and luxury interior projects.
  </p>

  <div className="mt-8 overflow-hidden rounded-3xl shadow-2xl">
    <video
      controls
      autoPlay
      muted
      loop
      className="w-full h-[500px] object-cover"
    >
      <source src="/videos/qt.mp4" type="video/mp4" />
    </video>
  </div>
  <div className="mt-10 text-center">
 <button
  onClick={() => navigate(AppRoutes.CONTACT_PAGE)}
  className="inline-flex items-center justify-center rounded-full bg-yellow-500 px-6 py-3"
>
  Contact Us
</button>
</div>
</div>

    </section>
    
    
  );
}