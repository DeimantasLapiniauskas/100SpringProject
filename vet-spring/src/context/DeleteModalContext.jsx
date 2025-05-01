import { createContext, useContext, useState, useCallback } from "react";

import toast from "react-hot-toast";
import { useUI } from "@/context/UIContext";
import { UIStatus } from "@/constants/UIStatus";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useList } from "@/context/ListContext";
import { useEntityPath } from "@/hooks/usePath";
import { deleteEntity, verifyPassword } from "@/utils/helpers/entity";

const DeleteModalContext = createContext();

export const DeleteModalProvider = ({ children }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const isMounted = useIsMounted();
  const { setStatus } = useUI();
  const { getPage, pageSize, currentPage, sorted, searchValue, setPagination } =
    useList();
  const { Loading, Success, Error, Unusual } = UIStatus;
  const entityPath = useEntityPath();

  const openDeleteModal = useCallback((entity) => {
    setSelectedEntity(entity);
    setIsDeleteModalOpen(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
    setSelectedEntity(null);
  }, []);

  const handleEntityDelete = useCallback(
    async (entityId) => {
      try {
        setStatus(Loading);

        if (entityId) {
          const response = await deleteEntity(entityPath, entityId);

          if (!isMounted.current) return;

          const { message } = response.data;

          if (message) {
            toast.success(message);
            await getPage(pageSize, currentPage, sorted, searchValue);

            if (!isMounted.current) return;

            setPagination((prev) => ({ ...prev }));
            setStatus(Success);
          } else {
            setStatus(Unusual);
          }
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
    },
    [setStatus, getPage, isMounted]
  );

  const onConfirm = useCallback(async () => {
    try {
      setStatus(Loading);
      const response = await verifyPassword(password);

      if (!isMounted.current) return;

      const { message, success } = response.data;

      if (success && message) {
        setMessage(message);
        await handleEntityDelete(selectedEntity?.id);

        if (!isMounted.current) return;

        setStatus(Success);
        handleCloseModal();
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
  }, [
    setStatus,
    password,
    selectedEntity,
    isMounted,
    fieldErrors,
    error,
    closeDeleteModal,
    handleEntityDelete,
  ]);

  const handleCloseModal = () => {
    setPassword("");
    setError(null);
    setFieldErrors({});
    closeDeleteModal();
    setStatus(null);
  };

  return (
    <DeleteModalContext.Provider
      value={{
        isDeleteModalOpen,
        selectedEntity,
        openDeleteModal,
        closeDeleteModal,
        handleEntityDelete,
        onConfirm,
        handleCloseModal,
        setFieldErrors,
        fieldErrors,
        setError,
        error,
        setPassword,
        password,
      }}
    >
      {children}
    </DeleteModalContext.Provider>
  );
};

export const useDeleteModal = () => useContext(DeleteModalContext);
