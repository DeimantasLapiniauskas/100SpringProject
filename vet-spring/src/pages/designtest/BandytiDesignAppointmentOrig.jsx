import { useEffect, useState } from "react";
import { getClientAppointments } from "../../utils/helpers/appointments";
import { getVetAppointments } from "../../utils/helpers/appointments";
import { RegisterAppointment } from "./RegisterAppointment";
import { useAuth } from "../../context/AuthContext.jsx";
import { NavLink } from "react-router";
import api from "@/utils/api";


export const Appointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [visible, setVisible] = useState(false);
  const { account } = useAuth();

  useEffect(() => {
    getAppointment();
  }, []);

  const getAppointment = async () => {
    try {
      if (account.scope == "ROLE_CLIENT") {
        const response = await getClientAppointments();
        setAppointments(response.data.data);
      } else {
        const response = await getVetAppointments();
        setAppointments(response.data.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAppointment();
  }, []);

  const closeAppointment = async (id) => {
    try {
      await api.put(`/appointments/cancel/${id}`);
      const response = account.scope == "ROLE_CLIENT" ? await getClientAppointments() : await getVetAppointments();
      setAppointments(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const confirmAppointment = async (id) => {
    try {
      if (account.scope.includes("ROLE_CLIENT")) {
        await api.put(`/appointments/client/confirm/${id}`);
      } else {
        await api.put(`/appointments/vet/confirm/${id}`);
      }
      getAppointment();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex flex-row justify-start m-6 items-baselin mb-12 mt-10 ml-10">
        <h1 className="text-2xl mr-6 text-black">Appointment history</h1>
        <button
          className="custom-white-btn !w-fit border-2 border-[#97a0f1] font-bold shadow-sm shadow-violet-400 ml-5"
          onClick={() => setVisible(true)}
        >
          New Appointment
        </button>
      </div>

    
      <div className="bg-white m-6 p-6 rounded-box text-black">
        <div className="grid grid-cols-8 border-b-2 border-[#97a0f1] font-bold text-xl">
          <p className="mb-4">Appointment Date</p>
          <p className="mb-4">Pet</p>
          <p className="mb-4">Price</p>
          <p className="mb-4">Veterinarian</p>
          <p className="mb-4">Services</p>
          <p className="mb-4">Notes</p>
          <p className="mb-4">Status</p>
        </div>
        {appointments.map((a) => (
          <div
            className="grid-cols-8 grid border-b-2 border-[#97a0f1] mt-3"
            key={a.id}
          >
            <p>{a.appointmentDate.replace("T", " ")}</p>
            <div>
              <p>{a.petDTO.name}</p>
              <p className="text-slate-500 pt-1 mb-3">{a.petDTO.species}</p>
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

            <div className="flex flex-row">
              <NavLink
                to={`/appointments/client/${a.id}`}
                className="btn bg-yellow-300 w-20 shadow-sm shadow-amber-500 hover:bg-yellow-400 border-transparent mr-1.5"
              >
                Change Data
              </NavLink>
              <button
                onClick={() => closeAppointment(a.id)}
                className=" btn bg-red-500 w-20 shadow-sm shadow-red-800 hover:bg-red-600 border-transparent"
              >
                Cancel
              </button>
              {a.status !== "Cancelled" &&
                a.status !== "Scheduled" &&
                a.status !==
                  (account.scope.includes("ROLE_CLIENT")
                    ? "ScheduledUnconfirmedByVet"
                    : "ScheduledUnconfirmedByClient") && (
                  <button
                    onClick={() => confirmAppointment(a.id)}
                    className=" btn bg-green-500 w-20 "
                  >
                    Confirm
                  </button>
                )}
            </div>


          </div>

          
        ))}
      </div>

      {visible && (
        <RegisterAppointment setVisible={setVisible} serviceId={-1} />
      )}
    </div>
  );
};
