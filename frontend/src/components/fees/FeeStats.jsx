import StatCard from "../card/StartCard";
import GlowBG from "../backgroundglow/GlowBG";
import {
  FaMoneyBillWave,
  FaWallet,
  FaUserGraduate,
  FaChartLine,
} from "react-icons/fa";

export default function FeeStats({ fees }) {
  const totalFees = fees.reduce(
    (sum, fee) => sum + Number(fee.total_fee),
    0
  );
  
  const collected = fees.reduce(
    (sum, fee) => sum + Number(fee.paid_fee),
    0
  );

  const pending = totalFees - collected;

  const paidStudents = fees.filter(
    (fee) => Number(fee.due) === 0
  ).length;
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">

      <StatCard
        title="Total Fees"
        value={`₹${totalFees.toLocaleString()}`}
        description="Overall fee amount"
        icon={<FaWallet />}
        iconColor="bg-blue-500"
      />

      <StatCard
        title="Collected"
        value={`₹${collected.toLocaleString()}`}
        description="Amount received"
        icon={<FaMoneyBillWave />}
        iconColor="bg-green-500"
      />

      <StatCard
        title="Pending"
        value={`₹${pending.toLocaleString()}`}
        description="Outstanding balance"
        icon={<FaChartLine />}
        iconColor="bg-red-500"
      />

      <StatCard
        title="Paid Students"
        value={paidStudents}
        description="Fully paid students"
        icon={<FaUserGraduate />}
        iconColor="bg-purple-500"
      />

    </div>
  );
}