import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [fees, setFees] = useState([]);
  const [attendance, setAttendance] = useState([]);


  useEffect(() => {
    let isActive = true;

    Promise.all([
      API.get("students/"),
      API.get("fees/"),
      API.get("attendance/"),
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
    <div className="h-full p-2 bg-gray-900  dark:bg-blue-200 text-white  dark:text-black">
      <h1 className="z-40 text-2xl font-bold mb-6">Dashboard</h1>

      {/* cards */}
      <div className="relative z-20 overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="bg-blue-500 text-white  dark:text-black  p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold">Students</h2>
          <p className="text-4xl font-bold">{students.length}</p>
          <p className="text-s mt-2 opacity-80">
            Total registered students
          </p>
        </div>

        <div className="bg-green-500 text-white  dark:text-black  p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold">Fee Records</h2>
          <p className="text-4xl font-bold">{fees.length}</p>
          <p className="text-s mt-2 opacity-80">
            Payments recorded so far
          </p>
        </div>

        <div className="bg-yellow-500 text-white  dark:text-black  p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold">Pending Fees</h2>
          <p className="text-4xl font-bold">₹{totalPendingFees}</p>
          <p className="text-s mt-2 opacity-80">
            Amount yet to be collected
          </p>
        </div>

        <div className="bg-purple-500 text-white  dark:text-black  p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold">Attendance</h2>
          <p className="text-4xl font-bold">{attendance.length}</p>
          <p className="text-s mt-2 opacity-80">
            Total attendance entries
          </p>
        </div>

      </div>
    </div>
  );
}
