import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";

export default function StudentProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [fees, setFees] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    let isActive = true;

    Promise.all([
      API.get(`students/${id}/`),
      API.get(`fees/?student=${id}`),
      API.get(`attendance/?student=${id}`),
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
    <div className=" bg-slate-900 p-6 text-white dark:bg-blue-200 dark:text-black">

      <div className="max-w-4xl mx-auto space-y-6">

        {/* Profile */}
        <div className="bg-white/10 dark:bg-white border-blue-500 dark:border-2 rounded-xl p-6 shadow hover:shadow-xl transition">

          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              {student.name}
            </h1>

            <button
              onClick={() => navigate("/students")}
              className="bg-gray-600 px-3 py-1 rounded"
            >
              Back
            </button>
          </div>

          <p className="mt-2">📞 {student.phone}</p>
          <p>📘 {student.course}</p>
          <p>📅 {student.joined_date}</p>
        </div>

        {/* Fees */}
        <div className="bg-white/10 dark:bg-white border-blue-500 dark:border-2 rounded-xl p-6 shadow hover:shadow-xl transition">

          <h2 className="text-xl font-bold mb-4">
            Fees
          </h2>

          <p className="mb-3 text-yellow-400">
            Total Pending: ₹{totalDue}
          </p>

          {fees.map((f) => (
            <div
              key={f.id}
              className="border-b border-gray-500 py-2"
            >
              <p>Total: ₹{f.total_fee}</p>

              <p>Paid: ₹{f.paid_fee}</p>

              <p className="text-red-400">
                Due: ₹{f.total_fee - f.paid_fee}
              </p>
            </div>
          ))}
        </div>

        {/* Attendance */}
        <div className="bg-white/10 dark:bg-white border-blue-500 dark:border-2 rounded-xl p-6 shadow hover:shadow-xl transition">

          <h2 className="text-xl font-bold mb-4">
            Attendance
          </h2>

          {attendance.map((a) => (
            <div
              key={a.id}
              className="flex justify-between border-b border-gray-500 py-2"
            >
              <span>{a.date}</span>

              <span
                className={
                  a.present
                    ? "text-green-400"
                    : "text-red-400"
                }
              >
                {a.present ? "Present" : "Absent"}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
