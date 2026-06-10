export default function ContactPage() {
    const handleSendMail = () => {
  const subject = encodeURIComponent("Contact from Quantum Tiles");
  const body = encodeURIComponent(
    "Hello,\n\nI would like to know more about your products."
  );

  window.location.href =
    `mailto:support@quantumtiles.com?subject=${subject}&body=${body}`;
};
  return (
    <main className="min-h-screen bg-background px-6 py-16 text-textPrimary">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="text-center">
          <h1 className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-5xl font-bold text-transparent">
            Contact Us
          </h1>

          <p className="mt-4 text-slate-400">
            Have questions about your orders or products? We'd love to hear from
            you.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-8 shadow-xl">
            <h2 className="text-2xl font-semibold text-white">
              Get in Touch
            </h2>

            <div className="mt-8 space-y-6">
              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
                <p className="text-sm text-slate-400">Email</p>
                <p className="text-lg font-medium text-cyan-400">
                  quantumtiles@gmail.com
                </p>
              </div>

              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
                <p className="text-sm text-slate-400">Phone</p>
                <p className="text-lg font-medium text-cyan-400">
                  +91 7904295652
                </p>
              </div>

              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
                <p className="text-sm text-slate-400">Address</p>
                <p className="text-lg font-medium text-cyan-400">
                  Tenkasi, Tamil Nadu, India
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-8 shadow-xl">
            <h2 className="text-2xl font-semibold text-white">
              Send Message
            </h2>

            <form className="mt-8 space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />

              <textarea
                rows={5}
                placeholder="Your Message"
                className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-400"
              />

              <button
  onClick={handleSendMail}
  className="w-full rounded-xl bg-cyan-500 py-3 text-white font-semibold hover:bg-cyan-600"
>
  Send Message
</button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
