import { useContext } from "react";
import ModalContext from "../../../utils/helpers/modalContext";
import ClientEditForm from "../forms/ClientEditForm";

function EditClientButton({ client, getPage, currentPage, pageSize }) {
    const { editModalID, setEditModalID } = useContext(ModalContext);
  
    return (
      <>
        <div>
          <button
            className="btn"
            onClick={() => {
              setEditModalID(client.id);
            }}
          >
            Edit
          </button>
        </div>
  
        {editModalID == client.id && (
          <dialog open className="modal bg-[#DCDEFE]">
            <div className="modal-box bg-[#97a0f1] text-center">
              <ClientEditForm
                client={client}
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
  
  export default EditClientButton;