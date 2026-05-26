import { useEffect, useState } from "react";
import API from "../api";

export default function Fees() {
  const [fees, setFees] = useState([]);
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    student: "",
    total_fee: "",
    paid_fee: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchFees();
    fetchStudents();
  }, []);

  const fetchFees = async () => {
    const res = await API.get("fees/");
    setFees(res.data);
  };

  const fetchStudents = async () => {
    const res = await API.get("students/");
    setStudents(res.data);
  };

  const handleSubmit = async () => {
    if (editingId) {
      await API.put(`fees/${editingId}/`, form);
      setEditingId(null);
    } else {
      await API.post("fees/", form);
    }

    setForm({
      student: "",
      total_fee: "",
      paid_fee: "",
    });

    fetchFees();
  };

  const handleEdit = (fee) => {
    setForm({
      student: fee.student,
      total_fee: fee.total_fee,
      paid_fee: fee.paid_fee,
    });
    setEditingId(fee.id);
  };

  const handleDelete = async (id) => {
    await API.delete(`fees/${id}/`);
    fetchFees();
  };

  return (
    //"bg-white text-black dark:bg-gray-900 dark:text-white"

    <div className="min-h-screen bg-gray-900  dark:bg-white  p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white  dark:text-black  tracking-wide">
            Fees Management
          </h1>

          <span className="bg-green-500 text-white  dark:text-black  px-3 py-1 text-sm rounded-lg shadow-md">
            Total Records: {fees.length}
          </span>
        </div>

        {/* Form Card */}
        <div className="bg-gray-800  dark:bg-white  border border-gray-700 shadow-lg rounded-xl p-4 mb-3 max-w-4xl mx-auto">

          <h2 className="text-lg font-semibold text-white  dark:text-black  mb-3">
            {editingId ? "Update Fee" : "Add Fee"}
          </h2>

          <div className="grid md:grid-cols-4 gap-2">

            {/* Student */}
            <select
              className="bg-gray-700  dark:bg-white  text-white  dark:text-black  border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.student}
              onChange={(e) =>
                setForm({ ...form, student: e.target.value })
              }
            >
              <option value="">Select Student</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>

            {/* Total Fee */}
            <input
              className="bg-gray-700  dark:bg-white  text-white  dark:text-black  placeholder-gray-400  dark:placeholder-black  border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Total Fee"
              value={form.total_fee}
              onChange={(e) =>
                setForm({ ...form, total_fee: e.target.value })
              }
            />

            {/* Paid Fee */}
            <input
              className="bg-gray-700  dark:bg-white  text-white  dark:text-black  placeholder-gray-400  dark:placeholder-black  border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Paid Fee"
              value={form.paid_fee}
              onChange={(e) =>
                setForm({ ...form, paid_fee: e.target.value })
              }
            />

            {/* Button */}
            <button
              className={`text-white py-2  dark:text-black  text-sm font-medium rounded-lg shadow-md transition duration-300 ${editingId
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-blue-500 hover:bg-blue-600"
                }`}
              onClick={handleSubmit}
            >
              {editingId ? "Update" : "Add"}
            </button>

          </div>
        </div>

        {/* Fee Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">

          {fees.map((fee) => (
            <div
              key={fee.id}
              className="bg-gray-800  dark:bg-white  border border-gray-700 rounded-xl shadow-md p-4 hover:shadow-lg transition duration-300"
            >

              <h2 className="text-lg font-semibold text-white  dark:text-black  mb-2">
                Student:{" "}
                {students.find((s) => s.id === fee.student)?.name || "Unknown"}
              </h2>

              <div className="space-y-1 text-gray-300  dark:text-white  text-sm">
                <p className="dark:text-black">💰 Total Fee: ₹{fee.total_fee}</p>
                <p className="dark:text-black">✅ Paid Fee: ₹{fee.paid_fee}</p>
                <p className="text-red-400 font-semibold">
                  ⚠ Due Fee: ₹{fee.due}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 mt-4">
                <button
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white  dark:text-black  text-sm py-1.5 rounded-lg transition"
                  onClick={() => handleEdit(fee)}
                >
                  Edit
                </button>

                <button
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white dark:text-black  text-sm py-1.5 rounded-lg transition"
                  onClick={() => handleDelete(fee.id)}
                >
                  Delete
                </button>
              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}