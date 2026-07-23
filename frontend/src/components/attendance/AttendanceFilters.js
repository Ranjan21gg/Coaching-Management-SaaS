export function filterAttendance(
    attendance,
    students,
    search,
    statusFilter,
    dateFilter,
    customDate
) {
    return attendance.filter((item) => {

        const student = students.find(s => s.id === item.student);

        const studentName = student?.name.toLowerCase() || "";
        
        const attendanceDate = new Date(item.date);
        const today = new Date();

        if (
            search &&
            !studentName.includes(search.toLowerCase())
        ) {
            return false;
        }

        if (
            statusFilter === "present" &&
            !item.present
        ) {
            return false;
        }

        if (
            statusFilter === "absent" &&
            item.present
        ) {
            return false;
        }

        if (dateFilter === "today") {
            if (
                attendanceDate.toDateString() !==
                today.toDateString()
            )
                return false;
        }

        if (dateFilter === "yesterday") {

            const yesterday = new Date();

            yesterday.setDate(today.getDate() - 1);

            if (
                attendanceDate.toDateString() !==
                yesterday.toDateString()
            )
                return false;
        }

        if (dateFilter === "week") {

            const week = new Date();

            week.setDate(today.getDate() - 7);

            if (attendanceDate < week)
                return false;
        }

        if (dateFilter === "month") {

            if (
                attendanceDate.getMonth() !==
                today.getMonth() ||
                attendanceDate.getFullYear() !==
                today.getFullYear()
            )
                return false;
        }

        if (dateFilter === "custom") {

            if (
                customDate &&
                attendanceDate
                    .toISOString()
                    .split("T")[0] !== customDate
            )
                return false;
        }

        return true;

    });
}