export const Redirecting = () => {
  return (
    <div className="flex flex-col items-center justify-center py-6 sm:py-8 md:py-10 text-center text-info-content h-full ">
      <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 border-t-2 sm:border-t-3 lg:border-t-4 border-blue-500 mb-4" />
      <p className="text-sm sm:text-base md:text-lg font-medium">
        🚀 Redirecting<span className="animate-pulse">...</span>
      </p>
    </div>
  );
};
