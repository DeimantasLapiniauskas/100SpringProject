import { getPostById } from "@/utils/helpers/posts";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { PostRegister } from "./PostRegister";
import { UIStatus } from "@/constants/UIStatus";
import { useUI } from "@/context/UIContext";
import { useIsMounted } from "@/hooks/useIsMounted";
import toast from "daisyui/components/toast";


export const PostEditPage = () => {
  const { postId } = useParams();
  const [initialData, setInitialData] = useState(null);
  const { Loading: Fetching, Success, Error: Err, Unusual } = UIStatus;
  const { setStatus } = useUI();
  const [error, setError] = useState(null);
  const isMounted = useIsMounted();

  useEffect(() => {
    const fectchPost = async () => {
      try {
        setStatus(Fetching);
        const response = await getPostById(postId);
        const { data, success, message } = response.data;
   
        if (data && success) {
          if (!isMounted.current) return;
          setInitialData(data);
          setStatus(Success);
        
        } else {
          if (!isMounted.current) return;
          setStatus(Unusual)
          setError(message || "Something went wrong fetching data");
          setInitialData(null);
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ?? error.message ?? "Unknown error";
        if (!isMounted.current) return;
        setError(errorMessage);
        setStatus(Err);
        setInitialData(null);
      }
    };

    fectchPost();
  }, [postId]);
  
  // useEffect(() => {
  //   if (initialData) {
  //     console.log("Kai initialData pasikeičia:", initialData);
  //   }
  // }, [initialData]);
  
  if (!initialData) return null;

  return (
    <>
      <PostRegister initialData={initialData} />
    </>
  );
};
