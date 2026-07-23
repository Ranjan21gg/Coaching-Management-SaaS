import { FaTimes } from "react-icons/fa";
import Button from "../buttons/Button";
import { useState, useEffect } from "react";

export default function FeeModal({
  open,
  onClose,
  form,
  setForm,
  search,
  setSearch,
  selectedStudentName,
  setSelectedStudentName,
  filteredStudents,
  editingId,
  handleSubmit,
  saving,
}) {
  if (!open) return null;

  // close dropdown when focus remove
  const [showDropdown, setShowDropdown] = useState(false);

  // Reset when the modal opens
  useEffect(() => {
    if (open) {
      setShowDropdown(false);
    }
  }, [open]);


  const [error, setError] = useState("");

  const handleChange = (field, value, options = {}) => {
    const { max } = options;
    const number = Number(value);

    // Empty input
    if (value === "") {
      setError("");

      setForm((form) => ({
        ...form,
        [field]: "",
      }));

      return;
    }

    // Max validation
    if (max !== undefined && number > max) {
      setError(`Maximum allowed is ${max.toLocaleString()}`);
      return;
    }

    // Clear previous error
    setError("");

    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="w-full max-w-lg bg-gray-900 dark:bg-blue-400/70 rounded-2xl shadow-2xl p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold text-white dark:text-black">
            {editingId ? "Update Payment" : "Add Payment"}
          </h2>

          <button
            onClick={onClose}
            className="text-red-800 hover:text-red-900 text-xl"
          >
            <FaTimes />
          </button>

        </div>

        {/* Student Search */}

        <div className="relative mb-4">

          <input
            type="text"
            placeholder={
              selectedStudentName
                ? selectedStudentName
                : "Search Student..."
            }
            value={search}

            onChange={(e) => {
              setSelectedStudentName("");
              setSearch(e.target.value);
              setShowDropdown(true);      // Show while typing
            }}

            onFocus={() => {
              if (search.trim()) {
                setShowDropdown(true);    // Show when focusing again
              }
            }}

            onBlur={() => {
              setTimeout(() => {
                setShowDropdown(false);   // Hide after focus leaves
              }, 150);
            }}

            disabled={editingId}  // Disable while editing

            className="w-full bg-gray-800 dark:bg-gray-100 
            border rounded-xl px-4 py-3 text-white dark:text-black
            disabled:opacity-60"
          />

          {showDropdown && search && !editingId && (
            <div className="absolute mt-2 w-full bg-gray-800
             dark:bg-white rounded-xl shadow-lg max-h-52 overflow-y-auto">

              {filteredStudents.map((student) => (

                <button
                  key={student.id}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()} // Prevent blur before click

                  className="w-full text-left px-4 py-3 hover:bg-gray-700 dark:hover:bg-gray-100"
                  onClick={() => {
                    setForm({
                      ...form,
                      student: student.id,
                    });

                    setSelectedStudentName(student.name);
                    setSearch("");

                    setShowDropdown(false);      // Hide dropdown
                    document.activeElement.blur(); // Remove input focus
                  }}
                >
                  {student.name}
                </button>

              ))}

            </div>
          )}

        </div>

        {/* Total Fee */}

        <input
          placeholder="Total Fee"
          value={form.total_fee}
          onChange={(e) => {
            handleChange("total_fee", e.target.value, { max: 2147483647 })
          }}
          className="w-full mb-4 bg-gray-800 dark:bg-gray-100 rounded-xl px-4 py-3"
        />

        {error && (
          <p className="text-red-500 text-sm mb-4">
            {error}
          </p>
        )}

        {/* Paid Fee */}

        <input
          placeholder="Paid Fee"
          value={form.paid_fee}
          onChange={(e) =>
            setForm({
              ...form,
              paid_fee: e.target.value,
            })
          }
          className="w-full mb-6 bg-gray-800 dark:bg-gray-100 rounded-xl px-4 py-3"
        />

        {/* Footer */}

        <div className="flex justify-end gap-3">

          <Button
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            loading={saving}
            loadingText={editingId ? "Updating..." : "Saving..."}
            variant="primary"
            onClick={handleSubmit}
          >
            {editingId ? "Update" : "Save"}
          </Button>

        </div>

      </div>

    </div>
  );
}