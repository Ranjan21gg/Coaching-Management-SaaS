import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import UserCard from "../../components/card/UserCard";
import {
  Menu,
  UserPlus,
  LogIn,
  LogOut,
  LayoutDashboard,
  Users,
  UserRoundPlus,
  Wallet,
  CalendarCheck,
  Sun,
  Moon,
  Crown,
} from "lucide-react";

export default function Navbar() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("access"); // ✅ FIXED  
  const [isDark, setIsDark] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const handleToggle = () => {
    const isDarkNow = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDarkNow ? "dark" : "light");
    setIsDark(isDarkNow);
  };

  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="position: sticky z-50 top-0 bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-1 gap-24 flex items-center justify-between">

        <div className="flex items-center">
          <img
            src={logo}
            alt="InstiFlow"
            className="h-14 md:h-14 w-auto object-contain"
          />
        </div>

        {/* Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 md:hidden"
        >
          <Menu size={24} />
        </button>

        {/* Menu */}
        <div
          className={`${menuOpen ? "flex" : "hidden"
            } md:flex flex-col md:flex-row fixed md:static z-50 top-12 left-0 w-full md:w-auto bg-indigo-800/95 md:bg-transparent p-4 md:p-0 gap-4 md:items-center md:justify-end`}
        >
          <UserCard />

          <div className="flex flex-wrap items-center justify-end gap-1 text-sm md:text-base">

            {/* Logged in */}
            {isLoggedIn && (
              <>
                <Link to="/dashboard" onClick={closeMenu} className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-white hover:text-blue-700 text-sm">
                  <LayoutDashboard size={18} /> Dashboard
                </Link>

                <Link to="/students" onClick={closeMenu} className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-white hover:text-blue-700 text-sm">
                  <Users size={18} /> Students
                </Link>

                <Link to="/attendance" onClick={closeMenu} className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-white hover:text-blue-700 text-sm">
                  <CalendarCheck size={18} /> Attendance
                </Link>

                <Link to="/fees" onClick={closeMenu} className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-white hover:text-blue-700 text-sm">
                  <Wallet size={18} /> Fees
                </Link>

                <Link to="/add-student" onClick={closeMenu} className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-white hover:text-blue-700 text-sm">
                  <UserRoundPlus size={18} /> Add Student
                </Link>


                {/* LOGOUT */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-white hover:text-blue-700 text-sm"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            )}

            {/* Logged out */}
            {!isLoggedIn && (
              <>
                <Link to="/register" onClick={closeMenu} className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-white hover:text-blue-700 text-sm">
                  <UserPlus size={18} /> Register
                </Link>

                <Link to="/" onClick={closeMenu} className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-white hover:text-blue-700 text-sm">
                  <LogIn size={18} /> Login
                </Link>
              </>
            )}

            {/* Theme */}
            <button
              onClick={() => {
                handleToggle();
                closeMenu();
              }}
              className="px-2 py-1 rounded-lg"
            >
              {!isDark ? <Sun size={24} className="text-yellow-400 drop-shadow-md" /> : <Moon size={24} className="text-blue-300 drop-shadow-md" />}
            </button>
          </div>

          <div>
            {/* Premium */}
            {!isSubscribed && (
              <button onClick={() => navigate("/subscribe")}
                onClick={closeMenu}
                className="flex items-center gap-0 bg-yellow-500 text-black ml-0 mr-0 px-1 py-1 rounded-lg text-xs font-bold rounded-lg hover:bg-white hover:text-blue-700">
                <Crown size={20} />
                Premium Plan
              </button>
            )}
          </div>

        </div>

      </div >
    </nav >
  );
}