// import { useEffect, useState } from "react";
import { AddReviewPage } from "./AddReviewPage";
import { useEntityData } from "@/hooks/useEntityData";
// import { useParams } from "react-router";
// import { UIStatus } from "@/constants/UIStatus";
// import { useUI } from "@/context/UIContext";
// import { useIsMounted } from "@/hooks/useIsMounted";
// import { GetReviewById } from "@/utils/helpers/review";

export const EditReviewPage = () => {

  const {initialData, error} = useEntityData();
  // const [initialData, setInitialData] = useState(null);
  // const [error, setError] = useState(null);

  // const { reviewId } = useParams();
  // const { Loading, Success, Error, Unusual } = UIStatus;
  // const { setStatus } = useUI();
  // const isMounted = useIsMounted();

  // const GetReview = async () => {
  //   try {
  //     setStatus(Loading);
  //     const response = await GetReviewById(reviewId);
  //     if (!isMounted.current) return;

  //     const { data, success } = response.data;

  //     if (data && success) {
  //       setInitialData(data);
  //       setStatus(Success);
  //     } else {
  //       setStatus(Unusual);
  //       setInitialData(null);
  //     }
  //   } catch (error) {
  //     if (!isMounted.current) return;

  //     const errorMessage =
  //       error.response?.data?.message ?? error.message ?? "Unknown error";
  //     setError(errorMessage);
  //     setStatus(Error);
  //   }
  // };

  // useEffect(() => {
  //  if (reviewId) GetReview();
  // }, [reviewId]);

  return <AddReviewPage initialData={initialData} getReviewError={error} />;
};
