// Sidebar.jsx
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Wallet,
  UserRoundPlus,
  LogOut,
  Menu,
} from "lucide-react";
import { getStoredUser } from "../../storage";

export default function Sidebar({ open, setOpen }) {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const user = getStoredUser();

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
      className={`bg-gray-900 text-white dark:text-black dark:bg-blue-200
      shadow-lg border-r border-blue-500
      md:h-[calc(100vh-64px)]
      h-auto
      md:flex md:flex-col
      transition-all duration-300
      flex flex-row
      overflow-x-auto

    ${open ? "md:w-auto" : "md:w-18"}
  `}
    >

      {/* Top */}
      <div
        className={`hidden md:flex items-center border-b border-gray-700 p-4
        ${open ? "justify-between" : "justify-center"}`}
      >
        {open?(
          <div
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 bg-white/10 px-2 py-1.5 rounded-xl border border-white/20 dark:border-black">
            {/* Info */}
            <div className="flex leading-tight">
              <div className="flex items-center gap-1">
                <p className="text-[14px] font-semibold text-gray-200 dark:text-black">
                  {user.username || "User"}
                </p>

                <span className="text-[9px] bg-yellow-400 text-black px-1 rounded-full font-semibold capitalize">
                  {user.role || "member"}
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Menu button */
          <button
            onClick={() => setOpen(true)}
            className="p-2 rounded hover:bg-blue-800 transition"
          >
            <Menu size={20} />
          </button>
        )}
      </div>


      {/* Menu */}
      <nav className="
          flex flex-row md:flex-col
          gap-x-6 p-1 flex-1
          overflow-x-auto md:overflow-y-auto
        ">

        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center rounded-lg p-2 text-xs transition-all duration-200
                hover:text-black hover:bg-blue-200
                dark:hover:text-white dark:hover:bg-blue-600
              ${open ? "gap-3 justify-start" : "justify-center"}`}
            >
              <item.icon size={20} />

              {open && (
                <span className="whitespace-nowrap">
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </nav>


      {/* Logout */}
      <button
        onClick={handleLogout}
        className="
          flex items-center gap-2 p-5
          text-xs
          text-red-400
          hover:text-red-700
          transition-all
        "
      >
        <LogOut size={20} />

        {open && <span>Logout</span>}
        {open && (
          <span className="hidden">
            Logout
          </span>
        )}
      </button>

    </aside>
  );
}
