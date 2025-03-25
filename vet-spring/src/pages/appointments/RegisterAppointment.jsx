import { useForm } from "react-hook-form";

export const RegisterAppointment = () => {
    //load times for available appointments
    //validate form
    //post to backend appointment
    //show confirmaion
  return <div>
    <h1>
      Register to appointment
    </h1>
    <form>
      <label htmlFor="pet"> Pet </label>
      <select name="pet" id="pet">
        <option value="pet">pet</option>
      </select>
    </form>
  </div>;
};
