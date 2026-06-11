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

  // Search student name
  const [search, setSearch] = useState("");

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




  const markAttendance = async (status) => {
    if (!form.student) {
      alert("Select a student first");
      return;
    }

    const payload = {
      student: form.student,
      present: status,
    };

    if (editingId) {
      await API.put(`attendance/${editingId}/`, payload);
      setEditingId(null);
    } else {
      await API.post("attendance/", payload);
    }

    setForm({
      student: "",
      present: true,
    });

    setSearch("");

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


  // Filter students based on search input
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="overflow-hidden flex flex-col h-full bg-gray-900 dark:bg-blue-200 pb-0 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-2xl font-bold text-white dark:text-black tracking-wide">
          Attendance Management
        </h1>

        <span className="bg-green-500 text-white dark:text-black px-2 py-0.5 text-xs rounded-md shadow-sm font-medium">
          Total Records: {attendance.length}
        </span>
      </div>

      {/* Form Attendance Card (Compact) */}
      <div className="mb-4 bg-gray-800 dark:bg-white border border-gray-700 shadow-md rounded-xl p-3 w-full">
        <h2 className="text-sm font-semibold text-white dark:text-black mb-2">
          {editingId ? "Update Attendance" : "Mark Attendance"}
        </h2>

        <div className="flex gap-2">

          {/* Search Student */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="🔍 Search Student..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-700 dark:bg-white text-white dark:text-black border border-gray-600 rounded-md px-2.5 py-1.5 text-xs"
            />

            {/* Dropdown Results */}
            {search && (
              <div className="absolute z-50 mt-1 w-full bg-gray-800 dark:bg-white border border-gray-600 rounded-md shadow-lg max-h-40 overflow-y-auto">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <button
                      key={student.id}
                      type="button"
                      onClick={() => {
                        setForm({
                          ...form,
                          student: student.id,
                        });
                        setSearch(student.name);
                      }}
                      className="w-full text-left px-2.5 py-1.5 text-xs text-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-100"
                    >
                      {student.name}
                    </button>
                  ))
                ) : (
                  <div className="px-2.5 py-1.5 text-xs text-gray-400">
                    No student found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Status Action Buttons */}
          <div className="flex gap-1.5 w-48">
            <button
              type="button"
              onClick={() => markAttendance(true)}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs py-1.5 rounded-md font-medium transition"
            >
              Present
            </button>

            <button
              type="button"
              onClick={() => markAttendance(false)}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs py-1.5 rounded-md font-medium transition"
            >
              Absent
            </button>
          </div>

        </div>
      </div>



      {/* Attendance Cards List (Compact Grid) */}
      <div className="h-[calc(100vh-300px)] overflow-y-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 pb-4 w-auto">

          {[...attendance]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((item) => {

              const studentName =
                students.find((s) => s.id === item.student)?.name ||
                "Unknown";

              return (
                <div
                  key={item.id}
                  className="bg-gray-800 dark:bg-white border border-gray-700 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-3 h-38"
                >

                  {/* Header */}
                  <div className="flex items-center justify-between mb-2">

                    <div className="flex items-center gap-2">

                      {/* Avatar */}
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
                        {studentName.charAt(0).toUpperCase()}
                      </div>

                      {/* Student Info */}
                      <div className="min-w-0">
                        <h2 className="font-semibold text-xs text-white dark:text-black truncate">
                          {studentName}
                        </h2>

                        <p className="text-[10px] text-gray-400">
                          Attendance
                        </p>
                      </div>

                    </div>

                    {/* Status Badge */}
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold shrink-0 ${item.present
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                        }`}
                    >
                      {item.present ? "Present" : "Absent"}
                    </span>

                  </div>

                  {/* Details */}
                  <div className="space-y-1 text-xs">

                    <div className="flex justify-between">
                      <span className="text-gray-400">Date</span>
                      <span className="text-white dark:text-black font-medium">
                        {new Date(item.date).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400">Time</span>
                      <span className="text-white dark:text-black font-medium">
                        {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-1.5 mt-3">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white text-xs py-1 rounded-md transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs py-1 rounded-md transition"
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
