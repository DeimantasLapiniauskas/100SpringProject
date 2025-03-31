import { NavLink } from "react-router";
import { motion } from "framer-motion";

export const PostCard = (props) => {
  const { post } = props;
  const {id, postType, content, title, imageUrl} = post
  if (!post || !post.content) return null;

  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.03 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="card card-side will-change-transform bg-blue-300/15 backdrop-blur-lg p-4 sm:p-5 md:p-6 rounded-xl shadow-lg">
    <div className="text-center bg-gradient-to-br from-blue-200 to-indigo-400 text-info-content rounded-[10px] h-[12rem] sm:h-[13rem] md:h-[15rem] p-1.5 sm:p-2.25 md:p-3 shadow-lg shadow-info w-full border-1 border-info">
      <h2 className={`card-title block break-all min-h-[30px] text-base sm:text-lg md:text-xl  ${postType === "Sale" ? `text-red-500` : postType === "Blog" ? `text-purple-800` : `text-info-content`}`}>{title}</h2>
      <h3 className={`py-1 font-semibold text-left text-sm sm:text-base md:text-lg ${postType === "Sale" ? `text-red-500 animate-pulse` : postType === "Blog" ? `text-purple-800` : `text-info-content`}`}>{postType === "Sale" ? postType + "!" : postType}</h3>
      <div className={imageUrl ? "grid grid-cols-3 gap-2" : ""}>
        <p className=" leading-[20px] text-left overflow-hidden min-h-[100px] sm:min-h-[105px] md:min-h-[110px] max-h-[100px] sm:max-h-[105px] md:max-h-[110px] text-xs sm:text-sm md:text-base  col-span-2 break-words p-[4px] sm:p-[6px] md:p-[8px] ">
          { imageUrl? content.length > 150
            ? content.slice(0, 147) + "..."
            : content : content.length > 200 ? content.slice(0, 197) + "..." : content}
        </p>
        {post.imageUrl && (
          <img
            src={post.imageUrl.startsWith("http") ? imageUrl : import.meta.env.VITE_API_URL + imageUrl}
            alt={title}
            className="object-cover h-[80px] sm:h-[100px] md:h-[120px] rounded-[10px] border-1 w-full border-blue-400"
          />
        )}
      </div>
      <NavLink to={`/posts/${id}`}>
        <p className=" text-white hover:underline text-xs sm:text-sm md:text-base font-medium p-1 ">
          Read more here
        </p>
      </NavLink>
    </div>
    </motion.div>
  );
};
