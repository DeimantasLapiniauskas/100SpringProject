import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef
} from "react";
import api from "../utils/api";
import toast from "react-hot-toast";
import { useCurrentPath } from "../hooks/useCurrentPath";
import { useIsMounted } from "../hooks/useIsMounted";

const PaginationContext = createContext({
  getPage: () => {},
  onPageSizeChange: () => {},
  onPaginate: () => {},
  onSortBy: () => {}
});

const initialPagination = {
  currentPage: 0,
  totalPages: 0,
  pageSize: 6,
  sorted: null,
  error: null,
  content: [],
  message: null,
  status: "idle"
}

export const PaginationProvider = ({ children }) => {
  const [pagination, setPagination] = useState(initialPagination);

  const isFirstLoad = useRef(true)
const isMounted = useIsMounted();
  const currentPath = useCurrentPath();

  const getPage = useCallback(
    async (size, page, sort) => {
      
      try {
        setPagination(prev => ({...prev, status : "loading"}))
        const response = await api.get(
          `/${currentPath}/pagination?page=${page}&size=${size}${
            sort ? `&sort=${sort}` : ""
          }`
        );
        const { data, message, success } = response.data;
        console.log(response.data)
        if (!isMounted.current) return
        if (success && data) {
          setPagination(prev => ({...prev,
             content: data.content || [],
            totalPages: data.totalPages ?? 0,
            error: null,
            status: "success",
            message: message
          }))
          // if (message && data.length > 0) {
          //   toast.dismiss();
          //   toast.success(message);
          // }
        } else {
          setPagination(prev => ({...prev,
             error: message || "Something went wrong fetching data.",
            content: [],
          totalPages: 0,
        status: "error"}))
        }
      } catch (error) {
        if (!isMounted.current) return
        const errorMessage =
        error.response?.data?.message ?? error.message ?? "Unknown error";
        setPagination(prev => ({...prev,
          error: errorMessage,
          content: [],
          totalPages: 0,
          status: "error"
        }))
    }
    },
    [currentPath, isMounted]
  );

  const onPageSizeChange = (e) => {
    const pageSize = Math.max(1, parseInt(e.target.value, 10));
    setPagination(prev => ({...prev,
      currentPage: 0,
      pageSize: pageSize
    }))
  };

  const onPaginate = (page) => {
    if (page < 0 || page >= pagination.totalPages) return;
    setPagination(prev => ({...prev, 
      currentPage: page
    }))
  };

  const onSortBy = (e) => {
    const sortBy = e.target.value;
    setPagination(prev => ({...prev,
      sorted: sortBy
    }))
  };

  // const resetPagination = () => {
  //   setPagination(initialPagination); jei prireiks
  // };

  useEffect(() => {
    if (isFirstLoad.current && currentPath === "home") {
      isFirstLoad.current = false;
      setPagination(prev => ({...prev,
        sorted: "createdAt",
        pageSize: 8
      }))
      return
    }
    getPage(pagination.pageSize, pagination.currentPage, pagination.sorted);
  }, [pagination.pageSize, pagination.currentPage, currentPath, pagination.sorted, getPage]);

  return (
    <PaginationContext.Provider
      value={{
        getPage,
        onPageSizeChange,
        onPaginate,
        onSortBy,
     ...pagination,
     isLoading: pagination.status === "loading",
        isSuccess: pagination.status === "success",
        isEmpty: pagination.status === "success" && pagination.content.length === 0,
        isError: pagination.status === "error",
      }}
    >
      {children}
    </PaginationContext.Provider>
  );
};

export const usePagination = () => {
  return useContext(PaginationContext);
};
