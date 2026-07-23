import Button from "../buttons/Button";

export default function DateFilterModal({
    open,
    onClose,
    customDate,
    setCustomDate,
    onApply,
}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">

            <div className="w-full max-w-sm bg-gray-900 dark:bg-white rounded-2xl p-6">

                <h2 className="text-xl font-bold mb-5">
                    Select Date
                </h2>

                <input
                    type="date"
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                    className="w-full rounded-xl border border-gray-700 bg-gray-800 dark:bg-gray-100 px-4 py-3"
                />

                <div className="flex justify-end gap-3 mt-6">

                    <Button
                        variant="secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="primary"
                        onClick={onApply}
                    >
                        Apply
                    </Button>

                </div>

            </div>

        </div>
    );
}