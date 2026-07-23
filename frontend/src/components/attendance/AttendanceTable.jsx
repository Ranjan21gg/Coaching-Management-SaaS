import AttendanceRow from "./AttendanceRow";

export default function AttendanceTable({
    attendance,
    students,
    onEdit,
    onDelete,
    deleting,
}) {
    
    return (
        <div className="bg-gray-800/80 dark:bg-white rounded-2xl
        border border-gray-700 overflow-hidden shadow-xl">

            <div className="overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-gray-900 dark:bg-gray-100 text-lg">

                        <tr className="text-justify">

                            <th className="px-8 py-4 text-left">
                                Student
                            </th>

                            <th className="px-7 py-4">
                                Status
                            </th>

                            <th className="px-6 py-4">
                                Date
                            </th>

                            <th className="px-6 py-4">
                                Time
                            </th>

                            <th className="text-center">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {attendance.map(item => (

                            <AttendanceRow
                                key={item.id}
                                item={item}
                                students={students}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                deleting={deleting}
                            />

                        ))}

                    </tbody>

                </table>
            </div>
        </div>
    );
}