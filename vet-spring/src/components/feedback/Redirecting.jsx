export const Redirecting = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center text-info-content">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 mb-4" />
      <p className="text-base sm:text-lg md:text-xl font-medium">
        🚀 Redirecting<span className="animate-pulse">...</span>
      </p>
    </div>
  );
};
