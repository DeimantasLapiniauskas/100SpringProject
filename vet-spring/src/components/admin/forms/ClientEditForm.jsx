import { useContext } from "react"
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useEffect } from "react";
import ModalContext from "@/utils/helpers/modalContext";
import { updateClient } from "@/utils/helpers/cientHelpers";

const ClientEditForm = ({ client, getPage, currentPage, pageSize }) => {
    const { setEditModalID } = useContext(ModalContext);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
        }
    })

    const [isLoading, setIsLoading] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    useEffect(() => {
        if (client && Object.keys(client).length > 0) {
            const { firstName, lastName, phoneNumber } = client;
            setValue("firstName", firstName);
            setValue("lastName", lastName);
            setValue("phoneNumber", phoneNumber);
        }
    }, [client, setValue]);

    const formSubmitHandler = async (data) => {
        setIsLoading(true);
        setSubmitError(null);

        const trimmedData = {
            ...data,
            firstName: data.firstName.trim(),
            lastName: data.lastName.trim(),
            phoneNumber: data.phoneNumber.trim(),
        };

        const payload = { ...trimmedData };

        try {
            await updateClient(client.id, payload);
            await getPage(pageSize, currentPage);
            setEditModalID("");
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
            </div>

            <button type="submit" disabled={isLoading} className="text-white">
                {isLoading ? "Submitting..." : "Submit"}
            </button>
        </form>
    )
};
export default ClientEditForm;