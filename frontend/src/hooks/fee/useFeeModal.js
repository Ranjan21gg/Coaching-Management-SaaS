// import { useState } from "react";

// export default function useFeeModal(students) {
//   const [openModal, setOpenModal] = useState(false);

//   const [editingId, setEditingId] = useState(null);

//   const [search, setSearch] = useState("");

//   const [selectedStudentName, setSelectedStudentName] = useState("");

//   const [form, setForm] = useState({
//     student: "",
//     total_fee: "",
//     paid_fee: "",
//   });


//   //reset form
//   const resetForm = () => {
//     setForm({
//       student: "",
//       total_fee: "",
//       paid_fee: "",
//     });

//     setSelectedStudentName("");
//     setSearch("");
//     setEditingId(null);
//   };

//   // close modal
//   const closeModal = () => {
//     resetForm();
//     setOpenModal(false);
//   };

  
//   // edit modal
//   const handleEdit = (fee) => {
//     setEditingId(fee.id);

//     setForm({
//       student: fee.student,
//       total_fee: fee.total_fee,
//       paid_fee: fee.paid_fee,
//     });

//     const student = students.find(
//       (s) => s.id === fee.student
//     );

//     setSelectedStudentName(student?.name || "");

//     setSearch("");

//     // open modal
//     setOpenModal(true);
//   };

//   return {
//     openModal,
//     setOpenModal,

//     form,
//     setForm,

//     editingId,

//     search,
//     setSearch,

//     selectedStudentName,
//     setSelectedStudentName,

//     handleEdit,

//     closeModal,
//   };
// }
