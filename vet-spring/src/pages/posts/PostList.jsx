import { PostCard } from "./PostCard";
import { Error } from "../../components/Error";
import { useAuth } from "../../context/AuthContext";
import { usePagination } from "../../context/PaginationContext";
import { NavLink } from "react-router";

export const PostList = () => {
  const { account } = useAuth();

  const {
    getPage,
    onPageSizeChange,
    onPaginate,
    error,
    message,
    content: posts,
    currentPage,
    totalPages,
    pageSize,
    isLoading,
    isError,
    isEmpty
  } = usePagination();

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
//   if (isLoading) return <Loading />;
  if (isError) return <Error error={error} isHidden={!error} />

  return (
    <div className="flex flex-col items-center gap-5 px-10 ">
      <section className="px-4 py-8 text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
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
       {isEmpty? <p>{message}</p> : ""}
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
      <div className="join ">
        <button
          className="join-item btn "
          onClick={async () => onPaginate(currentPage - 1)}
          disabled={currentPage === 0}
        >
          «
        </button>
        <button className="join-item btn ">Page {currentPage + 1}</button>
        <button
          className="join-item btn "
          onClick={async () => onPaginate(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
        >
          »
        </button>
        <select
          defaultValue="6"
          className="join-item select ml-4"
          onChange={onPageSizeChange}
        >
          <option value="6">6</option>
          <option value="9">9</option>
          <option value="12">12</option>
        </select>
      </div>
    </div>
  );
};
