import { useForm } from "react-hook-form";
import {NavLink} from "react-router";
import {useState} from "react";
import {useAuth} from "../../context/AuthContext.jsx";
import {Error} from "../../components/Error.jsx";

export const Register = () => {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("")
    const { register: registerUser } = useAuth()

    const onSubmit = async (data) => {
        try {
            await registerUser(data.email, data.password);
        } catch (error) {console.log(error)
            setError(error.response?.data?.message ?? error.message)
        }
    };

    return (
        <main className="grid place-items-center h-screen">
            <div className="flex flex-col gap-2 items-center">
                <form onSubmit={handleSubmit(onSubmit)} onClick={() => setError("")}>
                    <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
                        <legend className="fieldset-legend">Register</legend>

                        <label className="fieldset-label">Email</label>
                        <input {...register("username")} type="text" className="input" placeholder="Enter email" />

                        <label className="fieldset-label">Password</label>
                        <input {...register("password")} type="password" className="input" placeholder="Enter password" />

                        <button type="submit" className="btn btn-primary mt-4">Register</button>
                        <NavLink to="/login" className="underline text-center mt-2">Login</NavLink>
                    </fieldset>
                </form>
                <Error error={error} isHidden={!error} />
            </div>
        </main>
    );
};