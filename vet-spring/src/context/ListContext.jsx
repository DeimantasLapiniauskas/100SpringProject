import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import api from "../utils/api";
// import toast from "react-hot-toast";
import { useCurrentPath, useRealPath } from "../hooks/usePath";
import { useIsMounted } from "../hooks/useIsMounted";
import { useUI } from "./UIContext";
import { UIStatus } from "../constants/UIStatus";
import { useSearchParams } from "react-router";

const ListContext = createContext({
  getPage: () => {},
  onPageSizeChange: () => {},
  onPaginate: () => {},
  onSortBy: () => {},
});

export const ListProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams("");
  const isFirstLoad = useRef(true);
  const isMounted = useIsMounted();
  const currentPath = useCurrentPath();
  const realPath = useRealPath();
  const localStoragePath = realPath.replace(/\//g, "");

  const defaultPageSize = parseInt(searchParams.get("size")) ||
    parseInt(localStorage.getItem(`${localStoragePath} - pageSize`)) || 6;
  const defaultCurrentPage = parseInt(searchParams.get("page")) ||
    (parseInt(localStorage.getItem(`${localStoragePath} - currentPage`)) || 0);
  const defaultSorted = searchParams.get("sort") ||
    localStorage.getItem(`${localStoragePath} - sorted`) || null;

  const initialPagination = {
    currentPage: defaultCurrentPage,
    totalPages: 0,
    pageSize: defaultPageSize,
    sorted: defaultSorted,
    error: null,
    content: [],
    message: null,
  };

  const [pagination, setPagination] = useState(initialPagination);
  const { status, setStatus } = useUI();
  const { Loading, Success, Error, BadRequest } = UIStatus;
  const isEmpty = status === Success && pagination.content.length === 0;

  const getPage = useCallback(
    async (size, page, sort) => {
      try {
        setStatus(Loading);
        const response = await api.get(
          `/${currentPath}/pagination?page=${page}&size=${size}${
            sort ? `&sort=${sort}` : ""
          }`
        );
        const { data, message, success } = response.data;
        console.log(response.data);
        if (!isMounted.current) return;
        if (page >= data.content.totalPages) {
          setStatus(BadRequest)
        }
        if (success && data) {
          setPagination((prev) => ({
            ...prev,
            content: data.content || [],
            totalPages: data.totalPages ?? 0,
            error: null,
            message: message,
          }));
          setStatus(Success);
          // if (message && data.length > 0) {
          //   toast.dismiss();
          //   toast.success(message);
          // }
        } else {
          setPagination((prev) => ({
            ...prev,
            error: message || "Something went wrong fetching data.",
            content: [],
            totalPages: 0,
          }));
          setStatus(Error);
        }
      } catch (error) {
        if (!isMounted.current) return;
        const errorMessage =
          error.response?.data?.message ?? error.message ?? "Unknown error";
        setPagination((prev) => ({
          ...prev,
          error: errorMessage,
          content: [],
          totalPages: 0,
        }));
        setStatus(Error);
      }
    },
    [currentPath, isMounted, setStatus]
  );

  const onPageSizeChange = (e) => {
    const pageSize = Math.max(1, parseInt(e.target.value, 10));
    searchParams.set("size", pageSize);
    setSearchParams(searchParams);
    setPagination((prev) => ({ ...prev, currentPage: 0, pageSize: pageSize }));
    localStorage.setItem(`${localStoragePath} - pageSize`, pageSize);
  };

  const onPaginate = (page) => {
    if (page < 0 || page >= pagination.totalPages) return;
    searchParams.set("page", page);
    setSearchParams(searchParams);
    setPagination((prev) => ({ ...prev, currentPage: page }));
    localStorage.setItem(`${defaultCurrentPage} - currentPage`, page);
  };

  const onSortBy = (e) => {
    let sortBy = e.target.value;
    if (sortBy === "Content") {
      searchParams.delete("sort");
      searchParams.delete("page")
      setSearchParams(searchParams);
      localStorage.removeItem(`${localStoragePath} - sorted`);
      localStorage.removeItem(`${localStoragePath} - currentPage`)
      setPagination((prev) => ({ ...prev, sorted: null }));
      return;
    }
    searchParams.set("sort", sortBy), setSearchParams(searchParams);
    setPagination((prev) => ({ ...prev, sorted: sortBy }));
    localStorage.setItem(`${localStoragePath} - sorted`, sortBy);
  };

  // const resetPagination = () => {
  //   localStorage.removeItem("pageSize")
  //   setPagination(initialPagination); jei prireiks
  // };

  // const resetSortBy = () => {
  //   localStorage.removeItem("sorted") jei prireiks
  //   setPagination(initialPagination)
  // }

  useEffect(() => {
    if (isFirstLoad.current && realPath === "home") {
      isFirstLoad.current = false;
      // const newPageSize = 8;
      // const newSort = "createdAt";
      // const newPage = 0

      setPagination((prev) => ({
        ...prev,
        pageSize: 8,
        sorted: "createdAt",
        // currentPage: newPage,
      }));
      // getPage(newPageSize, newPage, newSort);
      return;
    }
    getPage(pagination.pageSize, pagination.currentPage, pagination.sorted);
  }, [
    pagination.pageSize,
    pagination.currentPage,
    currentPath,
    realPath,
    pagination.sorted,
    getPage,
    searchParams,
  ]);
  
  return (
    <ListContext.Provider
      value={{
        getPage,
        onPageSizeChange,
        onPaginate,
        onSortBy,
        ...pagination,
        isEmpty,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};

export const useList = () => {
  return useContext(ListContext);
};
