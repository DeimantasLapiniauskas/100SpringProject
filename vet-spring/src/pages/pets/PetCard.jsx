import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

export const PetCard = ({ pet, getPage, currentPage, pageSize }) => {
  const { name, species, breed, birthdate, gender } = pet;

  return (
    <div className="card card-side shadow-sm bg-[#97a0f1] text-[#000000] w-80">
      <div className="p-6">
        <div className="card-body  block break-words w-[16rem]">
          <h2 className="card-title  block break-words w-[16rem]">{name}</h2>
          <p className="py-2">{species}</p>
          <p className="py-2">{breed}</p>
          <p className="py-2">{birthdate}</p>
          <p className="py-2">{gender}</p>
        </div>
        <div className="card-actions">
          <EditButton
            pet={pet}
            getPage={getPage}
            currentPage={currentPage}
            pageSize={pageSize}
          />
          <DeleteButton
            pet={pet}
            getPage={getPage}
            currentPage={currentPage}
            pageSize={pageSize}
          />
        </div>
      </div>
    </div>
  );
};
