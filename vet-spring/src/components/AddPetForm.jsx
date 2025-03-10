import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const AddPetForm = ({ pet, ownerId, onPetUpdate, onClose }) => {
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
      setValue("name", pet.name);
      setValue("species", pet.species);
      setValue("breed", pet.breed);
      setValue("birthdate", pet.birthdate ? pet.birthdate.split("T")[0] : "");
      setValue("gender", pet.gender);
    }
  }, [pet, setValue]);

  const formSubmitHandler = async (data) => {
    setIsLoading(true);
    setSubmitError(null);
    const payload = { ...data, ownerId };
    const endpoint = pet && pet.id ? `/pets/${ownerId}/${pet.id}` : `/pets`;
    const method = pet ? axios.put : axios.post;

    try {
      const response = await method(endpoint, payload);
      onPetUpdate(response.data);
      reset();
      onClose();
    } catch (error) {
      console.error(error);
      setSubmitError("Failed to submit the form. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(formSubmitHandler)}>
      {submitError && <p style={{ color: "red" }}>{submitError}</p>}

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
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
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