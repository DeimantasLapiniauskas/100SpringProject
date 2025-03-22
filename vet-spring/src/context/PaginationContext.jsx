import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useLocation } from "react-router";
import api from "../utils/api";

const PaginationContext = createContext({
  getPage: () => {},
  onPageSizeChange: () => {},
  onPaginate: () => {},
});

export const PaginationProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize, setPageSize] = useState(6);
  const [sorted, setSorted] = useState(null);
  const [error, setError] = useState();
  const [content, setContent] = useState([]);

  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname.split("/").pop());

    if (currentPath === "home") {
      setCurrentPath("posts");
      setSorted("createdAt");
      setPageSize(8)
    }

  const getPage = useCallback(
    async (size, page, sort) => {
      
      try {
        const response = await api.get(
          `/${currentPath}/pagination?page=${page}&size=${size}${
            sort ? `&sort=${sort}` : ""
          }`
        );
        const { content, totalPages } = response.data;
        setContent(content);
        setTotalPages(totalPages);
      } catch (error) {
        setError(error.response?.data?.message ?? error.message);
      }
    },
    [currentPath]
  );

  const onPageSizeChange = (e) => {
    const pageSize = Math.max(1, parseInt(e.target.value, 10));
    setCurrentPage(0);
    setPageSize(pageSize);
  };

  const onPaginate = (page) => {
    if (page < 0 || page >= totalPages) return;
    setCurrentPage(page);
  };

  const onSortBy = (e) => {
    const sortBy = e.target.value;
    setSorted(sortBy);
  };

  useEffect(() => {
    getPage(pageSize, currentPage, sorted);
  }, [pageSize, currentPage, currentPath, sorted, getPage]);

  return (
    <PaginationContext.Provider
      value={{
        getPage,
        onPageSizeChange,
        onPaginate,
        onSortBy,
        error,
        setError,
        content,
        currentPage,
        totalPages,
        pageSize,
        sorted,
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

export const usePagination = () => {
  return useContext(PaginationContext);
};
