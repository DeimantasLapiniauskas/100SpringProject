import reviewers from "../../assets/icons/reviewers.png";
import pawss from "../../assets/icons/pawssSmall.png";
import { NavLink } from "react-router";
import { useEffect, useState } from "react";
import { getAllEntitys } from "@/utils/helpers/entity";
import { Rating } from "@smastrom/react-rating";

export const ReviewsPanel = () => {
  const [reviews, setRewies] = useState([]);
  const averageReview =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;
  const [ratingSize, setRatingSize] = useState("60px");

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 640) setRatingSize("60px");
      else if (width < 768) setRatingSize("70px");
      else if (width < 1024) setRatingSize("80px");
      else setRatingSize("90px");
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const getAllReviews = async () => {
      const response = await getAllEntitys("reviews");

      const { data } = response.data;

      if (data) {
        setRewies(data.reviewResponseListDTO);
      }
    };
    getAllReviews();
  }, []);

  return (
    <div className="rounded-[15px] px-2 sm:px-3 md:px-4 py-2 sm:py-4 md:py-6 lg:py-8  max-w-[300px] max-h-[200px] xs:min-w-[122px] sm:min-w-[160px] md:min-w-[182px] lg:min-w-[205px] relative">
      <div className="bg-gradient-to-b from-blue-500 via-info to-blue-500 fade fade-out rounded-[15px]"></div>
      <div className="bg-gradient-to-t from-info-content via-blue-300 to-info-content fade fade-in rounded-[15px]"></div>
      <div className="relative z-10 flex flex-col justify-center items-center ">
        <img src={reviewers} alt="reviewers" className="w-25 sm:w-50" />
        <div className="flex gap-1 sm:gap-1.5 md:gap-2 lg:gap-2.5">
          <p className="text-info-content font-semibold text-[10px] sm:text-xs md:text-sm lg:text-base">
            <span>{reviews.length}</span> Reviews
          </p>
            <Rating
              value={averageReview}
              readOnly
              style={{ maxWidth: ratingSize }}
            />
        </div>
        <div className="relative">
          <img
            src={pawss}
            alt="pawws"
            className="w-[14px] sm:w-[17px] md:w-[20px] lg:w-[24px] absolute left-[-15px] sm:left-[-18px] md:left-[-21px] lg:left-[-25px]"
          />
          <NavLink to={"/reviews/leaveReview"}>
            <p className="text-white text-[9px] sm:text-[10px] md:text-xs lg:text-sm hover:underline slow-pulse">
              Leave a review
            </p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
