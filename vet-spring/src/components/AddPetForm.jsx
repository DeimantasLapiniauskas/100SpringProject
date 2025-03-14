import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { addPet, updatePet } from "../utils/helpers/petService";

const AddPetForm = ({ pet, getPetPage, currentPage, pageSize }) => {

  const { account } = useAuth();
  const { account_id } = account;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  useEffect(() => {
    if (pet) {
      const { name, species, breed, birthdate, gender } = pet;

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

    const trimmedData = {
      ...data,
      name: data.name.trim(),
      birthdate: data.birthdate || null,
    }

    const payload = { ...trimmedData };

    try {
    if (pet && pet.id) {
      await updatePet( pet.id, payload);
      await getPetPage(pageSize, currentPage);
    } else {
      const newPayload = { ...trimmedData, account_id };
      await addPet(newPayload);
      await getPetPage(pageSize, currentPage);
    }
    reset({ name: "", species: "", breed: "", birthdate: "", gender: "" });
  } catch (error) {
    console.error("Error details:", error.response?.data || error.message);
    setSubmitError(error.response?.data?.message || "Failed to submit the form.");
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
            maxLength: { value: 30, message: "Name cannot exceed 30 characters" },
            minLength: { value: 2, message: "Name cannot be shorter than 2 characters" },
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
    </form>
  );
};

export default AddPetForm;