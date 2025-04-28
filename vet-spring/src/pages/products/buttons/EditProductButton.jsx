import { useContext } from "react";
import ModalContext from "@/utils/helpers/modalContext";
import ProductForm from "../ProductForm";


function EditProductButton({ product, getPage, currentPage, pageSize }) {
  const { editModalID, setEditModalID } = useContext(ModalContext);

  return (
    <>
      <div>
        <button
          className="btn bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
          onClick={() => setEditModalID(product.id.toString())}
        >
          Edit
        </button>
      </div>

      {editModalID === product.id.toString() && (
        <dialog open className="modal bg-[#DCDEFE]">
          <div className="modal-box bg-[#97a0f1] text-center py-0">
            <ProductForm
              product={product}
              getPage={getPage}
              currentPage={currentPage}
              pageSize={pageSize}
            />
            <form method="dialog">
              <button
                className="text-white btn bg-red-500 hover:bg-red-700 w-16"
                onClick={() => setEditModalID("")}
              >
                Close
              </button>
            </form>
          </div>
        </dialog>
      )}
    </>
  );
}

export default EditProductButton;