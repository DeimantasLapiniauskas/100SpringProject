import { Rating } from "@smastrom/react-rating";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { useRatingResize} from "@/hooks/useRatingResize";

export const FloatingReviewBubbles = ({
  reviews = [],
  max = 4,
  interval = 10000,
}) => {
  const positionStyles = [
    "top-[28rem] xs:top-[6.5rem] sm:top-[8.5rem] md:top-[10rem] left-[10%] xs:left-[2%] md:left-[3%] lg:left-[5%]",
    "top-[31rem] xs:top-[11.25rem] sm:top-[14rem] md:top-[16.5rem] right-[10%] xs:left-[2%] md:left-[20%] lg:left-[25%]",
    "top-[33rem] xs:top-[16rem] sm:top-[19.5rem] md:top-[23rem] left-[10%] xs:left-[2%] md:left-[3%] lg:left-[5%]",
    "top-[36rem] xs:top-[20.75rem] sm:top-[25rem] md:top-[29.5rem] right-[10%] xs:left-[2%] md:left-[20%] lg:left-[25%]",
  ];

  const [visibleReviews, setVisibleReviews] = useState([]);
  const [previousReviews, setPreviousReviews] = useState([]);
  const [refreshKey, setRefreshKey] = useState(null);

  const visibleRef = useRef([]);
  const ratingSize = useRatingResize("50px", "60px", "70px", "80px")

  const getRandomReviews = () => {
    const array = [...reviews];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.slice(0, max);
  };

  useEffect(() => {
    const firstReviews = getRandomReviews();
    setVisibleReviews(firstReviews);
    visibleRef.current = firstReviews;
    setRefreshKey(Date.now())

    const timer = setInterval(() => {
      const nextReviews = getRandomReviews();
      setPreviousReviews(visibleRef.current);
      setVisibleReviews(nextReviews);
      visibleRef.current = nextReviews;
      setRefreshKey(Date.now())
    }, interval);

    return () => clearInterval(timer);
  }, [reviews, max, interval]);


  return (
    <>
      {previousReviews.map((review, index) => {
        const position = positionStyles[index % positionStyles.length];
        const delay = `${index * 2500}ms`;
        const zIndex = 5 + index;

        return (
          <div
            key={`prev-${review.id}-${refreshKey}`}
            className={`absolute ${position} bg-yellow-50 shadow-md shadow-yellow-500 border border-yellow-400 rounded-[25px] md:rounded-[35px] px-2 py-2 md:px-3 md:py-3 w-[130px] sm:w-[175px] md:w-[200px] lg:w-[225px] responsive-text-xs text-amber-900  opacity-100`}
            style={{
              zIndex,
              animation: `fadeOut 2.5s ease-out ${delay} forwards, floating 2.5s ease-in-out infinite`,
            }}
          >
            <p className="h-[35px] sm:h-[40px] md:h-[45px] lg:h-[50px] overflow-hidden">
              “{review?.comment}”
            </p>
            <div className="mt-0.5 md:mt-1 responsive-text-xs text-info-content flex justify-between">
              <span>– {review?.clientResponseDTO?.firstName}</span>
              <div className="relative">
                <Rating value={review.rating} readOnly style={{maxWidth: ratingSize}}/>
                <span className="absolute top-[9px] sm:top-[11px] md:top-[13px] lg:top-[15px] right-[5px] sm:right-[6px] md:right-[8px] lg:right-[12px] text-[7px] sm:text-[8px] md:text-[9px]">{dayjs(review.createdAt).format("YYYY-MM-DD")}</span>
              </div>
            </div>
          </div>
        );
      })}

      {visibleReviews.map((review, index) => {
        const position = positionStyles[index % positionStyles.length];
        const delay = `${index * 2500}ms`;
        const zIndex = 10 + index;

        return (
          <div
            key={`curr-${review.id}-${refreshKey}`}
            className={`absolute ${position} bg-yellow-50 shadow-md border border-yellow-400  shadow-yellow-500 rounded-[25px] md:rounded-[35px] px-2 py-2 md:px-3 md:py-3 w-[130px] sm:w-[175px] md:w-[200px] lg:w-[225px]  responsive-text-xs text-amber-900  opacity-0`}
            style={{
              zIndex,
              animation: `fadeIn 2.5s ${delay} forwards, floating 2.5s ease-in infinite`,
            }}
          >
            <p className="h-[35px] sm:h-[40px] md:h-[45px] lg:h-[50px] overflow-hidden">
              “{review?.comment}”
            </p>
            <div className=" mt-0.5 md:mt-1 responsive-text-xs text-info-content flex justify-between">
              <span>– {review?.clientResponseDTO?.firstName}</span>
              <div className="relative">
                <Rating value={review.rating} readOnly style={{maxWidth: ratingSize}}/>
                <span className="absolute top-[9px] sm:top-[11px] md:top-[13px] lg:top-[15px] right-[5px] sm:right-[6px] md:right-[8px] lg:right-[12px] text-[7px] sm:text-[8px] md:text-[9px]">{dayjs(review.createdAt).format("YYYY-MM-DD")}</span>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
