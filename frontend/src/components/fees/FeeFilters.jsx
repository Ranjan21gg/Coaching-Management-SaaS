import { FaPlus, FaSearch } from "react-icons/fa";
import Button from "../buttons/Button";

export default function FeeFilters({
  search,
  setSearch,
  status,
  setStatus,
  total,
  onAdd,
}) {
  return (
    <div className="mb-6 rounded-2xl border border-gray-700 bg-gray-800/70 dark:bg-white p-4 shadow-lg">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        {/* Left Side */}
        <div className="flex flex-col sm:flex-row gap-3 flex-1">

          {/* Search */}
          <div className="relative flex-1">

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

          {/* Status */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className=" bg-gray-800 dark:bg-white border border-gray-700
            rounded-xl px-4 text-white dark:text-black
            focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="paid">Paid</option>
            <option value="due">Due</option>
          </select>

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          <span className="bg-green-600 text-white px-4 py-2 rounded-xl font-medium">
            {total} Records
          </span>

          <Button
            variant="primary"
            onClick={onAdd}
            className="flex items-center gap-2"
          >
            <FaPlus />
            Add Payment
          </Button>

        </div>
      </div>
    </div>
  );
}