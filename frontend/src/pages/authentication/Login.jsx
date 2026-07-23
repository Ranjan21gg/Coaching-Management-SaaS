import { useState } from "react";
import publicAPI from "../../publicapi";
import GlowBG from "../../components/backgroundglow/GlowBG";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUniversity,
  FaUser,
  FaLock,
  FaCheckCircle,
} from "react-icons/fa";

export default function Login() {
  const [data, setData] = useState({
    institute_name: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("")
  const [isError, setisError] = useState(false);


  const login = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // LOGIN API CALL
      const res = await publicAPI.post("/login/", data);

      // RESPONSE DATA
      const userData = res.data;

      // CHECK TOKEN EXISTS
      if (!userData.access) {
        throw new Error("No access token received");
      }

      // STORE ACCESS TOKEN
      localStorage.setItem("access", userData.access);

      // STORE REFRESH TOKEN
      if (userData.refresh) {
        localStorage.setItem("refresh", userData.refresh);
      }

      // STORE COMPLETE USER DATA
      localStorage.setItem("user", JSON.stringify(userData));

      /*
        Stored data example:
        {
          access: "...",
          refresh: "...",
          role: "admin",
          institute: "EKALAVYA PATHSALA",
          username: "admin"
        }
      */

      // SUCCESS MESSAGE
      setMessage("Login successful");
      setisError(false);

      // REDIRECT
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (err) {
      console.error("LOGIN ERROR:", err.response?.data || err.message);
      setMessage("Login unsuccessful");
      setisError(true);
    }
    setLoading(false);
  };


  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-gray-900 dark:bg-blue-200">

        {/* Background Glow */}
        <GlowBG />

        <div className="relative z-10 flex min-h-screen">

          {/* LEFT SECTION */}
          <div className="hidden lg:flex w-1/2 flex-col justify-center px-20">

            <h1 className="text-6xl font-bold text-white">
              <span className="text-blue-500">InstiFlow</span>
            </h1>

            <p className="mt-6 text-xl text-gray-300 leading-9 max-w-xl">
              Manage your coaching institute with one powerful platform.
              Keep track of students, attendance, fee payments and analytics
              effortlessly.
            </p>

            <div className="mt-12 space-y-5">

              <div className="flex items-center gap-4 text-lg text-gray-300">
                <FaCheckCircle className="text-green-400" />
                Student Management
              </div>

              <div className="flex items-center gap-4 text-lg text-gray-300">
                <FaCheckCircle className="text-green-400" />
                Attendance Tracking
              </div>

              <div className="flex items-center gap-4 text-lg text-gray-300">
                <FaCheckCircle className="text-green-400" />
                Fee Management
              </div>

              <div className="flex items-center gap-4 text-lg text-gray-300">
                <FaCheckCircle className="text-green-400" />
                Dashboard Analytics
              </div>

            </div>

          </div>



          {/* RIGHT SECTION */}
          <div className="flex flex-1 items-center justify-center px-6">

            <div className="w-full max-w-md rounded-3xl border border-gray-700 bg-gray-800/90 p-8 pt-4 shadow-2xl">

              {/* Logo */}
              <div className="text-center mb-3">

                <h2 className="text-3xl font-bold text-blue-500">
                  Login
                </h2>

                <p className="mt-3 text-gray-400">
                  Welcome back 👋
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Login to continue managing your institute.
                </p>

              </div>

              <form
                onSubmit={login}
                className="space-y-3"
              >

                {/* Institute */}

                <div className="relative">

                  <FaUniversity className="absolute left-4 top-4 text-gray-400" />

                  <input
                    type="text"
                    placeholder="Institute Name"
                    autoComplete="current-institute_name"
                    className="w-full rounded-xl border border-gray-600 bg-gray-700 py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) =>
                      setData({
                        ...data,
                        institute_name: e.target.value,
                      })
                    }
                  />

                </div>

                {/* Username */}

                <div className="relative">

                  <FaUser className="absolute left-4 top-4 text-gray-400" />

                  <input
                    type="text"
                    placeholder="Username"
                    autoComplete="current-username"
                    className="w-full rounded-xl border border-gray-600 bg-gray-700 py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) =>
                      setData({
                        ...data,
                        username: e.target.value,
                      })
                    }
                  />

                </div>

                {/* Password */}

                <div className="relative">

                  <FaLock className="absolute left-4 top-4 text-gray-400" />

                  <input
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-gray-600 bg-gray-700 py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) =>
                      setData({
                        ...data,
                        password: e.target.value,
                      })
                    }
                  />

                </div>

                {/* Button */}

                <button
                  type="submit"
                  className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition duration-300 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>

                {/* Links */}

                <div className="flex justify-between text-sm">

                  <Link
                    to="/forgot-password"
                    className="text-blue-400 hover:underline"
                  >
                    Forgot password?
                  </Link>

                  <Link
                    to="/register"
                    className="text-blue-400 hover:underline"
                  >
                    Create account
                  </Link>

                </div>

                {/* Message */}

                {message && (
                  <p
                    className={`text-center text-sm font-medium ${isError
                      ? "text-red-400"
                      : "text-green-400"
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
