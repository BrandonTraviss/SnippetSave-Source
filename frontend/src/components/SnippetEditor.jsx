import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { validateSnippet } from "../utils/validation";

export default function SnippetEditor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [tags, setTags] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");

  // Field-level validation errors
  const [errors, setErrors] = useState({});

  // Server-level errors
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!isEditing) return;

    const fetchSnippet = async () => {
      try {
        const res = await axios.get(`/api/snippets/${id}`, {
          withCredentials: true,
        });

        const s = res.data;
        setTitle(s.title);
        setLanguage(s.language);
        setTags(s.tags?.join(", ") || "");
        setIsPublic(s.isPublic);
        setDescription(s.description || "");
        setCode(s.code);
      } catch (err) {
        const backendMessage =
          err?.response?.data?.error || "Failed to load snippet";
        setServerError(backendMessage);
      }
    };

    fetchSnippet();
  }, [id, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setServerError("");
    setSuccess("");

    // Run frontend validation
    const { valid, errors } = validateSnippet({
      title,
      language,
      code,
      description,
    });

    if (!valid) {
      setErrors(errors);
      return;
    }

    const payload = {
      title,
      language,
      tags: tags
        .split(",")
        .map((t) => t.trim().toLowerCase())
        .filter(Boolean),
      isPublic,
      description,
      code,
    };

    try {
      if (isEditing) {
        await axios.put(`/api/snippets/${id}`, payload, {
          withCredentials: true,
        });
        navigate(`/snippets/${id}`);
      } else {
        const res = await axios.post("/api/snippets", payload, {
          withCredentials: true,
        });
        navigate(`/snippets/${res.data._id}`);
      }
    } catch (err) {
      // Pull backend error message if available
      const backendMessage =
        err?.response?.data?.error ||
        "Something went wrong while saving the snippet";

      setServerError(backendMessage);
    }
  };

  return (
    <div className="bg-slate-950 rounded-2xl shadow-2xl overflow-hidden text-white">
      {/* Header with dots + live title */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-800 bg-slate-900">
        <span className="w-3 h-3 rounded-full bg-red-500" />
        <span className="w-3 h-3 rounded-full bg-yellow-400" />
        <span className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-auto text-xs text-slate-500 font-mono">
          {title ? `${title}` : "untitled-snippet"}
        </span>
      </div>

      {/* Editor content */}
      <div className="py-6 px-1">

        {/* Server error */}
        {serverError && <p className="text-red-400 mb-4">{serverError}</p>}
        {success && <p className="text-green-400 mb-4">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <div>
            <input
              type="text"
              placeholder="Snippet Title"
              className="w-full p-3 rounded bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && (
              <p className="text-red-400 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Language */}
          <div>
            <input
              type="text"
              placeholder="Language (e.g., javascript, python)"
              className="w-full p-3 rounded bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
            {errors.language && (
              <p className="text-red-400 text-sm mt-1">{errors.language}</p>
            )}
          </div>

          {/* Tags */}
          <input
            type="text"
            placeholder="Tags (comma separated)"
            className="w-full p-3 rounded bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          {/* Public toggle */}
          <label className="flex items-center space-x-3 text-sm">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={() => setIsPublic(!isPublic)}
              className="accent-emerald-500"
            />
            <span>Make this snippet public</span>
          </label>

          {/* Description */}
          <div>
            <textarea
              placeholder="Description (optional)"
              className="w-full p-3 rounded bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && (
              <p className="text-red-400 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Code */}
          <div>
            <textarea
              placeholder="Paste your code here..."
              className="w-full p-3 rounded bg-slate-900 border border-slate-800 font-mono text-sm focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
              rows="12"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            {errors.code && (
              <p className="text-red-400 text-sm mt-1">{errors.code}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 py-3 rounded font-semibold text-slate-900 transition cursor-pointer"
          >
            {isEditing ? "Save Changes" : "Create Snippet"}
          </button>
        </form>
      </div>
    </div>
  );
}