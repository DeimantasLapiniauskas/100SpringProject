import DeleteButton from "../../components/DeleteButton"
import EditButton from "../../components/EditButton"

export const PetCard = ({ pet, getPetPage, currentPage, pageSize }) => {
    const { name, species, breed, birthdate, gender } = pet;

    return (
        <div className="card card-side shadow-sm bg-[#6A7AFF] text-[#FFFFFF] w-80">
        <div className="p-6">
            <div className="card-body w-80">
                <h2 className="card-title">{name}</h2>
                <p className="py-2">{species}</p>
                <p className="py-2">{breed}</p>
                <p className="py-2">{birthdate}</p>
                <p className="py-2">{gender}</p>
            </div>
            <div className="card-actions">
                <EditButton pet={pet} getPetPage={getPetPage} currentPage={currentPage} pageSize={pageSize} />
                <DeleteButton pet={pet} getPetPage={getPetPage} currentPage={currentPage} pageSize={pageSize} />
            </div>
        </div>
        </div>
    );
};