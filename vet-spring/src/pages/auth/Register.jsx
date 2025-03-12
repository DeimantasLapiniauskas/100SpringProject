import { useForm } from "react-hook-form";
import {NavLink} from "react-router";
import {useState} from "react";
import {useAuth} from "../../context/AuthContext.jsx";
import {Error} from "../../components/Error.jsx";

export const Register = () => {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("")
    const {login, register: registerUser } = useAuth()

    const onSubmit = async (data) => {
        try {
            await registerUser(data.email, data.password, data.firstName, data.lastName, data.phoneNumber);
            await login(data.email, data.password)
        } catch (error) {
            setError(JSON.stringify(error.response.data) ?? error.message)
        }
    };

    return (
        <main className="grid place-items-center h-screen">
            <div className="flex flex-col gap-2 items-center">
                <form onSubmit={handleSubmit(onSubmit)} onClick={() => setError("")}>
                    <fieldset className="fieldset w-xs bg-base-300 border border-base-300 p-4 rounded-box">
                        <legend className="fieldset-legend">Register</legend>

                        <label className="fieldset-label">Email</label>
                        <input {...register("email")} type="text" className="input" placeholder="Enter email" />

                        <label className="fieldset-label">Password</label>
                        <input {...register("password")} type="password" className="input" placeholder="Enter password" />

                        <label className="fieldset-label">Firstname</label>
                        <input {...register("firstName")} type="text" className="input" placeholder="Enter first name"/>

                        <label className="fieldset-label">Lastname</label>
                        <input {...register("lastName")} type="text" className="input" placeholder="Enter last name"/>

                        <label className="fieldset-label">Phone number</label>
                        <input {...register("phoneNumber")} type="text" className="input" placeholder="Enter phone number"/>

                        <button type="submit" className="btn btn-primary mt-4">Register</button>
                        <NavLink to="/login" className="underline text-center mt-2">Login</NavLink>
                    </fieldset>
                </form>
                <Error error={error} isHidden={!error} />
            </div>
        </main>
    );
};