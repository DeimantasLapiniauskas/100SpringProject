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
import { ClearAllButton } from "@/components/features/ClearAllButton";
import { NavLink } from "react-router";
import { ChevronsRight } from "lucide-react";
import { BadPageRequest } from "@/components/feedback/BadPageRequest";

export const ReviewsList = () => {
  const { content: reviews, isEmpty, error, message } = useList();
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

  const ratingSize = useRatingResize("105px", "120px", "135px", "150px");
  const { isLoading, isUnusual, isError, isRedirecting, isBadPageRequest } = useUI();

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
    <div className="flex flex-col items-center gap-1 md:gap-1 mt-1 bg-gradient-to-b  via-sky-950 to-black min-h-screen">
      <div className="flex justify-end w-full gap-1.5 sm:gap-2.5 md:gap-3.5 px-6 sm:px-8 md:px-10 items-center">
        <FilterPanel filterFields={filterFields} />
        <SelectPageSizePanel pageSizes={pageSizes} />
        <ClearAllButton/>
      </div>
        <h1 className="responsive-text-xl font-semibold text-amber-800 pb-1 md:pb-2">
          Our Rating
        </h1>
      <div className="animate-gradient bg-[linear-gradient(135deg,_#FFA500,_#ffffff,_#FFA500)] py-1.5 sm:py-2 md:py-2.5 px-3 sm:px-4 md:px-5 rounded-lg border border-white shadow-md shadow-amber-300 relative">
        <Rating
          value={averageRating}
          readOnly
          style={{ maxWidth: ratingSize }}
        />
        <NavLink to={"/reviews/leaveReview"}>
          <div className="absolute responsive-text-sm left-34 sm:left-40 md:left-46 lg:left-50 bottom-0 w-30 hover:underline text-orange-700 flex items-center font-semibold "><span><ChevronsRight className="w-2 sm:w-3 md:w-4 lg:w-5"/></span>Leave review</div>
        </NavLink>
      </div>
      {isLoading ? (<Loading />) : ("")}
      {isEmpty ? (<p>{message}</p>) : ("")}
      {isUnusual ? (<Unusual error={error} />) : ("")}
      {isBadPageRequest ? (<BadPageRequest />) : ("")}
      {isError ? (<Error error={error} />) : ("")}
      {isLoading || isEmpty || isUnusual || isBadPageRequest || isError  ? (
        ""
      ) : (
        <div className="flex flex-col items-center gap-4 sm:gap-6 md:gap-7 lg:gap-8 p-2 sm:p-3 md:p-4">
          {reviews?.map((review) => (
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
