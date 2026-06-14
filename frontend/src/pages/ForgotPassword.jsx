import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        institute_name: "",
        username: "",
        email: ""
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await API.post("/send-otp/", formData);
            setMessage(res.data.message);

            // Go to verify page
            setTimeout(() => {
                navigate("/verify-otp", {
                    state: {
                        username: formData.username,
                        email: formData.email,
                        institute_name: formData.institute_name
                    }
                });
            }, 1000);

        } catch (err) {
            setMessage(err.response?.data?.error || "Something went wrong");
        }
        setLoading(false);
    };

    return (

        <div className="mt-20 overflow-hidden flex items-center justify-center bg-gray-900 dark:bg-blue-200">
            <div className="w-full max-w-sm bg-gray-800 dark:bg-white p-6 py-4 rounded-2xl shadow-xl border border-gray-700">

                <h1 className="text-2xl font-semibold text-white dark:text-black text-center mb-4 tracking-wide">
                    Forgot Password
                </h1>

                <div className="space-y-3">
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-3"
                    >
                        <input
                            type="text"
                            name="institute_name"
                            placeholder="Institute Name"
                            value={formData.institute_name}
                            onChange={handleChange}
                            className="w-full bg-gray-700 dark:bg-white text-white dark:text-black placeholder-gray-400 border border-gray-600 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full bg-gray-700 dark:bg-white text-white dark:text-black placeholder-gray-400 border border-gray-600 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-gray-700 dark:bg-white text-white dark:text-black placeholder-gray-400 border border-gray-600 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl shadow transition duration-300"
                        >
                            {loading ? "Sending OTP..." : "Send OTP"}
                        </button>
                    </form>

                    <p onClick={() => navigate("/")}
                        className="text-sm text-blue-400 text-center cursor-pointer hover:underline"
                    >
                        Login !!
                    </p>

                    {message && (
                        <p className="text-center text-sm text-gray-300 dark:text-black mt-4">
                            {message}
                        </p>
                    )}
                </div>
            </div>

        </div>
    );
}