// import React from 'react'
import { FaSearch, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom"

export default function StudentFilters({
    search,
    setSearch,
}) {

    const navigate = useNavigate();

    return (
        <>
            {/* Search */}

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">

                <div className="flex flex-col sm:flex-row gap-3">

                    {/* Search */}

                    <div className="relative">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                        <input
                            type="text"
                            placeholder="Search student..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-xl
                                border border-gray-700 bg-gray-900 dark:bg-gray-100
                                py-2 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    {/* Add Student */}

                    <button
                        onClick={() => navigate("/add-student")}
                        className="flex items-center justify-center gap-2 rounded-xl 
                             px-5 py-1 font-semibold bg-blue-600 text-white
                             hover:bg-blue-700 hover:shadow-blue-500/30 hover:shadow-lg transition"
                    >
                        <FaPlus />
                        Add Student
                    </button>

                </div>

            </div>
        </>
    )
};