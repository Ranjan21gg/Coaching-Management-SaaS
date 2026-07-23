import Button from "../buttons/Button";
import StudentCard from "../card/StudentCard";
import Loader from "../loder/Loader";
import { formatAttendanceDate, formatDate, formatTime } from "../../services/dateFormatter";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export default function AttendanceRow({
    item,
    students,
    onEdit,
    onDelete,
    deleting,
}) {

    const student =
        students.find(s => s.id === item.student);

    return (

        <tr className="border-t border-gray-700 hover:bg-gray-700/20
         dark:hover:bg-gray-100 transition">

            {/* Student */}
            <td>
                <StudentCard student={student}/>
            </td>

            {/* Status */}
            <td className="px-6 py-4">

                {item.present ? (

                    <span className=" bg-green-500/20 text-green-400
                        px-3 py-1 rounded-full text-sm">
                        Present
                    </span>

                ) : (

                    <span className=" bg-red-500/20 text-red-400
                        px-3 py-1 rounded-full text-sm">

                        Absent
                    </span>

                )}

            </td>

            {/* Date */}

            <td className="px-6 py-4">

                {/* {new Date(item.date).toLocaleDateString()} */}
                {formatAttendanceDate(item.date)}

            </td>

            {/* Time */}

            <td className="px-6 py-4">
                {formatTime(item.created_at)}

                <p className="text-xs text-gray-400">
                    Update - {formatTime(item.updated_at)}
                </p>
            </td>

            {/* Actions */}
            <td className="px-6 py-4">

                <div className="flex justify-center gap-4">

                    <button
                        onClick={() => onEdit(item)}
                        className="text-blue-500 hover:text-blue-800 transition"
                    >
                        <FaEdit size={24} />
                    </button>

                    <Button
                        onClick={() => onDelete(item.id)}
                        variant=""
                        loading={deleting == item.id}
                        loadingText={<Loader />}
                        className="px-0 text-red-500 hover:text-red-800 transition"
                    >
                        <FaTrashAlt size={22} />
                    </Button>

                </div>

            </td>

        </tr>

    );
}