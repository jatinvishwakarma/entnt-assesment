import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = login(email, password);
    if (user) {
      if (user.role === "Admin") {
        navigate("/dashboard");
      } else if (user.role === "Patient") {
        navigate("/profile");
      }
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-10"
      >
        <h2 className="text-2xl font-semibold text-slate-800 text-center mb-6">
          Sign in to Dental Center
        </h2>

        {error && (
          <div className="mb-4 bg-rose-100 text-rose-600 text-sm text-center px-4 py-2 rounded-md border border-rose-200">
            {error}
          </div>
        )}

        <div className="mb-5">
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-800 transition"
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-md border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-800 transition"
            placeholder="••••••••"
          />
        </div>

<button
  type="submit"
  className="w-full bg-slate-800 text-white py-2.5 rounded-md font-medium transition-colors duration-200 hover:bg-slate-700 cursor-pointer"
>
  Login
</button>


        <div className="mt-6 text-xs text-slate-500 text-center leading-relaxed">
          <p><strong>Admin</strong>: admin@entnt.in / admin123</p>
          <p><strong>Patient</strong>: jatin@entnt.in / patient123</p>
        </div>
      </form>
    </div>
  );
}
