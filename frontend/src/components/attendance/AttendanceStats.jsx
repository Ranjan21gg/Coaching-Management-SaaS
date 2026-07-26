import { FaUserGraduate, FaCheckCircle, FaTimesCircle, FaChartPie } from "react-icons/fa";
import StatCard from "../card/StartCard";
import { todayAbsentCount, todayAttendancePercentage, todayPresentCount } from "./AttendanceFilters";

export default function AttendanceStats({ students, attendance }) {

    const present = attendance.filter(a => a.present).length;
    const absent = attendance.filter(a => !a.present).length;

    const percentage =
        attendance.length > 0
            ? Math.round((present / attendance.length) * 100)
            : 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <StatCard
                title="Students"
                value={students.length}
                description="Registered students"
                icon={<FaUserGraduate/>}
                iconColor="bg-blue-500"
            />

            <StatCard
                title="Present"
                value={todayPresentCount(attendance)}
                description="Present today"
                icon={<FaCheckCircle />}
                iconColor="bg-green-500"
            />

            <StatCard
                title="Absent"
                value={todayAbsentCount(attendance)}
                description="Absent today"
                icon={<FaTimesCircle />}
                iconColor="bg-red-500"
            />

            <StatCard
                title="Attendance %"
                value={`${todayAttendancePercentage(attendance,students.length)}%`}
                description="Today's attendance"
                icon={<FaChartPie />}
                iconColor="bg-purple-500"
            />

        </div>
    );
}