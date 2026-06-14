import { useState, useEffect } from "react";
import API from "../api";
import { useLocation, useNavigate } from "react-router-dom";

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
    const [timer, setTimer] = useState(5)
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
            const res = await API.post("/verify-otp/",
                {
                    username,
                    otp,
                    new_password: newPassword
                }
            );
            setSuccess(true);
            showMessage(res.data.message);

            setTimeout(() => {
                navigate("/");
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

        <div className="h-screen overflow-hidden flex items-center justify-center bg-gray-900 dark:bg-blue-200 px-4">
            <div className="w-full max-w-sm bg-gray-800 dark:bg-white p-6 py-4 rounded-xl shadow-xl border border-gray-700">

                <h1 className="text-2xl font-bold text-white dark:text-black text-center mb-4">
                    Verify OTP
                </h1>
                <div className="space-y-3">
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-3"
                    >

                        <input
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="w-full bg-gray-700 dark:bg-white text-white dark:text-black placeholder-gray-400 border border-gray-600 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-green-500"
                        />

                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full bg-gray-700 dark:bg-white text-white dark:text-black placeholder-gray-400 border border-gray-600 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-green-500"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-1.5 rounded-xl"
                        >
                            {loading ? "Verifying..." : "Reset Password"}

                        </button>
                    </form>
                </div>

                {/* RESEND TIMER */}
                <div className="text-center mt-2">
                    {timer > 0 ? (
                        <p className="text-gray-400 dark:text-black text-sm">
                            Resend OTP in {timer}s
                        </p>
                    ) : (
                        <button
                            onClick={handleResendOtp}
                            className="
                                text-blue-400
                                hover:underline
                                text-sm
                            "
                        >
                            Resend OTP
                        </button>
                    )}
                </div>

                {/* TOAST */}
                {message && (
                    <div className={`
                        mt-2 text-center text-sm
                        ${success ? " text-green-600" : " text-red-500"}
                    `}>
                        {message}
                    </div>
                )}

                {/* {message && (
                        <p className="text-center text-sm text-gray-300 dark:text-black mt-4">
                            {message}
                        </p>
                    )} */}
            </div>
        </div>
    );
}