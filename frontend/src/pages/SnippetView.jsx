import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function SnippetView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [snippet, setSnippet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  // ✅ NEW: Favorite state
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        const res = await axios.get(`/api/snippets/${id}`, {
          withCredentials: true,
        });

        setSnippet(res.data);

        // ✅ Initialize favorite state
        setIsFavorited(res.data.favoritedBy?.includes(user?.id));
        setFavoritesCount(res.data.favoritedBy?.length || 0);

      } catch (err) {
        setError("Failed to load snippet");
      } finally {
        setLoading(false);
      }
    };

    fetchSnippet();
  }, [id, user?.id]);

  const handleToggleFavorite = async () => {
    if (!user) return alert("You must be logged in to favorite snippets.");

    // ✅ Optimistic UI update
    setIsFavorited(prev => !prev);
    setFavoritesCount(prev => (isFavorited ? prev - 1 : prev + 1));

    try {
      const res = await axios.post(
        `/api/snippets/${snippet._id}/favorite`,
        {},
        { withCredentials: true }
      );

      // ✅ Sync with backend response
      setIsFavorited(res.data.favorited);
      setFavoritesCount(res.data.favoritesCount);

    } catch (err) {
      // ✅ Revert optimistic update on failure
      setIsFavorited(prev => !prev);
      setFavoritesCount(prev => (isFavorited ? prev + 1 : prev - 1));
      alert("Failed to toggle favorite");
    }
  };

  if (loading) {
    return (
      <p className="text-center text-gray-400 mt-10">Loading snippet...</p>
    );
  }

  if (error || !snippet) {
    return <p className="text-center text-red-400 mt-10">{error}</p>;
  }

  const isOwner =
    user &&
    (user.id === snippet.user || user.id === snippet.user?._id);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this snippet? This action cannot be undone."
    );

    if (!confirmed) return;

    try {
      await axios.delete(`/api/snippets/${snippet._id}`, {
        withCredentials: true,
      });

      navigate(-1);
    } catch (err) {
      alert("Failed to delete snippet");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 text-white">

      {/* Top-right Back Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-sm font-mono cursor-pointer"
        >
          ← Back
        </button>
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">

        {/* Window Header */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-800 bg-slate-900">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
          <span className="w-3 h-3 rounded-full bg-green-500"></span>

          <span className="ml-auto text-xs text-slate-500 font-mono">
            {snippet.title || "snippet.js"}
          </span>
        </div>

        {/* Content */}
        <div className="p-6">

          {/* Title + Favorite + Public/Private */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{snippet.title}</h1>

              {/* ✅ Favorite Button */}
              <button
                onClick={handleToggleFavorite}
                className={`px-4 py-1.5 rounded-xl border text-xs font-mono cursor-pointer mb-3 transition
                  ${isFavorited
                    ? "bg-red-600 border-red-600 text-white hover:bg-red-700"
                    : "border-red-700 text-white hover:border-red-500 hover:text-red-300"
                  }`}
              >
                {isFavorited ? "♥ Favorited" : "♡ Favorite"} • {favoritesCount || 0}
              </button>
            </div>

            <span
              className={`text-xs px-2 py-1 rounded h-fit ${
                snippet.isPublic
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-700 text-gray-300"
              }`}
            >
              {snippet.isPublic ? "Public" : "Private"}
            </span>
          </div>

          {/* Language */}
          <p className="text-emerald-400 font-mono mb-3">
            {snippet.language}
          </p>

          {/* Tags */}
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

          {/* Description */}
          {snippet.description && (
            <p className="text-gray-300 mb-6">{snippet.description}</p>
          )}

          {/* Code Block */}
          <pre className="bg-slate-900 border border-slate-800 p-5 rounded-xl text-sm overflow-x-auto font-mono leading-tight max-w-full">
            <code>{snippet.code}</code>
          </pre>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="w-full mt-4 px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-white cursor-pointer transition"
          >
            {copied ? "Copied!" : "Copy Code"}
          </button>

          {/* Footer */}
          <div className="flex items-center mt-6 text-xs text-slate-500 font-mono">

            <span>@{snippet.user?.username || "anonymous"}</span>

            {isOwner ? (
              <div className="flex items-center gap-3 text-white text-sm font-sans ml-auto">

                <span className="text-xs text-slate-500 font-mono">
                  Created: {new Date(snippet.createdAt).toLocaleString()}
                </span>

                <Link
                  to={`/snippets/${snippet._id}/edit`}
                  className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 font-medium cursor-pointer"
                >
                  Edit
                </Link>

                <button
                  onClick={handleDelete}
                  className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 font-medium cursor-pointer"
                >
                  Delete
                </button>
              </div>
            ) : (
              <span className="ml-auto">
                {new Date(snippet.createdAt).toLocaleString()}
              </span>
            )}
          </div>

        </div>
      </div>

      {/* Bottom-right Back Button */}
      <div className="flex justify-end mt-6">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded bg-slate-800 hover:bg-slate-700 text-sm font-mono cursor-pointer"
        >
          ← Back
        </button>
      </div>

    </div>
  );
}