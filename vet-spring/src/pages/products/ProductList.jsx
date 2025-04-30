import { Error } from "@/components/feedback/Error";
import { Loading } from "@/components/feedback/Loading";
import { useList } from "@/context/ListContext";
import { useUI } from "@/context/UIContext";
import ProductCard from "./ProductCard";
import ModalContext from "@/utils/helpers/modalContext";
import { useState } from "react";
import { BadPageRequest } from "@/components/feedback/BadPageRequest";
import { PaginationPanel } from "@/components/features/PaginationPanel";
import AddProductButton from "./buttons/AddProductButton";
import { SearchBarPanel } from "@/components/features/SearchBarPanel";
import { FilterPanel } from "@/components/features/FilterPanel";
import { SelectPageSizePanel } from "@/components/features/SelectPageSizePanel";
import { useCheckAdminAndVetRoles } from "@/hooks/useCheckRoles";
import { ClearAllButton } from "@/components/features/ClearAllButton";

const ProductList = () => {
  const {
    getPage,
    error,
    message,
    content: products,
    currentPage,
    pageSize,
    isEmpty,
  } = useList();

  const { isLoading, isError, isBadRequest } = useUI();
  const [activeModalID, setModalID] = useState("");
  const [addModalID, setAddModalID] = useState("");
  const [editModalID, setEditModalID] = useState("");
  const [deleteModalID, setDeleteModalID] = useState("");

  const categories = [
    { label: "All", value: "All" },
    { label: "Medicine", value: "Medicine" },
    { label: "Food", value: "Food" },
    { label: "Toys", value: "Toys" },
  ];
  const pageSizes = [12, 24, 36];

  const roles = useCheckAdminAndVetRoles();

  return (
    <div className="p-4 justify-center">
      <ModalContext.Provider
        value={{
          activeModalID,
          setModalID,
          addModalID,
          setAddModalID,
          editModalID,
          setEditModalID,
          deleteModalID,
          setDeleteModalID,
        }}
      >
      <div className="flex flex-col items-center sm:flex-row w-full sm:justify-end gap-2.5 md:gap-3.5 relative">
          <SearchBarPanel />
          <div className="absolute sm:bottom-[-1rem] md:bottom-[-1.25rem] right-0.5 xs:right-15 sm:right-3">
        <ClearAllButton />
      </div>
        <div className="flex gap-2 md:gap-4 items-center px-2 md:px-3">
          <FilterPanel filterFields={categories} />
          <SelectPageSizePanel pageSizes={pageSizes} />
        </div>
      </div>
        {roles && (
          <div className="flex justify-center w-full items-center my-2 md:my-4">
            <AddProductButton
              getPage={getPage}
              currentPage={currentPage}
              pageSize={pageSize}
            />
          </div>
        )}
        {isEmpty ? <p>{message}</p> : ""}
        {isLoading ? <Loading /> : ""}
        {isError ? <Error error={error} isHidden={!error} /> : ""}
        {isBadRequest ? <BadPageRequest /> : ""}
        <ul className="justify-items-center divide-gray-200 grid sm:grid-cols-1 gap-y-4 row-gap-10 md:grid-cols-2  lg:grid-cols-3  ">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              getPage={getPage}
              currentPage={currentPage}
              pageSize={pageSize}
            />
          ))}
        </ul>
      </ModalContext.Provider>
      <div className="flex justify-center">
        <PaginationPanel />
      </div>
    </div>
  );
};

export default ProductList;
