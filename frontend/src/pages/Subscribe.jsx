// src/pages/Subscribe.js

import API from "../api";

export default function Subscribe() {

  const handleSubscribe = async () => {
    const res = await API.post("create-subscription/");

    const options = {
      key: "rzp_test_xxx",
      subscription_id: res.data.id,
      name: "Coaching Management",
      description: "Monthly Plan",
      handler: function () {
        alert("Payment Successful");
        window.location.href = "/dashboard";
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-2xl font-bold mb-4">Choose Your Plan</h1>

      <div className="border p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold">Basic Plan</h2>
        <p className="text-gray-600">₹499 / month</p>

        <button
          onClick={handleSubscribe}
          className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
        >
          Subscribe Now
        </button>
      </div>
    </div>
  );
}