import Navbar from "./layout/Navbar";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="h-dvh flex flex-col">
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}