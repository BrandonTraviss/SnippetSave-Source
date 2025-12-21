import React from "react";
import { Link } from "react-router-dom";
import SnippetEditor from "../components/SnippetEditor";

const CreateSnippet = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 via-slate-850 to-slate-900 px-3 sm:px-6 py-12 text-white">
      <div className="w-full sm:max-w-4xl mx-auto">

        {/* Header + Back Button */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-bold">Create Snippet</h1>

          <Link
            to="/dashboard"
            className="px-5 py-2 rounded-full bg-slate-800 border border-slate-700 
                       hover:border-emerald-500 hover:text-emerald-400 transition 
                       font-semibold text-white shadow w-full sm:w-auto text-center"
          >
            ← Dashboard
          </Link>
        </div>

        {/* Editor Container */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl p-4 sm:p-6">
          <SnippetEditor />
        </div>
      </div>
    </div>
  );
};

export default CreateSnippet;