import reviewers from "../../assets/icons/reviewers.png";

export const Reviews = () => {
  return (
    <div className="flex flex-col justify-center items-center  bg-gradient-to-b from-blue-500 via-info to-blue-500 rounded-[15px] px-4 py-2 sm:py-4 md:py-6 lg:py-8  max-w-[300px] max-h-[200px]">
      <img src={reviewers} alt="reviewers" className="w-25 sm:w-50" />
      <p className="text-info-content font-semibold">101 Reviews</p>
      <p className="text-white text-[10px] sm:text-xs md:text-sm hover:underline animate-pulse">Leave a review</p>
    </div>
  );
};
