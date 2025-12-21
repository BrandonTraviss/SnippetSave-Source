import React from "react";
import SnippetEditor from "../components/SnippetEditor";

const EditSnippet = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-850 to-slate-900 px-6 py-12 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Edit Snippet</h1>

        <div className="bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl p-6">
          <SnippetEditor />
        </div>
      </div>
    </div>
  );
};

export default EditSnippet;