import { PostCard } from "./PostCard";
import { Error } from "../../components/Error";
import { useAuth } from "../../context/AuthContext";
import { usePagination } from "../../context/PaginationContext";
import { NavLink } from "react-router";
import { Loading } from "../../components/Loading";
import { useUI } from "../../context/UIContext";
import { PaginationUI } from "../../components/PaginationUI";
import { SelectUI } from "@/components/SelectUI";



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
  } = usePagination();

  const {isLoading, isError} = useUI()

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
    <div className="flex flex-col items-center gap-5 px-10 ">
       <div className="flex w-full justify-end">
        <SelectUI/>
      </div>
      <section className="px-4 py-8 text-center ">
        <h2 className="lg:text-3xl md:text-2xl sm:text-xl text-lg font-bold text-info-content mb-4 text-center">
          Stay Updated with News, Blogs & Sales
        </h2>
        <article className="text-sm md:text-base text-gray-700 max-w-3xl mx-auto text-center">
          Explore our latest updates, expert advice, and exclusive promotions.
          From helpful pet care blogs to limited-time sales, we’re here to keep
          you informed and your pets happy. Check back often for fresh content
          and exciting deals!
        </article>
      </section>

      {checkRoles() && (
        <NavLink to={`/services/add`} className="btn btn-primary">
          Add
        </NavLink>
      )}
      {isEmpty ? <p>{message}</p> : ""}
      {isLoading ? <Loading /> : ""}
      {isError ? <Error error={error} isHidden={!error} /> : ""}
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
      <PaginationUI/>
    </div>
  );
};
