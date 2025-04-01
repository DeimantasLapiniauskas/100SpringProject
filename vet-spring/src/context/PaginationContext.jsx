import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import { useCurrentPath, useRealPath } from "../hooks/usePath";
import { useIsMounted } from "../hooks/useIsMounted";
import { useUI } from "./UIContext";
import { UIStatus } from "../constants/UIStatus";


const PaginationContext = createContext({
  getPage: () => {},
  onPageSizeChange: () => {},
  onPaginate: () => {},
  onSortBy: () => {},
});

const initialPagination = {
  currentPage: 0,
  totalPages: 0,
  pageSize: 6,
  sorted: null,
  error: null,
  content: [],
  message: null,
};

export const PaginationProvider = ({ children }) => {
  const [pagination, setPagination] = useState(initialPagination);

  const isFirstLoad = useRef(true);
  const isMounted = useIsMounted();
  const currentPath = useCurrentPath();
const realPath = useRealPath()

  const { status, setStatus} = useUI();
  const {Loading, Success, Error} = UIStatus;
  const isEmpty = status === Success && pagination.content.length === 0;

  const getPage = useCallback(
    async (size, page, sort) => {
      try {
        setStatus(Loading)
        const response = await api.get(
          `/${currentPath}/pagination?page=${page}&size=${size}${
            sort ? `&sort=${sort}` : ""
          }`
        );
        const { data, message, success } = response.data;
        console.log(response.data);
        if (!isMounted.current) return;
        if (success && data) {
          setPagination((prev) => ({
            ...prev,
            content: data.content || [],
            totalPages: data.totalPages ?? 0,
            error: null,
            message: message,
          }));
          setStatus(Success)
          // if (message && data.length > 0) {
          //   toast.dismiss();
          //   toast.success(message);
          // }
        } else {
          setPagination((prev) => ({
            ...prev,
            error: message || "Something went wrong fetching data.",
            content: [],
            totalPages: 0
          }));
          setStatus(Error)
        }
      } catch (error) {
        if (!isMounted.current) return;
        const errorMessage =
          error.response?.data?.message ?? error.message ?? "Unknown error";
        setPagination((prev) => ({
          ...prev,
          error: errorMessage,
          content: [],
          totalPages: 0
        }));
        setStatus(Error)
      }
    },
    [currentPath, isMounted, setStatus]
  );

  const onPageSizeChange = (e) => {
    const pageSize = Math.max(1, parseInt(e.target.value, 10));
    setPagination((prev) => ({ ...prev, currentPage: 0, pageSize: pageSize }));
  };

  const onPaginate = (page) => {
    if (page < 0 || page >= pagination.totalPages) return;
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const onSortBy = (e) => {
    const sortBy = e.target.value;
    setPagination((prev) => ({ ...prev, sorted: sortBy }));
  };

  // const resetPagination = () => {
  //   setPagination(initialPagination); jei prireiks
  // };

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
  ]);

  return (
    <PaginationContext.Provider
      value={{
        getPage,
        onPageSizeChange,
        onPaginate,
        onSortBy,
        ...pagination,
        isEmpty
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

export const usePagination = () => {
  return useContext(PaginationContext);
};
