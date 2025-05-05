import { Rating } from "@smastrom/react-rating";
import dayjs from "dayjs";
import { useRatingResize } from "@/hooks/useRatingResize";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/uiBase/buttonBase";
import { Pencil } from "lucide-react";
import { Trash2Icon } from "lucide-react";
import { useDeleteModal } from "@/context/DeleteModalContext";
import { useNavigate } from "react-router";
import { useUI } from "@/context/UIContext";
import { UIStatus } from "@/constants/UIStatus";
import { motion } from "framer-motion";

export const ReviewCard = (props) => {

  const { review } = props;
  const { Redirecting } = UIStatus;
  const { setStatus } = useUI();
  const { account } = useAuth();
  const { openDeleteModal } = useDeleteModal();
  const navigate = useNavigate();

  const ratingSize = useRatingResize("80px", "90px", "100px", "110px");

  if (!review?.clientResponseDTO) return;
  const { comment, rating, clientResponseDTO, createdAt } = review;

  const yourReview =
    account?.scope?.includes("ROLE_CLIENT") &&
    account?.account_id === review?.clientResponseDTO?.accountResponseDTO?.id;

  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.03 }}
    transition={{ duration: 0.3, delay: 0.2 }}>
    <div className="bg-amber-50 rounded-xl w-[260px] xs:w-[300px] sm:w-sm md:w-md lg:w-lg pb-1 px-3 sm:pb-1.5 sm:px-4 md:pb-2  md:px-5 lg:pb-2.5 lg:px-6 border pt-2 sm:pt-2.5 md:pt-3 lg:pt-3.5 border-yellow-400 shadow-lg shadow-amber-600">
      <div className="flex justify-between">
        <p className="responsive-text-md text-amber-900 min-h-[30px] xs:min-h-[35] sm:min-h-[40px] md:min-h-[45px] lg:min-h-[50px]">
          {comment}
        </p>
        {yourReview && (
          <div className="flex gap-1 sm:gap-1.25 md:gap-1.5 lg:gap-1.75 items-start relative top-[-0.5rem] right-[-0.25rem]">
            <Button
              size="none"
              variant="transparent"
              onClick={() => {
                setStatus(Redirecting);
                navigate(`/reviews/edit/${review.id}`);
              }}
            >
              <Pencil className="w-3 sm:w-3.5 md:w-4 lg:w-4.5 text-amber-700 opacity-70 hover:opacity-100" />
            </Button>
            <Button size="none" variant="transparent">
              <Trash2Icon
                className=" w-3 sm:w-3.5 md:w-4 lg:w-4.5 text-red-500 opacity-70 hover:opacity-100"
                onClick={() => {
                  openDeleteModal(review);
                }}
              />
            </Button>
          </div>
        )}
      </div>
      <div className="flex justify-between pt-1 sm:pt-2 md:pt-3">
        <span className="responsive-text-sm text-info-content">{`- ${clientResponseDTO.firstName} `}</span>
        <Rating
          rating
          value={rating}
          readOnly
          style={{ maxWidth: ratingSize }}
        />
      </div>
      <p className="text-end responsive-text-xs p-0.5 md:p-1 text-info-content">
        {dayjs(createdAt).format("YYYY-MM-DD HH:mm")}
      </p>
    </div>
    </motion.div>
  );
};
