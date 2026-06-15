import Navbar from "./layout/Navbar";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="h-dvh flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}