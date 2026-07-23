import { ImSpinner11 } from "react-icons/im";
import { FaSpinner } from "react-icons/fa";
export default function Loader({
  size = 20,
  className = "",
}) {
  return (
    <FaSpinner
      size={size}
      className={`animate-spin ${className}`}
    />
  );
}