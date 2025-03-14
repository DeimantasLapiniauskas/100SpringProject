import { useContext } from "react";
import { ThemeContext } from "../utils/helpers/themeContext";
import AddPetForm from "./AddPetForm";

function EditButton({ pet }) {
    const { editModalID, setEditModalID } = useContext(ThemeContext);

    console.log("works? " + editModalID);
    

    console.log("line after: ");
    console.log(editModalID);

    // console.log("ThemeContext:", ThemeContext);
    // console.log("context value:", context);

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
                <dialog open className="modal">
                    <div className="modal-box bg-gray-600 text-center">
                        <AddPetForm pet={pet} />
                        <form method="dialog">
                            <button
                                className="btn bg-red-500 w-16"
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