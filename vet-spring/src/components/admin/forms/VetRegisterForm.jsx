import { useState } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { addVet } from "@/utils/helpers/addEditVet";
import ModalContext from "@/utils/helpers/modalContext";

const VetRegisterForm = ({ getPage, currentPage, pageSize }) => {
    const { setAddModalID } = useContext(ModalContext);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phoneNumber: "",
            specialty: "",
            licenseNumber: "",
        },
    });

    const [isLoading, setIsLoading] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const formSubmitHandler = async (data) => {
        setIsLoading(true);
        setSubmitError(null);

        const trimmedData = {
            ...data,
            email: data.email.trim(),
            password: data.password.trim(),
            firstName: data.firstName.trim(),
            lastName: data.lastName.trim(),
            phoneNumber: data.phoneNumber.trim(),
            specialty: data.specialty.trim(),
            licenseNumber: data.licenseNumber.trim(),
        };

        const payload = { ...trimmedData };

        try {
            await addVet(payload);
            await getPage(pageSize, currentPage);
            setAddModalID("");
            reset();
        } catch (error) {
            console.error("Error details: ", error.response?.data || error.message);
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
                    <label htmlFor="email" className="font-bold text-lg text-white">
                        Email:
                    </label>
                    <input
                        type="text"
                        id="email"
                        className="form-text-select"
                        {...register("email", {
                            required: "Email is required",
                            maxLength: {
                                value: 50,
                                message: "Email cannot exceed 50 characters",
                            },
                            minLength: {
                                value: 11,
                                message: "Email cannot be shorter than 11 characters",
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]{4,}@[a-zA-Z0-9.-]{3,}\.[a-zA-Z]{2,}$/,
                                message: "Invalid email format, vets should have at least 4 symbols before @, at least 3 after @ and before domain, domain at least 2 symbols",
                            },
                        })}
                        placeholder="Email"
                    />
                    <div className="text-red-500">
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>
                </div>

                <div className="pb-5 text-center">
                    <label htmlFor="password" className="font-bold text-lg text-white">
                        Password:
                    </label>
                    <input
                        type="text"
                        id="password"
                        className="form-text-select"
                        {...register("password", {
                            required: "Password is required",
                            maxLength: {
                                value: 50,
                                message: "Password cannot exceed 50 characters",
                            },
                            minLength: {
                                value: 8,
                                message: "Password cannot be shorter than 8 characters",
                            },
                            pattern: {
                                value: /^(?=(.*[a-zA-Z]))(?=(.*\d))[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@^_`{|}~ ]*$/,
                                message: "Your password must contain at least one number, one letter, and it only accepts those and the regular qwerty keyboard symbols!",
                            },
                        })}
                        placeholder="Password"
                    />
                    <div className="text-red-500">
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>
                </div>

                <div className="pb-5 text-center">
                    <label htmlFor="firstName" className="font-bold text-lg text-white">
                        First name:
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        className="form-text-select"
                        {...register("firstName", {
                            required: "First name is required",
                            maxLength: {
                                value: 100,
                                message: "First name cannot exceed 100 characters",
                            },
                            minLength: {
                                value: 3,
                                message: "First name cannot be shorter than 3 characters",
                            },
                            pattern: {
                                value: /^[A-Za-z ]*$/,
                                message: "Vets first name must only consist of letters and spaces!",
                            },
                        })}
                        placeholder="First name"
                    />
                    <div className="text-red-500">
                        {errors.firstName && <p>{errors.firstName.message}</p>}
                    </div>
                </div>

                <div className="pb-5 text-center">
                    <label htmlFor="lastName" className="font-bold text-lg text-white">
                        Last name:
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        className="form-text-select"
                        {...register("lastName", {
                            required: "Last name is required",
                            maxLength: {
                                value: 100,
                                message: "Last name cannot exceed 100 characters",
                            },
                            minLength: {
                                value: 3,
                                message: "Last name cannot be shorter than 3 characters",
                            },
                            pattern: {
                                value: /^[A-Za-z ]*$/,
                                message: "Vets last name must only consist of letters and spaces!",
                            },
                        })}
                        placeholder="Last name"
                    />
                    <div className="text-red-500">
                        {errors.lastName && <p>{errors.lastName.message}</p>}
                    </div>
                </div>

                <div className="pb-5 text-center">
                    <label htmlFor="phoneNumber" className="font-bold text-lg text-white">
                        Phone number:
                    </label>
                    <input
                        type="text"
                        id="phoneNumber"
                        className="form-text-select"
                        {...register("phoneNumber", {
                            required: "Phone number is required",
                            maxLength: {
                                value: 17,
                                message: "Phone number cannot exceed 17 characters",
                            },
                            minLength: {
                                value: 3,
                                message: "Phone number cannot be shorter than 3 characters",
                            },
                            pattern: {
                                value: /^[0-9-]*$/,
                                message: "Vets phone number must only be numbers and dashes!",
                            },
                        })}
                        placeholder="Phone number"
                    />
                    <div className="text-red-500">
                        {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
                    </div>
                </div>

                <div className="pb-5 text-center">
                    <label htmlFor="specialty" className="font-bold text-lg text-white">
                        Specialty:
                    </label>
                    <input
                        type="text"
                        id="specialty"
                        className="form-text-select"
                        {...register("specialty", {
                            required: "Specialty is required",
                            maxLength: {
                                value: 100,
                                message: "Specialty cannot exceed 100 characters",
                            },
                        })}
                        placeholder="Specialty"
                    />
                    <div className="text-red-500">
                        {errors.specialty && <p>{errors.specialty.message}</p>}
                    </div>
                </div>

                <div className="pb-5 text-center">
                    <label htmlFor="licenseNumber" className="font-bold text-lg text-white">
                        License number:
                    </label>
                    <input
                        type="text"
                        id="licenseNumber"
                        className="form-text-select"
                        {...register("licenseNumber", {
                            required: "License number is required",
                            maxLength: {
                                value: 50,
                                message: "License number cannot exceed 50 characters",
                            },
                        })}
                        placeholder="License number"
                    />
                    <div className="text-red-500">
                        {errors.licenseNumber && <p>{errors.licenseNumber.message}</p>}
                    </div>
                </div>
            </div>

            <button type="submit" disabled={isLoading} className="text-white">
                {isLoading ? "Submitting..." : "Submit"}
            </button>
        </form>
    );
};

export default VetRegisterForm;