import {
  FaEdit,
  FaTrashAlt,
  FaUserGraduate,
} from "react-icons/fa";
import Button from "../buttons/Button";
import StudentCard from "../card/StudentCard";
import { formatDate, formatTime } from "../../services/dateFormatter";
import Loader from "../loder/Loader";

export default function FeeRow({
  fee,
  students,
  onEdit,
  onDelete,
  deleting,
}) {
  const student =
    students.find((s) => s.id === fee.student);

  const latest = fee[0];

  return (
    <tr className="gap-x-4 border-t border-gray-700 hover:bg-gray-700/20 dark:hover:bg-gray-100 transition">

      {/* Student */}

      <td>
        <StudentCard student={student}/>
      </td>

      {/* Date */}

      <td className="px-6 pl-4 py-4 font-semibold text-white dark:text-black">
        
        {/* Date */}
        {formatDate(fee.created_at)}

        {/* Date */}
        <p className="text-xs text-gray-400">
          {formatTime(fee.created_at)}
          <br />
          Due Update - {formatTime(fee.updated_at)}

        </p>

      </td>


      {/* Total */}

      <td className="px-6 pl-8 py-9 font-semibold text-white dark:text-black">

        ₹{Number(fee.total_fee).toLocaleString()}

      </td>

      {/* Paid */}

      <td className="px-6 py-4 font-semibold text-green-400">

        ₹{Number(fee.paid_fee).toLocaleString()}

      </td>

      {/* Due */}

      <td className="px-6 pl-8 py-4 font-semibold text-red-400">

        ₹{Number(fee.due).toLocaleString()}

      </td>

      {/* Status */}

      <td className="px-6 py-4">

        {Number(fee.due) === 0 ? (

          <span className="bg-green-500/20 text-green-400 px-3 py-1
            rounded-full text-sm font-semibold">
            Paid
          </span>

        ) : (

          <span className="bg-red-500/20 text-red-400 px-3 py-1
            rounded-full text-sm font-semibold">
            Due
          </span>

        )}

      </td>

      {/* Action */}

      <td className="px-6 py-4">

        <div className="flex justify-center gap-4">

          <button
            onClick={() => onEdit(fee)}
            className="text-blue-500 hover:text-blue-800 transition"
          >
            <FaEdit size={24} />
          </button>

          <Button 
            onClick={() => onDelete(fee.id)}
            variant=""
            loading={deleting === fee.id}
            loadingText={<Loader/>}
            className="text-red-500 hover:text-red-800 transitionutton"
          >
            <FaTrashAlt size={22} />
          </Button>

        </div>

      </td>

    </tr>
  );
}