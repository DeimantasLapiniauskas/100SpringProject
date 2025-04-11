import { addProduct } from "@/utils/helpers/addEditProduct";
import ModalContext from "@/utils/helpers/modalContext";
import { useContext } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ProductAddForm = ({ getPage, currentPage, pageSize }) => {

    const { setAddModalID } = useContext(ModalContext);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "",
            description: "",
            price: "",
            stockQuantity: "",
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
            await addProduct(payload);
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
        <form>
        </form>
    )
}

export default ProductAddForm;