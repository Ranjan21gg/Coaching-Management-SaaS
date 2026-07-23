import { useState } from "react";
import publicAPI from "../../publicapi";
import GlowBG from "../../components/backgroundglow/GlowBG";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  FaUniversity,
  FaUser,
  FaEnvelope,
  FaLock,
  FaCheckCircle,
} from "react-icons/fa";

export default function Register() {
  const [data, setData] = useState({
    institute_name: "",
    email: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setisError] = useState(false)

  const register = async () => {
    setLoading(true);
    setMessage("");

    try {
      await publicAPI.post("/register/", data);
      setMessage("Registration successful");
      setisError(false)

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch {
      setMessage("Registration failed");
      setisError(true)
    }
    setLoading(false);
  };

  return (
    <>
      <div className="relative min-h-screen bg-gray-900 dark:bg-blue-200 overflow-hidden">

        {/* Background glow */}
        <GlowBG firstColor="bg-green-500/20" secondColor="bg-blue-500/20" />

        <div className="relative z-10 flex min-h-screen">

          {/* LEFT SIDE (Branding) */}
          <div className="hidden lg:flex w-1/2 flex-col justify-center px-20">

            <h1 className="text-6xl font-bold text-white">
              <span className="text-green-500">InstiFlow</span>
            </h1>

            <p className="mt-6 text-xl text-gray-300 leading-9 max-w-xl">
              Join InstiFlow and simplify your coaching institute management.
              Manage students, fees, attendance, and analytics in one place.
            </p>

            <div className="mt-12 space-y-5 text-gray-300 text-lg">

              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-green-400" />
                Free Institute Setup
              </div>

              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-green-400" />
                Student Management System
              </div>

              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-green-400" />
                Fee Tracking & Reports
              </div>

              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-green-400" />
                Attendance Analytics
              </div>

            </div>

          </div>

          {/* RIGHT SIDE (Form) */}
          <div className="flex flex-1 items-center justify-center px-6">

            <div className="w-full max-w-md rounded-3xl border border-gray-700 bg-gray-800/90 p-8 pt-6 shadow-2xl">

              {/* Header */}
              <div className="text-center mb-3">

                <h2 className="text-3xl font-bold text-green-500">
                  Create Account
                </h2>

                <p className="mt-3 text-gray-400">
                  Get started with your institute 🚀
                </p>

              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  register();
                }}
                className="space-y-3"
              >

                {/* Institute */}
                <div className="relative">
                  <FaUniversity className="absolute left-4 top-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Institute Name"
                    className="w-full rounded-xl border border-gray-600 bg-gray-700 py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500"
                    onChange={(e) =>
                      setData({ ...data, institute_name: e.target.value })
                    }
                  />
                </div>

                {/* Username */}
                <div className="relative">
                  <FaUser className="absolute left-4 top-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full rounded-xl border border-gray-600 bg-gray-700 py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500"
                    onChange={(e) =>
                      setData({ ...data, username: e.target.value })
                    }
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-xl border border-gray-600 bg-gray-700 py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500"
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <FaLock className="absolute left-4 top-4 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full rounded-xl border border-gray-600 bg-gray-700 py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500"
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                  />
                </div>

                {/* Button */}
                <button
                  type="submit"
                  className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 hover:shadow-lg hover:shadow-green-500/30"
                >
                  {loading ? "Creating account..." : "Register"}
                </button>

                {/* Switch to login */}
                <div className="text-center text-sm text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-green-400 hover:underline"
                  >
                    Sign in
                  </Link>
                </div>

                {/* Message */}
                {message && (
                  <p
                    className={`text-center text-sm font-medium ${isError ? "text-red-400" : "text-green-400"
                      }`}
                  >
                    {message}
                  </p>
                )}

              </form>

            </div>

          </div>

        </div>

      </div>
    </>

  );
}
