import reviewers from "../../assets/icons/reviewers.png";
import pawss from "../../assets/icons/pawssSmall.png";

export const ReviewsPanel = () => {
  return (
    <div className="rounded-[15px] px-4 py-2 sm:py-4 md:py-6 lg:py-8  max-w-[300px] max-h-[200px] relative">
      <div className="bg-gradient-to-b from-blue-500 via-info to-blue-500 fade fade-out rounded-[15px]"></div>
      <div className="bg-gradient-to-t from-info-content via-blue-300 to-info-content fade fade-in rounded-[15px]"></div>
      <div className="relative z-10 flex flex-col justify-center items-center ">
        <img src={reviewers} alt="reviewers" className="w-25 sm:w-50" />
        <p className="text-info-content font-semibold">101 Reviews</p>
        <div className="relative">
          <img src={pawss} alt="pawws" className="w-[14px] sm:w-[17px] md:w-[20px] lg:w-[24px] absolute left-[-15px] sm:left-[-18px] md:left-[-21px] lg:left-[-25px]" />
          <p className="text-white text-[10px] sm:text-xs md:text-[13px] lg:text-sm hover:underline animate-pulse">
            Leave a review
          </p>
        </div>
      </div>
    </div>
  );
};
