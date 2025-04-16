import { createContext, useContext, useState, useCallback } from "react";
import { deletePost } from "@/utils/helpers/posts";
import toast from "react-hot-toast";
import { useUI } from "@/context/UIContext";
import { UIStatus } from "@/constants/UIStatus";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useList } from "@/context/ListContext";
import { verifyPassword } from "@/utils/helpers/posts";

const DeleteModalContext = createContext();

export const DeleteModalProvider = ({ children }) => {

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const isMounted = useIsMounted();
  const { setStatus } = useUI();
  const { getPage, pageSize, currentPage, sorted, searchValue, setPagination } = useList();
  const { Loading, Success, Error, Unusual } = UIStatus;

  const openDeleteModal = useCallback((post) => {
    setSelectedPost(post);
    setIsDeleteModalOpen(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setSelectedPost(null);
  }, []);

  const handlePostDelete = useCallback(async (postId) => {
    try {
      setStatus(Loading);

      if (postId) {
        await deletePost(postId);

        if (!isMounted.current) return;

        toast.success("Post deleted successfully");
        await getPage(pageSize, currentPage, sorted, searchValue);

        if (!isMounted.current) return;
        
        setPagination((prev) => ({ ...prev }));
        setStatus(Success);
      } else {
        setStatus(Unusual);
      }
    } catch (error) {
      if (!isMounted.current) return;

      const errorMessage =
        error.response?.data?.message ?? error.message ?? "Unknown error";
      setStatus(Error);
      toast.error(errorMessage);
    }
  }, [setStatus, getPage, isMounted]);

  
    const onConfirm = useCallback (async () => {
      try {
        setStatus(Loading);
        const response = await verifyPassword(password);

        if (!isMounted.current) return;

        const { message, success } = response.data;
  
        if (success && message) {
          setMessage(message);
          await handlePostDelete(selectedPost?.id);

          if (!isMounted.current) return;

          setStatus(Success);
          handleCloseModal()
        } else {
          setStatus(Unusual);
        }
      } catch (error) {
        if (!isMounted.current) return;

        const errorMessage =
          error.response?.data?.message ?? error.message ?? "Unknown error";
        const fieldErrors = error.response?.data?.data;
  
        if (errorMessage === "Validation failed" && fieldErrors) {
          setFieldErrors(fieldErrors);
        } else {
          setError(errorMessage);
        }
        setStatus(Error);
      }
    }, [setStatus, password, selectedPost, isMounted, fieldErrors, error, closeDeleteModal, handlePostDelete]
  );
  
      const handleCloseModal = () => {
        setPassword("");
        setError(null);
        setFieldErrors({});
        closeDeleteModal();
        setStatus(null)
      };

  return (
    <DeleteModalContext.Provider
      value={{
        isDeleteModalOpen,
        selectedPost,
        openDeleteModal,
        closeDeleteModal,
        handlePostDelete,
        onConfirm,
        handleCloseModal,
        setFieldErrors,
        fieldErrors,
        setError,
        error,
        setPassword,
        password
      }}
    >
      {children}
    </DeleteModalContext.Provider>
  );
};

export const useDeleteModal = () => useContext(DeleteModalContext);
