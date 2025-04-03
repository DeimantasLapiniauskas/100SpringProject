import { NavLink } from "react-router";
import { motion } from "framer-motion";
import { useCheckRoles } from "@/hooks/useCheckRoles";
import { deletePost } from "@/utils/helpers/posts";
import toast from "react-hot-toast";
import { useState } from "react";
import { DeletePostModal } from "./DeletePostModal";
import { UIStatus } from "@/constants/UIStatus";
import { useUI } from "@/context/UIContext";
import { useIsMounted } from "@/hooks/useIsMounted";
import { Pencil } from "lucide-react"

export const PostCard = (props) => {
  const { post, getPage, currentPage, pageSize, sorted } = props;
  const roles = useCheckRoles();
  const { id, postType, content, title, imageUrl } = post;
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {Loading: Fetching, Success, Error: Err, Unusual} = UIStatus
  const { setStatus} = useUI();

  const isMounted = useIsMounted();

  if (!post || !post.content) return null;

  const handleDelete = async (id) => {
    try {
      setStatus(Fetching)

      if (id) {
      await deletePost(id);
      toast.success("Post deleted successfully");
      await getPage(pageSize, currentPage, sorted);

      if (!isMounted.current) return
      setStatus(Success)
      } else {
        if (!isMounted.current) return
        setStatus(Unusual)
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ?? error.message ?? "Unknown error";
        if (!isMounted.current) return;
      setError(errorMessage);
      toast.error(errorMessage)
      setStatus(Err)
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="card card-side will-change-transform bg-blue-300/15 backdrop-blur-lg p-4 sm:p-5 md:p-6 rounded-xl shadow-lg"
      > 
        <div className="text-center bg-gradient-to-br from-blue-200 to-indigo-400 text-info-content rounded-[10px] h-[12.5rem] sm:h-[15rem] md:h-[30rem] p-1.5 sm:p-2.25 md:p-3 shadow-lg shadow-info w-full border-1 border-info">
          <h2
            className={`card-title block break-all min-h-[58px]  text-sm sm:text-lg md:text-xl ${
              postType === "Sale"
                ? `text-red-500`
                : postType === "Blog"
                ? `text-info-content`
                : `text-info-content`
            }`}
          >
            {title}
          </h2>
          <h3
            className={`  p-1 sm:p-1.5 md:p-2 font-semibold text-left text-sm sm:text-base md:text-lg ${
              postType === "Sale"
                ? `text-red-500 animate-pulse`
                : postType === "Blog"
                ? `text-info-content`
                : `text-info-content`
            }`}
          >
            {postType === "Sale" ? postType + "!" : postType}
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
                className="object-cover h-[80px] sm:h-[95px] md:h-[200px] w-9/10 rounded-[10px] border-1  border-blue-400 "
              />
            )}
          </div>
          <p></p>
          <p className=" leading-[20px] text-left overflow-hidden min-h-[105px] sm:min-h-[105px] md:min-h-[120px] max-h-[105px] sm:max-h-[105px] md:max-h-[120px] text-xs sm:text-sm md:text-base  col-span-2 break-words p-[4px] sm:p-[6px] md:p-[10px] ">
            {imageUrl
              ? content.length > 225
                ? content.slice(0, 217) + "..."
                : content
              : content.length > 250
              ? content.slice(0, 247) + "..."
              : content}
          </p>
          <NavLink to={`/posts/${id}`}>
            <p className=" text-white hover:underline text-xs sm:text-sm md:text-base font-medium p-1 ">
              <u>Read more here</u>
            </p>
          </NavLink>
        </div>
        {roles && (
          <div className="absolute bottom-[-1px] flex gap-2">
            <NavLink to={`/posts/edit/${id}`}>
              <button type="button" className="text-xs px-2 sm:px-3 md:px-4 sm:text-sm md:text-base rounded-[5px] text-info-content font-semibold border-1 border-blue-200 cursor-pointer inline-flex gap-2 items-center">
                Update
                <Pencil className="w-3 h-3 sm:w-4 sm:h-4  md:w-5 md:h-5 text-warning-content"/>
              </button>
            </NavLink>
            <DeletePostModal
              title={title}
              onConfirm={() => handleDelete(id)}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          </div>
        )}
      </motion.div>
    </div>
  );
};
