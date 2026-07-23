import { useState } from "react";
import privateAPI from "../privateapi";
import Button from "../components/buttons/Button";
import { useNavigate } from "react-router-dom";
import {
  FaUserGraduate,
  FaPhoneAlt,
  FaBookOpen,
  FaCheckCircle,
  FaPlus,
} from "react-icons/fa";
import GlowBG from "../components/backgroundglow/GlowBG";
import Header from "../components/Header";

export default function AddStudent() {
  const [data, setData] = useState({
    name: "",
    phone: "",
    course: "",
  });

  // loading state for saving
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  const addStudent = async (e) => {
    e.preventDefault();
    if (saving) return;
    setSaving(true)
    try {
      await privateAPI.post("students/", data);
    } finally {
      setSaving(false)
    };
    navigate("/students");
  };



  return (
    <>
      <div className="relative min-h-screen bg-gray-900 dark:bg-blue-200 overflow-hidden">

        <div className="relative p-6">

          {/* Header */}
          <div className="mb-4">

            <h1 className="text-3xl font-bold text-white dark:text-black">
              Add Student
            </h1>

            <p className="text-gray-400 dark:text-gray-700 mt-2">
              Register a new student in your institute.
            </p>

          </div>

          <div className="overflow-hidden h-full
          flex items-center justify-center bg-gray-900 dark:bg-blue-200 px-4">

            <div className="w-full max-w-xl bg-gray-800  dark:bg-white 
            shadow rounded-2xl p-5 border border-gray-700">

              {/* Form */}
              <form onSubmit={addStudent} type="submit z-2">

                <div className="space-y-2 dark:text-black">

                  <label className="block mb-2 font-medium">
                    Student Name
                  </label>

                  <div className="relative">

                    <FaUserGraduate className="absolute left-4 top-3 text-gray-400" />
                    <input
                      type="text"
                      required
                      autoComplete="off"
                      placeholder="Enter Student Name"
                      className="w-full bg-gray-700 text-white
                 dark:bg-white dark:text-black  placeholder-gray-400
                 border border-gray-600 rounded-xl px-3 pl-12 py-2.5
                 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => setData({ ...data, name: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2 dark:text-black">

                  <label className="block mb-2 mt-2 font-medium">
                    Phone Number
                  </label>

                  <div className="relative">
                    <FaPhoneAlt className="absolute left-4 top-3.5 text-gray-400" />
                    <input
                      type="phone"
                      placeholder="Enter Phone Number"
                      className="w-full bg-gray-700 text-white
                 dark:bg-white dark:text-black placeholder-gray-400
                  border border-gray-600 rounded-xl px-3 pl-12 py-2.5 
                  text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => setData({ ...data, phone: e.target.value })}
                    />
                  </div>
                </div>


                <div className="space-y-2 dark:text-black">

                  <label className="block mb-2 mt-2 font-medium">
                    Course
                  </label>

                  <div className="relative">

                    <FaBookOpen className="absolute left-4 top-3.5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter Course"
                      className="w-full bg-gray-700 text-white
                 dark:bg-white dark:text-black  placeholder-gray-400
                 border border-gray-600 rounded-xl px-3 pl-12 py-2.5
                 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => setData({ ...data, course: e.target.value })}
                    />
                  </div>

                </div>


                <Button
                  type="submit"
                  loading={saving}
                  loadingText="Adding Student...."
                  variant="primary" className="w-full mt-4 dark:text-black 
                flex items-center justify-center gap-1">
                  <FaPlus />
                  Add Student
                </Button>

              </form>


            </div>

          </div>
        </div>

      </div >
    </>
  );
}