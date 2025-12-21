import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setOpen(false);
  };

  // Helper to style active links
  const linkClass = (path) =>
    location.pathname === path
      ? "text-emerald-400 underline underline-offset-4"
      : "text-slate-300 hover:text-emerald-400";

  return (
    <nav className="sticky top-0 z-50 bg-slate-950 text-white border-b border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center h-16">

          {/* Logo + Traffic Lights */}
          <div className="flex items-center gap-3 -ml-1 sm:-ml-2">

            {/* Traffic Lights */}
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-red-500 shadow-sm"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-400 shadow-sm"></span>
              <span className="w-3 h-3 rounded-full bg-green-500 shadow-sm"></span>
            </div>

            {/* Logo */}
            <Link
              to="/"
              className="text-2xl font-bold tracking-tight hover:text-emerald-400 transition"
            >
              SnippetSave
            </Link>

            {/* Filename Tag (Desktop Only) */}
            <span className="hidden md:block text-xs text-slate-500 font-mono ml-3">
              navbar.js
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-lg">

            <Link to="/" className={linkClass("/")}>Home</Link>
            <Link to="/about" className={linkClass("/about")}>About</Link>
            <Link to="/contact" className={linkClass("/contact")}>Contact</Link>

            {!isAuthenticated ? (
              <>
                <Link to="/login" className={linkClass("/login")}>Login</Link>
                <Link to="/register" className={linkClass("/register")}>Register</Link>
              </>
            ) : (
              <div className="flex items-center space-x-8">
                <Link to="/dashboard" className={linkClass("/dashboard")}>
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-slate-300 hover:text-emerald-400 transition-colors duration-200 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Hamburger Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setOpen(!open)}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-4 pb-4 space-y-3 text-lg shadow-inner">

          <Link onClick={() => setOpen(false)} to="/" className={`block ${linkClass("/")}`}>Home</Link>
          <Link onClick={() => setOpen(false)} to="/about" className={`block ${linkClass("/about")}`}>About</Link>
          <Link onClick={() => setOpen(false)} to="/contact" className={`block ${linkClass("/contact")}`}>Contact</Link>

          {!isAuthenticated ? (
            <>
              <Link onClick={() => setOpen(false)} to="/login" className={`block ${linkClass("/login")}`}>Login</Link>
              <Link onClick={() => setOpen(false)} to="/register" className={`block ${linkClass("/register")}`}>Register</Link>
            </>
          ) : (
            <>
              <Link
                onClick={() => setOpen(false)}
                to="/dashboard"
                className={`block ${linkClass("/dashboard")}`}
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="block text-left w-full text-slate-300 hover:text-emerald-400 transition-colors duration-200 cursor-pointer"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}