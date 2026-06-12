import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="h-screen grid grid-rows-[auto_1fr] overflow-hidden">

      {/* NAVBAR */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>



      {/* BODY GRID */}
      <div
        className={`
      grid h-full duration-300 ease-linear overflow-hidden
      ${open ? "grid-cols-[146px_1fr]" : "grid-cols-[78px_1fr]"}
    `}
      >

        {/* SIDEBAR */}
        <div className="h-full md:block overflow-hidden">
          <Sidebar open={open} setOpen={setOpen} />
        </div>

        {/* RIGHT SIDE (MAIN + FOOTER) */}
        <div className="grid grid-rows-[1fr_auto] h-full overflow-hidden">

          {/* MAIN */}
          <main className="overflow-y-auto">
            <Outlet />
          </main>

          {/* FOOTER */}
          <Footer />

        </div>
      </div>

    </div>
  );
}