import { useForm } from "react-hook-form";
import {NavLink} from "react-router";
import {useState} from "react";
import {useAuth} from "../../context/AuthContext.jsx";
import {Error} from "../../components/Error.jsx";

import LoginPageDog from "../../assets/pet.png";

export const Login = () => {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("")
    const { login } = useAuth()

    const onSubmit = async (data) => {
        try {
            await login(data.email, data.password);
        } catch (error) {
            if (error.response.status === 401) {
                setError("Invalid credentials")
            } else {
                setError(error.response?.data?.message || error.message)
            }
        }
    };
    
    return (
        <main className="h-screen flex justify-center items-center">
            <div className="flex items-center gap-8">
                {/* Gray Box - Form Section */}
                <form onSubmit={handleSubmit(onSubmit)} className="w-[400px] bg-[#FFBD89] border border-[#FFBD89] p-8 rounded-box min-h-[500px] ml-12">
                    <div className="text-2xl text-center mb-4 px-4">
                        Hi there! Welcome to Happy Hearts Community Dashboard
                    </div>

                    <div className="flex flex-col gap-4 w-full">
                        <label className="fieldset-label text-lg">Email</label>
                        <input
                            {...register("email")}
                            type="text"
                            className="input text-lg p-3 w-full"
                            placeholder="Enter email"
                        />

                        <label className="fieldset-label text-lg">Password</label>
                        <input
                            {...register("password")}
                            type="password"
                            className="input text-lg p-3 w-full"
                            placeholder="Enter password"
                        />

                        <button type="submit" className="custom-black-btn mt-4">
                            Login
                        </button>
                    </div>

                    <NavLink to="/register" className="underline text-center mt-2 block">Register</NavLink>
                </form>
                <Error error={error} isHidden={!error} />

                {/* Image Section using <img> */}
                <figure className="w-[400px] h-[500px] rounded-box overflow-hidden">
                    <img
                        src={LoginPageDog} // Your imported image
                        alt="Dog puppy; light brown fur; in the car seat; chewing plastic straw"
                        className="w-full h-full object-cover"
                    />
                </figure>
            </div>
        </main>
    );
};
