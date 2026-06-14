import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOTP from "./pages/VerifyOTP";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import StudentProfile from "./pages/StudentProfile";
import AddStudent from "./pages/AddStudent";
import Fees from "./pages/Fees";
import Attendance from "./pages/Attendance";


import Subscribe from "./pages/subscription/Subscribe";

import AuthLayout from "./pages/AuthLayout";
import Layout from "./pages/layout/Layout";
import PrivateRoute from "./pages/layout/PrivateRoute";



export default function App() {
  return (
    <>
      {/* <Navbar /> */}
      <Routes>

        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
        </Route>

        <Route path="/subscribe" element={<Subscribe />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/students" element={<PrivateRoute><Students /></PrivateRoute>} />
          <Route path="/add-student" element={<PrivateRoute><AddStudent /></PrivateRoute>} />
          <Route path="/fees" element={<PrivateRoute><Fees /></PrivateRoute>} />
          <Route path="/attendance" element={<PrivateRoute><Attendance /></PrivateRoute>} />

          <Route path="/students/:id" element={<PrivateRoute><StudentProfile /></PrivateRoute>} />
        </Route>

      </Routes>
    </>
  );
}

