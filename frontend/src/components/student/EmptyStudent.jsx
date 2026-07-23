import { FaUserGraduate } from "react-icons/fa"

export default function EmptyStudent({search}) {
    return (
        <div className="border border-gray-700 bg-gray-800/80 backdrop-blur-xl
                        rounded-3xl p-16 text-center dark:bg-white">

            <FaUserGraduate className="mx-auto mb-6 text-6xl text-blue-500" />

            <h2 className="text-2xl font-bold text-white dark:text-black">
                {search ? "No matching students" : "No Students Found"}
            </h2>

            <p className="mt-3 text-gray-400 dark:text-gray-600">
                {search
                    ? `No students match "${search}".`
                    : "Start by adding your first student."}
            </p>

            <p className="mt-3 text-gray-400 dark:text-gray-600">
                Start by adding your first student.
            </p>

        </div>

    )
}
