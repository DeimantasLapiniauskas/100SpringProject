import { useEffect, useState } from "react";
import { getAppointments } from "../../utils/helpers/getAppointments";

export const Appointment = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointment = async () => {
    try {
      const response = await getAppointments();

      setAppointments(response.data);
      console.log(response);
    } catch (error) {
      console.log(error.message, error);
    }
  };

  useEffect(() => {
    getAppointment();
  }, []);
  //make table for appointment history??
  return (
    <div>
      <h1>Appointment history</h1>
      <div className="grid grid-cols-6">
        <p>Appointment Date</p> 
        <p>Pet</p> 
        <p>Price</p> 
        <p>Veterinarian</p>
        <p>Services</p> 
        <p>Notes</p>
      </div>
      {appointments.map((a) => (
        <div className="grid-cols-6 grid" key={a.id}>
          <p>{a.appointmentDate}</p>
          <div>
            <p>{a.petDTO.name}</p>
            <p>{a.petDTO.species}</p>
          </div>
          <p>{a.price}</p>
          <p>
            {a.vetDTO.firstName}
            {a.vetDTO.lastName}
          </p>
          <div>
            {a.services.map((s) => (
              <div key={s.id}>{s.name}</div>
            ))}
          </div>
          <p>{a.notes}</p>
        </div>
      ))}
      <button className="custom-white-btn">New Appointment</button>
    </div>
  );
};
