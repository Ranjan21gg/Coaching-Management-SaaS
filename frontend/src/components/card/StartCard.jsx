export default function StatCard({
  title,
  value,
  description,
  icon,
  iconColor = "bg-blue-500",
  className = "",
}) {
  return (
    <div
      className={`
        bg-gray-800/80
        dark:bg-white
        border
        border-blue-700
        rounded-2xl
        p-6
        shadow-xl
        hover:scale-[1.02]
        transition
        truncate
        ${className}
      `}
    >
      <div className="flex justify-between items-center">

        <div>
          <p className="text-gray-400 dark:text-gray-600 text-sm">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-2 text-white dark:text-black">
            {value}
          </h2>
        </div>

        <div className={`${iconColor} p-3 rounded-xl text-white`}>
          {icon}
        </div>

      </div>

      <p className="mt-5 text-gray-400 dark:text-gray-600 text-sm">
        {description}
      </p>
    </div>
  );
}