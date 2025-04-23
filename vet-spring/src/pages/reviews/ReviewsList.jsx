import { useList } from "@/context/ListContext"
import { ReviewCard } from "./ReviewCard"
import { PaginationPanel } from "@/components/features/PaginationPanel"
import { Rating } from "@smastrom/react-rating"

export const ReviewsList = () => {

    const {content: reviews} = useList()
    const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;
  

    console.log("Cia mano data", reviews)
    return(
        <div className="flex flex-col items-center gap-2">
            <Rating value={averageRating} readOnly style={{maxWidth: "150px"}}/>
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