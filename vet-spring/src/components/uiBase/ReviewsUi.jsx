import reviewers from "../../assets/icons/reviewers.png";

export const Reviews = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-blue-400 rounded-[15px] px-4 py-2 sm:py-4 md:py-6 lg:py-8 gap-1">
      <img src={reviewers} alt="reviewers" className="w-25 sm:w-50" />
      <p className="text-info-content font-semibold">101 Reviews</p>
    </div>
  );
};
