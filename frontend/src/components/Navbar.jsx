import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
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

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-1 gap-4 flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-black tracking-tight">
            Insti<span className="text-yellow-400">Flow</span>
          </h1>
          <p className="text-xs text-gray-400">
            Smart Coaching Management
          </p>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2"
        >
          ☰
        </button>

        {/* Menu */}
        <div
          className={`${menuOpen ? "flex" : "hidden"
            } md:flex flex-col md:flex-row fixed md:static z-50 top-16 left-0 w-full md:w-auto bg-indigo-800/95 md:bg-transparent p-4 md:p-0 gap-4 md:items-center md:justify-end`}
        >

          {/* User Card */}
          {isLoggedIn && user && (
            <div className="flex items-center gap-2 bg-white/10 px-2 py-0 rounded-2xl border border-white/20">

              {/* Profile Circle */}
              <div className="w-6 h-6 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold text-sm shadow-md">
                {user.username?.charAt(0).toUpperCase()}
              </div>

              {/* User Details */}
              <div className="flex flex-col leading-tight">
                <h1 className="text-sm font-bold uppercase tracking-wide text-white  max-w-[120px] truncate">
                  {user.institute}
                </h1>

                <div className="flex items-center gap-2">
                  <p className="text-xs font-semibold pb-1 text-white">
                    {user.username}
                  </p>

                  <span className="text-[10px] bg-yellow-400 text-black px-2 py-[1px] rounded-full font-semibold capitalize">
                    {user.role}
                  </span>
                </div>
              </div>
            </div>
          )}


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