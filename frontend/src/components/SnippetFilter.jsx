import { useState } from "react";

export default function SnippetFilter({ onSearch, showUsername = false }) {
  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState("");
  const [username, setUsername] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);

  const handleAddTag = () => {
    const trimmed = tagInput.trim().replace(",", "");
    if (!trimmed) return;
    if (tags.includes(trimmed)) return;

    setTags((prev) => [...prev, trimmed]);
    setTagInput("");
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags((prev) => prev.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSearch({
      title: title.trim(),
      language: language.trim(),
      username: username.trim(),
      tags,
    });
  };

  const handleClear = () => {
    setTitle("");
    setLanguage("");
    setUsername("");
    setTagInput("");
    setTags([]);

    onSearch({
      title: "",
      language: "",
      username: "",
      tags: [],
    });
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <form
      className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg space-y-5"
      onSubmit={handleSubmit}
    >
      {/* Top row: Title, Language, Username (optional) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        {/* Title */}
        <div className="flex flex-col">
          <label className="text-slate-300 mb-1 font-medium">Title</label>
          <input
            type="text"
            placeholder="Search by title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>

        {/* Language */}
        <div className="flex flex-col">
          <label className="text-slate-300 mb-1 font-medium">Language</label>
          <input
            type="text"
            placeholder="e.g. JavaScript, Python..."
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>

        {/* Username (only when showUsername=true) */}
        {showUsername && (
          <div className="flex flex-col">
            <label className="text-slate-300 mb-1 font-medium">Username</label>

            <div className="flex items-center bg-slate-800 border border-slate-700 rounded-lg px-3">
              {/* ✅ Static @ prefix */}
              <span className="text-slate-500 select-none">@</span>

              <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => {
                  const clean = e.target.value.replace("@", "");
                  setUsername(clean);
                }}
                className="bg-transparent text-white px-2 py-2 w-full focus:ring-0 outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <label className="text-slate-300 mb-1 font-medium">Tags</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add a tag and press Enter or comma..."
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            className="flex-1 bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium cursor-pointer"
          >
            Add
          </button>
        </div>

        {/* Selected tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-2 bg-slate-800 text-slate-200 px-4 py-2 rounded-full text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="text-slate-400 hover:text-red-400 cursor-pointer"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 justify-end">
        <button
          type="button"
          onClick={handleClear}
          className="px-4 py-2 border border-slate-600 text-slate-200 rounded-lg text-sm font-medium hover:bg-slate-800 cursor-pointer"
        >
          Clear
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-sm font-medium cursor-pointer"
        >
          Apply filters
        </button>
      </div>
    </form>
  );
}