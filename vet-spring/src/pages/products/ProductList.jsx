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

    const [activeModalID, setModalID] = useState('');
    const [addModalID, setAddModalID] = useState('');
    const [editModalID, setEditModalID] = useState('');

    const { isLoading, isError, isBadRequest } = useUI();
    return (
        <div className="p-4 justify-center mx-[2rem] mt-[2rem]">
            <ModalContext.Provider value={{ activeModalID, setModalID, addModalID, setAddModalID, editModalID, setEditModalID }}>
                <AddProductButton
                    getPage={getPage}
                    currentPage={currentPage}
                    pageSize={pageSize}
                />
                {isEmpty ? <p>{message}</p> : ""}
                {isLoading ? <Loading /> : ""}
                {isError ? <Error error={error} isHidden={!error} /> : ""}
                {isBadRequest ? <BadPageRequest /> : ""}
                <ul className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 divide-gray-200">
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