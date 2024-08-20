import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {  FaSignOutAlt } from 'react-icons/fa';
function LogoutBtn() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use this if you want to navigate after logout

  const logoutHandler = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/logout",
        {},
        { withCredentials: true }
      );

      // Dispatch the logout action to update Redux state
      dispatch(logout());

      // Navigate to the login page or home after logging out
      navigate("/login"); // Change the path as needed

    } catch (err) {
      console.error("Logout failed:", err);
      setError("Failed to logout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        className={`flex items-center px-4 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-full transition duration-300 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={logoutHandler}
        disabled={loading}
        aria-label="Logout"
      >
        {loading ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="12" cy="12" r="10" strokeWidth="3"></circle>
            <path d="M4 12a8 8 0 018-8" strokeWidth="3"></path>
          </svg>
        ) : (
          <div>
          <FaSignOutAlt />
          <span>Logout</span>
          </div>
        )}
      </button>

      {error && <p className="text-red-600 text-xs mt-2">{error}</p>}
    </div>
  );
}

export default LogoutBtn;
