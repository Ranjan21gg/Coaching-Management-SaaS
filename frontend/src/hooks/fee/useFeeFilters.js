// import { useMemo, useState } from "react";

// export default function useFeeFilters(
//   fees,
//   students,
//   modalSearch
// ) {
//   const [studentSearch, setStudentSearch] = useState("");

//   const [status, setStatus] = useState("all");


//   // filter fees
//   const filteredFees = useMemo(() => {
//     return fees.filter((fee) => {
//       const student = students.find(
//         (s) => s.id === fee.student
//       );

//       const matchesSearch = 
//       student?.name
//         ?.toLowerCase()
//         .includes(studentSearch.toLowerCase());

//       const matchesStatus =
//         status === "all"
//           ? true
//           : status === "paid"
//           ? Number(fee.due) === 0
//           : Number(fee.due) > 0;

//       return matchesSearch && matchesStatus;
//     });
//   }, [fees, students, studentSearch, status]);

  
//   // filter students
//   const filteredStudents = useMemo(() => {
//     return students.filter((student) =>
//       student.name
//         .toLowerCase()
//         .includes(modalSearch.toLowerCase())
//     );
//   }, [students, modalSearch]);

//   return {
//     studentSearch,
//     setStudentSearch,

//     status,
//     setStatus,

//     filteredFees,

//     filteredStudents,
//   };
// }