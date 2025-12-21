import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { validateLogin } from "../utils/validation";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Field‑level validation errors
  const [errors, setErrors] = useState({});

  // Server error (invalid credentials, backend validation, etc.)
  const [serverError, setServerError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setErrors({});

    // Run frontend validation
    const { valid, errors } = validateLogin({ email, password });

    if (!valid) {
      setErrors(errors);
      return;
    }

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      // Pull backend error message if available
      const backendMessage =
        err?.response?.data?.error || "Invalid email or password";

      setServerError(backendMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-slate-900 via-slate-850 to-slate-900 px-4">
      
      {/* Card */}
      <div className="bg-slate-950 rounded-2xl shadow-2xl overflow-hidden w-full max-w-md text-white border border-slate-800">

        {/* Traffic Light Header */}
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 border-b border-slate-800">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
          <span className="w-3 h-3 rounded-full bg-green-500"></span>

          <span className="ml-auto text-xs text-slate-500 font-mono">
            login.js
          </span>
        </div>

        {/* Content */}
        <div className="p-8">
          <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

          {/* Server error */}
          {serverError && (
            <p className="text-red-400 text-center mb-4">{serverError}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 pr-4 py-3 rounded bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Email validation error */}
            {errors.email && (
              <p className="text-red-400 text-sm -mt-3">{errors.email}</p>
            )}

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 rounded bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Password validation error */}
            {errors.password && (
              <p className="text-red-400 text-sm -mt-3">{errors.password}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 transition text-slate-900 py-3 rounded font-semibold"
            >
              Login
            </button>

            {/* Register Link */}
            <p className="text-center text-slate-300 mt-3">
              Need an account?{" "}
              <Link
                to="/register"
                className="text-emerald-400 hover:text-emerald-300"
              >
                Create One
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}