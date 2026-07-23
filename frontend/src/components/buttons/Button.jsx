export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
  loading = false,
  loadingText = "Loading...",
}) {

  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    warning: "bg-yellow-500 hover:bg-yellow-600 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        px-4
        py-2
        rounded-xl
        font-medium
        transition
        duration-200
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
    >
      {/* {children} */}

      {loading ?
        (<>
          <span>{loadingText}</span>
        </>
        ) : (children)}
    </button>
  );
}