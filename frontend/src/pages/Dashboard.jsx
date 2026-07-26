import { useEffect, useState } from "react";
import privateAPI from "../privateapi";
import StatCard from "../components/card/StartCard";
import Header from "../components/Header";
import GlowBG from "../components/backgroundglow/GlowBG"
import { Link } from "react-router-dom";
import {
  FaUserGraduate,
  FaMoneyBillWave,
  FaClipboardCheck,
  FaExclamationTriangle,
  FaArrowRight,
} from "react-icons/fa";
import { todayAttendancePercentage, todayPresentCount } from "../components/attendance/AttendanceFilters";


export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [fees, setFees] = useState([]);
  const [attendance, setAttendance] = useState([]);


  useEffect(() => {
    let isActive = true;

    Promise.all([
      privateAPI.get("students/"),
      privateAPI.get("fees/"),
      privateAPI.get("attendance/"),
    ])
      .then(([studentRes, feeRes, attendanceRes]) => {
        if (!isActive) return;
        setStudents(studentRes.data);
        setFees(feeRes.data);
        setAttendance(attendanceRes.data);
      })
      .catch((error) => console.log(error));

    return () => {
      isActive = false;
    };
  }, []);

  const totalPendingFees = fees.reduce(
    (acc, fee) => acc + Number(fee.due || 0),
    0
  );


  return (
    <div className="min-h-screen bg-gray-900 dark:bg-blue-200
     text-white dark:text-black relative overflow-hidden">

      {/* Background Glow */}
      <GlowBG />
      <div className="relative z-10 p-6">

        {/* Header */}
        <Header
          Title={"Dashboard"}
          Description={"Welcome back! Here's what's happening in your institute today."}
          Records={`Present : ${todayPresentCount(attendance)} / ${students.length} - ${todayAttendancePercentage(attendance,students.length)}%`}
        />


        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Students */}

          <StatCard
            title="Students"
            value={students.length}
            iconColor="bg-blue-500"
            icon={<FaUserGraduate />}
            description="Total registered students"
          />


          {/* Fees */}

          <StatCard
            title="Fee Records"
            value={fees.length}
            iconColor="bg-green-500"
            icon={<FaMoneyBillWave />}
            description={"Payments recorded"}
          />

          {/* Pending */}

          <StatCard
            title="Pending Fees"
            value={totalPendingFees}
            iconColor="bg-yellow-500"
            icon={<FaExclamationTriangle />}
            description="Amount yet to be collected"
          />

          {/* Attendance */}

          <StatCard
            title="Attendance"
            value={attendance.length}
            iconColor="bg-purple-500"
            icon={<FaClipboardCheck />}
            description="Attendance entries"
          />

        </div>

        {/* Bottom Section */}

        <div className="grid lg:grid-cols-2 gap-6 mt-8">

          {/* Institute Overview */}

          <div className="bg-gray-800/80 dark:bg-white
           backdrop-blur-xl border border-blue-700 rounded-2xl p-6">

            <h2 className="text-2xl font-bold mb-4">
              Institute Overview
            </h2>

            <p className="text-gray-400 leading-7">
              Monitor your coaching institute from one place. Keep
              track of student registrations, attendance records,
              fee collections, and pending payments with a clean,
              centralized dashboard.
            </p>

          </div>

          {/* Quick Actions */}

          <div className="bg-gray-800/80 dark:bg-white border border-blue-700 rounded-2xl p-6">

            <h2 className="text-2xl font-bold mb-5">
              Quick Actions
            </h2>

            <div className="space-y-4">

              <Link
                to={"/add-student"}
                className="w-full flex justify-between items-center p-3 font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 transition">
                Add Student
                <FaArrowRight />
              </Link>

              <Link
                to={"/fees"}
                className="w-full flex justify-between items-center p-3 font-semibold rounded-xl bg-green-600 hover:bg-green-700 transition">
                Record Fee
                <FaArrowRight />
              </Link>

              <Link
                to={"/attendance"}
                className="w-full flex justify-between items-center p-3 font-semibold rounded-xl bg-purple-600 hover:bg-purple-700 transition">
                Mark Attendance
                <FaArrowRight />
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
