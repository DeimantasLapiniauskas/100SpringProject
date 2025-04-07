import { getPostById } from "@/utils/helpers/posts";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { UIStatus } from "@/constants/UIStatus";
import { useUI } from "@/context/UIContext";
import { useIsMounted } from "@/hooks/useIsMounted";
import { Loading } from "@/components/feedback/Loading";
import { Error } from "@/components/feedback/Error";
import { Unusual } from "@/components/feedback/Unusual";
import catSilhouette from "../../assets/icons/catSilhouette.svg"

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
        <img src={catSilhouette} alt="catSilhouette" className="w-10 bg-blue-100"/>
        <h2
          className={`w-full text-center text-xl font-semibold ${
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
      <div className="grid grid-cols-3 p-4">
        <div className="col-span-2">
          <h1
            className={`font-semibold break-words text-lg px-5 text-center ${
              post.postType === "Sale"
                ? `text-red-700`
                : post.postType === "Blog"
                ? `text-[#006666]`
                : `text-[#004C99]`
            }`}
          >
            {post.title}
          </h1>
          <p className="break-words break-all p-3">{post.content}</p>
        </div>
        {post?.imageUrl ? <img src={post.imageUrl} alt="postImage" className="rounded-[10px]"/> : ""}
      </div>
    </div>
  );
};
