import ModalContext from "@/utils/helpers/modalContext";
import { useContext } from "react";
import ProductModal from "./ProductModal";

const ProductCard = ({ product, getPage, currentPage, pageSize }) => {
    const { name, description, price, stockQuantity, id } = product;
    const { activeModalID, setModalID } = useContext(ModalContext);

    return (
        <>
      <li
        className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
        onClick={() => setModalID(id.toString())}
      >
        <div className="flex justify-between items-center py-4 px-6 md:px-4 md:py-2">
          <div className="w-full text-lg md:text-base font-medium flex justify-between">
            <div>{name}</div>
            <div>{price} EUR</div>
          </div>
        </div>
        <div className="px-6 py-4 text-gray-700">
          <p>Description: {description}</p>
          <p>Quantity: {stockQuantity}</p>
        </div>
      </li>

      {activeModalID === id.toString() && (
        <ProductModal product={product} onClose={() => setModalID("")} />
      )}
    </>
    )
}

export default ProductCard;