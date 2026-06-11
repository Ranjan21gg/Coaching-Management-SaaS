import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [fees, setFees] = useState([]);
  const [attendance, setAttendance] = useState([]);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const studentRes = await API.get("students/");
      const feeRes = await API.get("fees/");
      const attendanceRes = await API.get("attendance/");

      setStudents(studentRes.data);
      setFees(feeRes.data);
      setAttendance(attendanceRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const totalPendingFees = fees.reduce(
    (acc, fee) => acc + fee.due,
    0
  );


  const handleSubscribe = async () => {
    const res = await API.post("create-subscription/");

    const options = {
      key: "rzp_test_xxx",
      subscription_id: res.data.id,
      name: "Coaching SaaS",
      description: "Monthly Plan",
      handler: function () {
        alert("Payment Successful");
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };



  const activate = async () => {
    await API.post("test-activate/");
    alert("Test subscription activated");
  };

  return (
    <div className="h-full p-6 overflow-y-auto bg-gray-900  dark:bg-blue-200 text-white  dark:text-black">
      <h1 className="fixed top-18 z-40 text-2xl font-bold mb-6">Dashboard</h1>

      {/* cards */}
      <div className="relative z-20 mt-12 overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

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