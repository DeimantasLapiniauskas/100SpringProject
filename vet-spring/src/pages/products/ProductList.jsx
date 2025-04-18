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
import { SelectPanel } from "@/components/features/SelectPagesPanel";
import { useCheckRoles } from "@/hooks/useCheckRoles";

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
    const [activeModalID, setModalID] = useState('');
    const [addModalID, setAddModalID] = useState('');
    const [editModalID, setEditModalID] = useState('');
    const [deleteModalID, setDeleteModalID] = useState('');

    const categories = ["All", "Medicine", "Food", "Toys"];
    const pageSizes = [12, 24, 36];

    const roles = useCheckRoles();

    return (
        <div className="p-4 justify-center">
            <ModalContext.Provider value={{ activeModalID, setModalID, addModalID, setAddModalID, editModalID, setEditModalID, deleteModalID, setDeleteModalID }}>
                <div className="flex w-full justify-center gap-1.5 sm:gap-2.5 md:gap-3.5 relative mb-[4rem]">
                    {/* <button
                        type="button"
                        className="cursor-pointer bg-gray-400 hover:bg-gray-300 text-[8px] sm:text-[10px] md:text-xs px-1.5 sm:px-2.5 md:px-3.5 py-0.25 sm:py-0.5 md:py-0.75 rounded-[10px]
                         text-gray-800 hover:text-warning-content absolute bottom-[-65%] sm:bottom-[-75%] md:bottom-[-82%] lg:bottom-[-75%] border border-gray-500 hover:border-gray-400"
                        onClick={clearAll}
                    >
                        Clear
                    </button> */}
                    <SearchBarPanel />
                    <SelectPanel pageSizes={pageSizes} />
                    <FilterPanel sortFields={categories} />
                </div>
                {roles && (
                    <div className="flex justify-center w-full items-center">
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
                <ul className="justify-items-center divide-gray-200 grid grid-cols-1 gap-4 md:grid-cols-2  lg:grid-cols-3 w-full">
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