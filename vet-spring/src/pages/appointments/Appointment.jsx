import { useEffect, useState } from "react";
import { getAppointments } from "../../utils/helpers/appointments";
import { RegisterAppointment } from "./RegisterAppointment";

export const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [visible, setVisible] = useState(false);

  const getAppointment = async () => {
    try {
      const response = await getAppointments();
      setAppointments(response.data);
    } catch (error) {
      console.log(error.message, error);
    }
  };

  useEffect(() => {
    getAppointment();
  }, [visible]);

  return (
    <div>
      <h1>Appointment history</h1>
      <div className="m-4">
        <div className="grid grid-cols-6 border-b border-[#97a0f1]">
          <p>Appointment Date</p>
          <p>Pet</p>
          <p>Price</p>
          <p>Veterinarian</p>
          <p>Services</p>
          <p>Notes</p>
        </div>
        {appointments.map((a) => (
          <div className="grid-cols-6 grid border-b border-[#97a0f1]" key={a.id}>
            <p>{a.appointmentDate.replace("T", " ")}</p>
            <div>
              <p>{a.petDTO.name}</p>
              <p>{a.petDTO.species}</p>
            </div>
            <p>{a.price}</p>
            <p>
              {a.vetDTO.firstName}{" "}
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
      </div>
      <button className="custom-white-btn !w-fit" onClick={()=>setVisible(true)}>New Appointment</button>
      {visible && <RegisterAppointment setVisible={setVisible}/>}
    </div>
  );
};
