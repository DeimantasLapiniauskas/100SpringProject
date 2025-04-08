import { getPostById } from "@/utils/helpers/posts";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { UIStatus } from "@/constants/UIStatus";
import { useUI } from "@/context/UIContext";
import { useIsMounted } from "@/hooks/useIsMounted";
import { Loading } from "@/components/feedback/Loading";
import { Error } from "@/components/feedback/Error";
import { Unusual } from "@/components/feedback/Unusual";
import "../../index.css"

export const PostView = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [error, setError] = useState(null);
  const { Loading: Fetching, Success, Error: Err, Unusual: Unknown } = UIStatus;
  const { isLoading, isError, isUnusual, setStatus } = useUI();

  const isMounted = useIsMounted();

  const getPost = async () => {
    try {
      setStatus(Fetching);
      const response = await getPostById(postId);
      if (!isMounted.current) return;

      const { data, success } = response.data;

      if (data && success) {
        setStatus(Success);
        setPost(data);
      } else {
        setStatus(Unknown);
        setPost(null);
      }
    } catch (error) {
      if (!isMounted.current) return;

      const errorMessage =
        error.response?.data?.message ?? error.message ?? "Unknown error";
      setError(errorMessage);
      setStatus(Err);
      setPost(null);
    }
  };

  useEffect(() => {
    getPost();
  }, [postId]);

  if (isLoading) {
    return <Loading />;
  }

  if (isUnusual) {
    return <Unusual error={error} />;
  }
  if (isError) {
    return <Error error={error} isHidden={!error} />;
  }

  return (
    <div className="max-w-[1500px] mx-auto mt-4 bg-gradient-to-b from-blue-100 via-blue-100 to-blue-300 min-h-screen rounded-[10px]">
      <div className="flex">
        <h2
          className={`w-full text-center text-base sm:text-lg md:text-xl font-semibold ${
            post.postType === "Sale"
              ? `text-red-700`
              : post.postType === "Blog"
              ? `text-[#006666]`
              : `text-[#004C99]`
          }`}
        >
          {post.postType}
        </h2>
      </div>
      <div className="p-4">
        <div className="col-span-2">
          <h1
            className={`font-semibold break-words text-base sm:text-lg md:text-xl px-5 text-center ${
              post.postType === "Sale"
                ? `text-red-700`
                : post.postType === "Blog"
                ? `text-[#006666]`
                : `text-[#004C99]`
            }`}
          >
            {post.title}
          </h1>
          <p className="break-words break-all py-3 ms:py-4 md:py-5 px-3 sm:px-6 md:px-12 lg:px-15 text-xs sm:text-sm md:text-base">{post?.imageUrl ? <img src={post.imageUrl} alt="postImage" className="rounded-[10px] float-right w-full h-[10rem] xs:h-[12rem] md:h-[15rem] lg:h-[20rem] xs:w-2/3 md:w-1/2 mb-1 ms-2 object-cover"/> : ""}{post.content}</p>
        </div>
      </div>
    </div>
  );
};
