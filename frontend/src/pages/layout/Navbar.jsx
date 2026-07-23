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
import { FaBuilding } from 'react-icons/fa'

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
    <nav className="sticky top-0 z-50 
      border-b border-gray-700/50 bg-blue-800/60 backdrop-blur-xl
      text-white dark:bg-blue-400/70 dark:border-blue-300">

      <div className="max-w-7xl mx-auto px-6 py-1 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">

          <img
            src={logo}
            alt="InstiFlow"
            className="h-11 w-auto"
          />

        </div>

        {/* Institute */}

        <div className="hidden md:flex items-center px-5 py-2 
           rounded-full bg-gray-800 dark:bg-white 
           border-2 border-blue-500 dark:border-blue-300">

          <FaBuilding className="text-blue-300 pr-1" />

          <span className="text-sm font-semibold dark:text-black">
            {user.institute || "Institute"}
          </span>

        </div>

        {/* Right Side */}

        <div className="flex items-center gap-3">

          {/* Premium */}

          {!isSubscribed && (

            <button
              onClick={() => navigate("/subscribe")}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r
                from-yellow-400 to-orange-400 px-4 py-2 text-sm font-semibold
                text-black transition  hover:scale-95">

              <Crown size={18} />

              <span className="hidden md:block">

                Upgrade

              </span>

            </button>

          )}

          {/* Theme */}

          <button
            onClick={handleToggle}
            className="h-9 w-10 rounded-xl flex items-center justify-center 
             bg-gray-800 dark:bg-white border border-gray-700 dark:border-blue-300
              transition"
          >

            {!isDark ? (
              <Sun
                size={22}
                className="text-yellow-400 hover:scale-110"
              />
            ) : (
              <Moon
                size={22}
                className="text-blue-500 hover:scale-110"
              />
            )}

          </button>

        </div>

      </div>

    </nav>
  );
}
