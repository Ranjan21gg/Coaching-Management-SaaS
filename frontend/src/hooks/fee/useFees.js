// import { useState, useEffect, useCallback } from "react";

// import {
//   getFees,
//   getStudents,
//   createFee,
//   updateFee,
//   deleteFee,
// } from "../../services/fee/feeService";

// export default function useFees() {
//   const [fees, setFees] = useState([]);
//   const [students, setStudents] = useState([]);

//   const fetchFees = useCallback(async () => {
//     setFees(await getFees());
//   }, []);

//   // get & set students and fees
//   useEffect(() => {
//     let active = true;

//     Promise.all([getFees(), getStudents()])
//       .then(([feeData, studentData]) => {
//         if (!active) return;

//         setFees(feeData);
//         setStudents(studentData);
//       })
//       .catch(console.error);

//     return () => {
//       active = false;
//     };
//   }, []);


//   // save fee
//   const saveFee = async (editingId, form) => {
//     if (editingId) {
//       await updateFee(editingId, form);
//     } else {
//       await createFee(form);
//     }
//   };

//   // remove fee
//   const removeFee = async (id) => {
//     await deleteFee(id);
//   };

//   return {
//     fees,
//     students,
//     fetchFees,
//     saveFee,
//     removeFee,
//   };
// }