import { useContext } from "react";
import ModalContext from "../../../utils/helpers/modalContext";
import VetEditForm from "../forms/VetEditForm";

function EditVetButton({ vet, getPage, currentPage, pageSize }) {
    const { editModalID, setEditModalID } = useContext(ModalContext);
  
    return (
      <>
        <div>
          <button
            className="btn"
            onClick={() => {
              setEditModalID(vet.id);
            }}
          >
            Edit
          </button>
        </div>
  
        {editModalID == vet.id && (
          <dialog open className="modal bg-[#DCDEFE]">
            <div className="modal-box bg-[#97a0f1] text-center">
              <VetEditForm
                client={vet}
                getPage={getPage}
                currentPage={currentPage}
                pageSize={pageSize}
              />
              <form method="dialog">
                <button
                  className="text-white btn bg-red-500 hover:bg-red-700 w-16"
                  onClick={() => {
                    setEditModalID("");
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
  
  export default EditVetButton;