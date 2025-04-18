import ModalContext from "@/utils/helpers/modalContext";
import { deleteProduct } from "@/utils/helpers/productHelpers";
import { useContext } from "react";

function DeleteProductButton({ product, getPage, currentPage, pageSize }) {
  const { deleteModalID, setDeleteModalID } = useContext(ModalContext);
  const { id } = product;

  const handleDelete = async () => {
    if (deleteModalID !== id.toString()) {
      return;
    }
    try {
      await deleteProduct(id);
      await getPage(pageSize, currentPage);
      setDeleteModalID("");
    } catch (error) {
      console.error(
        "Error while deleting a product:",
        error.response?.data || error.message
      );
    }
  };
  
  return (
    <>
      <div>
        <button
          className="btn bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
          onClick={() => setDeleteModalID(id.toString())}
        >
          Delete
        </button>
      </div>
      {deleteModalID === id.toString() && (
        <dialog open className="modal bg-[#DCDEFE]">
          <div className="modal-box bg-[#97a0f1] text-center">
            <h3 className="text-white">Delete Product</h3>
            <p className="py-4 text-white">
              Are you sure you want to delete this product?
            </p>
            <div className="grid grid-cols-2 place-items-center">
              <button
                className="btn bg-red-500 hover:bg-red-700 w-16 text-white"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="btn bg-gray-500 hover:bg-gray-700 w-16 text-white"
                onClick={() => setDeleteModalID("")}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}

export default DeleteProductButton;