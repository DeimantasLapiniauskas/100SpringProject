import { useState, useEffect } from "react";

 export const useRatingResize = (baseSize, sm, md, lg) => {

    const [ratingSize, setRatingSize] = useState(baseSize);

    useEffect(() => {
                const handleResize = () => {
                  const width = window.innerWidth;
            
                  if (width < 640) setRatingSize(baseSize);
                  else if (width < 768) setRatingSize(sm);
                  else if (width < 1024) setRatingSize(md);
                  else setRatingSize(lg);
                };
            
                handleResize();
                window.addEventListener("resize", handleResize);
                return () => window.removeEventListener("resize", handleResize);
              }, []);

              return ratingSize;
}