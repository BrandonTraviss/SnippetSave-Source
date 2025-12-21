export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-850 to-slate-900 lg:px-6 lg:py-16 py-8 px-2 text-white">

      {/* Page Container */}
      <div className="max-w-4xl mx-auto bg-slate-950 rounded-2xl shadow-2xl overflow-hidden border border-slate-800">

        {/* Traffic Light Header */}
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 border-b border-slate-800">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
          <span className="w-3 h-3 rounded-full bg-green-500"></span>

          <span className="ml-auto text-xs text-emerald-400 font-mono">
            privacy-policy.js
          </span>
        </div>

        {/* Content */}
        <div className="lg:p-10 p-4 space-y-10">

          {/* Header */}
          <section>
            <h1 className="text-4xl font-bold mb-4 text-emerald-400">
              Privacy Policy
            </h1>
            <p className="text-slate-300 max-w-3xl">
              At SnippetSave, your privacy matters. This Privacy Policy explains what information we collect, how we use it, and — most importantly — what we do <strong>not</strong> do with it.
            </p>
          </section>

          <hr className="border-emerald-500/20" />

          {/* Section: Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-emerald-400">
              Information We Collect
            </h2>
            <p className="text-slate-300 leading-relaxed">
              SnippetSave collects only the information necessary to provide you with a secure and personalized experience. This may include:
            </p>

            <ul className="list-disc list-inside text-slate-400 mt-3 space-y-1">
              <li>Your username and email address</li>
              <li>Your saved code snippets and related metadata</li>
              <li>Basic usage data to improve performance and reliability</li>
            </ul>
          </section>

          <hr className="border-emerald-500/20" />

          {/* Section: How We Use Your Information */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-emerald-400">
              How We Use Your Information
            </h2>
            <p className="text-slate-300 leading-relaxed">
              We use your information solely to operate SnippetSave and deliver core features such as:
            </p>

            <ul className="list-disc list-inside text-slate-400 mt-3 space-y-1">
              <li>Authenticating your account</li>
              <li>Saving and retrieving your code snippets</li>
              <li>Improving site performance and user experience</li>
            </ul>
          </section>

          <hr className="border-emerald-500/20" />

          {/* Section: What We Do NOT Do */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-emerald-400">
              What We Do <span className="text-red-400">NOT</span> Do
            </h2>
            <p className="text-slate-300 leading-relaxed">
              SnippetSave does <strong>not</strong> sell, trade, rent, or distribute your personal information to any third parties.  
              Your data stays with you — and only you — unless required by law.
            </p>
          </section>

          <hr className="border-emerald-500/20" />

          {/* Section: Data Security */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-emerald-400">
              Data Security
            </h2>
            <p className="text-slate-300 leading-relaxed">
              We take security seriously. SnippetSave uses modern security practices to protect your account and your code. While no system is perfect, we work continuously to keep your data safe.
            </p>
          </section>

          <hr className="border-emerald-500/20" />

          {/* Section: Contact */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-emerald-400">
              Questions?
            </h2>
            <p className="text-slate-300 leading-relaxed">
              If you have any questions about this Privacy Policy or how your data is handled, feel free to reach out through our Contact page.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}