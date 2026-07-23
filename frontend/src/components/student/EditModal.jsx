import { useEffect, useState } from "react";
import Button from "../buttons/Button";
import privateAPI from "../../privateapi";

export default function EditStudentModal({
    open,
    onClose,
    student,
    setStudents,
}) {

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        course: "",
    });

    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (student) {
            setFormData({
                name: student.name,
                phone: student.phone,
                course: student.course,
            });
        }
    }, [student]);

    if (!open || !student) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);

            const res = await privateAPI.put(
                `students/${student.id}/`,
                formData
            );

            setStudents((prev) =>
                prev.map((s) =>
                    s.id === student.id ? res.data : s
                )
            );

            onClose();

        } catch (err) {
            console.error(err);

        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

            <div className="w-full max-w-lg bg-gray-900 dark:bg-blue-400/70 rounded-2xl shadow-2xl p-6">

                {/* Header */}

                <h2 className="text-2xl font-bold mb-6 text-white dark:text-black">
                    Edit Student
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <input
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                name: e.target.value,
                            })
                        }
                        className="w-full mb-0 bg-gray-800 dark:bg-gray-100
                            border border-gray-700 rounded-xl px-4 py-3
                            text-white dark:text-black 
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Student Name"
                    />

                    <input
                        value={formData.phone}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                phone: e.target.value,
                            })
                        }
                        className="w-full mb-4 bg-gray-800 dark:bg-gray-100
                            border border-gray-700 rounded-xl px-4 py-3
                            text-white dark:text-black 
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Phone"
                    />

                    <input
                        value={formData.course}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                course: e.target.value,
                            })
                        }
                        className="w-full mb-4 bg-gray-800 dark:bg-gray-100
                            border border-gray-700 rounded-xl px-4 py-3
                            text-white dark:text-black 
                            focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Course"
                    />

                    <div className="flex justify-end gap-3">

                        <Button
                            type="button"
                            variant="secondary"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            loading={saving}
                            loadingText="Updating..."
                        >
                            Update
                        </Button>

                    </div>

                </form>

            </div>

        </div>
    );
}