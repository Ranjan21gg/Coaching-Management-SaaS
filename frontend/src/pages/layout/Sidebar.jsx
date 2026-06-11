// Sidebar.jsx
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Wallet,
  UserRoundPlus,
  LogOut,
  Menu,
} from "lucide-react";

export default function Sidebar({ open, setOpen }) {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const user = JSON.parse(
    localStorage.getItem('user')
  )

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Students",
      icon: Users,
      path: "/students",
    },
    {
      name: "Attendance",
      icon: CalendarCheck,
      path: "/attendance",
    },
    {
      name: "Fees",
      icon: Wallet,
      path: "/fees",
    },
    {
      name: "Add Student",
      icon: UserRoundPlus,
      path: "/add-student",
    },
  ];

  return (
    <aside
      className={`h-[calc(100vh-64px)] bg-gray-900 text-white dark:text-black dark:bg-blue-200 flex flex-col shadow-lg border-r border-blue-500 transition-all duration-300 z-40
        ${open ? "w-auto text-xs" : "w-18 text-xs"}
      `}
    >

      {/* Top */}
      <div
        className={`flex items-center border-b border-gray-700 p-4
        ${open ? "justify-between" : "justify-center"}`}
      >
        {open && user && (
          <div 
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 bg-white/10 px-2 py-1.5 rounded-xl border border-white/20 dark:border-black">
            {/* Info */}
            <div className="flex leading-tight">
              <div className="flex items-center gap-1">
                <p className="text-[14px] font-semibold text-gray-200 dark:text-black">
                  {user.username}
                </p>

                <span className="text-[9px] bg-yellow-400 text-black px-1 rounded-full font-semibold capitalize">
                  {user.role}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded hover:bg-blue-800 transition"
        >
          {!open && user && (
            <h1 className="text-sm font-bold uppercase tracking-wide text-white dark:text-black">
              <Menu size={20} />
            </h1>
          )}
        </button>

      </div>


      {/* Menu */}
      <nav className="flex flex-col gap-1 p-1 flex-1 overflow-y-auto">

        {menuItems.map((item) => {
          // const isActive = location.pathname === item.path;

          return (
            <>
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center rounded-lg p-2 transition-all duration-200
                hover:text-black hover:bg-blue-200
                dark:hover:text-white dark:hover:bg-blue-600
              ${open ? "gap-2 justify-start" : "justify-center"}`}
              >
                <item.icon size={20} />

                {open && (
                  <span className="whitespace-nowrap">
                    {item.name}
                  </span>
                )}
              </Link>
            </>
          );
        })}

      </nav>


      {/* Logout */}
      <button
        onClick={handleLogout}
        className="
          flex items-center gap-2
          p-6
          text-red-400
          hover:text-red-700
          transition-all
        "
      >
        <LogOut size={20} />

        {open && <span>Logout</span>}
      </button>

    </aside>
  );
}