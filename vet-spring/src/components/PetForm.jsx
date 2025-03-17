import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addPet, updatePet } from "../utils/helpers/petService";

const AddPetForm = ({ pet, getPage, currentPage, pageSize }) => {
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
        await updatePet(pet.id, payload);
        await getPage(pageSize, currentPage);
      } else {
        const newPayload = { ...trimmedData };
        await addPet(newPayload);
        await getPage(pageSize, currentPage);
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
    <form
      onSubmit={handleSubmit(formSubmitHandler)}
      className="text-center p-3">
      {submitError && <p className="bg-red-700 text-white">{submitError}</p>}
      <div className="p-3">
        <div className="pb-5 text-center">
          <label htmlFor="petName" className="font-bold text-lg text-white">
            Name:
          </label>
          <input
            type="text"
            id="petName"
            className="form-text-select"
            {...register("name", {
              required: "Pet name is required",
              maxLength: { value: 30, message: "Name cannot exceed 30 characters" },
              minLength: { value: 2, message: "Name cannot be shorter than 2 characters" },
              pattern: { value: /^[A-Za-z\s]+$/, message: "Name must contain only letters and spaces" },
            })}
            placeholder="Name"
          />
          <div className="text-red-500">
            {errors.name && <p>{errors.name.message}</p>}
          </div>
        </div>

        <div className="pb-5 text-center">
          <label htmlFor="petSpecies" className="font-bold text-lg text-white">
            Species:
          </label>
          <input
            type="text"
            id="petSpecies"
            className="form-text-select"
            {...register("species", {
              required: "Species is required",
              maxLength: { value: 50, message: "Species cannot exceed 50 characters" },
            })}
            placeholder="Species"
          />
          <div className="text-red-500">
          {errors.species && <p>{errors.species.message}</p>}
          </div>
        </div>

        <div className="pb-5 text-center">
          <label htmlFor="petBreed" className="font-bold text-lg text-white">
            Breed:
          </label>
          <input
            type="text"
            id="petBreed"
            className="form-text-select"
            {...register("breed", {
              maxLength: { value: 50, message: "Breed cannot exceed 50 characters" },
            })}
            placeholder="Breed"
          />
          <div className="text-red-500">
          {errors.breed && <p>{errors.breed.message}</p>}
          </div>
        </div>

        <div className="pb-5 text-center">
          <label htmlFor="petBirthdate" className="font-bold text-lg text-white">
            Birthdate:
          </label>
          <input
            type="date"
            id="petBirthdate"
            className="form-text-select"
            {...register("birthdate", {
              validate: (value) => new Date(value) <= new Date() || "Birthdate cannot be in the future",
            })}
          />
          <div className="text-red-500">
          {errors.birthdate && <p>{errors.birthdate.message}</p>}
          </div>
        </div>

        <div className="pb-5 text-center">
          <label htmlFor="petGender" className="font-bold text-lg text-white">
            Gender:
          </label>
          <select
            id="petGender"
            className="form-text-select"
            {...register("gender", { required: "Gender is required" })}
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <div className="text-red-500">
          {errors.gender && <p>{errors.gender.message}</p>}
          </div>
        </div>
      </div>

      <button type="submit" disabled={isLoading} className="text-white">
        {isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default AddPetForm;