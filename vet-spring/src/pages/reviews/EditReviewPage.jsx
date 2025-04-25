
import { AddReviewPage } from "./AddReviewPage";
import { useEntityData } from "@/hooks/useEntityData";


export const EditReviewPage = () => {

  const {initialData, error} = useEntityData();

  return <AddReviewPage initialData={initialData} getReviewError={error} />;
};
