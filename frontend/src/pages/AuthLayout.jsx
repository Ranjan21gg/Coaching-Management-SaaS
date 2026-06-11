import Navbar from "./layout/Navbar";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}