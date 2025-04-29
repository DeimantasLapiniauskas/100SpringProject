import { PostCard } from "./PostCard";
import { Error } from "../../components/feedback/Error";
import { useList } from "../../context/ListContext";
import { NavLink } from "react-router";
import { Loading } from "../../components/feedback/Loading";
import { useUI } from "../../context/UIContext";
import { PaginationPanel } from "../../components/features/PaginationPanel";
import { SelectPanel } from "@/components/features/SelectPagesPanel";
import { FilterPanel } from "@/components/features/FilterPanel";
import { BadPageRequest } from "@/components/feedback/BadPageRequest";
import { useCheckRoles } from "@/hooks/useCheckRoles";
import { Unusual } from "@/components/feedback/Unusual";
import { Redirecting } from "@/components/feedback/Redirecting";
import { SearchBarPanel } from "@/components/features/SearchBarPanel";

export const PostList = () => {
  const {
    clearAll,
    error,
    message,
    content: posts,
    isEmpty,
  } = useList();

  const { isLoading, isError, isBadPageRequest, isUnusual, isRedirecting } =
    useUI();

  const roles = useCheckRoles();
  const sortFields = ["Content", "News", "Sale", "Blog"];
  const pageSizes = [6, 9, 12];

  if (isRedirecting) {
    return <Redirecting />;
  }

  return (
    <div className="flex flex-col items-center gap-2 px-1 sm:px-2 md:px-3 mt-0.5">
      <div className="flex w-full justify-end gap-1.5 sm:gap-2.5 md:gap-3.5 relative">
        <button type="button" className="cursor-pointer bg-blue-200 hover:bg-gray-200 text-[8px] sm:text-[10px] md:text-xs px-1.5 sm:px-2.5 md:px-3.5 py-0.25 sm:py-0.5 md:py-0.75 rounded-[10px] text-info-content hover:text-warning-content absolute bottom-[-70%] sm:bottom-[-80%] md:bottom-[-87%] lg:bottom-[-77%] border border-blue-400 hover:border-warning-content" onClick={clearAll}>Clear</button>
        <SearchBarPanel />
        <FilterPanel sortFields={sortFields} />
        <SelectPanel pageSizes={pageSizes} />
      </div>
      <section className="px-2 py-3 sm:px-3 sm:py-4 md:px-4 md:py-6 text-center ">
        <h2 className="lg:text-3xl md:text-2xl sm:text-xl text-lg font-bold text-info-content mb-4 text-center">
          Stay Updated with News, Blogs & Sales
        </h2>
        <article className="text-sm md:text-base lg:text-lg text-gray-700 max-w-3xl mx-auto text-center">
          Explore our latest updates, expert advice, and exclusive promotions.
          From helpful pet care blogs to limited-time sales, we’re here to keep
          you informed and your pets happy. Check back often for fresh content
          and exciting deals!
        </article>
      </section>

      {roles && (
        <div className="flex justify-center w-full">
          <NavLink to={`/posts/register`}>
            <p className="mb-1.5 text-xs py-1 px-2 sm:text-sm sm:py-1.5 sm:px-3 md:text-base md:py-2 md:px-4 rounded-[5px] bg-linear-to-br from-blue-400 to-indigo-600 text-white hover:scale-110 transform transition duration-700 border-1 border-info">
              Register new Post
            </p>
          </NavLink>
        </div>
      )}
      {isEmpty ? <p>{message}</p> : ""}
      {isLoading ? <Loading /> : ""}
      {isError ? <Error error={error} isHidden={!error} /> : ""}
      {isBadPageRequest ? <BadPageRequest /> : ""}
      {isUnusual ? <Unusual error={error} /> : ""}
      {isEmpty || isLoading || isError || isBadPageRequest || isUnusual ? (
        ""
      ) : (
        <div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 w-full">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
              />
            ))}
          </div>
          <div className="p-3 flex justify-center">
            <PaginationPanel />
          </div>
        </div>
      )}
    </div>
  );
};
