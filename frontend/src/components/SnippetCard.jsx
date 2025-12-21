import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function SnippetCard({ snippet, currentUserId, onUnfavorite }) {
  const [copied, setCopied] = useState(false);

  const [isFavorited, setIsFavorited] = useState(
    snippet.favoritedBy?.includes(currentUserId) || false
  );

  const [favoritesCount, setFavoritesCount] = useState(
    snippet.favoritedBy?.length || 0
  );

  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleToggleFavorite = async (e) => {
    e.preventDefault();

    const wasFavorited = isFavorited;

    // Optimistic UI
    setIsFavorited(!wasFavorited);
    setFavoritesCount((prev) => (wasFavorited ? prev - 1 : prev + 1));

    try {
      const res = await axios.post(
        `/api/snippets/${snippet._id}/favorite`,
        {},
        { withCredentials: true }
      );

      const newFavorited = res.data.favorited;

      // Sync with backend
      setIsFavorited(newFavorited);
      setFavoritesCount(res.data.favoritesCount);

      // If unfavorited AND this card is inside Favorites page → remove it
      if (!newFavorited && onUnfavorite) {
        onUnfavorite(snippet._id);
      }

    } catch (err) {
      // Revert on failure
      setIsFavorited(wasFavorited);
      setFavoritesCount((prev) =>
        wasFavorited ? prev + 1 : prev - 1
      );
    }
  };

  return (
    <Link
      to={`/snippets/${snippet._id}`}
      className="block bg-slate-950 border border-slate-800 rounded-xl shadow-lg hover:border-emerald-500 transition p-0 overflow-hidden"
    >
      {/* Header Bar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-800 bg-slate-900">
        <span className="w-3 h-3 rounded-full bg-red-500"></span>
        <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
        <span className="w-3 h-3 rounded-full bg-green-500"></span>

        <span className="ml-auto text-xs text-slate-500 font-mono">
          {snippet.title || "snippet"}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-white truncate">
            {snippet.title}
          </h3>

          <div className="flex flex-col items-end gap-1">
            <span
              className={`text-xs px-2 py-1 rounded ${
                snippet.isPublic
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-700 text-gray-300"
              }`}
            >
              {snippet.isPublic ? "Public" : "Private"}
            </span>

            {/* Favorite Button */}
            <button
              onClick={handleToggleFavorite}
              className={`text-xs font-mono px-3 py-1 rounded-xl border transition cursor-pointer
                ${
                  isFavorited
                    ? "bg-red-600 border-red-600 text-white hover:bg-red-700"
                    : "border-red-700 text-white hover:border-red-500 hover:text-red-300"
                }`}
            >
              {isFavorited ? "♥" : "♡"} {favoritesCount || 0}
            </button>
          </div>
        </div>

        <p className="text-xs text-emerald-400 font-mono mb-2">
          {snippet.language}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {snippet.tags?.map((tag, i) => (
            <span
              key={i}
              className="text-xs bg-slate-800 border border-slate-700 text-gray-300 px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>

        <pre className="bg-slate-900 border border-slate-800 text-gray-300 text-xs p-3 rounded-lg h-28 overflow-hidden font-mono leading-tight">
          <code>{snippet.code.slice(0, 200)}</code>
        </pre>

        <button
          onClick={handleCopy}
          className="w-full mt-4 px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-white transition cursor-pointer"
        >
          {copied ? "Copied!" : "Copy Code"}
        </button>

        <div className="flex justify-between items-center mt-4 text-xs text-slate-500 font-mono">
          <span>@{snippet.user?.username || "anonymous"}</span>
          <span>{new Date(snippet.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </Link>
  );
}