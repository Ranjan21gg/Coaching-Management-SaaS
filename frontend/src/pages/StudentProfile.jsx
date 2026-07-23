import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import privateAPI from "../privateapi";
import { formatDate, formatTime } from "../services/dateFormatter";

import {
  FaArrowLeft,
  FaUserGraduate,
  FaPhoneAlt,
  FaBook,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
  FaRupeeSign,
  FaExclamationCircle
} from "react-icons/fa";
import StatCard from "../components/card/StartCard";
import GlowBG from "../components/backgroundglow/GlowBG";
import StudentCard from "../components/card/StudentCard";


export default function StudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [fees, setFees] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    let isActive = true;

    Promise.all([
      privateAPI.get(`students/${id}/`),
      privateAPI.get(`fees/?student=${id}`),
      privateAPI.get(`attendance/?student=${id}`),
    ])
      .then(([studentRes, feeRes, attRes]) => {
        if (!isActive) return;

        setStudent(studentRes.data);
        setFees(feeRes.data);
        setAttendance(attRes.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Error loading data");
      });

    return () => {
      isActive = false;
    };
  }, [id]);

  if (!student) return <p className="text-white p-6">Loading...</p>;

  const totalDue = fees.reduce((sum, f) => sum + (f.total_fee - f.paid_fee), 0);

  return (
    <div className="min-h-screen bg-gray-900 dark:bg-blue-200
     dark:text-black relative overflow-hidden">

      {/* Background Glow */}

      <GlowBG />

      <div className="relative z-10 max-w-7xl mx-auto p-6">

        {/* Back Button */}

        <button
          onClick={() => navigate("/students")}
          className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-300 transition"
        >
          <FaArrowLeft />
          Back to Students
        </button>

        {/* Student Profile */}

        <div className="bg-gray-800/80 dark:bg-white backdrop-blur-xl 
            border border-gray-700 rounded-3xl p-8 shadow-xl">

          <div className="text-3xl flex flex-col md:flex-row justify-between items-center overflow-hidden">

            <StudentCard student={student} LogoSize={"w-16 h-16"} />

          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8 text-lg font-medium text-white">

            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-blue-400" />
              {student.phone}
            </div>

            <div className="flex items-center gap-3">
              <FaBook className="text-green-400" />
              {student.course}
            </div>

            <div className="flex items-center gap-3">
              <FaCalendarAlt className="text-yellow-400" />
              {student.joined_date}
            </div>

          </div>

        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <StatCard
            title={"Total Fees"}
            icon={<FaRupeeSign />, <FaCheckCircle />, <FaExclamationCircle />}
            iconColor="bg-blue-600"
            value={`₹${fees.reduce((sum, f) => sum + Number(f.total_fee), 0)}`}
          />

          <StatCard
            title={"Paid Fees"}
            icon={<FaCheckCircle />}
            iconColor="bg-green-600"
            className="p-6 shadow-xl"
            value={`₹${fees.reduce((sum, f) => sum + Number(f.paid_fee), 0)}`}
          />

          <StatCard
            title={"Pending Fee"}
            icon={<FaExclamationCircle />}
            iconColor="bg-yellow-500"
            value={`₹${totalDue}`}
          />

        </div>


        {/* Fee Table */}

        <div className="mt-8 bg-gray-800/80 backdrop-blur-xl rounded-3xl
             bg-gray-900 text-white dark:bg-gray-100 dark:text-black
              border border-gray-700 overflow-hidden">

          <div className="overflow-x-auto">

            <div className="p-6 text-2xl text-white dark:text-black font-bold">
              Fee History
            </div>

            <table className="w-full">

              <thead className="bg-gray-900 text-white dark:bg-gray-100 dark:text-black">

                <tr className="font-semibold bg-gray-800/80 dark:bg-gray-100">
                  <th className="p-4 text-left pl-10">Date</th>

                  <th className="p-4 text-left">Total</th>

                  <th className="p-4 text-left">Paid</th>

                  <th className="p-4 text-left">Due</th>

                </tr>

              </thead>

              <tbody>

                {fees.map((f) => (

                  <tr
                    key={f.id}
                    className="border-t border-gray-700
                   bg-gray-900 text-white dark:bg-gray-100 dark:text-black
                   hover:bg-gray-700/30 dark:hover:bg-gray-100
                   font-mono font-bold"
                  >

                    <td className="p-4 pl-8">
                      {formatDate(f.date)}
                      <br />
                      {formatTime(f.created_at)}
                    </td>

                    <td className="p-4 text-white dark:text-black">₹{f.total_fee}</td>

                    <td className="p-4 text-green-400">₹{f.paid_fee}</td>

                    <td className="p-4 text-red-400">

                      ₹{f.total_fee - f.paid_fee}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>
          </div>
        </div>



        {/* Attendance */}

        <div className="mt-8 bg-gray-800/80 backdrop-blur-xl rounded-3xl
        bg-gray-900 text-white dark:bg-gray-100 dark:text-black
        border border-gray-700 overflow-hidden">

          <div className="overflow-x-auto">

            <div className="p-6 text-2xl font-bold text-center">
              Attendance
            </div>

            <table className="w-full">

              <thead className="bg-gray-700">

                <tr className="bg-gray-800/80 dark:bg-gray-100 text-center">

                  <th className="p-4">
                    Date
                  </th>

                  <th className="p-4">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {attendance.map((a) => (

                  <tr
                    key={a.id}
                    className="border-t border-gray-700 text-center"
                  >

                    <td className="p-4">
                      {a.date}
                    </td>

                    <td className="p-4">

                      {a.present ? (

                        <span className="inline-flex items-center gap-2 text-green-400">

                          <FaCheckCircle />

                          Present

                        </span>

                      ) : (

                        <span className="inline-flex items-center gap-2 text-red-400">

                          <FaTimesCircle />

                          Absent

                        </span>

                      )}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        </div>
      </div>

    </div>

  );
}
