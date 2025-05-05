import { PostRegister } from "./PostRegister";
import { useEntityData } from "@/hooks/useEntityData";
import { useUI } from "@/context/UIContext";
import { Loading } from "@/components/feedback/Loading";
import { Redirecting } from "@/components/feedback/Redirecting";
import { useRef } from "react";

export const PostEditPage = () => {
  const { isLoading, isRedirecting } = useUI();
  const { initialData, error } = useEntityData({ redirect: true });
  const feedbackRef = useRef(false)

if (!feedbackRef.current) {
  if (isLoading) {
    return (
      <div className="h-[20rem] md:h-[35rem]">
        <Loading />
      </div>
    );
  }
}

if (isRedirecting) {
  return <div className="h-[20rem] md:h-[35rem]">
  <Redirecting />
</div>
}

  if (!initialData) return null;

  return (
    <>
      <PostRegister initialData={initialData} getPostError={error} feedbackRef={feedbackRef} />
    </>
  );
};
