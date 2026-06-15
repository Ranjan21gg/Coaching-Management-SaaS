import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col overflow-hidden">

      {/* NAVBAR */}
      <div className="shrink-0 z-50">
        <Navbar />
      </div>

      {/* BODY */}
      <div
        className={`
        hidden md:grid h-full
        ${open ? "grid-cols-[146px_1fr] duration-300 ease-linear" : "grid-cols-[68px_1fr]"}`}
      >

        {/* SIDEBAR (FIXED LEFT) */}
        <div className="hidden md:flex shrink-0">
          <Sidebar open={open} setOpen={setOpen} />
        </div>

        {/* MAIN + FOOTER AREA */}
        <div className="flex flex-col flex-1 overflow-hidden">

          {/* SCROLL AREA */}
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>

          {/* FOOTER (ALWAYS VISIBLE) */}
          <div className="shrink-0">
            <Footer />
          </div>

        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>

        <div className="pb-4 overflow-auto">
          <Sidebar open={open} setOpen={setOpen} />
          <Footer />
        </div>
      </div>
    </div>
  );
}