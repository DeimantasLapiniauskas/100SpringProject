import { BadRequest } from "@/components/feedback/BadRequest";
import { Error } from "@/components/feedback/Error";
import { Loading } from "@/components/feedback/Loading";
import { PaginationUI } from "@/components/PaginationUI";
import { useList } from "@/context/ListContext";
import { useUI } from "@/context/UIContext";
import ProductCard from "./ProductCard";
import ModalContext from "@/utils/helpers/modalContext";
import { useState } from "react";

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

    const { isLoading, isError, isBadRequest } = useUI();
    return (
        <div className="p-4 justify-center mx-[7rem] mt-[2rem]">
            <ModalContext.Provider value={{ activeModalID, setModalID }}>
                {/* <AddProductButton
                getPage={getPage}
                currentPage={currentPage}
                pageSize={pageSize}
            /> */}
                {isEmpty ? <p>{message}</p> : ""}
                {isLoading ? <Loading /> : ""}
                {isError ? <Error error={error} isHidden={!error} /> : ""}
                {isBadRequest ? <BadRequest /> : ""}
                <ul className="w-full grid grid-cols-5 gap-4 p-4 divide-gray-200">
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
                <PaginationUI />
            </div>
        </div>
    );
};

export default ProductList;