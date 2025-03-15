import { createContext, useContext, useState, useEffect } from "react";
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

  const getPage = async (size, page, sort) => {
    const path = location.pathname;
    const pathSegments = path.split("/");
    const currentPath = pathSegments[pathSegments.length - 1];
    setCurrentPath(currentPath);

    try {
      const response = await api.get(
        `/${currentPath}/pagination?page=${page}&size=${size}${
          sort ? `&sort=${sort}` : ""
        }`
      );
      console.log(response)
      const { content, totalPages } = response.data;
      setContent(content);
      setTotalPages(totalPages);
    } catch (error) {
      setError(error.response.data || error.message);
    }
  };

  const onPageSizeChange = (e) => {
    const pageSize = e.target.value;
    setCurrentPage(0);
    setPageSize(pageSize);
  };

  const onPaginate = (page) => {
    if (page < 0 || page >= totalPages) return;
    setCurrentPage(page);
  };

  useEffect(() => {
    getPage(pageSize, currentPage);
  }, [pageSize, currentPage, currentPath]);

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
