import { useState, useEffect } from "react";
import publicAPI from "../../publicapi";
import GlowBG from "../../components/backgroundglow/GlowBG";
import { useLocation, useNavigate } from "react-router-dom";
import { FaLock, FaKey, FaRedo, FaCheckCircle } from "react-icons/fa";

export default function VerifyOTP() {
    const location = useLocation();
    const navigate = useNavigate();

    const username = location.state?.username;
    const email = location.state?.email;
    const institute_name = location.state?.institute_name;

    console.log(username, email, institute_name);


    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(30)
    const [success, setSuccess] = useState(false);
    // const [otpSent, setOtpSent] = useState(false);
    const showMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => {
            setMessage("");
        }, 3000);
    };


    // countdown timer
    useEffect(() => {
        if (timer <= 0) return;

        const interval = setInterval(() => {
            setTimer(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await publicAPI.post("/verify-otp/",
                {
                    username,
                    otp,
                    new_password: newPassword
                }
            );
            setSuccess(true);
            showMessage(res.data.message);

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (err) {
            showMessage(
                err.response?.data?.error ||
                "Invalid OTP"
            );
        }

        setLoading(false);
    };


    // resend otp
    const handleResendOtp = async () => {
        try {
            await API.post("/send-otp/", {
                username,
                email,
                institute_name
            });

            setTimer(60);
            setSuccess(true);

            showMessage("OTP resent successfully");

        } catch (err) {
            setSuccess(false);

            showMessage(
                err.response?.data?.error || "Failed to resend OTP"
            );
        }
    };

    return (
        <>
            <div className="relative min-h-screen bg-gray-900 dark:bg-blue-200 overflow-hidden">

                {/* Glow background */}
                <GlowBG firstColor="bg-green-500/20" secondColor="bg-blue-500/20" />

                <div className="relative z-10 flex min-h-screen">

                    {/* LEFT SIDE */}
                    <div className="hidden lg:flex w-1/2 flex-col justify-center px-20">

                        <h1 className="text-6xl font-bold text-white">
                            <span className="text-green-500">InstiFlow</span>
                        </h1>

                        <p className="mt-6 text-xl text-gray-300 leading-9 max-w-xl">
                            Securely verify your identity and reset your password.
                            We use OTP-based authentication to keep your account safe.
                        </p>

                        <div className="mt-10 space-y-4 text-gray-300">

                            <div className="flex items-center gap-3">
                                <FaCheckCircle className="text-green-400" />
                                Secure OTP Verification
                            </div>

                            <div className="flex items-center gap-3">
                                <FaCheckCircle className="text-green-400" />
                                Instant Password Reset
                            </div>

                            <div className="flex items-center gap-3">
                                <FaCheckCircle className="text-green-400" />
                                End-to-End Security
                            </div>

                        </div>

                    </div>

                    {/* RIGHT SIDE */}
                    <div className="flex flex-1 items-center justify-center px-6">

                        <div className="w-full max-w-md rounded-3xl border border-gray-700 bg-gray-800/90 backdrop-blur-xl p-8 pt-6 shadow-2xl">

                            {/* Header */}
                            <div className="text-center mb-8">

                                <h2 className="text-3xl font-bold text-green-500">
                                    Verify OTP
                                </h2>

                                <p className="mt-3 text-gray-400">
                                    Enter OTP & set your new password
                                </p>

                            </div>

                            <form onSubmit={handleSubmit} className="space-y-3">

                                {/* OTP */}
                                <div className="relative">
                                    <FaKey className="absolute left-4 top-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Enter OTP"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full rounded-xl border border-gray-600 bg-gray-700 py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500"
                                    />
                                </div>

                                {/* NEW PASSWORD */}
                                <div className="relative">
                                    <FaLock className="absolute left-4 top-4 text-gray-400" />
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="w-full rounded-xl border border-gray-600 bg-gray-700 py-3 pl-12 pr-4 text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500"
                                    />
                                </div>

                                {/* BUTTON */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 hover:shadow-lg hover:shadow-green-500/30"
                                >
                                    {loading ? "Verifying..." : "Reset Password"}
                                </button>

                            </form>

                            {/* RESEND SECTION */}
                            <div className="mt-6 text-center">

                                {timer > 0 ? (
                                    <p className="text-gray-400 text-sm">
                                        Resend OTP in{" "}
                                        <span className="text-green-400 font-semibold">
                                            {timer}s
                                        </span>
                                    </p>
                                ) : (
                                    <button
                                        onClick={handleResendOtp}
                                        className="inline-flex items-center gap-2 text-green-400 hover:underline text-sm"
                                    >
                                        <FaRedo />
                                        Resend OTP
                                    </button>
                                )}

                            </div>

                            {/* MESSAGE */}
                            {message && (
                                <div
                                    className={`mt-4 text-center text-sm font-medium ${success ? "text-green-400" : "text-red-400"
                                        }`}
                                >
                                    {message}
                                </div>
                            )}

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}