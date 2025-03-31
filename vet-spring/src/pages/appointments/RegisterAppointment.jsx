import { useForm } from "react-hook-form";
import { getAllPets } from "../../utils/helpers/getAllPets";
import { getAllVets } from "../../utils/helpers/getAllVets";
import { useEffect, useState } from "react";
import { getServices } from "../../utils/helpers/serviceService";
import { postAppointment } from "../../utils/helpers/appointments";
import { Error } from "../../components/Error";

export const RegisterAppointment = (props) => {
  const { serviceId, setVisible } = props;
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
    try {
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
      if (typeof(data.serviceIds)=='string'){
        console.log('yes');
        data.serviceIds = [data.serviceIds];
        console.log(data);
      } 
      await postAppointment(data);
      reset({
        appointmentDate: "",
        petId: "",
        vetId: "",
        serviceIds: "",
        notes: "",
      });
      setVisible(false);
    } catch (error) {
      setVisibleError(true);
      setError(error.response?.data || error.message);
    }
  };

  const exitRegFor = () => {
    document.body.style.overflow = "scroll";
    setVisible(false);
  };

  return (
    <div className="bg-slate-400/50 h-lvh w-screen absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      {(document.body.style.overflow = "hidden")}
      <div className="bg-[#97a0f1] border border-[#97a0f1] p-8 rounded-box absolute z-20 w-[600px] h-fit top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black">
        <h1 className="text-center text-2xl p-4">Register to appointment</h1>
        <form
          onSubmit={handleSubmit(formSubmitHandler)}
          className="grid grid-cols-1 w-3/5 m-auto mb-16"
        >
          <div>
            <div className="flex flex-row justify-between pt-2">
              <label htmlFor="appointmentDate"> Date </label>
              <div className="text-red-700 font-medium">
                {errors.appointmentDate?.message}
              </div>
            </div>
            <input
              type="datetime-local"
              {...register("appointmentDate", {
                required: { value: true, message: "This field is required" },
              })}
              className="input autofill:shadow-[inset_0_0_0px_1000px_rgb(250,250,250)"
            />
          </div>

          <div>
            <div className="flex flex-row justify-between pt-2">
              <label htmlFor="pet">
                Your pet
              </label>
              <div className="text-red-700 font-medium">
                {errors.petId?.message}
              </div>
            </div>
            <select
              name="pet"
              id="pet"
              {...register("petId", {
                required: { value: true, message: "This field is required" },
              })}
              className="select autofill:shadow-[inset_0_0_0px_1000px_rgb(250,250,250)"
            >
              <option value=""></option>
              {pets?.map((pet) => (
                <option key={pet.id} value={pet.id}>
                  {pet.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex flex-row justify-between pt-2">
              <label htmlFor="vet">
                {" "}
                Veterinarian
              </label>
              <div className="text-red-700 font-medium">
                {errors.vetId?.message}
              </div>
            </div>
            <select
              name="vet"
              id="vet"
              {...register("vetId", {
                required: { value: true, message: "This field is required" },
              })}
              className="select autofill:shadow-[inset_0_0_0px_1000px_rgb(250,250,250)"
            >
              <option value=""></option>
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
            <div className="flex flex-row justify-between pt-2">
              <label htmlFor="services">
                Services
              </label>
              <div className="text-red-700 font-medium">
                {errors.serviceIds?.message}
              </div>
            </div>

            <div className="bg-white rounded-[0.5rem] border-slate-400 border h-fit flex flex-wrap items-start p-2">
              {services?.map((s) => (
                <div key={s.id}>
                  <input
                    type="checkbox"
                    name="service"
                    value={s.id}
                    {...register("serviceIds", {
                      required: {
                        value: true,
                        message: "This field is required",
                      },
                    })}
                    className="m-2"
                    defaultChecked={s.id === serviceId}
                  />
                  <label htmlFor="services">{s.name}</label>
                </div>
              ))}
            </div>

          </div>

          <div className="pt-2">
            <label htmlFor="notes">
              Notes
            </label>
            <textarea
              type="text"
              cols={40}
              maxLength={255}
              {...register("notes")}
              className="input h-24 autofill:shadow-[inset_0_0_0px_1000px_rgb(250,250,250)"
            />
          </div>

          {visibleError && <Error error={error} setVisible={setVisibleError} />}

          <button
            onClick={() => setVisibleError(false)}
            type="submit"
            className="custom-white-btn absolute z-20 bottom-8 left-40"
          >
            Register
          </button>
        </form>
        <button
          className="custom-white-btn !bg-[#ffb2b2] hover:!bg-white mt-2 absolute z-20 bottom-8 right-40"
          onClick={() => exitRegFor()}
        >
          Close
        </button>
      </div>
    </div>
  );
};
