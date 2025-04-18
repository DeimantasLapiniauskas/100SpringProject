import ModalContext from "@/utils/helpers/modalContext";
import { useContext } from "react";
import ProductModal from "./ProductModal";
import EditProductButton from "./buttons/EditProductButton";

const ProductCard = ({ product, getPage, currentPage, pageSize }) => {
  const { name, description, price, stockQuantity, id, imageUrl } = product;
  const { activeModalID, setModalID } = useContext(ModalContext);

  return (
    <>
      <li
        className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
        onClick={() => setModalID(id.toString())}
      >
        <div className="flex flex-col">
          <div className="w-16 h-20 sm:w-50 sm:h-30 bg-gray-200 rounded-lg flex items-center justify-center">
            {imageUrl ? (
              <img src={imageUrl} alt={name} className="w-full h-full object-cover rounded-lg" />
            ) : (
              <span className="text-gray-500">No Image</span>
            )}
          </div>
          <div className="w-full">
            <div className=" text-lg md:text-base font-medium flex justify-between">
              <div className="block break-all ">{name}</div>
              <div>{price} EUR</div>
            </div>
            <div className="text-gray-700">
              <p className="block break-all ">{description}</p>
              <p>Quantity: {stockQuantity}</p>
            </div>
            <div className="mt-2">
              <EditProductButton
                product={product}
                getPage={getPage}
                currentPage={currentPage}
                pageSize={pageSize}
              />
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