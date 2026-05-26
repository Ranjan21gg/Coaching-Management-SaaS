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

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-black tracking-tight">
            Insti<span className="text-yellow-400">Flow</span>
          </h1>
          <p className="text-xs text-gray-400">
            Smart Coaching Management
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-0 text-sm md:text-base">

          {isLoggedIn && (
            <>
              <Link to="/dashboard" className="flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-white hover:text-blue-700 text-sm">
                <LayoutDashboard size={18} /> Dashboard
              </Link>

              <Link to="/students" className="flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-white hover:text-blue-700 text-sm">
                <Users size={18} /> Students
              </Link>

              <Link to="/attendance" className="flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-white hover:text-blue-700 text-sm">
                <CalendarCheck size={18} /> Attendance
              </Link>

              <Link to="/fees" className="flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-white hover:text-blue-700 text-sm">
                <Wallet size={18} /> Fees
              </Link>


              <Link to="/add-student" className="flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-white hover:text-blue-700 text-sm">
                <UserRoundPlus size={18} /> Add Student
              </Link>


              <button
                onClick={() => {
                  localStorage.removeItem("access"); // ✅ FIXED
                  navigate("/");
                }}
                className="flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-white hover:text-blue-700 text-sm"
              >
                <LogOut size={18} /> Logout
              </button>
            </>
          )}

          {!isLoggedIn && (
            <>
              <Link to="/register" className="flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-white hover:text-blue-700 text-sm">
                <UserPlus size={18} /> Register
              </Link>

              <Link to="/" className="flex items-center gap-1 px-4 py-2 rounded-lg hover:bg-white hover:text-blue-700 text-sm">
                <LogIn size={18} /> Login
              </Link>
            </>
          )}

          {!isSubscribed && (
            <button onClick={() => navigate("/subscribe")}
              className="flex items-center gap-0 bg-yellow-500 text-black ml-2 mr-2 px-1 py-2 rounded-lg text-xs rounded-lg hover:bg-white hover:text-blue-700">
              <Crown size={18} />
              Premium Plan
            </button>
          )}

          <button
            onClick={handleToggle}
            className="p-2 rounded-lg bg-gray-700 dark:bg-gray-600"
          >
            {!isDark ? <Sun size={18} className="text-yellow-400 drop-shadow-md" /> : <Moon size={18} className="text-blue-300 drop-shadow-md" />}
          </button>

        </div>
      </div>
    </nav>
  );
}