import { useUI } from "@/context/UIContext";
import { Loading } from "@/components/feedback/Loading";
import { Error } from "@/components/feedback/Error";
import { Unusual } from "@/components/feedback/Unusual";
import "../../index.css";
import dayjs from "dayjs";
import { useEntityData } from "@/hooks/useEntityData";
import { Redirecting } from "@/components/feedback/Redirecting";

export const PostView = () => {
  const { initialData: post, error } = useEntityData({ redirect: true });

  const { isLoading, isError, isUnusual, isRedirecting } = useUI();

  if (isLoading) {
    return (
      <div className="h-[20rem] md:h-[35rem]">
        <Loading />
      </div>
    );
  }

  if (isRedirecting) {
    return (
      <div className="h-[20rem] md:h-[35rem]">
        <Redirecting />
      </div>
    );
  }

  if (isUnusual) {
    return <Unusual error={error} />;
  }
  if (isError) {
    return <Error error={error} isHidden={!error} />;
  }

  if (!post) return null;

  const postCreated = dayjs(post.createdAt).format("YYYY-MM-DD HH:mm");

  return (
    <div className=" mt-4 bg-gradient-to-b  to-blue-300 min-h-screen  shadow-lg shadow-blue-300  ">
      <div className="relative">
        <h2
          className={`w-full text-center responsive-text-xl font-semibold ${
            post.postType === "Sale"
              ? `text-red-700`
              : post.postType === "Blog"
              ? `text-[#006666]`
              : `text-[#004C99]`
          }`}
        >
          {post.postType}
        </h2>
        <span
          className={`absolute right-7 top-0 text-[10px] sm:txt-xs md:text-sm lg:text-base text-info-content ${
            post.postType === "Sale"
              ? `text-red-700`
              : post.postType === "Blog"
              ? `text-[#006666]`
              : post.postType === "PetCare"
              ? `text-purple-900`
              : `text-[#004C99]`
          }`}
        >
          {postCreated}
        </span>
      </div>
      <div className="p-1 sm:p-2 md:p-3 lg:p-4">
        <div className="col-span-2">
          <h1
            className={`font-semibold break-words responsive-text-xl px-5 text-center ${
              post.postType === "Sale"
                ? `text-red-700`
                : post.postType === "Blog"
                ? `text-[#006666]`
                : post.postType === "PetCare"
                ? `text-purple-900`
                : `text-[#004C99]`
            }`}
          >
            {post.title}
          </h1>
          <p className="break-words py-3 ms:py-4 md:py-5 px-3 sm:px-6 md:px-12 lg:px-15 responsive-text-lg text-info-content">
            {post?.imageUrl ? (
              <img
                src={post.imageUrl}
                alt="postImage"
                className="rounded-[10px] float-right h-[10rem] md:h-[12rem] lg:h-[15rem] w-full xs:w-1/2 md:w-2/5  mb-2 xs:mb-1 xs:ms-2 object-cover "
              />
            ) : (
              ""
            )}
            {post.content}
          </p>
        </div>
      </div>
    </div>
  );
};
