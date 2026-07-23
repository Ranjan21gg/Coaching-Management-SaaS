import Loader from "./Loader";

export default function FullScreenLoader({
  children,
  text = "Loading...",
  loading,
}) {
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="fixed flex items-center justify-center gap-4 bg-blue-500 inset-0 z-[9999] bg-black/40 backdrop-blur-sm">
          <Loader size={40} />

          <p className="text-lg font-semibold">
            {text}
          </p>

        </div>
      </div>
    );
  }
  return children;
};