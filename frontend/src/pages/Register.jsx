import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({
    institute_name: "",
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
      await API.post("/register/", data);
      setMessage("Registration successful");
      setisError(true)

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (err) {
      setMessage("Registration failed");
      setisError(false)
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen pb-28 bg-gray-900 dark:bg-blue-200 flex items-center justify-center px-4">
      <div className="w-full mb-18 max-w-sm bg-gray-800 dark:bg-white p-8 rounded-2xl shadow-lg border border-gray-700">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-semibold text-white dark:text-black tracking-wide">
            Register
          </h1>
          <p className="text-gray-400 dark:text-black text-sm mt-1">
            Create your account to get started
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              register();
            }}
            className="space-y-4"
          >
            <input
              type="text"
              placeholder="Institute Name"
              autoComplete="new-institute_name"
              className="w-full bg-gray-700 dark:bg-white text-white dark:text-black placeholder-gray-400 border border-gray-600 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setData({ ...data, institute_name: e.target.value })}
            />

            <input
              type="text"
              placeholder="Username"
              autoComplete="new-username"
              className="w-full bg-gray-700 dark:bg-white text-white dark:text-black placeholder-gray-400 border border-gray-600 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setData({ ...data, username: e.target.value })}
            />

            <input
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              className="w-full bg-gray-700 dark:bg-white text-white dark:text-black placeholder-gray-400 border border-gray-600 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />

            <button
              type="submit"   // ✅ important
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-xl"
            >
              {loading ? "Registering..." : "Register"}
            </button>

            {message && (
              <p
                className={`text-center text-sm mt-2 font-medium ${isError ? "text-green-400" : "text-red-400"}`}
              >
                {message}
              </p>
            )}
          </form>
        </div>

      </div>
    </div>
  );
}