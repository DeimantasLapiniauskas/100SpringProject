import { NavLink } from "react-router";
import { motion } from "framer-motion";

export const PostCard = (props) => {
  const { post } = props;
  const {id, postType, content, title} = post
  if (!post || !post.content) return null;

  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.03 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="card card-side will-change-transform bg-blue-300/15 backdrop-blur-lg p-6 rounded-xl shadow-lg ">
    <div className="text-center bg-gradient-to-br from-blue-300 to-indigo-500 text-info-content rounded-[10px] h-[15rem] p-5 shadow-lg shadow-info">
      <h2 className={`card-title block break-all min-h-[50px] ${postType === "Sale" ? `text-red-500` : postType === "Blog" ? `text-purple-800` : `text-info-content`}`}>{title}</h2>
      <h3 className={`py-1 font-semibold text-left ${postType === "Sale" ? `text-red-500 animate-pulse` : postType === "Blog" ? `text-purple-800` : `text-info-content`}`}>{postType === "Sale" ? postType + "!" : postType}</h3>
      <p className=" leading-[20px] text-left overflow-hidden min-h-[100px] text-sm ">
        {content.length > 120
          ? content.slice(0, 117) + "..."
          : content}
      </p>
      <NavLink to={`/posts/${id}`}>
        <p className=" text-white hover:underline text-sm font-medium p-1">
          Read more here
        </p>
      </NavLink>
    </div>
    </motion.div>
  );
};
