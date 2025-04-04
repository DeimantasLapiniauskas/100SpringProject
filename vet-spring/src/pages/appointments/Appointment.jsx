import { useEffect, useState } from "react";
import { getClientAppointments } from "../../utils/helpers/appointments";
import { getVetAppointments } from "../../utils/helpers/appointments";
import { RegisterAppointment } from "./RegisterAppointment";
import { useAuth } from "../../context/AuthContext.jsx";

export const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [visible, setVisible] = useState(false);
  const { account } = useAuth();

  const getAppointment = async () => {
    try {      
      if (account.scope == "ROLE_CLIENT") {
        const response = await getClientAppointments();
        setAppointments(response.data);
      } else {
        const response = await getVetAppointments();
        setAppointments(response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAppointment();
  }, [visible]);

  return (
    <div>
      <div className="flex flex-row justify-start m-6 items-baselin">
        <h1 className="text-2xl mr-6 text-black">Appointment history</h1>
        <button
          className="custom-white-btn !w-fit"
          onClick={() => setVisible(true)}
        >
          New Appointment
        </button>
      </div>

      <div className="bg-white m-8 p-8 rounded-box text-black">
        <div className="grid grid-cols-7 border-b border-[#97a0f1]">
          <p>Appointment Date</p>
          <p>Pet</p>
          <p>Price</p>
          <p>Veterinarian</p>
          <p>Services</p>
          <p>Notes</p>
          <p>Status</p>
        </div>
        {appointments.map((a) => (
          <div
            className="grid-cols-7 grid border-b border-[#97a0f1]"
            key={a.id}
          >
            <p>{a.appointmentDate.replace("T", " ")}</p>
            <div>
              <p>{a.petDTO.name}</p>
              <p className="text-slate-500 pt-1">{a.petDTO.species}</p>
            </div>
            <p>{a.price}</p>
            <div>
              <p>
                {a.vetDTO.firstName} {a.vetDTO.lastName}
              </p>
              <p className="text-slate-500 pt-1">{a.vetDTO.specialty}</p>
            </div>
            <div>
              {a.services.map((s) => (
                <div key={s.id}>{s.name}</div>
              ))}
            </div>
            <p>{a.notes}</p>
            <p>{a.status}</p>
          </div>
        ))}
      </div>

      {visible && (
        <RegisterAppointment setVisible={setVisible} serviceId={-1} />
      )}
    </div>
  );
};
