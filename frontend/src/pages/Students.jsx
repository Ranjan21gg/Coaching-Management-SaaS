import { useEffect, useState } from "react";
import API from "../api";

import { useNavigate } from "react-router-dom";


export default function Students() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("students/")
      .then((res) => setStudents(res.data));
  }, []);


  return (
    <div className="p-6 min-h-screen bg-gray-900  dark:bg-blue-200">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white  dark:text-black">
          Students
        </h1>

        <span className="bg-blue-500 text-white  dark:text-black  px-4 py-2 rounded-lg shadow">
          Total: {students.length}
        </span>
      </div>

      {/* Student Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {students.map((s) => (
          <div
            key={s.id}
            className="bg-gray-800  dark:bg-white  text-white  dark:text-black  dark:border-2 hover:border-blue-500  p-6 rounded-xl shadow hover:shadow-xl transition"
          >

            {/* Avatar + Name */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 text-white  dark:text-black  font-bold text-lg">
                {s.name.charAt(0)}
              </div>

              <div>
                <h2 className="text-xl dark:text-black font-semibold">
                  {s.name}
                </h2>
                <p className="text-gray-400  dark:text-black  text-sm">
                  {s.course}
                </p>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2 text-gray-300  dark:text-black  text-sm">
              <p>
                📞 <span className="text-white  dark:text-black">{s.phone}</span>
              </p>
              <p>
                📅 Joined :{" "}
                <span className="text-white  dark:text-black">
                  {s.joined_date}
                </span>
              </p>
            </div>

            {/* Button */}
            <button
              onClick={() => navigate(`/students/${s.id}`)}
              className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white  dark:text-black  py-2 rounded transition"
            >
              View Profile
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}