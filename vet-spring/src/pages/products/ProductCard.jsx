import ModalContext from "@/utils/helpers/modalContext";
import { useContext } from "react";
import ProductModal from "./ProductModal";
import EditProductButton from "./buttons/EditProductButton";
import { useCheckRoles } from "@/hooks/useCheckRoles";
import DeleteProductButton from "./buttons/DeleteProductButton";

const ProductCard = ({ product, getPage, currentPage, pageSize }) => {
  const { name, price, stockQuantity, id, imageUrl } = product;
  const { activeModalID, setModalID } = useContext(ModalContext);

  const roles = useCheckRoles();
  return (
    <>
      <div>
        <li
          className="border-b bg-gray-100 rounded-2xl border-[1px] border-[#2c70b1] hover:bg-gray-50 transition-colors duration-200 cursor-pointer w-full max-w-md h-[12rem]"
          onClick={() => setModalID(id.toString())}
        >
          <div className="flex items-center py-4 px-6 md:px-4 md:py-2 gap-4 h-full">
            <div className="flex-1 max-w-[60%]">
              <div className="text-lg md:text-base font-medium">
                <div className="font-bold line-clamp-3 break-words">{name}</div>
                <div className="text-gray-700">
                  <p>{price} EUR</p>
                  <p>Quantity: {stockQuantity}</p>
                </div>
              </div>
            </div>
            <div className="w-[30%] min-w-[8rem] h-[10rem] bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
              <img src={imageUrl} alt={name} className="w-full h-full object-cover rounded-lg" />
            </div>
          </div>
        </li>
        {roles && (
          <div className="mt-2">
            <EditProductButton
              product={product}
              getPage={getPage}
              currentPage={currentPage}
              pageSize={pageSize}
            />
            <DeleteProductButton
              product={product}
              getPage={getPage}
              currentPage={currentPage}
              pageSize={pageSize}
            />
          </div>
        )}
      </div>

      {activeModalID === id.toString() && (
        <ProductModal product={product} onClose={() => setModalID("")} />
      )}
    </>
  );
};

export default ProductCard;