import support from '../assets/images/support.jpg'

export default function Contact() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-850 to-slate-900 lg:px-6 lg:py-16 py-8 px-2 text-white">

      {/* Page Container */}
      <div className="max-w-4xl mx-auto bg-slate-950 rounded-2xl shadow-2xl overflow-hidden border border-slate-800 hover:border-emerald-500/40 transition">

        {/* Traffic Light Header */}
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 border-b border-slate-800">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
          <span className="w-3 h-3 rounded-full bg-green-500"></span>

          <span className="ml-auto text-xs text-emerald-400 font-mono">
            contact.js
          </span>
        </div>

        {/* Content */}
        <div className="p-10 space-y-12">

          {/* Header */}
          <section className="text-center">
            <h1 className="text-4xl font-bold mb-3 text-emerald-400">
              Contact Us
            </h1>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Have a question, suggestion, or need help with SnippetSave?
              We’d love to hear from you. Fill out the form below and our team will get back to you.
            </p>
          </section>

          <hr className="border-emerald-500/20" />

          {/* Support Avatar */}
          <section className="flex justify-center">
            <div className="relative">
              <span className="absolute inset-0 blur-xl bg-emerald-500/20 rounded-full"></span>
              <img
                src={support}
                alt="Support Team"
                className="relative w-32 h-32 rounded-full bg-slate-800 object-cover ring-2 ring-slate-800"
              />
            </div>
          </section>

          {/* Contact Form */}
          <section>
            <form className="space-y-6">

              {/* Name */}
              <div>
                <label className="block mb-2 text-sm text-slate-300">Your Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full p-3 rounded bg-slate-800 border border-slate-700 text-white placeholder-slate-400 
                             focus:ring-2 focus:ring-emerald-500 outline-none transition hover:border-emerald-500/40"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 text-sm text-slate-300">Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full p-3 rounded bg-slate-800 border border-slate-700 text-white placeholder-slate-400 
                             focus:ring-2 focus:ring-emerald-500 outline-none transition hover:border-emerald-500/40"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block mb-2 text-sm text-slate-300">Subject</label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  className="w-full p-3 rounded bg-slate-800 border border-slate-700 text-white placeholder-slate-400 
                             focus:ring-2 focus:ring-emerald-500 outline-none transition hover:border-emerald-500/40"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block mb-2 text-sm text-slate-300">Message</label>
                <textarea
                  rows="6"
                  placeholder="Write your message here..."
                  className="w-full p-3 rounded bg-slate-900 border border-slate-800 text-white placeholder-slate-400 font-mono 
                             focus:ring-2 focus:ring-emerald-500 outline-none resize-none transition hover:border-emerald-500/40"
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-semibold py-3 rounded transition cursor-pointer"
              >
                Send Message
              </button>
            </form>
          </section>

        </div>
      </div>
    </div>
  );
}