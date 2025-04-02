import { getPostById } from "@/utils/helpers/posts";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { PostRegister } from "./PostRegister";
import { UIStatus } from "@/constants/UIStatus";
import { useUI } from "@/context/UIContext";
import { Loading } from "@/components/feedback/Loading";
import { useIsMounted } from "@/hooks/useIsMounted";

export const PostEditPage = () => {
  const { postId } = useParams();
  const [initialData, setInitialData] = useState(null);
  const { Loading: Fetching, Success, Error } = UIStatus;
  const { isLoading, isError, setStatus } = useUI();
  const [error, setError] = useState(null);
  const isMounted = useIsMounted();

  useEffect(() => {
    const fectchPost = async () => {
      try {
        setStatus(Fetching);
        const response = await getPostById(postId);
       const {data, success} = response.data
        if (data && success) {
          if (!isMounted.current) return;
          setInitialData(data);
          console.log("Ziurek cia",initialData)
          setStatus(Success);
        } else {
          if (!isMounted.current) return;
          setError("Something went wrong fetching data");
          setInitialData(null);
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ?? error.message ?? "Unknown error";
        if (!isMounted.current) return;
        setError(errorMessage);
        setStatus(Error);
        setInitialData(null)
      }
    };

    fectchPost();
  }, [postId]);

  if (isLoading) {
   return <Loading />;
  }
  if (isError) {
   return <Error error={error} isHidden={!error} />;
  }
  if (!initialData) return null;


  return (
    <>
      <PostRegister initialData={initialData} />
    </>
  );
};
