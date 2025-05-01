import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import ModalContext from "@/utils/helpers/modalContext";
import { updateAccountPassword } from "@/utils/helpers/accountHelpers";

const PasswordChangeForm = ({ accountId, getPage, currentPage, pageSize }) => {
    const { setEditPasswordModalID } = useContext(ModalContext);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            newPassword: "",
        },
    });

    const [isLoading, setIsLoading] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const formSubmitHandler = async (data) => {
        setIsLoading(true);
        setSubmitError(null);

        const trimmedData = {
            newPassword: data.newPassword.trim(),
        };

        try {
            await updateAccountPassword(accountId, trimmedData);
            await getPage(pageSize, currentPage);
            setEditPasswordModalID("");
            reset();
        } catch (error) {
            setSubmitError(error.response?.data?.message || "Failed to update password.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(formSubmitHandler)} className="text-center p-3">
            <h3 className="text-white text-xl font-bold mb-4">Change Password</h3>
            {submitError && <p className="bg-red-700 text-white p-2 mb-4 rounded">{submitError}</p>}

            <div className="p-3">
                <label className="block text-white font-bold mb-2">
                    New Password
                </label>
                <input
                    {...register("newPassword", {
                        required: "This field is required",
                        minLength: { value: 8, message: "Minimum 8 characters" },
                        maxLength: { value: 50, message: "Maximum 50 characters" },
                        pattern: {
                            value: /^(?=(.*[a-zA-Z]))(?=(.*\d))[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@^_`{|}~ ]*$/,
                            message: "Must contain at least one number, one letter, and can contain common symbols",
                        },
                    })}
                    type="password"
                    className="input p-3 w-full bg-white rounded-lg"
                    placeholder="Enter new password"
                />
                {errors.newPassword && (
                    <p className="text-red-500 mt-2">{errors.newPassword.message}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="text-white btn bg-blue-500 hover:bg-blue-700 w-16"
            >
                {isLoading ? "Submitting..." : "Submit"}
            </button>
        </form>
    );
};

export default PasswordChangeForm;