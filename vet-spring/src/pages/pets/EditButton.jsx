import { useContext } from "react";
import ThemeContext from "../../utils/helpers/themeContext";
import PetForm from "./PetForm";

function EditButton({ pet, getPage, currentPage, pageSize }) {
    const { editModalID, setEditModalID } = useContext(ThemeContext);

    return (
        <>
            <div>
                <button
                    className="btn"
                    onClick={() => {
                        setEditModalID(pet.id);
                    }}
                >
                    Edit
                </button>
            </div>

            {editModalID == pet.id && (
                <dialog open className="modal bg-[#DCDEFE]">
                    <div className="modal-box bg-[#97a0f1] text-center">
                        <PetForm pet={pet} getPage={getPage} currentPage={currentPage} pageSize={pageSize} />
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
    )
}

export default EditButton;