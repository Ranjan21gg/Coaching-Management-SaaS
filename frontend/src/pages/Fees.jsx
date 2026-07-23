import { useCallback, useEffect, useState, useMemo } from "react";
import privateAPI from "../privateapi";
import { FaMoneyBillWave, FaUserGraduate } from "react-icons/fa";
import Button from "../components/buttons/Button";
import FeeStats from "../components/fees/FeeStats";
import FeeFilters from "../components/fees/FeeFilters";
import FeeRow from "../components/fees/FeeRow";
import FeeTable from "../components/fees/FeeTable";
import FeeModal from "../components/fees/FeeModal";
import Header from "../components/Header";
import GlowBG from "../components/backgroundglow/GlowBG";
import loaderService from "../services/loaderService";

import { getFees, getStudents } from "../services/service";

import {
  // getFees,
  // getStudents,
  createFee,
  updateFee,
  deleteFee,
} from "../services/fee/feeService";


export default function Fees() {
  const [modalSearch, setModalSearch] = useState("");
  const [search, setSearch] = useState("");
  const [studentSearch, setStudentSearch] = useState("");

  const [status, setStatus] = useState("all");
  const [openModal, setOpenModal] = useState(false);

  const [fees, setFees] = useState([]);
  const [students, setStudents] = useState([]);

  const [form, setForm] = useState({
    student: "",
    total_fee: "",
    paid_fee: "",
  });
  const [editingId, setEditingId] = useState(null); // use in handle-submit
  const [selectedStudentName, setSelectedStudentName] = useState("");

  // loading state
  const [saving, setSaving] = useState(false);
  // loading state for deleting
  const [deleting, setDeleting] = useState(null)


  // Fetch fees from db
  const fetchFees = useCallback(async () => {
    try {
      loaderService.show();

      setFees(await getFees());
    } catch (err) {
      console.error(err);
    } finally {
      loaderService.hide();
    }
  }, []);


  // fetch studebts and fee data from db
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


  // reset form
  const resetForm = () => {
    setForm({
      student: "",
      total_fee: "",
      paid_fee: "",
    });

    setSelectedStudentName("");
    setSearch("");
    setEditingId(null);
  };


  // close modal
  const closeModal = () => {
    resetForm();
    setOpenModal(false);

    setModalSearch("");            // Clear search
    setSelectedStudentName("");   // Clear selected name
  };


  // handle submit for modal
  const handleSubmit = async () => {
    try {
      setSaving(true);

      if (editingId) {
        await updateFee(editingId, form);
      } else {
        await createFee(form);
      }

      // Refresh data
      await fetchFees();

      // Reset form
      resetForm();

      // Close Modal
      closeModal();

    } catch (error) {
      console.log("Status:", error.response?.data);
      console.log("Response", error.response?.status);
      console.error("Error saving fee:", error);
    } finally {
      setSaving(false);
    }
  };



  // handle edit for modal
  const handleEdit = (fee) => {
    setEditingId(fee.id);

    setForm({
      student: fee.student,
      total_fee: fee.total_fee,
      paid_fee: fee.paid_fee,
    });

    const student = students.find(
      (student) => student.id === fee.student
    );

    setSelectedStudentName(student?.name || "");
    setSearch("");

    // Open modal
    setOpenModal(true);
  };



  // handle delete for modal
  const handleDelete = async (id) => {
    setDeleting(id);
    try {
      await deleteFee(id);

      await fetchFees();

    } catch (error) {
      console.error("Error deleting fee:", error);
    }finally{
      setDeleting(null)
    }
  };




  // filter fees
  const filteredFees = fees.filter((fee) => {

    const student = students.find(
      s => s.id === fee.student
    );

    const matchesSearch =
      student?.name
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      status === "all"
        ? true
        : status === "paid"
          ? Number(fee.due) === 0
          : Number(fee.due) > 0;

    return matchesSearch && matchesStatus;

  });


  // filter student for search bar
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 dark:bg-blue-200
     text-white dark:text-black relative overflow-hidden">
      {/* Bg glow */}
      <GlowBG />

      <div className="relative z-10 p-6">

        {/* Header */}
        <Header
          Title="Fee Management"
          Description="Track & Manage Fees From One Place"
          Records={`${filteredFees.length} / ${fees.length}`}
        />

        {/* Fee Stats */}
        <div className="mb-6">
          <FeeStats fees={fees} />
        </div>


        {/* Fee Search for student */}
        <FeeFilters
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          total={fees.length}
          onAdd={() => setOpenModal(true)}
        />


        {/* Form Fee Card (Compact) */}
        <div className="p-0">
          <FeeTable
            students={students}
            fees={filteredFees}
            onEdit={handleEdit}
            onDelete={handleDelete}
            deleting={deleting}
          />
        </div>

        {/* Fee Modal For Search, Add & Update */}
        <FeeModal
          open={openModal}
          onClose={closeModal}
          form={form}
          setForm={setForm}
          search={modalSearch}
          setSearch={setModalSearch}
          selectedStudentName={selectedStudentName}
          setSelectedStudentName={setSelectedStudentName}
          filteredStudents={filteredStudents}
          editingId={editingId}
          handleSubmit={handleSubmit}
          saving={saving}
        />

      </div>
    </div>

  );
}