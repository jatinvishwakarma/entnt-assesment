import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <nav className="bg-white text-slate-800 px-6 py-4 shadow-md flex justify-between items-center border-b border-slate-200">
      <div className="text-xl font-semibold tracking-tight">Dental Center</div>
      <div className="flex items-center gap-4">
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
    </nav>
  );
}
