import { getPostById } from "@/utils/helpers/posts";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { UIStatus } from "@/constants/UIStatus";
import { useUI } from "@/context/UIContext";
import { useIsMounted } from "@/hooks/useIsMounted";
import { Loading } from "@/components/feedback/Loading";
import { Error } from "@/components/feedback/Error";
import { Unusual } from "@/components/feedback/Unusual";

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
    <div>
      <p>{post.title}</p>
      <p>{post.postType}</p>
      <p>{post.content}</p>
      <img src={post.imageUrl} alt="postImage" />
    </div>
  );
};
