import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import SnippetCard from "../components/SnippetCard";
import SnippetFilter from "../components/SnippetFilter";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ExploreSnippets() {
  const { user } = useAuth(); // ✅ Needed for favorite logic

  const [snippets, setSnippets] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    title: "",
    language: "",
    username: "",
    tags: [],
  });

  const observer = useRef(null);

  const lastSnippetRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const fetchSnippets = useCallback(
    async (reset = false) => {
      try {
        setLoading(true);

        const params = {
          page,
          limit: 12,
        };

        if (filters.title) params.title = filters.title;
        if (filters.language) params.language = filters.language;
        if (filters.username) params.username = filters.username;
        if (filters.tags.length > 0) params.tags = filters.tags.join(",");

        const { data } = await axios.get("/api/snippets/public", { params });

        if (reset) {
          setSnippets(data.snippets);
        } else {
          setSnippets((prev) => [...prev, ...data.snippets]);
        }

        setHasMore(data.hasMore);
      } catch (error) {
        console.error("Error fetching public snippets:", error);
      } finally {
        setLoading(false);
      }
    },
    [page, filters]
  );

  useEffect(() => {
    fetchSnippets(page === 1);
  }, [page, fetchSnippets]);

  const handleSearch = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
    setSnippets([]);
    setHasMore(true);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-12 px-1">

      {/* Responsive Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-center sm:text-left">
        <h1 className="text-2xl font-semibold text-white">Explore Snippets</h1>

        <Link
          to="/dashboard"
          className="hidden sm:block px-5 py-2 rounded-full bg-slate-800 border border-slate-700 
                     hover:border-emerald-500 hover:text-emerald-400 transition 
                     font-semibold text-white shadow text-center"
        >
          ← Dashboard
        </Link>
      </div>

      {/* Filter Panel */}
      <SnippetFilter onSearch={handleSearch} showUsername={true} />

      {/* Mobile Dashboard Button */}
      <div className="flex sm:hidden justify-center">
        <Link
          to="/dashboard"
          className="px-5 py-2 rounded-full bg-slate-800 border border-slate-700 
                     hover:border-emerald-500 hover:text-emerald-400 transition 
                     font-semibold text-white shadow w-full text-center"
        >
          ← Dashboard
        </Link>
      </div>

      {/* Snippet Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {snippets.map((snippet, index) => {
          const isLast = index === snippets.length - 1;

          if (isLast) {
            return (
              <div ref={lastSnippetRef} key={snippet._id}>
                <SnippetCard
                  snippet={snippet}
                  currentUserId={user?._id || user?.id} // ✅ FIXED
                />
              </div>
            );
          }

          return (
            <SnippetCard
              key={snippet._id}
              snippet={snippet}
              currentUserId={user?._id || user?.id} // ✅ FIXED
            />
          );
        })}
      </div>

      {/* Loading Indicator */}
      {loading && (
        <p className="text-center text-slate-400 py-4">Loading...</p>
      )}

      {/* Empty State */}
      {!loading && snippets.length === 0 && (
        <p className="text-center text-slate-500 py-6">
          No public snippets found.
        </p>
      )}
    </div>
  );
}