import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const FloatingReviewBubbles = ({ myReviewsFromBackend = [], max = 4, interval = 10000 }) => {
  const positionStyles = [
    "top-[10%] left-4",
    "top-[20%] right-[5%]",
    "top-[5%] right-[25%]",
    "top-[50%] left-[1%]",
  ];

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

  const fadeVariant = {
    initial: { opacity: 0, y: 0 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10, scale: 0.9, filter: "blur(2px)" },
  };

  return (
    <>
      <AnimatePresence>
        {previousReviews.map((review, index) => {
          const position = positionStyles[index % positionStyles.length];
          const zIndex = 5 + index;
          return (
            <motion.div
              key={`prev-${review.id}-${refreshKey}`}
              className={`absolute ${position} animate-floating bg-white shadow-md rounded-xl px-4 py-3 max-w-xs text-sm text-gray-700 min-h-[80px]`}
              style={{ zIndex }}
              variants={fadeVariant}
              initial="animate"
              animate="exit"
              exit="initial"
              transition={{ duration: 2.5, ease: "easeOut", delay: index * 2.5  }}
            >
              <p>“{review.comment}”</p>
              <div className="mt-1 text-xs text-gray-500">– {review.author}</div>
            </motion.div>
          );
        })}

        {visibleReviews.map((review, index) => {
          const position = positionStyles[index % positionStyles.length];
          const zIndex = 10 + index;
          return (
            <motion.div
              key={`curr-${review.id}-${refreshKey}`}
              className={`absolute ${position} bg-white shadow-md rounded-xl px-4 py-3 max-w-xs text-sm text-gray-700 min-h-[80px] animate-floating absolute `}
              style={{ zIndex }}
              variants={fadeVariant}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 2.5, ease: "easeIn", delay: index * 2.5 }}
            >
              <p>“{review.comment}”</p>
              <div className="mt-1 text-xs text-gray-500">– {review.author}</div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </>
  );
};