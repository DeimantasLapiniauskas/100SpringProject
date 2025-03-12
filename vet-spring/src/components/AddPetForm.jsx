import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { addPet, updatePet } from "../utils/postPet";
import { Error } from "./Error";

const AddPetForm = ({ pet, onPetUpdate, onClose }) => {

const {account} = useAuth();
const {account_id} = account;
console.log(account);


  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [error, setError] = useState("")

  useEffect(() => {
    if (pet) {
      const {name, species, breed, birthdate, gender} = pet;

      setValue("name", name);
      setValue("species", species);
      setValue("breed", breed);
      setValue("birthdate", birthdate ? birthdate.split("T")[0] : "");
      setValue("gender", gender);
    }
  }, [pet, setValue]);

  const formSubmitHandler = async (data) => {
    setIsLoading(true);
    setSubmitError(null);

    const payload = { ...data, account_id };

    try {
      let response1;
      if (pet && pet.id) {
        response1 = await updatePet(account_id, pet.id, payload);
      } else {
        response1 = await addPet(payload);
      }
      
      

      onPetUpdate(response1.data);
      reset();
      onClose();
    } catch (error) {

      //console.error(error);
      setError(JSON.stringify(error.response.data) ?? error.message)
      setSubmitError("Failed to submit the form. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(formSubmitHandler)}>
      {submitError && <p className="bg-red-700">{submitError}</p>}

      <div>
        <label htmlFor="petName">Name</label>
        <input
          type="text"
          id="petName"
          {...register("name", {
            required: "Pet name is required",
            maxLength: { value: 50, message: "Name cannot exceed 50 characters" },
            pattern: { value: /^[A-Za-z\s]+$/, message: "Name must contain only letters and spaces" },
          })}
          placeholder="Name"
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="petSpecies">Species</label>
        <input
          type="text"
          id="petSpecies"
          {...register("species", {
            required: "Species is required",
            maxLength: { value: 50, message: "Species cannot exceed 50 characters" },
          })}
          placeholder="Species"
        />
        {errors.species && <p>{errors.species.message}</p>}
      </div>

      <div>
        <label htmlFor="petBreed">Breed</label>
        <input
          type="text"
          id="petBreed"
          {...register("breed", {
            required: "Breed is required",
            maxLength: { value: 50, message: "Breed cannot exceed 50 characters" },
          })}
          placeholder="Breed"
        />
        {errors.breed && <p>{errors.breed.message}</p>}
      </div>

      <div>
        <label htmlFor="petBirthdate">Birthdate</label>
        <input
          type="date"
          id="petBirthdate"
          {...register("birthdate", {
            required: "Birthdate is required",
            validate: (value) => new Date(value) <= new Date() || "Birthdate cannot be in the future",
          })}
        />
        {errors.birthdate && <p>{errors.birthdate.message}</p>}
      </div>

      <div>
        <label htmlFor="petGender">Gender</label>
        <select
          id="petGender"
          {...register("gender", { required: "Gender is required" })}
        >
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        {errors.gender && <p>{errors.gender.message}</p>}
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit"}
      </button>
      <Error error={error} isHidden={!error} />
    </form>
  );
};

export default AddPetForm;