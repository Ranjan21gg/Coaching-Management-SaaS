import { Link } from "react-router-dom";
import {
  FaUserGraduate,
  FaMoneyBillWave,
  FaClipboardCheck,
  FaChartLine,
  FaArrowRight,
} from "react-icons/fa";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white dark:bg-blue-200 dark:text-black">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-800 dark:border-blue-300">
        <h1 className="text-3xl font-bold text-blue-500">
          InstiFlow
        </h1>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-5 py-2 rounded-lg border border-blue-500 hover:bg-blue-500 hover:text-white transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-4">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div>

            <span className="text-blue-400 font-semibold uppercase tracking-widest">
              Student Management SaaS
            </span>

            <h1 className="text-5xl md:text-6xl font-bold mt-5 leading-tight">
              Manage Your
              <span className="text-blue-500"> Coaching Institute </span>
              Smarter.
            </h1>

            <p className="text-gray-400 dark:text-gray-700 mt-6 text-lg leading-8">
              InstiFlow helps coaching institutes manage students,
              attendance, fee payments, and analytics from one modern
              dashboard.
            </p>

            <div className="flex gap-4 mt-10">

              <Link
                to="/register"
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-7 py-3 rounded-xl font-semibold transition"
              >
                Start Free
                <FaArrowRight />
              </Link>

              <Link
                to="/login"
                className="px-7 py-3 border border-gray-600 rounded-xl hover:border-blue-500 transition"
              >
                Login
              </Link>

            </div>

          </div>

          {/* Hero Card */}
          <div className="bg-gray-800 dark:bg-white rounded-2xl p-8 shadow-2xl">

            <h2 className="text-2xl font-bold mb-8">
              Dashboard Overview
            </h2>

            <div className="grid grid-cols-2 gap-5">

              <div className="bg-blue-500 rounded-xl p-5 text-white">
                <FaUserGraduate size={30} />
                <h3 className="mt-3 font-semibold">Students</h3>
                <p className="text-3xl font-bold mt-2">500+</p>
              </div>

              <div className="bg-green-500 rounded-xl p-5 text-white">
                <FaMoneyBillWave size={30} />
                <h3 className="mt-3 font-semibold">Fee Records</h3>
                <p className="text-3xl font-bold mt-2">₹2.5L</p>
              </div>

              <div className="bg-yellow-500 rounded-xl p-5 text-white">
                <FaClipboardCheck size={30} />
                <h3 className="mt-3 font-semibold">Attendance</h3>
                <p className="text-3xl font-bold mt-2">96%</p>
              </div>

              <div className="bg-purple-500 rounded-xl p-5 text-white">
                <FaChartLine size={30} />
                <h3 className="mt-3 font-semibold">Growth</h3>
                <p className="text-3xl font-bold mt-2">+28%</p>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 pb-24">

        <h2 className="text-4xl font-bold text-center mb-14">
          Everything You Need
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-gray-800 dark:bg-white rounded-xl p-7 hover:scale-105 transition">
            <FaUserGraduate className="text-blue-500 text-4xl mb-5" />
            <h3 className="text-xl font-semibold mb-3">
              Student Management
            </h3>
            <p className="text-gray-400 dark:text-gray-700">
              Register and manage student profiles in one place.
            </p>
          </div>

          <div className="bg-gray-800 dark:bg-white rounded-xl p-7 hover:scale-105 transition">
            <FaMoneyBillWave className="text-green-500 text-4xl mb-5" />
            <h3 className="text-xl font-semibold mb-3">
              Fee Tracking
            </h3>
            <p className="text-gray-400 dark:text-gray-700">
              Record payments and monitor pending fees effortlessly.
            </p>
          </div>

          <div className="bg-gray-800 dark:bg-white rounded-xl p-7 hover:scale-105 transition">
            <FaClipboardCheck className="text-yellow-500 text-4xl mb-5" />
            <h3 className="text-xl font-semibold mb-3">
              Attendance
            </h3>
            <p className="text-gray-400 dark:text-gray-700">
              Mark attendance with an intuitive interface.
            </p>
          </div>

          <div className="bg-gray-800 dark:bg-white rounded-xl p-7 hover:scale-105 transition">
            <FaChartLine className="text-purple-500 text-4xl mb-5" />
            <h3 className="text-xl font-semibold mb-3">
              Analytics
            </h3>
            <p className="text-gray-400 dark:text-gray-700">
              Visualize growth and institute performance instantly.
            </p>
          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-20">

        <div className="max-w-5xl mx-auto text-center px-6">

          <h2 className="text-4xl font-bold mb-5">
            Ready to simplify your coaching management?
          </h2>

          <p className="text-blue-100 text-lg mb-10">
            Join institutes using InstiFlow to manage students,
            attendance, and fees efficiently.
          </p>

          <Link
            to="/register"
            className="inline-block bg-white text-blue-600 font-bold px-8 py-4 rounded-xl hover:scale-105 transition"
          >
            Get Started Today
          </Link>

        </div>

      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 dark:border-blue-300 py-8 text-center text-gray-400 dark:text-gray-700">
        © {new Date().getFullYear()} InstiFlow. All rights reserved.
      </footer>

    </div>
  );
}