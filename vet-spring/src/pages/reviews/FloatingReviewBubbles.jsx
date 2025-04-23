import { useEffect, useRef, useState } from "react";

export const FloatingReviewBubbles = ({ myReviewsFromBackend = [], max = 4, interval = 10000 }) => {
  const positionStyles = [
    "top-[70%] xs:top-[17%] sm:top-[23%] md:top-[10rem] left-[10%] xs:left-[2%] md:left-[3%] lg:left-[5%]",
    "top-[76%] xs:top-[28%] sm:top-[35%] md:top-[16.5rem] right-[10%] xs:left-[2%] md:left-[20%] lg:left-[25%]",
    "top-[82%] xs:top-[39%] sm:top-[47%] md:top-[23rem] left-[10%] xs:left-[2%] md:left-[3%] lg:left-[5%]",
    "top-[88%] xs:top-[50%] sm:top-[59%] md:top-[29.5rem] right-[10%] xs:left-[2%] md:left-[20%] lg:left-[25%]" ]

  const [visibleReviews, setVisibleReviews] = useState([]);
  const [previousReviews, setPreviousReviews] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const visibleRef = useRef([]);

  const getRandomReviews = () => {
    const array = [...myReviewsFromBackend];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.slice(0, max);
  };

  useEffect(() => {
    const first = getRandomReviews();
    setVisibleReviews(first);
    visibleRef.current = first;

    const timer = setInterval(() => {
      const next = getRandomReviews();
      setPreviousReviews(visibleRef.current);
        setVisibleReviews(next);
        visibleRef.current = next;
        setRefreshKey((prev) => prev + 1);
    }, interval);

    return () => clearInterval(timer);
  }, [myReviewsFromBackend, max, interval]);

  return (
    <>
    
      {previousReviews.map((review, index) => {
        const position = positionStyles[index % positionStyles.length];
        const delay = `${index * 2500}ms`
        const zIndex = 5 + index;

        return (
          <div
            key={`prev-${review.id}-${refreshKey}`}
            className={`absolute ${position} bg-yellow-50 shadow-md shadow-yellow-500 border border-yellow-400 rounded-xl px-2 py-1 md:px-3 md:py-2 max-w-[130px] sm:max-w-[175px] md:max-w-[200px] lg:max-w-[225px] responsive-text-xs text-amber-900  opacity-100`}
            style={{ 
                zIndex,
            animation : `fadeOut 2.5s ease-out ${delay} forwards, floating 2.5s ease-in-out infinite` }}
          >
            <p className="min-h-[35px] max-h-[35px] sm:min-h-[40px] sm:max-h-[40px] md:min-h-[45px] md:max-h-[45px] lg:min-h-[50px] lg:max-h-[50px] overflow-hidden">“{review.comment}”</p>
            <div className="mt-1 responsive-text-xs text-info-content ">– {review.author}</div>
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
            className={`absolute ${position} bg-yellow-50 shadow-md border border-yellow-400  shadow-yellow-500 rounded-xl px-2 py-1 md:px-3 md:py-2 max-w-[130px] sm:max-w-[175px] md:max-w-[200px] lg:max-w-[225px]  responsive-text-xs text-amber-900  opacity-0`}
            style={{
              zIndex,
              animation: `fadeIn 2.5s ${delay} forwards, floating 2.5s ease-in-out infinite`,
            }}
          >
            <p className="min-h-[35px] max-h-[35px] sm:min-h-[40px] sm:max-h-[40px] md:min-h-[45px] md:max-h-[45px] lg:min-h-[50px] lg:max-h-[50px] overflow-hidden">“{review.comment}”</p>
            <div className="mt-1 responsive-text-xs text-info-content ">– {review.author}</div>
          </div>
        );
      })}
    </>
  );
};
