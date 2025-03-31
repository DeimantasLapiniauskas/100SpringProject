import { PostCard } from "./PostCard";
import { Error } from "../../components/feedback/Error";
import { useAuth } from "../../context/AuthContext";
import { useList } from "../../context/ListContext";
import { NavLink } from "react-router";
import { Loading } from "../../components/feedback/Loading";
import { useUI } from "../../context/UIContext";
import { PaginationUI } from "../../components/PaginationUI";
import { SelectUI } from "@/components/SelectUI";
import { FilterUI } from "@/components/FilterUI";
import { BadRequest } from "@/components/feedback/BadRequest";

export const PostList = () => {
  const { account } = useAuth();
  const {
    getPage,
    error,
    message,
    content: posts,
    currentPage,
    pageSize,
    isEmpty,
  } = useList();

  const { isLoading, isError, isBadRequest } = useUI();

  const checkRoles = () => {
    //todo: make this better
    return (
      (account !== null &&
        account.scope !== null &&
        account.scope.includes("ROLE_VET")) ||
      (account !== null &&
        account.scope !== null &&
        account?.scope.includes("ROLE_ADMIN"))
    );
  };

  return (
    <div className="flex flex-col items-center gap-2 px-2 sm:px-4 md:px-6 lg:px-8 ">
      <div className="flex w-full justify-end gap-5">
          <FilterUI />
        <SelectUI />
      </div>
      <section className="px-2 py-4 sm:px-3 sm:py-6 md:px-4 md:py-8 text-center ">
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

      {checkRoles() && (
        <div className="flex justify-center w-full">
          <NavLink to={`/posts/register`} ><p className="text-xs py-0.5 px-2 sm:text-sm sm:py-1 sm:px-3 md:text-base md:py-1.5 md:px-4 rounded-[5px] bg-linear-to-br from-blue-400 to-indigo-600 text-white hover:scale-110 transform transition duration-700 border-1 border-info">
         Post</p>
          </NavLink>
        </div>
      )}
      {isEmpty ? <p>{message}</p> : ""}
      {isLoading ? <Loading /> : ""}
      {isError ? <Error error={error} isHidden={!error} /> : ""}
      {isBadRequest ? <BadRequest/> : ""}
      <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2 ">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            getServicePage={getPage}
            currentPage={currentPage}
            pageSize={pageSize}
          />
        ))}
      </ul>
      <div className="p-3">
        <PaginationUI />
      </div>
    </div>
  );
};
