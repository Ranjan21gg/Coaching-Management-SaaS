import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function AddStudent() {
  const [data, setData] = useState({
    name: "",
    phone: "",
    course: "",
  });

  const navigate = useNavigate();

  const addStudent = async () => {
    await API.post("students/", data);
    navigate("/students");
  };

  
  return (
      <div className="overflow-hidden h-full flex items-center justify-center bg-gray-900 dark:bg-blue-200 px-4">
        <div className="w-full max-w-lg bg-gray-800  dark:bg-white  shadow rounded-2xl p-6 border border-gray-700">

          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-white  dark:text-black  tracking-wide">
              Add Student
            </h1>
            <p className="text-gray-400  dark:text-black  mt-1 text-xs">
              Fill in the details to register a new student
            </p>
          </div>

          {/* Form */}
          <div className="space-y-3">

            <input
              type="text"
              placeholder="Enter Name"
              className="w-full bg-gray-700 text-white   dark:bg-white dark:text-black  placeholder-gray-400 border border-gray-600 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />

            <input
              type="text"
              placeholder="Enter Phone Number"
              className="w-full bg-gray-700 text-white  dark:bg-white dark:text-black  placeholder-gray-400 border border-gray-600 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setData({ ...data, phone: e.target.value })}
            />

            <input
              type="text"
              placeholder="Enter Course"
              className="w-full bg-gray-700 text-white  dark:bg-white dark:text-black  placeholder-gray-400 border border-gray-600 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setData({ ...data, course: e.target.value })}
            />

            <button
              onClick={addStudent}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white  dark:text-black  font-semibold py-2 rounded-xl shadow transition"
            >
              + Add Student
            </button>

          </div>
        </div>

      </div>
  );
}