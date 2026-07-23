import {
    FaPlus,
    FaSearch,
    FaFilter,
    FaCalendarAlt,
} from "react-icons/fa";
import Button from "../buttons/Button";

export default function AttendanceToolbar({
    search,
    setSearch,
    dateFilter,
    setDateFilter,
    statusFilter,
    setStatusFilter,
    customDate,
    setCustomDate,
    onReset,
    onAdd,
    onDateFilterChange,
}) {
    return (
        <div className="mb-6 rounded-2xl border border-gray-700 bg-gray-800/70 dark:bg-white p-4 shadow-lg">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                {/* Left */}

                <div className="flex flex-1 flex-wrap items-center gap-3">

                    {/* Search */}

                    <div className="relative min-w-[260px] flex-1">

                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search student..."
                            className="w-full rounded-xl
                            border border-gray-700 bg-gray-900 dark:bg-gray-100
                            py-2 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    {/* Date */}

                    <div className="relative">

                        <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                        <select
                            value={dateFilter}
                            onChange={(e) => onDateFilterChange(e.target.value)}

                            className="appearance-none w-full rounded-xl
                            border border-gray-700 bg-gray-900 dark:bg-gray-100
                            pl-10 pr-8 py-2 outline-none cursor-pointer focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="today">Today</option>
                            <option value="yesterday">Yesterday</option>
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="custom">Custom Date</option>
                        </select>

                    </div>

                    {/* Status */}

                    <div className="relative">

                        <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="appearance-none rounded-xl
                            border border-gray-700 bg-gray-900 dark:bg-gray-100
                            pl-10 pr-8 py-2 outline-none cursor-pointer focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">All Status</option>
                            <option value="present">Present</option>
                            <option value="absent">Absent</option>
                        </select>

                    </div>
                </div>


                {/* Right */}

                <div className="flex gap-3">

                    <Button
                        variant="secondary"
                        onClick={onReset}
                    >
                        Reset
                    </Button>

                    <Button
                        variant="primary"
                        onClick={onAdd}
                        className="flex items-center gap-1"
                    >
                        <FaPlus />
                        Mark Attendance
                    </Button>

                </div>

            </div>

        </div>
    );
}