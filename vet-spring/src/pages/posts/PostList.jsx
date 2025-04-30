import { PostCard } from "./PostCard";
import { Error } from "../../components/feedback/Error";
import { useList } from "../../context/ListContext";
import { NavLink } from "react-router";
import { Loading } from "../../components/feedback/Loading";
import { useUI } from "../../context/UIContext";
import { PaginationPanel } from "../../components/features/PaginationPanel";
import { SelectPageSizePanel } from "@/components/features/SelectPageSizePanel";
import { FilterPanel } from "@/components/features/FilterPanel";
import { BadPageRequest } from "@/components/feedback/BadPageRequest";
import { useCheckAdminAndVetRoles } from "@/hooks/useCheckRoles";
import { Unusual } from "@/components/feedback/Unusual";
import { Redirecting } from "@/components/feedback/Redirecting";
import { SearchBarPanel } from "@/components/features/SearchBarPanel";
import { ClearAllButton } from "@/components/features/ClearAllButton";

export const PostList = () => {
  const { error, message, content: posts, isEmpty } = useList();

  const { isLoading, isError, isBadPageRequest, isUnusual, isRedirecting } =
    useUI();

  const roles = useCheckAdminAndVetRoles();
  const filterFields = [
    { label: "Content", value: "Content" },
    { label: "News", value: "News" },
    { label: "Sale", value: "Sale" },
    { label: "Blog", value: "Blog" },
  ];
  const pageSizes = [6, 9, 12];

  if (isRedirecting) {
    return <Redirecting />;
  }

  return (
    <div className="flex flex-col items-center mt-1 md:mt-2">
      <div className="flex flex-col items-center sm:flex-row w-full sm:justify-end gap-2.5 md:gap-3.5 relative">
          <SearchBarPanel />
          <div className="absolute sm:bottom-[-1rem] md:bottom-[-1.25rem] right-2 xs:right-15 sm:right-3">
        <ClearAllButton />
      </div>
        <div className="flex gap-2 items-center px-2 md:px-3">
          <FilterPanel filterFields={filterFields} />
          <SelectPageSizePanel pageSizes={pageSizes} />
        </div>
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
      {isError ? <Error error={error} /> : ""}
      {isBadPageRequest ? <BadPageRequest /> : ""}
      {isUnusual ? <Unusual error={error} /> : ""}
      {isEmpty || isLoading || isError || isBadPageRequest || isUnusual ? (
        ""
      ) : (
        <div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 w-full">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
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
