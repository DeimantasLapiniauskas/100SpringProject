import { AddReviewPage } from "./AddReviewPage";
import { useEntityData } from "@/hooks/useEntityData";
import { Redirecting } from "@/components/feedback/Redirecting";
import { Loading } from "@/components/feedback/Loading";
import { useUI } from "@/context/UIContext";
import { useRef } from "react";

export const EditReviewPage = () => {

  const {initialData, error} = useEntityData({redirect : true});
  const { isRedirecting, isLoading } = useUI()
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

  if (!initialData) return

  return <AddReviewPage initialData={initialData} getReviewError={error} feedbackRef={feedbackRef} />;
};
