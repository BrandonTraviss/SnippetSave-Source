import React from "react";
import { useNavigate } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const Home = () => {
  const navigate = useNavigate();

  const codeSnippet = `// Reusable debounce hook for React
function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}`;

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 to-slate-950 text-slate-200 font-sans">

      {/* HERO */}
      <section className="grid lg:grid-cols-2 gap-12 px-3 md:px-12 lg:px-20 lg:py-20 py-7 items-center">

        {/* LEFT SIDE */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight hover:text-emerald-400 transition-colors">
            Welcome to SnippetSave
          </h1>

          <p className="mt-4 text-slate-400 max-w-xl text-lg">
            Your personal snippet vault. Save reusable code, organize it with tags,
            and reuse it instantly across all your projects.
          </p>

          <div className="flex flex-wrap gap-4 lg:mt-8">

            {/* Register Button */}
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 
                         text-slate-900 font-semibold transition-colors cursor-pointer"
            >
              Get Started – It’s Free
            </button>

            {/* Login Button */}
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 rounded-full border border-slate-600 hover:bg-slate-800 
                         hover:border-emerald-500 text-slate-200 transition-colors cursor-pointer"
            >
              Log In
            </button>
          </div>

          <p className="mt-3 text-sm text-slate-500">
            No clutter. No searching old repos. Just your best code.
          </p>
        </div>

        {/* RIGHT SIDE — CODE PREVIEW */}
        <div className="flex justify-center">
          <div className="w-full max-w-lg">
            <div
              className="bg-slate-950 border border-slate-800 rounded-xl shadow-2xl overflow-hidden
                         hover:border-emerald-500 hover:shadow-emerald-500/20 transition-all"
            >
              {/* Window Header */}
              <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-800 bg-slate-900">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span className="ml-auto text-xs text-slate-500">useDebounce.js</span>
              </div>

              {/* Code Block */}
              <pre
                className="p-4 text-xs md:text-sm text-slate-300 font-mono overflow-x-auto max-w-full min-h-64 whitespace-pre-wrap sm:whitespace-pre"
              >
                <Typewriter
                  words={[codeSnippet]}
                  typeSpeed={20}
                  deleteSpeed={0}
                  delaySpeed={1000}
                  cursor={false}
                />
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 md:px-12 lg:px-20 lg:py-16">
        <h2 className="text-3xl font-semibold text-white mb-10 relative group inline-block">
          Get started in 3 steps
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-emerald-500 group-hover:w-full transition-all"></span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "Create a snippet",
              desc: "Paste your code, choose a language, add tags, and save it.",
            },
            {
              step: "2",
              title: "Organize & search",
              desc: "Filter by language, tags, or title to find snippets instantly.",
            },
            {
              step: "3",
              title: "Reuse in your projects",
              desc: "Copy with one click and drop it straight into your codebase.",
            },
          ].map(({ step, title, desc }) => (
            <div
              key={step}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 
                         hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20 
                         hover:-translate-y-1 transition-all"
            >
              <div
                className="w-10 h-10 flex items-center justify-center rounded-full bg-emerald-500 
                           text-slate-900 font-bold mb-4 hover:bg-emerald-400 hover:scale-110 transition-all"
              >
                {step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-slate-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 md:px-12 lg:px-20 lg:py-16 py-8 bg-linear-to-b from-slate-850 to-slate-950">
        <h2 className="text-3xl font-semibold text-white mb-10 relative group inline-block">
          Why developers love SnippetSave
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-emerald-500 group-hover:w-full transition-all"></span>
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              title: "Language-aware snippets",
              desc: "Store code for JavaScript, Python, SQL, and more with language labels.",
            },
            {
              title: "Fast search & tags",
              desc: "Find the right snippet in seconds using filters and tags.",
            },
            {
              title: "Clean, distraction-free UI",
              desc: "A minimal interface designed for developers who value focus.",
            },
            {
              title: "Private by default",
              desc: "Your snippets belong to you. Only you can access them.",
            },
          ].map(({ title, desc }) => (
            <div
              key={title}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 
                         hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20 
                         hover:-translate-y-1 transition-all"
            >
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-slate-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 md:px-12 lg:px-20 py-20 text-center bg-linear-to-b from-slate-950 to-slate-900">
        <h2 className="text-3xl font-semibold text-white hover:text-emerald-400 transition-colors">
          Start saving your snippets today
        </h2>
        <p className="text-slate-400 max-w-xl mx-auto mt-3">
          Create an account in under a minute and build your personal snippet library.
        </p>

        <div className="flex justify-center gap-4 mt-8">

          {/* Create Account */}
          <button
            onClick={() => navigate("/register")}
            className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-600 
                       text-slate-900 font-semibold transition-colors cursor-pointer"
          >
            Create Free Account
          </button>

          {/* Login */}
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 rounded-full border border-slate-600 hover:bg-slate-800 
                       hover:border-emerald-500 text-slate-200 transition-colors cursor-pointer"
          >
            Log In
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;