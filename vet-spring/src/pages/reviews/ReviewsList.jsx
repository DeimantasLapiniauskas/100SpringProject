import { useList } from "@/context/ListContext";
import { ReviewCard } from "./ReviewCard";
import { PaginationPanel } from "@/components/features/PaginationPanel";
import { Rating } from "@smastrom/react-rating";
import { useRatingResize } from "@/hooks/useRatingResize";
import { Loading } from "@/components/feedback/Loading";
import { Unusual } from "@/components/feedback/Unusual";
import { Redirecting } from "@/components/feedback/Redirecting";
import { Error } from "@/components/feedback/Error";
import { useUI } from "@/context/UIContext";
import { FilterPanel } from "@/components/features/FilterPanel";
import { SelectPageSizePanel } from "@/components/features/SelectPageSizePanel";

export const ReviewsList = () => {
  const { content: reviews, isEmpty, error, message } = useList();
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

  const ratingSize = useRatingResize("105px", "120px", "135px", "150px");
  const { isLoading, isUnusual, isError, isRedirecting } = useUI();

  const pageSizes = [12, 24, 36];
  const filterFields = [
    { label: "All", value: "0" },
    { label: "⭐⭐⭐⭐⭐", value: "5" },
    { label: "⭐⭐⭐⭐", value: "4" },
    { label: "⭐⭐⭐", value: "3" },
    { label: "⭐⭐", value: "2" },
    { label: "⭐", value: "1" },
  ];

  if (isRedirecting) {
    return <Redirecting />;
  }

  return (
    <div className="flex flex-col items-center gap-1 md:gap-1 mt-1 sm:mt-2 md:mt-3 lg:mt-4">
      <div className="flex justify-end w-full gap-1.5 sm:gap-2.5 md:gap-3.5 px-6 sm:px-8 md:px-10">
        <FilterPanel filterFields={filterFields} />
        <SelectPageSizePanel pageSizes={pageSizes} />
      </div>
      <h1 className="responsive-text-xl font-semibold text-amber-800 pb-1 md:pb-2">
        Our Rating
      </h1>
      <div className="animate-gradient bg-[linear-gradient(135deg,_#FFA500,_#ffffff,_#FFA500)] py-1.5 sm:py-2 md:py-2.5 px-3 sm:px-4 md:px-5 rounded-lg border border-white shadow-md shadow-amber-300">
        <Rating
          value={averageRating}
          readOnly
          style={{ maxWidth: ratingSize }}
        />
      </div>
      {isLoading ? <Loading /> : ""}
      {isEmpty ? <p>{message}</p> : ""}
      {isUnusual ? <Unusual error={error} /> : ""}
      {isError ? <Error error={error} /> : ""}
      {isLoading || isEmpty || isUnusual || isError ? (
        ""
      ) : (
        <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-7 lg:gap-8 p-2 sm:p-3 md:p-4">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
      <div>
        <PaginationPanel />
      </div>
    </div>
  );
};
