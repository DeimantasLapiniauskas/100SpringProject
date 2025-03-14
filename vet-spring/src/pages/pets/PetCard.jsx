import DeleteButton from "../../components/DeleteButton"
import EditButton from "../../components/EditButton"

export const PetCard = ({ pet, getPetPage, currentPage, pageSize }) => {
    const { id, name, species, breed, birthdate, gender } = pet;

    return (
        <div className="flex bg-blue-500 w-5/6">
            <div className="flex">
                <p className="p-2">{id}</p>
                <p className="p-2">{name}</p>
                <p className="p-2">{species}</p>
                <p className="p-2">{breed}</p>
                <p className="p-2">{birthdate}</p>
                <p className="p-2">{gender}</p>
            </div>
            <div className="card-actions">
                <EditButton pet={pet} getPetPage={getPetPage} currentPage={currentPage} pageSize={pageSize} />
                <DeleteButton pet={pet} getPetPage={getPetPage} currentPage={currentPage} pageSize={pageSize} />
            </div>
        </div>
    );
};