import { useForm } from "react-hook-form";
import { getAllPets } from "../../utils/helpers/getAllPets";
import { getAllVets } from "../../utils/helpers/getAllVets";
import { useEffect, useState } from "react";
import { getServices } from "../../utils/helpers/serviceService";
import { postAppointment } from "../../utils/helpers/appointments";
import { Error } from "../../components/Error";

export const RegisterAppointment = (props) => {
  const { setVisible } = props;
  const [pets, setPets] = useState([]);
  const [vets, setVets] = useState([]);
  const [services, setServices] = useState([]);

  const [error, setError] = useState();
  const [visibleError, setVisibleError] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const allPets = async () => {
    try {
      const response = await getAllPets();
      setPets(response.data);
    } catch (error) {
      setError(error.response?.message || error.message);
      setVisibleError(true);
    }
  };

  const allVets = async () => {
    try {
      const response = await getAllVets();
      setVets(response.data);
    } catch (error) {
      setError(error.response?.message || error.message);
      setVisibleError(true);
    }
  };

  const allServices = async () => {
    try{
      const response = await getServices();
    setServices(response.data);
    } catch (error) {
      setError(error.response?.message || error.message);
      setVisibleError(true);
    }    
  };

  useEffect(() => {
    allPets();
    allVets();
    allServices();
  }, []);

  const formSubmitHandler = async (data) => {
    try {
      await postAppointment(data);
      reset({
        appointmentDate: "",
        petId: "",
        vetId: "",
        serviceId: "",
        notes: ""
      });
    } catch (error) {
      setVisibleError(true);
      setError(error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h1>Register to appointment</h1>
      <form
        onSubmit={handleSubmit(formSubmitHandler)}
        className="grid grid-cols-1 w-1/3"
      >
        <div>
          <label htmlFor="appointmentDate"> Pick date </label>
          <div>{errors.appointmentDate?.message}</div>
          <input
            type="datetime-local"
            {...register("appointmentDate", {
              required: { value: true, message: "This field is requered" },
            })}
          />
        </div>
        <div>
          <label htmlFor="pet"> For which pet is appointment? </label>
          <div>{errors.petId?.message}</div>
          <select
            name="pet"
            id="pet"
            {...register("petId", {
              required: { value: true, message: "This field is requered" },
            })}
          >
            <option value=""> pick pet</option>
            {pets?.map((pet) => (
              <option key={pet.id} value={pet.id}>
                {pet.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="vet"> Choose veterinarian</label>
          <div>{errors.vetId?.message}</div>
          <select
            name="vet"
            id="vet"
            {...register("vetId", {
              required: { value: true, message: "This field is requered" },
            })}
          >
            {" "}
            <option value="">Veterianians</option>
            {vets?.map((vet) => (
              <option key={vet.id} value={vet.id}>
                {vet.firstName} {vet.lastName}
                {" ("}
                {vet.specialty}
                {")"}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="services">Services</label>
          <div>{errors.serviceId?.message}</div>
          {services?.map((s) => (
            <div key={s.id}>
              <input
                type="checkbox"
                name="service"
                value={s.id}
                {...register("serviceIds", {
                  required: { value: true, message: "This field is requered" },
                })}
              />
              <label htmlFor="services">{s.name}</label>
            </div>
          ))}
        </div>

        <div>
          <label htmlFor="notes">Notes</label>
          <input type="text" maxLength={255} {...register("notes")} />
        </div>

        {visibleError && <Error error={error} setVisible={setVisibleError} />}

        <button
          onClick={() => setVisibleError(false)}
          type="submit"
          className="custom-white-btn"
        >
          Register
        </button>
      </form>
      <button className="custom-white-btn" onClick={() => setVisible(false)}>
        Close
      </button>
    </div>
  );
};
