import { useCallback, useEffect, useState } from "react";
import API from "../api";

const getFees = async () => {
  const res = await API.get("fees/");
  return res.data;
};

const getStudents = async () => {
  const res = await API.get("students/");
  return res.data;
};

export default function Fees() {
  const [fees, setFees] = useState([]);
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    student: "",
    total_fee: "",
    paid_fee: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedStudentName, setSelectedStudentName] = useState("");

  const fetchFees = useCallback(async () => {
    setFees(await getFees());
  }, []);

  useEffect(() => {
    let isActive = true;

    Promise.all([getFees(), getStudents()])
      .then(([feeData, studentData]) => {
        if (!isActive) return;
        setFees(feeData);
        setStudents(studentData);
      })
      .catch((error) => console.error(error));

    return () => {
      isActive = false;
    };
  }, []);

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
    setSelectedStudentName("");
    setSearch("");

    fetchFees();
  };

  const handleEdit = (fee) => {
    setForm({
      student: fee.student,
      total_fee: fee.total_fee,
      paid_fee: fee.paid_fee,
    });
    setSelectedStudentName(students.find((student) => student.id === fee.student)?.name || "");
    setSearch("");
    setEditingId(fee.id);
  };

  const handleDelete = async (id) => {
    await API.delete(`fees/${id}/`);
    fetchFees();
  };

  // filter student search bar
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col overflow-hidden h-full bg-gray-900 dark:bg-blue-200 pb-0 p-4">

      <div className="sticky top-0 z-40 bg-gray-900 dark:bg-blue-200">

        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-bold text-white dark:text-black tracking-wide">
            Fees Management
          </h1>

          <span className="bg-green-500 text-white dark:text-black px-2 py-0.5 text-xs rounded-md shadow-sm font-medium">
            Total Records: {fees.length}
          </span>
        </div>

        {/* Form Fee Card (Compact) */}
        <div className="mb-3 bg-gray-800 dark:bg-white border border-gray-700 shadow-md rounded-xl p-3 w-full">
          {/* Title */}
          <h2 className="text-xs font-semibold text-white dark:text-black mb-2">
            {editingId ? "Update Fee" : "Add Fee"}
          </h2>

          <div className="flex flex-col gap-2">
            {/* Student Search */}
            <div className="relative">
              <input
                type="text"
                placeholder={
                  selectedStudentName
                    ? `Selected: ${selectedStudentName}`
                    : "🔍 Search Student"
                }
                value={search}
                onChange={(e) => {
                  setSelectedStudentName("");
                  setSearch(e.target.value);
                }}
                className="w-full bg-gray-700 dark:bg-white text-white dark:text-black border border-gray-600 px-2.5 py-1.5 text-xs rounded-md"
              />

              {search.trim() && (
                <div className="absolute z-50 mt-1 w-full bg-gray-800 dark:bg-white rounded-md shadow-lg border border-gray-600 max-h-40 overflow-y-auto">
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
                          setSelectedStudentName(student.name);
                          setSearch("");
                        }}
                        className="w-full text-left px-2.5 py-1.5 text-xs text-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-100"
                      >
                        {student.name}
                      </button>
                    ))
                  ) : (
                    <div className="px-2.5 py-1.5 text-gray-400 text-xs">
                      No student found
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Inputs Row */}
            <div className="grid grid-cols-3 gap-2">
              {/* Total Fee */}
              <input
                className="w-full bg-gray-700 dark:bg-white text-white dark:text-black placeholder-gray-400 dark:placeholder-black border border-gray-600 px-2.5 py-1.5 text-xs rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Total Fee"
                value={form.total_fee}
                onChange={(e) =>
                  setForm({ ...form, total_fee: e.target.value })
                }
              />

              {/* Paid Fee */}
              <input
                className="w-full bg-gray-700 dark:bg-white text-white dark:text-black placeholder-gray-400 dark:placeholder-black border border-gray-600 px-2.5 py-1.5 text-xs rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Paid Fee"
                value={form.paid_fee}
                onChange={(e) =>
                  setForm({ ...form, paid_fee: e.target.value })
                }
              />

              {/* Button */}
              <button
                className={`text-white dark:text-black text-xs font-medium rounded-md shadow-sm transition duration-300 py-1.5 ${editingId
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-blue-500 hover:bg-blue-600"
                  }`}
                onClick={handleSubmit}
              >
                {editingId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>

      </div>


      {/* Fee Cards List (Compact Grid) */}
      <div className="h-[calc(100vh-auto)] overflow-y-auto">
        <div className="overflow-y-auto grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 pb-4 w-auto">
          {fees.map((fee) => (
            <div
              key={fee.id}
              className="bg-gray-800 dark:bg-white border border-gray-700 rounded-xl shadow-sm hover:shadow-md transition duration-300 p-3 h-fit"
            >
              <h2 className="text-xs font-semibold text-white dark:text-black mb-1.5 truncate">
                Student: {students.find((s) => s.id === fee.student)?.name || "Unknown"}
              </h2>

              <div className="space-y-1 text-xs text-gray-300 dark:text-gray-700">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Fee</span>
                  <span className="text-white dark:text-black font-medium">₹{fee.total_fee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Paid Fee</span>
                  <span className="text-white dark:text-black font-medium">₹{fee.paid_fee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <span
                    className={`font-semibold ${fee.due > 0 ? "text-red-400" : "text-green-400"
                      }`}
                  >
                    {fee.due > 0 ? `Due: ₹${fee.due}` : `Paid`}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-1.5 mt-3">
                <button
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white dark:text-black text-xs py-1 rounded-md transition"
                  onClick={() => handleEdit(fee)}
                >
                  Edit
                </button>

                <button
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white dark:text-black text-xs py-1 rounded-md transition"
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
