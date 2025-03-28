export const Loading = () => {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-gray-600">
        <div className="lg:w-[5rem] lg:h-[5rem] lg:border-[10px] md:w-[4.5rem] md:h-[4.5rem] md:border-[10px] sm:w-[4rem] sm:h-[4rem] sm:border-[7px]  w-[3rem] h-[3rem] border-[5px] border-dashed rounded-full animate-spin border-info-content" />
        <p className="mt-3 lg:text-2xl md:text-xl sm:text-lg text-base text-info-content">Loading...</p>
      </div>
    );
  };
  