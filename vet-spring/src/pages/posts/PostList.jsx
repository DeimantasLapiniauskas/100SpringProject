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
import { SearchBarPanel } from "@/components/features/SearchBarPanel"

export const PostList = () => {

  const {
    getPage,
    clearAll,
    error,
    message,
    content: posts,
    currentPage,
    pageSize,
    isEmpty,
    sorted
  } = useList();

  const { isLoading, isError, isBadPageRequest, isUnusual, isRedirecting } = useUI();

  const roles = useCheckRoles()
  const sortFields = ["Content", "News", "Sale", "Blog"]

  if (isRedirecting) {
      return <Redirecting />;
    }

  return (
    <div className="flex flex-col items-center gap-2 px-2 sm:px-4 md:px-6 lg:px-8 max-w-[1400px] mx-auto">
      <div className="flex w-full justify-end gap-5">
          <FilterPanel sortFields={sortFields}/>
          <SearchBarPanel className="w-full"/>
        <SelectPanel />
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
          <NavLink to={`/posts/register`} ><p className="text-xs py-1 px-2 sm:text-sm sm:py-1.5 sm:px-3 md:text-base md:py-2 md:px-4 rounded-[5px] bg-linear-to-br from-blue-400 to-indigo-600 text-white hover:scale-110 transform transition duration-700 border-1 border-info">
         Register new Post</p>
          </NavLink>
        </div>
      )}
      {isEmpty ? <p>{message}</p> : ""}
      {isLoading ? <Loading /> : ""}
      {isError ? <Error error={error} isHidden={!error} /> : ""}
      {isBadPageRequest ? <BadPageRequest/> : ""}
      {isUnusual ? <Unusual error={error}/> : ""}
      {isEmpty || isLoading || isError || isBadPageRequest || isUnusual ? "" : <div>
        <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2 w-full">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              getPage={getPage}
              currentPage={currentPage}
              pageSize={pageSize}
              sorted={sorted}
            />
          ))}
        </ul>
        <div className="p-3">
          <PaginationPanel />
        </div>
      </div>}
    </div>
  );
};
