// import { getPostById } from "@/utils/helpers/posts";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router";
import { PostRegister } from "./PostRegister";
import { useEntityData } from "@/hooks/useEntityData";
// import { UIStatus } from "@/constants/UIStatus";
// import { useUI } from "@/context/UIContext";
// import { useIsMounted } from "@/hooks/useIsMounted";

export const PostEditPage = () => {
  // const { postId } = useParams();
  // const [initialData, setInitialData] = useState(null);
  // const { Loading, Success, Error, Unusual } = UIStatus;
  // const { setStatus } = useUI();
  // const [error, setError] = useState(null);
  // const isMounted = useIsMounted();
const {initialData, error} = useEntityData()
  // useEffect(() => {
  //   const GetPost = async () => {
  //     try {
  //       setStatus(Loading);
  //       const response = await getPostById(postId);
  //       if (!isMounted.current ) return;

  //       const { data, success } = response.data;
   
  //       if (data && success) {
  //         setStatus(Success);
  //         setInitialData(data);
          
  //       } else {
  //         setStatus(Unusual)
  //         setInitialData(null);
  //       }
  //     } catch (error) {
  //       if (!isMounted.current) return;

  //       const errorMessage =
  //         error.response?.data?.message ?? error.message ?? "Unknown error";
  //       setStatus(Error);
  //       setError(errorMessage);
  //       setInitialData(null);
  //     }
  //   };

  //  if (postId) GetPost();
  // }, [postId]);
  
  // useEffect(() => {
  //   if (initialData) {
  //     console.log("Kai initialData pasikeičia:", initialData);
  //   }
  // }, [initialData]);
  
  if (!initialData) return null;

  return (
    <>
      <PostRegister initialData={initialData} getPostError={error}/>
    </>
  );
};
