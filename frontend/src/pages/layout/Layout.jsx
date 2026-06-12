import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col">

      {/* NAVBAR */}
      <div className="sticky top-0 z-50 shrink-0">
        <Navbar />
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-hidden">

        {/* Desktop */}
        <div
          className={`
        hidden md:grid h-full
        ${open ? "grid-cols-[146px_1fr] duration-300 ease-linear" : "grid-cols-[68px_1fr]"}`}
        >
          <Sidebar open={open} setOpen={setOpen} />
          <div className="grid grid-rows-[1fr_auto] overflow-hidden">
            <main className="flex-1 overflow-y-auto">
              <Outlet />
            </main>
            <Footer />
          </div>

        </div>

        {/* Mobile */}
        <div className="md:hidden grid grid-rows-[1fr_auto] h-full">

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