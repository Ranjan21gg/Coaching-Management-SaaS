import { useEffect, useState } from "react";
import privateAPI from "../privateapi";
import { useNavigate } from "react-router-dom";

import GlowBG from "../components/backgroundglow/GlowBG";
import Header from "../components/Header";
import { deleteStudent, getStudents } from "../services/service";
import EditStudentModal from "../components/student/EditModal";
import StudentFilters from "../components/student/StudentFilters";
import StudentTable from "../components/student/StudentTable";


export default function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("")
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    privateAPI.get("students/")
      .then((res) => setStudents(res.data));
  }, []);


  // Modal for student edit
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setIsEditOpen(true);
  };


  // filter student for search bar
  const filteredStudents = students.filter((student) => {
    const query = search.toLowerCase().trim();

    return (
      student.name.toLowerCase().includes(query) ||
      student.course.toLowerCase().includes(query) ||
      student.phone.toLowerCase().includes(query)
    );
  });

  // Sorted students
  const sortedStudents = [...filteredStudents].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  // delete student
  const handleDelete = async (student) => {
    if (!window.confirm(`Delete ${student.name}?`)) return;

    try {
      setDeletingId(student.id);

      await deleteStudent(student.id);

      setStudents((prev) =>
        prev.filter((s) => s.id !== student.id)
      );

    } catch (error) {
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };


  return (
    <>
      <div className="relative min-h-screen overflow-hidden
         text-white dark:text-black
         bg-gray-900 dark:bg-blue-200">

        {/* Background Glow */}
        <GlowBG />

        <div className="relative z-10 p-6">

          {/* Header */}
          <Header
            Title={"Students"}
            Description={"Manage all registerd students from one place."}
            Records={`${filteredStudents.length} / ${students.length}`}
          />

          {/* Search */}

          <StudentFilters
            search={search}
            setSearch={setSearch}
          />

          {/* Table */}

          <StudentTable
            sortedStudents={sortedStudents}
            students={sortedStudents}
            deletingId={deletingId}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            navigate={navigate}
            search={search}
          />


          <EditStudentModal
            open={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            student={selectedStudent}
            setStudents={setStudents}
          />

        </div>

      </div>

    </>
  );
}