// import { getEntityById } from "@/utils/helpers/entity";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router";
// import { UIStatus } from "@/constants/UIStatus";
import { useUI } from "@/context/UIContext";
// import { useIsMounted } from "@/hooks/useIsMounted";
import { Loading } from "@/components/feedback/Loading";
import { Error } from "@/components/feedback/Error";
import { Unusual } from "@/components/feedback/Unusual";
import "../../index.css"
import dayjs from 'dayjs'
// import { useEntityPath } from "@/hooks/usePath";
import { useEntityData } from "@/hooks/useEntityData";

export const PostView = () => {
  
const {initialData: post, error} = useEntityData()

  // const { entityId } = useParams();
  // const [post, setPost] = useState({});
  // const [error, setError] = useState(null);

  // const { Loading: Fetching, Success, Error: Err, Unusual: Unknown } = UIStatus;
  const { isLoading, isError, isUnusual } = useUI();
  // const entityPath = useEntityPath();

  // const isMounted = useIsMounted();

  // const getPost = async () => {
  //   try {
  //     setStatus(Fetching);
  //     const response = await getEntityById(entityPath, entityId);
  //     if (!isMounted.current) return;

  //     const { data, success } = response.data;

  //     if (data && success) {
  //       setStatus(Success);
  //       setPost(data);
  //     } else {
  //       setStatus(Unknown);
  //       setPost(null);
  //     }
  //   } catch (error) {
  //     if (!isMounted.current) return;

  //     const errorMessage =
  //       error.response?.data?.message ?? error.message ?? "Unknown error";
  //     setError(errorMessage);
  //     setStatus(Err);
  //     setPost(null);
  //   }
  // };

  // useEffect(() => {
  //   if (entityId) getPost();
  if (!post) return null;
  // }, [entityId]);

  const postCreated = dayjs(post.createdAt).format('YYYY-MM-DD HH:mm')
  
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
    <div className=" mt-4 bg-gradient-to-b from-blue-100 via-blue-100 to-blue-300 min-h-screen rounded-[10px] shadow-lg shadow-blue-300 ">
      <div className="relative">
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
        <span className={`absolute right-7 top-0 text-[10px] sm:txt-xs md:text-sm text-info-content ${
              post.postType === "Sale"
                ? `text-red-700`
                : post.postType === "Blog"
                ? `text-[#006666]`
                : `text-[#004C99]`
            }`}>{postCreated}</span>
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
          <p className="break-all py-3 ms:py-4 md:py-5 px-3 sm:px-6 md:px-12 lg:px-15 text-xs sm:text-sm md:text-base text-info-content">{post?.imageUrl ? <img src={post.imageUrl} alt="postImage" className="rounded-[10px] float-right w-full h-[10rem] xs:h-[12rem] md:h-[15rem] lg:h-[20rem] xs:w-2/3 md:w-1/2 mb-1 ms-2 object-cover"/> : ""}{post.content}</p>
        </div>
      </div>
    </div>
  );
};
