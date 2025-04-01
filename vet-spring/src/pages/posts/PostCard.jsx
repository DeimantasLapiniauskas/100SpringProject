import { NavLink } from "react-router";
import { motion } from "framer-motion";
import { useCheckRoles } from "@/hooks/useCheckRoles";

export const PostCard = (props) => {
  const { post } = props;
  const roles = useCheckRoles();
  const { id, postType, content, title, imageUrl } = post;
  if (!post || !post.content) return null;

  return (
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
        {/* <div className={imageUrl ? "grid grid-cols-3 gap-2" : ""}> */}
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
    
      {/* </div> */}
      {roles && (
        <div className="absolute bottom-[-1px] flex gap-2">
          <NavLink to={`/posts/edit/${id}`}>
            <button className="text-xs px-2 sm:px-4 md:px-6 sm:text-sm md:text-base rounded-[5px] text-info-content font-semibold border-1 border-blue-200 cursor-pointer">
              update
            </button>
          </NavLink>
          <button className="text-xs px-2 sm:px-4 md:px-6 sm:text-sm md:text-base rounded-[5px] text-info-content font-semibold border-1 border-blue-200 cursor-pointer">
            delete
          </button>
        </div>
      )}
    </motion.div>
  );
};
