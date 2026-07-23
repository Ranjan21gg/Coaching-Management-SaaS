import { useState } from "react";
import publicAPI from "../../publicapi";
import GlowBG from "../../components/backgroundglow/GlowBG";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaUniversity, FaUser, FaEnvelope, FaArrowLeft } from "react-icons/fa";

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
            const res = await publicAPI.post("/send-otp/", formData);
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
        <div className="relative min-h-screen bg-gray-900 dark:bg-blue-200 overflow-hidden">

            {/* Background Glow */}
            <GlowBG />

            <div className="relative z-10 flex min-h-screen">

                {/* LEFT SIDE */}
                <div className="hidden lg:flex w-1/2 flex-col justify-center px-20">

                    <h1 className="text-6xl font-bold text-white">
                        <span className="text-blue-500">InstiFlow</span>
                    </h1>

                    <p className="mt-6 text-xl text-gray-300 leading-9 max-w-xl">
                        Recover your account securely. We’ll send an OTP to your email
                        to reset your password and restore access.
                    </p>

                    <div className="mt-10 space-y-4 text-gray-300">

                        <p>🔐 Secure OTP Verification</p>
                        <p>📩 Email-based Recovery</p>
                        <p>⚡ Fast Password Reset</p>

                    </div>

                </div>

                {/* RIGHT SIDE */}
                <div className="flex flex-1 items-center justify-center px-6">

                    <div className="w-full max-w-md rounded-3xl border border-gray-700 bg-gray-800/90 backdrop-blur-xl p-8 pt-6 shadow-2xl">

                        {/* Header */}
                        <div className="text-center mb-8">

                            <h2 className="text-3xl font-bold text-blue-500">
                                Forgot Password
                            </h2>

                            <p className="mt-3 text-gray-400">
                                Enter your details to receive OTP
                            </p>

                        </div>

                        <form onSubmit={handleSubmit} className="space-y-3">

                            {/* Institute */}
                            <div className="relative">
                                <FaUniversity className="absolute left-4 top-4 text-gray-400" />
                                <input
                                    type="text"
                                    name="institute_name"
                                    placeholder="Institute Name"
                                    value={formData.institute_name}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-gray-600 bg-gray-700 py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Username */}
                            <div className="relative">
                                <FaUser className="absolute left-4 top-4 text-gray-400" />
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-gray-600 bg-gray-700 py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Email */}
                            <div className="relative">
                                <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-gray-600 bg-gray-700 py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30"
                            >
                                {loading ? "Sending OTP..." : "Send OTP"}
                            </button>

                            {/* Back to login */}
                            <div className="text-center">
                                <Link
                                    to="/login"
                                    className="text-sm text-blue-400 hover:underline inline-flex items-center gap-2"
                                >
                                    <FaArrowLeft />
                                    Back to Login
                                </Link>
                            </div>

                            {/* Message */}
                            {message && (
                                <p className="text-center text-sm text-gray-300">
                                    {message}
                                </p>
                            )}

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}