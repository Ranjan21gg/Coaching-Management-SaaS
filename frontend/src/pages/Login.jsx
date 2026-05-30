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

  // const login = async (e) => {
  //   setLoading(true);
  //   e.preventDefault();

  //   try {
  //     const res = await API.post("/login/", data);

  //     if (!res.data.access) {
  //       throw new Error("No access token received");
  //     }
  //     localStorage.setItem("access", res.data.access);

  //     // only store refresh if exists
  //     if (res.data.refresh) {
  //       localStorage.setItem("refresh", res.data.refresh);
  //     }
  //     setMessage("Login successful")
  //     setisError(false);

  //     setTimeout(() => {
  //       navigate("/dashboard")
  //     }, 1000);

  //   } catch (err) {
  //     setMessage("Login unsuccessful")
  //     console.error("LOGIN ERROR:", err.response?.data || err.message);
  //   }
  //   setLoading(false);
  //   setisError(true);
  // };


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
    <div className="min-h-screen pb-28 bg-gray-900 dark:bg-blue-200 flex items-center justify-center px-4">
      <div className="w-full mb-18 max-w-sm bg-gray-800 dark:bg-white p-8 rounded-2xl shadow-lg border border-gray-700">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-white dark:text-black tracking-wide">
            Login
          </h1>
          <p className="text-gray-400 dark:text-black text-sm mt-1">
            Welcome back, please login
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <form
            onSubmit={login}
            className="space-y-4"
          >

            <input
              type="text"
              placeholder="Institute Name"
              autoComplete="current-institute_name"
              className="w-full bg-gray-700 dark:bg-white text-white dark:text-black placeholder-gray-400 border border-gray-600 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setData({ ...data, institute_name: e.target.value })}
            />


            <input
              type="text"
              placeholder="Username"
              autoComplete="current-username"
              className="w-full bg-gray-700 dark:bg-white text-white dark:text-black placeholder-gray-400 border border-gray-600 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setData({ ...data, username: e.target.value })}
            />

            <input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              className="w-full bg-gray-700 dark:bg-white text-white dark:text-black placeholder-gray-400 border border-gray-600 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl shadow transition duration-300"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {message && (
              <p className={`text-center text-sm mt-2 font-medium ${isError ? "text-red-400" : "text-green-400"}`}>
                {message}
              </p>
            )}
          </form>
        </div>

      </div>
    </div>
  );
}