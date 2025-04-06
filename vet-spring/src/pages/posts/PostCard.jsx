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
import { Pencil } from "lucide-react";

export const PostCard = (props) => {
  const { post, getPage, currentPage, pageSize, sorted } = props;
  const roles = useCheckRoles();
  const { id, postType, content, title, imageUrl } = post;
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { Loading, Success, Error, Unusual } = UIStatus;
  const { setStatus } = useUI();

  const isMounted = useIsMounted();

  if (!post || !post.content) return null;

  const handleDelete = async (id) => {
    try {
      setStatus(Loading);

      if (id) {
        await deletePost(id);
        toast.success("Post deleted successfully");
        await getPage(pageSize, currentPage, sorted);

        if (!isMounted.current) return;
        setStatus(Success);
      } else {
        setStatus(Unusual);
      }
    } catch (error) {
      
      if (!isMounted.current) return;
      
      const errorMessage =
        error.response?.data?.message ?? error.message ?? "Unknown error";
      setStatus(Error);
      setError(errorMessage);
      toast.error(errorMessage);
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
        <div className="text-center bg-gradient-to-br from-blue-200 to-indigo-400 text-info-content rounded-[10px] h-[19rem] sm:h-[24.5rem] md:h-[30rem] p-1.5 sm:p-2.25 md:p-3 shadow-lg shadow-info w-full border-1 border-info">
          <h2
            className={`card-title block break-all min-h-[40px] sm:min-h-[55px] md:min-h-[60px] max-h-[40px] sm:max-h-[55px] md:max-h-[60px] px-10 sm:px-15 md:px-15 lg:px-5 xl:px-15 text-sm sm:text-lg md:text-xl overflow-hidden ${
              postType === "Sale"
                ? `text-red-700`
                : postType === "Blog"
                ? `text-[#006666]`
                : `text-[#004C99]`
            }`}
          >
            {title}
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
                className="object-cover h-[100px] sm:h-[150px] md:h-[200px] w-9/10 rounded-[10px] border-1 border-blue-400 "
              />
            )}
          </div>
          <p
            className={`leading-[20px] text-left overflow-hidden text-xs sm:text-sm md:text-base break-words p-[4px] sm:p-[6px] md:p-[10px] ${
              imageUrl
                ? "min-h-[105px] sm:min-h-[105px] md:min-h-[120px] max-h-[105px] sm:max-h-[105px] md:max-h-[120px]"
                : "min-h-[205px] sm:min-h-[255px] md:min-h-[320px] max-h-[205px] sm:max-h-[255px] md:max-h-[320px]"
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
          <NavLink to={`/posts/view/${id}`}>
            <p className=" text-white hover:underline text-xs sm:text-sm md:text-base font-medium p-1 ">
              Read more here
            </p>
          </NavLink>
        </div>
        {roles && (
          <div className="absolute bottom-[-1px] flex gap-2">
            <NavLink to={`/posts/edit/${id}`}>
              <button
                type="button"
                className="text-xs px-2 sm:px-3 md:px-4 sm:text-sm md:text-base rounded-[5px] text-info-content font-semibold border-1 border-blue-200 cursor-pointer inline-flex gap-2 items-center"
              >
                Update
                <Pencil className="w-3 h-3 sm:w-4 sm:h-4  md:w-5 md:h-5 text-warning-content" />
              </button>
            </NavLink>
            <DeletePostModal
              postTitle={title}
              handleDelete={() => handleDelete(id)}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          </div>
        )}
      </motion.div>
    </div>
  );
};
