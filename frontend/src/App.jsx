import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import StudentProfile from "./pages/StudentProfile";
import AddStudent from "./pages/AddStudent";
import Fees from "./pages/Fees";
import Attendance from "./pages/Attendance";
import Subscribe from "./pages/Subscribe";

import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";


export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/subscribe" element={<Subscribe />} />

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/students" element={<PrivateRoute><Students /></PrivateRoute>} />
        <Route path="/add-student" element={<PrivateRoute><AddStudent /></PrivateRoute>} />
        <Route path="/fees" element={<PrivateRoute><Fees /></PrivateRoute>} />
        <Route path="/attendance" element={<PrivateRoute><Attendance /></PrivateRoute>} />

        <Route path="/students/:id" element={<PrivateRoute><StudentProfile /></PrivateRoute>} />
      </Routes>
    </>
  );
}


