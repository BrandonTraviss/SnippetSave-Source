import john from "../assets/images/john.jpg";
import jane from "../assets/images/jane.jpg";
import jim from "../assets/images/jim.jpg";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 lg:px-3 lg:py-16 py-8 px-2 text-white">
      {/* Page Container */}
      <div className="max-w-5xl mx-auto bg-slate-950 rounded-2xl shadow-2xl overflow-hidden border border-slate-800 hover:border-emerald-500/40 transition">

        {/* Traffic Light Header */}
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 border-b border-slate-800">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
          <span className="w-3 h-3 rounded-full bg-green-500"></span>

          <span className="ml-auto text-xs text-emerald-400 font-mono">
            about.js
          </span>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-10 space-y-16">
          {/* Section: Intro */}
          <section>
            <h1 className="text-4xl font-bold mb-6">
              About SnippetSave
            </h1>

            <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">
              SnippetSave is built for developers who value speed, clarity, and
              organization. Whether you're working on a side project or
              architecting enterprise systems, SnippetSave helps you store,
              search, and reuse your best code effortlessly.
            </p>
          </section>

          <hr className="border-emerald-500/20" />

          {/* Section: Mission */}
          <section>
            <h2 className="text-3xl font-semibold mb-4 pl-3 border-l-4 border-emerald-500">
              Our Mission
            </h2>
            <p className="text-slate-300 leading-relaxed max-w-3xl">
              We believe developers should spend less time digging through old
              repos, scrolling through screenshots, or rewriting the same logic
              again and again. SnippetSave exists to give you a clean, fast, and
              secure home for your code snippets — a place where your best ideas
              stay organized and ready to use.
            </p>
          </section>

          <hr className="border-emerald-500/20" />

          {/* Section: Features */}
          <section>
            <h2 className="text-3xl font-semibold mb-6 pl-3 border-l-4 border-emerald-500">
              What We Offer
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20 transition">
                <h3 className="text-xl font-semibold mb-2 text-emerald-400">
                  Fast Search
                </h3>
                <p className="text-slate-400">
                  Find the snippet you need instantly with language and tag
                  filters.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20 transition">
                <h3 className="text-xl font-semibold mb-2 text-emerald-400">
                  Clean UI
                </h3>
                <p className="text-slate-400">
                  A distraction‑free interface designed for developers who value
                  focus.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20 transition">
                <h3 className="text-xl font-semibold mb-2 text-emerald-400">
                  Private by Default
                </h3>
                <p className="text-slate-400">
                  Your snippets belong to you — securely stored and accessible
                  only by you.
                </p>
              </div>
            </div>
          </section>

          <hr className="border-emerald-500/20" />

          {/* Section: Team */}
          <section>
            <h2 className="text-3xl font-semibold mb-6 pl-3 border-l-4 border-emerald-500">
              Meet the Team
            </h2>

            <div className="grid md:grid-cols-3 gap-10">
              <div className="text-center">
                <img
                  src={john}
                  alt="John Doe"
                  className="w-32 h-32 mx-auto rounded-full bg-slate-800 object-cover hover:ring-2 hover:ring-emerald-500 transition"
                />
                <h3 className="text-xl font-semibold mt-4 text-emerald-400">
                  John Doe
                </h3>
                <p className="text-slate-400 text-sm">Lead Developer</p>
              </div>

              <div className="text-center">
                <img
                  src={jane}
                  alt="Jane Doe"
                  className="w-32 h-32 mx-auto rounded-full bg-slate-800 object-cover hover:ring-2 hover:ring-emerald-500 transition"
                />
                <h3 className="text-xl font-semibold mt-4 text-emerald-400">
                  Jane Doe
                </h3>
                <p className="text-slate-400 text-sm">Head of Advertising</p>
              </div>

              <div className="text-center">
                <img
                  src={jim}
                  alt="Jim Bob"
                  className="w-32 h-32 mx-auto rounded-full bg-slate-800 object-cover hover:ring-2 hover:ring-emerald-500 transition"
                />
                <h3 className="text-xl font-semibold mt-4 text-emerald-400">
                  Jim Bob
                </h3>
                <p className="text-slate-400 text-sm">Lead Tester</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}