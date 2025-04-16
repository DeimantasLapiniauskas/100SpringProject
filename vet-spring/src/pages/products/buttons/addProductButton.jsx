import { useContext } from "react";
import ModalContext from "../../../utils/helpers/modalContext";
import ProductAddForm from "../ProductForm";

function AddProductButton({ getPage, currentPage, pageSize }) {
  const { addModalID, setAddModalID } = useContext(ModalContext);

  return (
    <>
      <div>
        <button
          className="btn"
          onClick={() => {
            setAddModalID("new");
          }}
        >
          Add new product
        </button>
      </div>

      {addModalID === "new" && (
        <dialog open className="modal bg-[#DCDEFE]">
          <div className="modal-box bg-[#97a0f1] text-center">
            <ProductAddForm
              getPage={getPage}
              currentPage={currentPage}
              pageSize={pageSize}
            />
            <form method="dialog">
              <button
                className="text-white btn bg-red-500 hover:bg-red-700 w-16"
                onClick={() => {
                  setAddModalID("");
                }}
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

export default AddProductButton;