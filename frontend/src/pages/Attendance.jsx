import { useCallback, useEffect, useState } from "react";
import privateAPI from "../privateapi";
// Shared Components
import Header from "../components/Header";
import GlowBG from "../components/backgroundglow/GlowBG";

// Attendance Components
import AttendanceStats from "../components/attendance/AttendanceStats";
import AttendanceToolbar from "../components/attendance/AttendanceToolbar";
import AttendanceTable from "../components/attendance/AttendanceTable";
import AttendanceModal from "../components/attendance/AttendanceModal";
import DateFilterModal from "../components/attendance/DateFilterModal";
import { filterAttendance } from "../components/attendance/AttendanceFilters";
// Services
import {
  getAttendance,
  getStudents,
} from "../services/service";


export default function Attendance() {
  const [openModal, setOpenModal] = useState(false);
  const [openDateModal, setOpenDateModal] = useState(false);

  const [attendance, setAttendance] = useState([]);
  const [students, setStudents] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [modalSearch, setModalSearch] = useState("");
  const [search, setSearch] = useState("");

  const [dateFilter, setDateFilter] = useState("custom");
  const [statusFilter, setStatusFilter] = useState("all");
  const [customDate, setCustomDate] = useState("");

  const [form, setForm] = useState({
    student: "",
    present: true,
  });

  // loading state for saving
  const [saving, setSaving] = useState(false);
  // loading state for deleting
  const [deleting, setDeleting] = useState(null)


  // Close Modal
  const closeModal = () => {
    setOpenModal(false);
    setEditingId(null);

    setModalSearch("");

    setForm({
      student: "",
      present: true,
    });
  };


  // reset filters of search
  const resetFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setDateFilter("today");
    setCustomDate("");
    setModalSearch("");
  };


  // ================= Fetch Attendance =================

  const fetchAttendance = useCallback(async () => {
    const data = await getAttendance();
    setAttendance(data);
  }, []);

  // ================= Fetch Students =================

  const fetchStudents = useCallback(async () => {
    const data = await getStudents();
    setStudents(data);
  }, []);

  // ================= Real time update when changes =================

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([
        fetchAttendance(),
        fetchStudents(),
      ]);
    };
    loadData();
  }, [fetchAttendance, fetchStudents]);

  // ================= Add / Update =================

  const handleSubmit = async () => {
    setSaving(true)

    if (!form.student) {
      setSaving(false)
      alert("Please select a student.");
      return;
    }

    try {
      if (editingId) {
        await privateAPI.put(`attendance/${editingId}/`, form);
      } else {
        await privateAPI.post("attendance/", form);
      }
      closeModal();
      await fetchAttendance();

    } catch (err) {
      console.error(err);

    } finally {
      setSaving(false);
    }
  };

  // ================= Edit =================

  const handleEdit = (item) => {
    const student = students.find(
      s => s.id === item.student
    );

    setForm({
      student: item.student,
      present: item.present,
    });

    setModalSearch(student?.name || "");
    setEditingId(item.id);
    setOpenModal(true);
  };

  // ================= Delete =================

  const handleDelete = async (id) => {
    setDeleting(id);

    try {
      await privateAPI.delete(`attendance/${id}/`);
      await fetchAttendance();
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(null)
    }
  };

  // ================= Mark Attensance Button =================

  const handleAdd = () => {
    setEditingId(null);
    setForm({
      student: "",
      present: true,
    });
    setModalSearch("");
    setOpenModal(true);
  };

  // ================= Student Search =================

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );


  // ================= Attendance filter Search =================

  const filteredAttendance = filterAttendance(
    attendance,
    students,
    search,
    statusFilter,
    dateFilter,
    customDate
  );

  // ================= Sort Attendance =================

  const sortedAttendance = [...filteredAttendance].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );



  // ================= Date Modal =================

  const handleDateFilterChange = (value) => {
    if (value === "custom") {
      setOpenDateModal(true);
    } else {
      setDateFilter(value);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 dark:bg-blue-200
     text-white dark:text-black relative overflow-hidden">

      {/* Bg glow */}
      <GlowBG />

      <div className="relative z-10 p-6">

        {/* Header */}
        <Header
          Title={"Attendance Management"}
          Description={"Track & Manage Attendance from one place."}
          Records={`${filterAttendance.length} / ${students.length}`}
        />

        {/* Start Card */}
        <div className="mb-6">

          <AttendanceStats
            students={students}
            attendance={attendance}
          />

        </div>

        {/* Attendance Toolbar */}
        <AttendanceToolbar
          search={search}
          setSearch={setSearch}

          dateFilter={dateFilter}
          onDateFilterChange={handleDateFilterChange}

          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}

          onReset={resetFilters}
          onAdd={handleAdd}
        />


        {/* Attendance Table */}
        <AttendanceTable
          attendance={sortedAttendance}
          students={students}
          onEdit={handleEdit}
          onDelete={handleDelete}
          deleting={deleting}
        />


        {/* Date Modal */}
        <DateFilterModal
          open={openDateModal}
          customDate={customDate}
          setCustomDate={setCustomDate}
          onClose={() => setOpenDateModal(false)}
          onApply={() => {
            setDateFilter("custom");
            setOpenDateModal(false);
          }}
        />

        <AttendanceModal
          open={openModal}
          onClose={closeModal}
          form={form}
          setForm={setForm}
          students={students}
          editingId={editingId}
          handleSubmit={handleSubmit}
          search={modalSearch}
          setSearch={setModalSearch}
          saving={saving}
        />

      </div>
    </div>
  );
};
