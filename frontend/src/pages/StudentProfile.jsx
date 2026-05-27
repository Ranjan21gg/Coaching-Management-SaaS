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
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const studentRes = await API.get(`students/${id}/`);
      const feeRes = await API.get(`fees/?student=${id}`);
      const attRes = await API.get(`attendance/?student=${id}`);

      setStudent(studentRes.data);
      setFees(feeRes.data);
      setAttendance(attRes.data);
    } catch (err) {
      console.log(err);
      alert("Error loading data");
    }
  };

  if (!student) return <p className="text-white p-6">Loading...</p>;

  const totalDue = fees.reduce((sum, f) => sum + (f.total_fee - f.paid_fee), 0);

  return (
    <div className="min-h-screen bg-slate-900 p-6 text-white dark:text-black dark:bg-blue-200">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Profile */}
        <div className="bg-white/10 p-6 rounded-xl  dark:bg-white dark:border-2 border-blue-500 p-6 rounded-xl shadow hover:shadow-xl transition">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold">{student.name}</h1>
            <button onClick={() => navigate("/students")} className="bg-gray-600 px-3 py-1 rounded">
              Back
            </button>
          </div>

          <p className="mt-2">📞 {student.phone}</p>
          <p>📘 {student.course}</p>
          <p>📅 {student.joined_date}</p>
        </div>

        {/* Fees */}
        <div className="bg-white/10 p-6 rounded-xl dark:bg-white dark:border-2 border-blue-500  p-6 rounded-xl shadow hover:shadow-xl transition">
          <h2 className="text-xl font-bold mb-4">Fees</h2>

          <p className="mb-3 text-yellow-400">
            Total Pending: ₹{totalDue}
          </p>

          {fees.map((f) => (
            <div key={f.id} className="border-b border-gray-500 py-2">
              <p>Total: ₹{f.total_fee}</p>
              <p>Paid: ₹{f.paid_fee}</p>
              <p className="text-red-400">
                Due: ₹{f.total_fee - f.paid_fee}
              </p>
            </div>
          ))}
        </div>

        {/* Attendance */}
        <div className="bg-white/10 p-6 rounded-xl dark:bg-white dark:bg-white/6 dark:border-2 border-blue-500  p-6 rounded-xl shadow hover:shadow-xl transition">
          <h2 className="text-xl font-bold mb-4">Attendance</h2>

          {attendance.map((a) => (
            <div key={a.id} className="flex justify-between border-b border-gray-500 py-2">
              <span>{a.date}</span>
              <span className={a.present ? "text-green-400" : "text-red-400"}>
                {a.present ? "Present" : "Absent"}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}