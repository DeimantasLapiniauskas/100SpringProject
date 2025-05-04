export const Loading = () => {
    return (
      <div className="flex flex-col items-center justify-center py-6 sm:py-8 md:py-10 text-info-content h-full">
        <div className="lg:w-[5rem] lg:h-[5rem] lg:border-[10px] md:w-[4.5rem] md:h-[4.5rem] md:border-[10px] sm:w-[4rem] sm:h-[4rem] sm:border-[7px]  w-[3rem] h-[3rem] border-[5px] border-dashed rounded-full animate-spin border-sky-900" />
        <p className="mt-3 lg:text-2xl md:text-xl sm:text-lg text-base text-sky-900">Loading...</p>
      </div>
    );
  };
  export const LoadingSmall = () => {
    return (
      <div className="flex flex-col items-center justify-center py-1 md:py-2 text-info-content h-full">
        <div className="lg:w-[2rem] lg:h-[2rem] lg:border-[5px] md:w-[1.5rem] md:h-[1.5rem] md:border-[5px] sm:w-[1.25rem] sm:h-[1.25rem] sm:border-[3px]  w-[1rem] h-[1rem] border-[2px] border-dashed rounded-full animate-spin border-info-content" />
      </div>
    );
  };
  