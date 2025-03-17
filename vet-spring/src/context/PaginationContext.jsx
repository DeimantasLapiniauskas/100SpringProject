import { createContext, useContext, useState, useEffect, useCallback } from "react";
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
  const [error, setError] = useState();
  const [content, setContent] = useState([]);
  const [currentPath, setCurrentPath] = useState()
  const location = useLocation();

  const getPage = useCallback(async (size, page, sort) => {
    const path = location.pathname;
    const currentPath = path.split("/").pop();
    setCurrentPath(currentPath);

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
      setError(error.response?.data ?? error.message);
    }
  }, [location.pathname]);

  const onPageSizeChange = (e) => {
    const pageSize = Math.max(1, parseInt(e.target.value, 10));
    setCurrentPage(0);
    setPageSize(pageSize);
  };

  const onPaginate = (page) => {
    if (page < 0 || page >= totalPages) return;
    setCurrentPage(page);
  };

  useEffect(() => {
    getPage(pageSize, currentPage);
  }, [pageSize, currentPage, currentPath, getPage]);

  return (
  <PaginationContext.Provider
    value={{ getPage, onPageSizeChange, onPaginate, error, setError, content, currentPage, totalPages, pageSize }}
  >
    {children}
  </PaginationContext.Provider>
  )
};

export const usePagination = () => {
  return useContext(PaginationContext);
};
