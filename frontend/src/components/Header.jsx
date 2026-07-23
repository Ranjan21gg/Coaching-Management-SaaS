import React from 'react'
import { FaUserGraduate } from 'react-icons/fa'

export default function Header({
    Title,
    Description,
    Records,
    color = "bg-blue-600"
}) {
    return (
        <>
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-4" >

                <div>
                    <h1 className="text-3xl font-bold">
                        {Title}
                    </h1>

                    <p className="text-gray-400 dark:text-gray-700 mt-2">
                        {Description}
                    </p>
                </div>

                {/* Stats */}

                <div className="mt-4 lg:mt-0">

                    <div className={`inline-flex items-center gap-3 rounded-2xl
                             bg-gray-800/80 backdrop-blur-xl
                             border border-gray-700 px-5 py-2 shadow-xl
                             dark:bg-white ${color}`}>

                        <div className="rounded-xl bg-blue-500 p-3 text-white">
                            <FaUserGraduate />
                        </div>

                        <div>

                            <p className="text-sm text-gray-400 dark:text-gray-600">
                                Total Students
                            </p>

                            <h2 className="text-lg font-bold text-white dark:text-black">
                                {Records}
                            </h2>

                        </div>

                    </div>

                </div>

            </div >
        </>
    )
}
