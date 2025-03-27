import { useContext } from "react";
import ThemeContext from "../../utils/helpers/themeContext";
import { deletePet } from "../../utils/helpers/deletePet";

function DeleteButton({ pet, getPage, currentPage, pageSize }) {
  const { deleteModalID, setDeleteModalID } = useContext(ThemeContext);
  const { id } = pet;

  const handleDelete = async () => {
    if (deleteModalID !== id) {
      return;
    }
    try {
      await deletePet(id);
      await getPage(pageSize, currentPage);
      setDeleteModalID("");
    } catch (error) {
      console.error(
        "Error while deleting a pet:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <>
      <div>
        <button className="btn" onClick={() => setDeleteModalID(id)}>
          Delete
        </button>
      </div>
      {deleteModalID == pet.id && (
        <dialog open className="modal bg-[#DCDEFE]">
          <div className="modal-box bg-[#97a0f1] text-center">
            <h3 className="text-white">Delete</h3>
            <p className="py-4 text-white">
              Are you sure you want to delete this pet?
            </p>
            <div className="grid grid-cols-2 place-items-center">
              <button
                className="btn bg-red-500 hover:bg-red-700 w-16"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="btn bg-gray-500 hover:bg-gray-700 w-16"
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

export default DeleteButton;
