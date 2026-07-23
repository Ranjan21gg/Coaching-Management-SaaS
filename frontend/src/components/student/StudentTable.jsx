import React from 'react'
import StudentCard from '../card/StudentCard'
import { formatDate, formatTime } from '../../services/dateFormatter'
import Button from '../buttons/Button'
import Loader from '../loder/Loader'
import {
    FaUserGraduate,
    FaBook,
    FaPhoneAlt,
    FaEye,
    FaEdit,
    FaTrashAlt,
    FaCalendarAlt,
} from 'react-icons/fa'
import EmptyStudent from './EmptyStudent'

export default function StudentTable({
    students,
    search,
    deletingId,
    handleDelete,
    handleEdit,
    navigate,
    sortedStudents,
}) {
    return (
        <>
            {/* Table */}

            <div className="bg-gray-800/80 dark:bg-white rounded-2xl
                   border border-gray-700 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">

                    <table className="w-full">

                        {/* Table Head */}
                        <thead className="bg-gray-900 dark:bg-gray-100 text-lg sticky top-0 z-10">

                            <tr>

                                <th className="p-4 pr-4 text-left">Student</th>

                                <th className="p-4 pl-2 text-left">Course</th>

                                <th className="p-4 text-left">Phone</th>

                                <th className="p-4 pl-8 text-left">Joined</th>

                                <th className="p-4 pl-6 text-left">View</th>

                                <th className="p-4 text-center">
                                    Action
                                </th>

                            </tr>

                        </thead>



                        {/* Table Body */}
                        {sortedStudents.length > 0 ? (
                            <tbody>

                                {sortedStudents.map((student) => (

                                    <tr
                                        key={student.id}
                                        className="border-t border-gray-700 hover:bg-gray-700/20
                             dark:hover:bg-gray-100 transition" >

                                        {/* Student */}

                                        <td>
                                            <StudentCard student={student} />
                                        </td>

                                        {/* Course */}
                                        <td className="p-4 pl-0 font-semibold text-white dark:text-black">
                                            <p className="flex items-center gap-2">
                                                <FaBook className="text-yellow-500" />
                                                {student.course}
                                            </p>
                                        </td>

                                        {/* Phone */}

                                        <td className="p-4 pl-0 font-semibold text-white dark:text-black">

                                            <p className="flex items-center gap-2">
                                                <FaPhoneAlt className="text-blue-500" />
                                                {student.phone}
                                            </p>

                                        </td>


                                        {/* Joined Date */}

                                        <td className="p-4 pl-6 py-4 font-semibold text-white dark:text-black">

                                            {/* Date */}
                                            <p className="flex items-center gap-2">
                                                <FaCalendarAlt className='text-cyan-500' />
                                                {formatDate(student.created_at)}
                                            </p>

                                            {/* Time and Updated */}
                                            <p className="text-xs text-gray-400">
                                                {formatTime(student.created_at)}
                                                <br />
                                                Due Update - {formatTime(student.updated_at)}
                                            </p>

                                        </td>

                                        {/* View */}

                                        <td className="p-4 text-center">

                                            <Button
                                                variant
                                                onClick={() => navigate(`/students/${student.id}`)}
                                                className="text-green-600 hover:text-green-800 transitionutton"
                                            >
                                                <FaEye size={26} />
                                            </Button>

                                        </td>

                                        {/* Edit */}

                                        <td className="p-4 pl-10 text-center">

                                            <button
                                                variant
                                                // onClick={() => navigate(`/add-student`)}
                                                onClick={() => handleEdit(student)}
                                                className="text-blue-500 hover:text-blue-800 transitionutton"
                                            >
                                                <FaEdit size={24} />
                                            </button>

                                            {/* Delete */}

                                            <Button
                                                variant
                                                loading={deletingId === student.id}
                                                loadingText={<Loader />}
                                                onClick={() => handleDelete(student)}
                                                className="text-red-500 hover:text-red-800 transitionutton"
                                            >
                                                <FaTrashAlt size={22} />
                                            </Button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>) : (

                            <EmptyStudent search={search} />

                        )}

                    </table>

                </div>

            </div>
        </>
    )
};