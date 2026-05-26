import { useEffect, useState } from "react";
import API from "../api";

export default function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    student: "",
    present: true,
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchAttendance();
    fetchStudents();
  }, []);
   
  // All api fetch stuff here //
  const fetchAttendance = async () => {
    const res = await API.get("attendance/");
    setAttendance(res.data);
  };

  const fetchStudents = async () => {
    const res = await API.get("students/");
    setStudents(res.data);
  };

  const handleSubmit = async () => {
    if (editingId) {
      await API.put(`attendance/${editingId}/`, form);
      setEditingId(null);
    } else {
      await API.post("attendance/", form);
    }

    setForm({
      student: "",
      present: true,
    });

    fetchAttendance();
  };
// attendance edit
  const handleEdit = (item) => {
    setForm({
      student: item.student,
      present: item.present,
    });
    setEditingId(item.id);
  };
// Delete attendance
  const handleDelete = async (id) => {
    await API.delete(`attendance/${id}/`);
    fetchAttendance();
  };


  return (
    <div className="min-h-screen bg-gray-900  dark:bg-white  p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white  dark:text-black  tracking-wide">
            Attendance Management
          </h1>

          <span className="bg-green-500 text-white  dark:text-black  px-3 py-1 text-sm rounded-lg shadow-md">
            Total Records: {attendance.length}
          </span>
        </div>

        {/* Form Card (same size + rounded preserved) */}
        <div className="bg-gray-800  dark:bg-white  border border-gray-700 shadow-lg rounded-xl p-4 mb-6 max-w-4xl mx-auto">

          <h2 className="text-lg font-semibold text-white  dark:text-black  mb-3">
            {editingId ? "Update Attendance" : "Mark Attendance"}
          </h2>

          <div className="grid md:grid-cols-3 gap-3">

            {/* Student */}
            <select
              className="bg-gray-700   dark:bg-white  text-white  dark:text-black  border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.student}
              onChange={(e) =>
                setForm({ ...form, student: e.target.value })
              }
            >
              <option value="">Select Student</option>
              {students.map((s) => (
                // Tenant id and Student name from Database(Student)
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>

            {/* Status */}
            <select
              className="bg-gray-700  dark:bg-white  text-white  dark:text-black  border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={form.present}
              onChange={(e) =>
                setForm({
                  ...form,
                  present: e.target.value === "true", 
                })
              }
            >
              <option value="true">Present</option>
              <option value="false">Absent</option>
            </select>

            {/* Button (same size preserved) */}
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

        {/* Attendance Cards (same grid + spacing preserved) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">

          {[...attendance]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((item) => {

              const studentName =
                students.find((s) => s.id === item.student)?.name ||
                "Unknown";

              return (
                <div
                  key={item.id}
                  className="bg-gray-800  dark:bg-white  border border-gray-700 rounded-xl shadow-md p-4 hover:shadow-lg transition duration-300"
                >

                  {/* Name */}
                  <h2 className="text-lg font-semibold text-white  dark:text-black mb-2">
                    Student: {studentName}
                  </h2>

                  {/* Info */}
                  <div className="space-y-1 text-gray-300  dark:text-white  text-sm">
                    <p className="dark:text-black">📅 Date: {item.date}</p>

                    <p className="dark:text-black">
                      Status:{" "}
                      <span
                        className={
                          item.present
                            ? "text-green-400 font-semibold"
                            : "text-red-400 font-semibold"
                        }
                      >
                        {item.present ? "Present" : "Absent"}
                      </span>
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 mt-4">
                    <button
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white   dark:text-black  text-sm py-1.5 rounded-lg transition"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>

                    <button
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white  dark:text-black  text-sm py-1.5 rounded-lg transition"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div>

                </div>
              );
            })}

        </div>

      </div>
    </div>

  )
};
