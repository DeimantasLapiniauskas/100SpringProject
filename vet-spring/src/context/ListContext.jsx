import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import api from "../utils/api";
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
  handleSearch: () => {},
  clearAll: () => {},
});

export const ListProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams("");
  const isMounted = useIsMounted();
  const currentPath = useCurrentPath();
  const realPath = useRealPath();
  const localStoragePath = (realPath || "").replace(/\//g, "");

  const defaultPageSize =
    parseInt(searchParams.get("size")) ||
    parseInt(localStorage.getItem(`${localStoragePath} - pageSize`)) ||
    6;
  const defaultCurrentPage =
    parseInt(searchParams.get("page")) ||
    parseInt(localStorage.getItem(`${localStoragePath} - currentPage`)) ||
    0;
  const defaultSorted =
    searchParams.get("sort") ||
    localStorage.getItem(`${localStoragePath} - sorted`) ||
    null;
  const defaultSearchValue =
    searchParams.get("search") ||
    localStorage.getItem(`${localStoragePath} - searchValue`) ||
    "";

  const initialPagination = {
    currentPage: defaultCurrentPage,
    totalPages: 0,
    pageSize: defaultPageSize,
    sorted: defaultSorted,
    searchValue: defaultSearchValue,
    error: null,
    content: [],
    message: null,
  };
  const [pagination, setPagination] = useState(initialPagination);
  const { status, setStatus } = useUI();
  const { Loading, Success, Error, BadPageRequest, Unusual } = UIStatus;
  const isEmpty = status === Success && pagination.content.length === 0;

  const getPage = useCallback(
    async (size, page, sort, search) => {
      try {
        setStatus(Loading);

        if (currentPath) {
          const response = await api.get(
            `/${currentPath}/pagination?page=${page}&size=${size}${
              sort ? `&sort=${sort}` : ""
            }${search ? `&search=${search}` : ""}`
          );
          if (!isMounted.current) return;

          const { data, message, success } = response.data;
          console.log(response.data);

          if (page >= data.totalPages && data.totalPages > 0) {
            setStatus(BadPageRequest);
            return;
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
          }
        } else {
          setPagination((prev) => ({
            ...prev,
            content: [],
            totalPages: 0,
          }));
          setStatus(Unusual);
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
    localStorage.setItem(`${localStoragePath} - currentPage`, page);
  };

  const onSortBy = (e) => {
    let sortBy = e.target.value;

    if (sortBy === "Content") {
      searchParams.delete("sort");
      searchParams.delete("page");
      setSearchParams(searchParams);
      localStorage.removeItem(`${localStoragePath} - sorted`);
      localStorage.removeItem(`${localStoragePath} - currentPage`);
      setPagination((prev) => ({ ...prev, sorted: null }));
      return;
    }
    searchParams.set("sort", sortBy), setSearchParams(searchParams);
    setPagination((prev) => ({ ...prev, sorted: sortBy, currentPage: 0 }));
    localStorage.setItem(`${localStoragePath} - sorted`, sortBy);
    localStorage.removeItem(`${localStoragePath} - currentPage`);
  };

  const handleSearch = (searchValue) => {
    searchParams.set("search", searchValue);
    setSearchParams(searchParams);
    setPagination((prev) => ({ ...prev, searchValue: searchValue }));
    localStorage.setItem(`${localStoragePath} - searchValue`, searchValue);
  };

  const [clearSearchBar, setClearSearchBar] = useState(0);

  const clearAll = () => {
    if (
      localStorage.getItem(`${localStoragePath} - sorted`) === null &&
      localStorage.getItem(`${localStoragePath} - pageSize`) === null &&
      localStorage.getItem(`${localStoragePath} - currentPage`) === null &&
      localStorage.getItem(`${localStoragePath} - searchValue`) === null
    ) return;

    localStorage.removeItem(`${localStoragePath} - pageSize`);
    localStorage.removeItem(`${localStoragePath} - currentPage`);
    localStorage.removeItem(`${localStoragePath} - sorted`);
    localStorage.removeItem(`${localStoragePath} - searchValue`);
    setSearchParams({});
    setClearSearchBar((prev) => prev + 1);

    setPagination({
      ...initialPagination,
      currentPage: 0,
      pageSize: 6,
      sorted: null,
      searchValue: "",
    });
  };

  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current && realPath === "home") {
      isFirstLoad.current = false;

      const homePagepageSize = 8;
      const homePageSorted = "createdAt";

      setPagination((prev) => ({
        ...prev,
        pageSize: homePagepageSize,
        sorted: homePageSorted,
      }));
      localStorage.setItem(`${localStoragePath} - pageSize`, homePagepageSize);
      localStorage.setItem(`${localStoragePath} - sorted`, homePageSorted);

      return;
    } else if (realPath === currentPath) {
      setPagination(initialPagination);

      getPage(
        initialPagination.pageSize,
        initialPagination.currentPage,
        initialPagination.sorted,
        initialPagination.searchValue
      );
      return;
    }
    getPage(
      pagination.pageSize,
      pagination.currentPage,
      pagination.sorted,
      pagination.searchValue
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [
    pagination.pageSize,
    pagination.currentPage,
    currentPath,
    realPath,
    pagination.sorted,
    pagination.searchValue,
    getPage,
    searchParams,
  ]);

  console.log(defaultPageSize);

  return (
    <ListContext.Provider
      value={{
        getPage,
        onPageSizeChange,
        onPaginate,
        onSortBy,
        handleSearch,
        clearAll,
        setPagination,
        ...pagination,
        isEmpty,
        clearSearchBar,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};

export const useList = () => {
  return useContext(ListContext);
};
