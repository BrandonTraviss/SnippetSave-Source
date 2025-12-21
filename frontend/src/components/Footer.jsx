import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-400 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">

          {/* Branding */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">SnippetSave</h2>
            <p className="text-slate-400 text-sm max-w-xs">
              A clean, fast, developer‑focused way to store and organize your code snippets.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm">

            <div>
              <h3 className="text-white font-medium mb-2">Product</h3>
              <ul className="space-y-1">
                <li><Link to="/my-snippets" className="hover:text-emerald-400">My Snippets</Link></li>
                <li><Link to="/create-snippet" className="hover:text-emerald-400">Create Snippet</Link></li>
                <li><Link to="/dashboard" className="hover:text-emerald-400">Dashboard</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-medium mb-2">Company</h3>
              <ul className="space-y-1">
                <li><Link to="/about" className="hover:text-emerald-400">About</Link></li>
                <li><Link to="/contact" className="hover:text-emerald-400">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-medium mb-2">Legal</h3>
              <ul className="space-y-1">
                <li><Link to="/privacy-policy" className="hover:text-emerald-400">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-emerald-400">Terms of Service</Link></li>
              </ul>
            </div>

          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 my-8"></div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">

          {/* Traffic Light Bar */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
          </div>

          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} SnippetSave. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}