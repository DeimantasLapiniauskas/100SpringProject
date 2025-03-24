import { useContext } from "react";
import ThemeContext from "../../utils/helpers/themeContext";
import PetForm from "./PetForm";

function AddPetButton({ getPage, currentPage, pageSize }) {
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
        <dialog open className="modal bg-[#DCDEFE]">
          <div className="modal-box bg-[#97a0f1] text-center">
            <PetForm
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

export default AddPetButton;
