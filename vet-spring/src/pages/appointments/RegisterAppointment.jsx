import { useForm } from "react-hook-form";
import { getAllPets } from "../../utils/helpers/getAllPets";
import { useEffect, useState } from "react";

export const RegisterAppointment = (props) => {
  const { setVisible } = props;
  const [pets, setPets] = useState();
  //validate form
  //post to backend appointment
  //show confirmaion

  const allPets = async () => {
    try {
      const response = await getAllPets();
      setPets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allPets();
  },[]);

  return (
    <div>
      {console.log(pets)}
      <h1>Register to appointment</h1>
      <form>
        <label htmlFor="pet"> Pet </label>
        <select name="pet" id="pet">
          {pets?.map((pet) => (
            <option key={pet.id} value={pet.id}>
              {pet.name}
            </option>
          ))}
        </select>
        <button className="custom-white-btn" onClick={() => setVisible(false)}>
          Close
        </button>
      </form>
    </div>
  );
};
