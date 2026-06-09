import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { AppRoutes } from '../shared/routes';


const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    location: "Chennai",
    rating: 5,
    review:
      "Excellent quality tiles and premium finish. Delivery was fast and customer support was very helpful.",
       video: "/videos/user1.mp4",
  },
  {
    id: 2,
    name: "Priya ",
    location: "Coimbatore",
    rating: 5,
    review:
      "The AI Visualizer helped me choose the perfect tiles for my living room. Amazing experience.",
       video: "/videos/user2.mp4",
  },
  {
    id: 3,
    name: "Arjun",
    location: "Kanchipuram",
    rating: 5,
    review:
      "Luxury quality products. The marble collection exceeded my expectations.",
       video: "/videos/user3.mp4",
  },
  {
    id: 4,
    name: "Vikram",
    location: "Madurai",
    rating: 5,
    review:
      "The showroom experience was outstanding. Highly recommended for premium interiors.",
       video: "/videos/user4.mp4",
  },
  {
    id: 5,
    name: "Anjali S",
    location: "Tirupur",
    rating: 5,
    review:
      "Beautiful tile designs and excellent customer support. Worth every rupee.",
       video: "https://video-previews.elements.envatousercontent.com/5d3173b4-f5a7-4c53-a67b-02752db0018f/watermarked_preview/watermarked_preview.mp4",
  },
  {
    id: 6,
    name: "Karthik M",
    location: "Erode",
    rating: 5,
    review:
      "Fantastic collection with modern designs. Delivery was smooth and on time.",
       video: "/videos/user6.mp4",
  },
];

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-black text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[0.4em] text-cyan-400 mb-4">
            Customer Reviews
          </p>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            What Our Customers Say
          </h1>

          <p className="max-w-3xl mx-auto text-gray-300 text-lg">
            Discover why thousands of homeowners, architects, and designers
            trust Quantum Tiles for their premium tile solutions.
          </p>
        </motion.div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 text-center">
            <h2 className="text-5xl font-bold text-cyan-400">50K+</h2>
            <p className="mt-3 text-gray-300">Happy Customers</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 text-center">
            <h2 className="text-5xl font-bold text-cyan-400">4.9★</h2>
            <p className="mt-3 text-gray-300">Average Rating</p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 text-center">
            <h2 className="text-5xl font-bold text-cyan-400">98%</h2>
            <p className="mt-3 text-gray-300">Customer Satisfaction</p>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-xl"
            >
              <div className="bg-red-500 rounded-3xl overflow-hidden shadow-xl">
  <video
    controls
    muted
    className="w-full h-64 object-cover"
  >
    <source src={testimonial.video} type="video/mp4" />
  </video>
              <div className="text-yellow-400 text-xl mb-4">
                {"⭐".repeat(testimonial.rating)}
              </div>

              <p className="text-gray-300 leading-7 mb-6">
                "{testimonial.review}"
              </p>

              <div className="border-t border-white/20 pt-4">
                <h3 className="font-bold text-lg text-white ml-2">
                  {testimonial.name}
                </h3>

                <p className="text-gray-400 ml-2">
                  {testimonial.location}
                </p>
              </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-20 text-center"
        >
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-10">
            <h2 className="text-4xl font-bold mb-4">
              Join Thousands of Happy Customers
            </h2>

            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Experience premium tile collections, AI-powered visualization,
              and exceptional customer service with Quantum Tiles.
            </p>

             <Link
                  to={AppRoutes.PRODUCTS}
                  className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-sm font-semibold text-white transition hover:bg-blue-600 hover:shadow-card-hover"
                >
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    explore products
                  </motion.span>
                </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}