import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

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
      const res = await API.post("/login/", data);

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
    <div className="fixed inset-4 h-screen overflow-hidden bg-gray-900 dark:bg-blue-200 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-gray-800 dark:bg-white p-8 py-3 rounded-xl shadow-lg border border-gray-700">

        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-semibold text-white dark:text-black tracking-wide">
            Login
          </h1>
          <p className="text-gray-400 dark:text-black text-xs mt-1">
            Welcome back, please login
          </p>
        </div>

        {/* Form */}
        <div className="space-y-3">
          <form
            onSubmit={login}
            className="space-y-3"
          >

            <input
              type="text"
              placeholder="Institute Name"
              autoComplete="current-institute_name"
              className="w-full bg-gray-700 dark:bg-white text-white dark:text-black placeholder-gray-400 border border-gray-600 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setData({ ...data, institute_name: e.target.value })}
            />


            <input
              type="text"
              placeholder="Username"
              autoComplete="current-username"
              className="w-full bg-gray-700 dark:bg-white text-white dark:text-black placeholder-gray-400 border border-gray-600 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setData({ ...data, username: e.target.value })}
            />

            <input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              className="w-full bg-gray-700 dark:bg-white text-white dark:text-black placeholder-gray-400 border border-gray-600 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl shadow transition duration-300"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p
              onClick={() => navigate("/forgot-password")}
              className="text-xs text-blue-400 text-center mt-4 cursor-pointer hover:underline"
            >
              Forgot Password?
            </p>

            {message && (
              <p className={`text-center text-xs mt-2 font-medium ${isError ? "text-red-400" : "text-green-400"}`}>
                {message}
              </p>
            )}
          </form>
        </div>

      </div>
    </div>
  );
}