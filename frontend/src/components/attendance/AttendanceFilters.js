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



// present count for today
export function todayPresentCount(attendance) {
    const today = new Date().toISOString().split("T")[0];

    return attendance.filter((record) =>
        record.present &&
        record.date.slice(0, 10) === today
    ).length;
};

// absent count for today
export const todayAbsentCount = (attendance) => {
  const today = new Date().toISOString().split("T")[0];

  return attendance.filter(
    (record) =>
      !record.present &&
      record.created_at.slice(0, 10) === today
  ).length;
};

// attendance percentage for today
export const todayAttendancePercentage = (attendance, totalStudents) => {
  if (!totalStudents) return 0;

  const present = todayPresentCount(attendance);

  return Math.round((present / totalStudents) * 100);
};