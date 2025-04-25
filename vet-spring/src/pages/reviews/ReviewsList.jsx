import { useList } from "@/context/ListContext"
import { ReviewCard } from "./ReviewCard"
import { PaginationPanel } from "@/components/features/PaginationPanel"
import { Rating } from "@smastrom/react-rating"
import { useState, useEffect } from "react"

export const ReviewsList = () => {

    const {content: reviews, isEmpty, error, message} = useList()
    const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;
      const [ratingSize, setRatingSize] = useState("105");
  
      useEffect(() => {
        const handleResize = () => {
          const width = window.innerWidth;
    
          if (width < 640) setRatingSize("105px");
          else if (width < 768) setRatingSize("120px");
          else if (width < 1024) setRatingSize("135px");
          else setRatingSize("150px");
        };
    
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);
    
    return(
        <div className="flex flex-col items-center gap-2">
            <Rating value={averageRating} readOnly style={{maxWidth: ratingSize}}/>
            <div className="flex flex-col items-center gap-2 p-5">
                {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review}/>
                ))}
            </div>
            <div>
                <PaginationPanel/>
            </div>
        </div>
    )
}