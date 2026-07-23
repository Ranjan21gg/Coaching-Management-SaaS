import { useMemo, useState, useEffect } from "react";
import Button from "../buttons/Button";

export default function AttendanceModal({
    open,
    onClose,
    form,
    setForm,
    students,
    editingId,
    handleSubmit,
    search,
    setSearch,
    saving,
}) {

    const [showDropdown, setShowDropdown] = useState(false);

    // Reset every time when modal opens
    useEffect(() => {
        if (open) {
            setShowDropdown(false);
        }
    }, [open]);

    const filteredStudents = useMemo(() => {
        return students.filter(student =>
            student.name
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [students, search]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

            <div className="w-full max-w-lg rounded-2xl bg-gray-900 dark:bg-blue-400/70 shadow-2xl p-6">

                {/* Header */}

                <div className="flex justify-between items-center mb-6">

                    <h2 className="text-2xl font-bold text-white dark:text-black">
                        {editingId
                            ? "Update Attendance"
                            : "Mark Attendance"}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-2xl text-gray-400 hover:text-red-500"
                    >
                        ×
                    </button>

                </div>

                {/* Search */}

                <div className="relative mb-6">

                    <input
                        type="text"
                        placeholder="Search Student..."
                        value={search}
                        onFocus={() => {
                            if (search.trim()) {
                                setShowDropdown(true);
                            }
                        }}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setShowDropdown(true);
                        }}
                        onBlur={() => {
                            setTimeout(() => {
                                setShowDropdown(false);
                            }, 150);
                        }}
                        disabled={editingId} // Disable while editing
                        className="w-full rounded-xl border bg-gray-800 dark:bg-gray-100 px-4 py-3
                        disabled:opacity-60"
                    />

                    {showDropdown && search && (

                        <div className="absolute z-50 mt-2 max-h-56 w-full 
                            overflow-y-auto rounded-xl bg-gray-800 dark:bg-white shadow-lg">

                            {filteredStudents.length ? (

                                filteredStudents.map(student => (

                                    <button
                                        key={student.id}
                                        type="button"
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => {

                                            setForm(prev => ({
                                                ...prev,
                                                student: student.id,
                                            }));

                                            setSearch(student.name);

                                            // Hide dropdown immediately
                                            setShowDropdown(false);

                                            // Remove focus
                                            document.activeElement.blur();
                                        }}
                                        className={`w-full px-4 py-3 text-left transition
                                        ${form.student === student.id
                                                ? "bg-blue-600 text-white"
                                                : "hover:bg-gray-700 dark:hover:bg-gray-100"
                                            }`}
                                    >
                                        {student.name}
                                    </button>

                                ))

                            ) : (

                                <div className="px-4 py-3 text-gray-400">
                                    No student found
                                </div>

                            )}

                        </div>

                    )}

                </div>

                {/* Status */}

                <div className="mb-6">

                    <label className="mb-3 block font-medium">
                        Attendance Status
                    </label>

                    <div className="grid grid-cols-2 gap-4">

                        <button
                            type="button"
                            onClick={() =>
                                setForm(prev => ({
                                    ...prev,
                                    present: true,
                                }))
                            }
                            className={`rounded-xl py-3 font-semibold transition ${form.present
                                    ? "bg-green-600 text-white"
                                    : "bg-gray-800 dark:bg-gray-100 dark:hover:text-black hover:bg-green-600 hover:text-white"
                                }`}
                        >
                            Present
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                setForm(prev => ({
                                    ...prev,
                                    present: false,
                                }))
                            }
                            className={`rounded-xl py-3 font-semibold transition ${!form.present
                                    ? "bg-red-600 text-white"
                                    : "bg-gray-800 dark:bg-gray-100 dark:hover:text-black hover:bg-red-600 hover:text-white"
                                }`}
                        >
                            Absent
                        </button>

                    </div>

                </div>

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
                        loadingText={editingId? "Updating..." : "Saving..."}
                        variant={editingId ? "warning" : "primary"}
                        onClick={handleSubmit}
                    >
                        {editingId ? "Update" : "Save"}
                    </Button>

                </div>

            </div>

        </div>
    );
}