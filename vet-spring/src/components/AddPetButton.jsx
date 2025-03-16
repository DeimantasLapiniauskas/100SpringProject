import { useContext } from "react";
import ThemeContext from "../utils/helpers/themeContext";
import AddPetForm from "./PetForm";

function AddPetButton({ getPetPage, currentPage, pageSize }) {
  const { addModalID, setAddModalID } = useContext(ThemeContext);

  return (
    <>
      <div>
        <button
          className="btn"
          onClick={() => {
            setAddModalID("new");
          }}
        >
          Add Pet
        </button>
      </div>

      {addModalID === "new" && (
        <dialog open className="modal">
          <div className="modal-box bg-gray-600 text-center">
            <AddPetForm getPetPage={getPetPage} currentPage={currentPage} pageSize={pageSize} />
            <form method="dialog">
              <button
                className="btn bg-red-500 w-16"
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

export default AddPetButton;