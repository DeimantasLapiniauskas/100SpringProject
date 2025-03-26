import { useForm } from "react-hook-form";
import { getAllPets } from "../../utils/helpers/getAllPets";
import { getAllVets } from "../../utils/helpers/getAllVets";
import { useEffect, useState } from "react";
import { getServices } from "../../utils/helpers/serviceService";

export const RegisterAppointment = (props) => {
  const { setVisible } = props;
  const [pets, setPets] = useState([]);
  const [vets, setVets] = useState([]);
  const [services, setServices] = useState([]);

  const [error, setError] = useState();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const allPets = async () => {
    try {
      const response = await getAllPets();
      setPets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const allVets = async () => {
    try {
      const response = await getAllVets();
      setVets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const allServices = async () => {
    const response = await getServices();
    setServices(response.data);
  };

  useEffect(() => {
    allPets();
    allVets();
    allServices();
  }, []);

  const formSubmitHandler = async (data) => {
    console.log(data);
    
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
          <input type="datetime-local" {...register("appointmentDate")} />
        </div>
        <div>
          <label htmlFor="pet"> For which pet is appointment? </label>
          <select name="pet" id="pet" {...register("petId")}>
            {pets?.map((pet) => (
              <option key={pet.id} value={pet.id}>
                {pet.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="vet"> Choose veterinarian</label>
          <select name="vet" id="vet" {...register("vetId")}>
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
          {services?.map((s) => (
            <div key={s.id}>
              <input type="checkbox" name="service" value={s.id} {...register("serviceIds")} />
              <label htmlFor="services">{s.name}</label>
            </div>
          ))}
        </div>

        <div>
          <label htmlFor="notes">Notes</label>
          <input type="text" maxLength={255} {...register("notes")} />
        </div>
        <button type="submit" className="custom-white-btn">
          Register
        </button>
      </form>
      <button className="custom-white-btn" onClick={() => setVisible(false)}>
        Close
      </button>
    </div>
  );
};
