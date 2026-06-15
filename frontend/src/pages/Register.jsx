import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

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
      await API.post("/register/", data);
      setMessage("Registration successful");
      setisError(true)

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch {
      setMessage("Registration failed");
      setisError(false)
    }
    setLoading(false);
  };

  return (
    <div className="h-full flex items-center justify-center px-4 bg-gray-900 dark:bg-blue-200">
      <div className="w-full max-w-sm bg-gray-800 dark:bg-white p-8 py-4 rounded-2xl shadow-lg border border-gray-700">

        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-semibold text-white dark:text-black tracking-wide">
            Register
          </h1>
          <p className="text-gray-400 dark:text-black text-xs mt-1">
            Create your account to get started
          </p>
        </div>

        {/* Form */}
        <div className="space-y-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              register();
            }}
            className="space-y-3"
          >
            <input
              type="text"
              placeholder="Institute Name"
              autoComplete="new-institute_name"
              className="w-full bg-gray-700 dark:bg-white text-white dark:text-black placeholder-gray-400 border border-gray-600 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setData({ ...data, institute_name: e.target.value })}
            />

            <input
              type="text"
              placeholder="Username"
              autoComplete="new-username"
              className="w-full bg-gray-700 dark:bg-white text-white dark:text-black placeholder-gray-400 border border-gray-600 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setData({ ...data, username: e.target.value })}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={data.email}
              className="w-full bg-gray-700 dark:bg-white text-white dark:text-black placeholder-gray-400 border border-gray-600 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />

            <input
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              className="w-full bg-gray-700 dark:bg-white text-white dark:text-black placeholder-gray-400 border border-gray-600 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />

            <button
              type="submit"   // ✅ important
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-xl"
            >
              {loading ? "Registering..." : "Register"}
            </button>

            <div className="text-left text-blue-500">
              <p className="text-gray-500 text-sm flex gap-1">Have an account?
                <button type="button" className="text-blue-500 cursor-pointer hover:underline" onClick={() => navigate("/")}>Sign in</button></p>
            </div>

            {message && (
              <p
                className={`text-center text-xs mt-2 font-medium ${isError ? "text-green-400" : "text-red-400"}`}>
                {message}
              </p>
            )}
          </form>
        </div>

      </div>
    </div>
  );
}
