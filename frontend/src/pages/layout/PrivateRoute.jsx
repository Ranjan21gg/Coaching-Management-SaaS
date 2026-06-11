// import { Navigate } from "react-router-dom";

// export default function PrivateRoute({ children }) {
//   const token = localStorage.getItem("token");
//   return token ? children : <Navigate to="/" />;
// }


import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("access");  // ✅ FIXED

  return token ? children : <Navigate to="/" replace />;
}