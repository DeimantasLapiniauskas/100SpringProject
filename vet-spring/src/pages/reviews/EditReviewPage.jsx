import { AddReviewPage } from "./AddReviewPage";
import { useEntityData } from "@/hooks/useEntityData";
import { Redirecting } from "@/components/feedback/Redirecting";
import { Loading } from "@/components/feedback/Loading";
import { useUI } from "@/context/UIContext";

export const EditReviewPage = () => {

  const {initialData, error} = useEntityData({redirect : true});
  const { isRedirecting, isLoading } = useUI()

  if (isRedirecting) {
    return <Redirecting />;
  }
  
  if (isLoading) {
    return <Loading/>
  }

  if (!initialData) return

  return <AddReviewPage initialData={initialData} getReviewError={error} />;
};
