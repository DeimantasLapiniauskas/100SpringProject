import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

export const AppointmentCard = ({ appoint, getPage, currentPage, pageSize }) => {
  const { appointmentDate, price, notes, birthdate, gender } = appoint;

  return (
    <div className="card card-side shadow-sm bg-[#97a0f1] text-[#000000] w-80">
      <div className="p-6">
        <div className="card-body  block break-words w-[16rem]">
          <h2 className="card-title  block break-words w-[16rem]">{appointmentDate}</h2>
          <p className="py-2">{price}</p>
          <p className="py-2">{notes}</p>
          <p className="py-2">{birthdate}</p>
          <p className="py-2">{gender}</p>
        </div>
        
        </div>
      </div>
  );
};
