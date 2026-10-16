export default function LoadingSpinner({ loadingTitle }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] w-full p-8">
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20"></div>
        <div className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
      </div>

      <p className="mt-4 text-sm font-medium text-gray-400 tracking-wide animate-pulse">
        Loading {loadingTitle}...
      </p>
    </div>
  );
}
