import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-850 to-slate-900 lg:px-6 lg:py-16 py-8 px-2 text-white">

      {/* Dashboard Container */}
      <div className="max-w-5xl mx-auto bg-slate-950 rounded-2xl shadow-2xl overflow-hidden border border-slate-800">

        {/* Header with traffic lights + username left, filename right */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
            <span className="w-3 h-3 rounded-full bg-green-500"></span>

            <span className="text-xs text-slate-400 font-mono ml-4">
              @{user?.username || "user"}
            </span>
          </div>

          <span className="text-xs text-slate-500 font-mono">
            dashboard.js
          </span>
        </div>

        {/* Content */}
        <div className="p-10 space-y-12">

          {/* Welcome Section */}
          <section>
            <h1 className="text-4xl font-bold mb-3">Dashboard</h1>
            <p className="text-slate-300 text-lg max-w-2xl">
              Manage your snippets, create new ones, and explore your saved code.
            </p>
          </section>

          {/* Action Cards */}
          <section>
            <div className="grid md:grid-cols-2 gap-8">

              {/* Create Snippet */}
              <Link
                to="/create-snippet"
                className="bg-slate-900 border border-slate-800 rounded-xl p-8 hover:border-emerald-500 transition group"
              >
                <h2 className="text-2xl font-semibold mb-3 group-hover:text-emerald-400">
                  Create Snippet
                </h2>
                <p className="text-slate-400">
                  Start a new snippet with full editor support and tagging.
                </p>
              </Link>

              {/* My Snippets */}
              <Link
                to="/my-snippets"
                className="bg-slate-900 border border-slate-800 rounded-xl p-8 hover:border-emerald-500 transition group"
              >
                <h2 className="text-2xl font-semibold mb-3 group-hover:text-emerald-400">
                  My Snippets
                </h2>
                <p className="text-slate-400">
                  Browse, edit, and manage all your saved snippets.
                </p>
              </Link>

              {/* Explore Snippets */}
              <Link
                to="/explore"
                className="bg-slate-900 border border-slate-800 rounded-xl p-8 hover:border-emerald-500 transition group"
              >
                <h2 className="text-2xl font-semibold mb-3 group-hover:text-emerald-400">
                  Explore Snippets
                </h2>
                <p className="text-slate-400">
                  Discover public snippets shared by the community.
                </p>
              </Link>

              {/* Favorite Snippets */}
              <Link
                to="/favorites"
                className="bg-slate-900 border border-slate-800 rounded-xl p-8 hover:border-emerald-500 transition group"
              >
                <h2 className="text-2xl font-semibold mb-3 group-hover:text-emerald-400">
                  Favorite Snippets
                </h2>
                <p className="text-slate-400">
                  View all the snippets you've marked as favorites.
                </p>
              </Link>

            </div>
          </section>

        </div>
      </div>
    </div>
  );
}