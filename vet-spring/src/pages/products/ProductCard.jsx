import ModalContext from "@/utils/helpers/modalContext";
import { useContext } from "react";
import ProductModal from "./ProductModal";

const ProductCard = ({ product, getPage, currentPage, pageSize }) => {
  const { name, description, price, stockQuantity, id, imageUrl } = product;
  const { activeModalID, setModalID } = useContext(ModalContext);

  return (
    <>
      <li
        className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
        onClick={() => setModalID(id.toString())}
      >
        <div className="flex items-center py-4 px-6 md:px-4 md:py-2 gap-4">
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
            {imageUrl ? (
              <img src={imageUrl} alt={name} className="w-full h-full object-cover rounded-lg" />
            ) : (
              <span className="text-gray-500">No Image</span>
            )}
          </div>
          <div className="w-full">
            <div className="w-full text-lg md:text-base font-medium flex justify-between">
              <div>{name}</div>
              <div>{price} EUR</div>
            </div>
            <div className="text-gray-700">
              <p>Description: {description}</p>
              <p>Quantity: {stockQuantity}</p>
            </div>
          </div>
        </div>
      </li>

      {activeModalID === id.toString() && (
        <ProductModal product={product} onClose={() => setModalID("")} />
      )}
    </>
  );
};

export default ProductCard;