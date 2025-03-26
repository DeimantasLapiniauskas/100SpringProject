import { NavLink } from "react-router";

export const PostCard = (props) => {
  const { post } = props;
  if (!post || !post.content) return null;

  return (
    <div className="text-center bg-blue-500 text-white rounded-[10px] h-[15rem] p-5">
      <p className="text-2xl">{post.title}</p>
      <p className="py-3">{post.postType}</p>
      <p className=" leading-[20px] text-left  overflow-hidden">
        {post.content.length > 120
          ? post.content.slice(0, 117) + "..."
          : post.content}
      </p>
      <NavLink to={`/posts/${post.id}`}>
        <p className=" text-white hover:underline text-sm font-medium">
          Read more here
        </p>
      </NavLink>
    </div>
  );
};
