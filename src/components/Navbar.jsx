import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <nav className="bg-white text-slate-800 px-6 py-4 shadow-md border-b border-slate-200">
      <div className="flex justify-between items-center">
        <div className="text-xl font-semibold tracking-tight">Dental Center</div>
        {/* Hamburger for mobile */}
        <button
          className="md:hidden p-2 rounded hover:bg-slate-100 focus:outline-none"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-4">
          {user.role === "Admin" && (
            <>
              <Link
                to="/dashboard"
                className="hover:text-blue-600 transition text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                to="/patients"
                className="hover:text-blue-600 transition text-sm font-medium"
              >
                Patients
              </Link>
              <Link
                to="/calendar"
                className="hover:text-blue-600 transition text-sm font-medium"
              >
                Calendar
              </Link>
            </>
          )}
          {user.role === "Patient" && (
            <Link
              to="/profile"
              className="hover:text-blue-600 transition text-sm font-medium"
            >
              My Profile
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="ml-4 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded-md transition"
          >
            Logout
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-2">
          {user.role === "Admin" && (
            <>
              <Link
                to="/dashboard"
                className="hover:text-blue-600 transition text-sm font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/patients"
                className="hover:text-blue-600 transition text-sm font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Patients
              </Link>
              <Link
                to="/calendar"
                className="hover:text-blue-600 transition text-sm font-medium"
                onClick={() => setMenuOpen(false)}
              >
                Calendar
              </Link>
            </>
          )}
          {user.role === "Patient" && (
            <Link
              to="/profile"
              className="hover:text-blue-600 transition text-sm font-medium"
              onClick={() => setMenuOpen(false)}
            >
              My Profile
            </Link>
          )}
          <button
            onClick={() => {
              setMenuOpen(false);
              handleLogout();
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded-md transition mt-2"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}