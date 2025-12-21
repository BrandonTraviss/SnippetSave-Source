export default function TermsOfService() {
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
            terms-of-service.js
          </span>
        </div>

        {/* Content */}
        <div className="lg:p-10 p-4 space-y-10">

          {/* Header */}
          <section>
            <h1 className="text-4xl font-bold mb-4 text-emerald-400">
              Terms of Service
            </h1>
            <p className="text-slate-300 max-w-3xl">
              Welcome to SnippetSave. By using our service, you agree to the terms outlined below. 
              These terms are designed to keep SnippetSave safe, reliable, and enjoyable for everyone.
            </p>
          </section>

          <hr className="border-emerald-500/20" />

          {/* Section: Using SnippetSave */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-emerald-400">
              1. Using SnippetSave
            </h2>
            <p className="text-slate-300 leading-relaxed">
              SnippetSave provides a platform for storing, organizing, and managing your code snippets. 
              You agree to use the service responsibly and in compliance with applicable laws.
            </p>
          </section>

          <hr className="border-emerald-500/20" />

          {/* Section: Your Account */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-emerald-400">
              2. Your Account
            </h2>
            <p className="text-slate-300 leading-relaxed">
              You are responsible for maintaining the security of your account and password. 
              SnippetSave is not liable for any loss or damage resulting from unauthorized access to your account.
            </p>
          </section>

          <hr className="border-emerald-500/20" />

          {/* Section: Your Content */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-emerald-400">
              3. Your Content
            </h2>
            <p className="text-slate-300 leading-relaxed">
              You retain full ownership of the code snippets and content you upload to SnippetSave. 
              We do not claim any rights to your code.  
              You are responsible for ensuring that your content does not violate any laws or third‑party rights.
            </p>
          </section>

          <hr className="border-emerald-500/20" />

          {/* Section: Privacy */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-emerald-400">
              4. Privacy
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Your privacy is important to us.  
              SnippetSave does <strong>not</strong> sell, rent, or distribute your personal information.  
              For more details, please review our Privacy Policy.
            </p>
          </section>

          <hr className="border-emerald-500/20" />

          {/* Section: Acceptable Use */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-emerald-400">
              5. Acceptable Use
            </h2>
            <p className="text-slate-300 leading-relaxed">
              You agree not to misuse SnippetSave, including but not limited to:
            </p>

            <ul className="list-disc list-inside text-slate-400 mt-3 space-y-1">
              <li>Uploading harmful, illegal, or malicious content</li>
              <li>Attempting to disrupt or compromise the platform</li>
              <li>Using SnippetSave for unauthorized commercial purposes</li>
            </ul>
          </section>

          <hr className="border-emerald-500/20" />

          {/* Section: Service Availability */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-emerald-400">
              6. Service Availability
            </h2>
            <p className="text-slate-300 leading-relaxed">
              We strive to keep SnippetSave running smoothly, but we cannot guarantee uninterrupted service.  
              We may update, modify, or temporarily suspend parts of the platform as needed.
            </p>
          </section>

          <hr className="border-emerald-500/20" />

          {/* Section: Termination */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-emerald-400">
              7. Termination
            </h2>
            <p className="text-slate-300 leading-relaxed">
              You may stop using SnippetSave at any time.  
              We reserve the right to suspend or terminate accounts that violate these terms or pose security risks.
            </p>
          </section>

          <hr className="border-emerald-500/20" />

          {/* Section: Changes */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-emerald-400">
              8. Changes to These Terms
            </h2>
            <p className="text-slate-300 leading-relaxed">
              We may update these Terms of Service occasionally.  
              Continued use of SnippetSave means you accept any updated terms.
            </p>
          </section>

          <hr className="border-emerald-500/20" />

          {/* Section: Contact */}
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-emerald-400">
              9. Contact Us
            </h2>
            <p className="text-slate-300 leading-relaxed">
              If you have questions about these terms, feel free to reach out through our Contact page.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}