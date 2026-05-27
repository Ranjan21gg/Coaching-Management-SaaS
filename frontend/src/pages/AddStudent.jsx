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
      <div className="min-height:40vh bg-gray-900 flex items-center justify-center p-16 px-4 dark:bg-blue-200">
        <div className="w-full max-w-md bg-gray-800  dark:bg-white  shadow rounded-2xl p-10 border border-gray-700">

          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="text-3xl font-bold text-white  dark:text-black  tracking-wide">
              Add Student
            </h1>
            <p className="text-gray-400  dark:text-black  mt-1 text-sm">
              Fill in the details to register a new student
            </p>
          </div>

          {/* Form */}
          <div className="space-y-4">

            <input
              type="text"
              placeholder="Enter Name"
              className="w-full bg-gray-700 text-white   dark:bg-white dark:text-black  placeholder-gray-400 border border-gray-600 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />

            <input
              type="text"
              placeholder="Enter Phone Number"
              className="w-full bg-gray-700 text-white  dark:bg-white dark:text-black  placeholder-gray-400 border border-gray-600 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setData({ ...data, phone: e.target.value })}
            />

            <input
              type="text"
              placeholder="Enter Course"
              className="w-full bg-gray-700 text-white  dark:bg-white dark:text-black  placeholder-gray-400 border border-gray-600 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setData({ ...data, course: e.target.value })}
            />

            <button
              onClick={addStudent}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white  dark:text-black  font-semibold py-2.5 rounded-xl shadow transition"
            >
              + Add Student
            </button>

          </div>
        </div>

      </div>
  );
}