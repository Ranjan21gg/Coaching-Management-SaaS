import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-900 dark:bg-blue-200">

      {/* NAVBAR */}
      <div className="shrink-0 sticky top-0 z-50">
        <Navbar />
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-hidden flex">

        {/* Desktop */}
        <div
          className={`
        hidden md:grid flex-1 h-full
        ${open ? "grid-cols-[146px_1fr]" : "grid-cols-[68px_1fr]"}
      `}
        >
          <Sidebar open={open} setOpen={setOpen} />

          {/* RIGHT SIDE */}
          <div className="flex flex-col h-full overflow-hidden">

            {/* SCROLL AREA */}
            <main className="flex-1 overflow-y-auto">
              <Outlet />
            </main>

            {/* FOOTER */}
            <Footer />
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex flex-col flex-1 h-full overflow-hidden">

          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>

          <Sidebar open={open} setOpen={setOpen} />
          <Footer />
        </div>

      </div>
    </div>
  );
}