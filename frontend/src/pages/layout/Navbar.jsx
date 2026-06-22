import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { getStoredUser } from "../../storage";
import {
  UserPlus,
  LogIn,
  Sun,
  Moon,
  Crown,
} from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("access"); // ✅ FIXED  
  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");
  const isSubscribed = getStoredUser().is_subscribed;
  const user = getStoredUser();

  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const handleToggle = () => {
    const isDarkNow = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDarkNow ? "dark" : "light");
    setIsDark(isDarkNow);
  };

  return (
    <nav className="sticky z-50 top-0 bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-1 gap-0 flex items-center justify-between">

        <div className="flex items-center">
          <img
            src={logo}
            alt="InstiFlow"
            className="h-10 md:h-10 w-auto object-contain"
          />
        </div>

        <p className="text-[20px] font-semibold text-gray-200 dark:text-black">
          {user.institute || "Institute"}
        </p>

        {/* Menu */}
        <div
          className="flex flex-wrap items-center justify-end gap-1"

        >

          <div className="flex flex-wrap items-center justify-end gap-1 text-sm">
            {/* Logged out */}
            {/* {!isLoggedIn && (
              <>
                <Link to="/register" className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-white hover:text-blue-700 text-sm">
                  <UserPlus size={18} /> Register
                </Link>

                <Link to="/" className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-white hover:text-blue-700 text-sm">
                  <LogIn size={18} /> Login
                </Link>
              </>
            )} */}


            <div>
              {/* Premium */}
              {!isSubscribed && (
                <button
                  onClick={() => navigate("/subscribe")}
                  className="flex items-center gap-0 bg-yellow-500 text-black ml-0 mr-0 px-1 py-1 text-xs font-bold rounded-lg hover:bg-white hover:text-blue-700">
                  <Crown size={20} />
                  Premium Plan
                </button>
              )}
            </div>

            {/* Theme */}
            <button
              onClick={handleToggle}
              className="px-2 py-1 rounded-lg"
            >
              {!isDark ? <Sun size={24} className="text-yellow-400 drop-shadow-md" /> : <Moon size={24} className="text-blue-300 drop-shadow-md" />}
            </button>
          </div>

        </div>

      </div >
    </nav >
  );
}
