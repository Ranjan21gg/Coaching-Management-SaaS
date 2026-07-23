import FeeRow from "./FeeRow";

export default function FeeTable({
  fees,
  students,
  onEdit,
  onDelete,
  deleting,
}) {

  return (
    <div className="bg-gray-800/80 dark:bg-white rounded-2xl
    border border-gray-700 shadow-xl overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full">

          {/* Header */}
          <thead className="bg-gray-900 dark:bg-gray-100 text-lg sticky top-0 z-10">

            <tr className="text-justify">

              <th className="px-8 py-4 text-left">
                Student
              </th>

              <th className="px-6 py-4">
                Date
              </th>

              <th className="px-6 py-4">
                Total Fee
              </th>

              <th className="px-6 py-4">
                Paid
              </th>

              <th className="px-6 py-4">
                Due
              </th>

              <th className="px-6 py-4">
                Status
              </th>

              <th className="text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {fees.map((fee) => (

              <FeeRow
                key={fee.id}
                fee={fee}
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