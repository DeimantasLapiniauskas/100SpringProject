import { motion } from "framer-motion";
import { useCheckAdminAndVetRoles } from "@/hooks/useCheckRoles";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router";
import { ChevronsRight } from "lucide-react";
import "../../index.css";
import dayjs from "dayjs";
import { useUI } from "@/context/UIContext";
import { UIStatus } from "@/constants/UIStatus";
import { Trash2Icon } from "lucide-react";
import { useDeleteModal } from "@/context/DeleteModalContext";

export const PostCard = (props) => {
  const { post } = props;
  const roles = useCheckAdminAndVetRoles();
  const { id, postType, content, title, imageUrl } = post;
  const { Redirecting } = UIStatus;
  const { setStatus } = useUI();
  const navigate = useNavigate();
  const { openDeleteModal } = useDeleteModal();

  if (!post || !post.content) return null;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="card card-side will-change-transform bg-blue-300/15 backdrop-blur-lg p-4 sm:p-5 md:p-6 rounded-xl shadow-lg"
      >
        <div className="text-center bg-gradient-to-br from-blue-200 via-blue-300 to-indigo-400 text-info-content rounded-[10px] h-[20.55rem] sm:h-[25.75rem] md:h-[32rem] p-1.5 sm:p-2.25 md:p-3  shadow-lg shadow-info w-full border-1 border-info">
          <h2
            className={`card-title block break-all h-[40px] sm:h-[55px] md:h-[60px] px-10 sm:px-15 md:px-15 lg:px-5 xl:px-15 text-sm sm:text-lg md:text-xl overflow-hidden break-words ${
              postType === "Sale"
                ? `text-red-700`
                : postType === "Blog"
                ? `text-[#006666]`
                : `text-[#004C99]`
            }`}
          >
            {title.length > 55 ? title.slice(0, 52) + "..." : title}
          </h2>
          <h3
            className={`p-0.5 sm:p-1 md:p-2 font-semibold text-left text-sm sm:text-base md:text-lg ${
              postType === "Sale"
                ? `text-red-700 animate-pulse`
                : postType === "Blog"
                ? `text-[#006666]`
                : `text-[#004C99]`
            }`}
          >
            {postType === "Sale" ? postType + " !" : postType}
          </h3>
          <div className="w-full flex justify-center">
            {post.imageUrl && (
              <img
                src={
                  post.imageUrl.startsWith("http")
                    ? imageUrl
                    : import.meta.env.VITE_API_URL + imageUrl
                }
                alt={title}
                className="object-cover h-[100px] sm:h-[150px] md:h-[200px] w-9/10 rounded-[10px] border-1 border-blue-400 "
              />
            )}
          </div>
          <p
            className={`text-[10px] sm:text-xs md:text-sm p-1 md:p-1.5 ${
              postType === "Sale"
                ? `text-red-700`
                : postType === "Blog"
                ? `text-[#006666]`
                : `text-[#004C99]`
            }`}
          >
            {dayjs(post.createdAt).format("YYYY-MM-DD HH:mm")}
          </p>
          <p
            className={`leading-[20px] text-left overflow-hidden text-xs sm:text-sm md:text-base break-words px-[4px] sm:px-[6px] md:px-[10px] pt-0 ${
              imageUrl
                ? "h-[105px] sm:h-[105px] md:h-[120px]"
                : "h-[205px] sm:h-[255px] md:h-[320px]"
            }`}
          >
            {imageUrl
              ? content.length > 225
                ? content.slice(0, 217) + "..."
                : content
              : content.length > 950
              ? content.slice(0, 947) + "..."
              : content}
          </p>
          <div className="flex justify-center items-center">
            <span>
              <ChevronsRight className=" w-4 sm:w-5 md:w-6 text-white slow-pulse" />
            </span>
            <button
              type="button"
              className=" text-white hover:underline text-xs sm:text-sm md:text-base font-medium p-1 cursor-pointer slow-pulse"
              onClick={() => {
                setStatus(Redirecting);
                navigate(`/posts/view/${id}`);
              }}
            >
              Read more here
            </button>
          </div>
        </div>
        {roles && (
          <div className="absolute bottom-[-1px] flex gap-2">
            <button
              type="button"
              className="text-xs px-2 sm:px-3 md:px-4 sm:text-sm md:text-base rounded-[5px] text-info-content font-semibold border-1 border-blue-200 cursor-pointer inline-flex gap-2 items-center"
              onClick={() => {
                setStatus(Redirecting)
                navigate(`/posts/edit/${id}`);
              }}
            >
              Update
              <Pencil className="w-3 h-3 sm:w-4 sm:h-4  md:w-5 md:h-5 text-warning-content" />
            </button>
            <button
              type="button"
              className="text-xs px-2 sm:px-3 md:px-4 sm:text-sm md:text-base rounded-[5px] text-info-content font-semibold border-1 border-blue-200 cursor-pointer inline-flex gap-2 items-center"
              onClick={() => {
                openDeleteModal(post);
              }}
            >
              Delete
              <Trash2Icon className="w-3 h-3 sm:w-4 sm:h-4  md:w-5 md:h-5 text-red-500" />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
