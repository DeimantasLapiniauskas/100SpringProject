import { Rating } from "@smastrom/react-rating"
import dayjs from "dayjs"

export const ReviewCard = (props) => {

    const {review} = props
    const {comment, rating, clientResponseDTO, createdAt} = review

    if (!review?.clientResponseDTO) return

    return (
        <div className="bg-amber-50 rounded-xl w-lg p-4">
            <p>{comment}</p>
            <div className="flex justify-between">
                <span>{`- ${clientResponseDTO.firstName} `}</span>
                <Rating rating value={rating} readOnly style={{maxWidth: "115px"}}/>
            </div>
            <p>{dayjs(createdAt).format("YYYY-MM-DD HH:mm")}</p>
        </div>
    )
}