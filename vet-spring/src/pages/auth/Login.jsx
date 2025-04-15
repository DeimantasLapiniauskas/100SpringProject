import { useForm } from "react-hook-form";
import {NavLink} from "react-router";
import {useState} from "react";
import {useAuth} from "../../context/AuthContext.jsx";
import {Error} from "../../components/feedback/Error.jsx";

import LoginPageDog from "../../assets/images/pet.png";

export const Login = () => {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState([]);
    const [visible, setVisible] = useState(false);
    const { login, account } = useAuth();

    const onSubmit = async (data) => {
        try {
            await login(data.email, data.password);
        } catch (error) {
            if (error.response?.status === 401) {
                setError("Invalid credentials")
            } else {
                setError(error.response?.data?.message ?? error.message)
            }
            setVisible(true)
        }
    };
    
    return (
        <main className="h-screen flex md:flex-col-reverse lg:flex-row justify-center items-center gap-8">
                <form onSubmit={handleSubmit(onSubmit)} className="w-[400px] bg-[rgb(151,160,241)] border border-[#97a0f1] p-3 rounded-box min-h-[500px] mx-6">
                    <div className="figma-headline-3 text-center mb-4 px-4">
                        Hi there! Welcome to Happy Hearts Community Dashboard
                    </div>

                    <div className="flex flex-col gap-4 w-full">
                        <label className="fieldset-label figma-headline-4 !font-bold">Email</label>
                        <input
                            {...register("email")}
                            type="text"
                            className="input figma-headline-4 p-3 w-full autofill:shadow-[inset_0_0_0px_1000px_rgb(250,250,250)]"
                            placeholder="Enter email"
                        />

                        <label className="fieldset-label figma-headline-4 !font-bold">Password</label>
                        <input
                            {...register("password")}
                            type="password"
                            className="input figma-headline-4 p-3 w-full autofill:shadow-[inset_0_0_0px_1000px_rgb(250,250,250)]"
                            placeholder="Enter password"
                        />

                        {(visible && error.length != 0) && <Error error={error} setVisible={setVisible}/>}

                        <button type="submit" className="custom-black-btn mt-4 figma-headline-4">
                            Log in
                        </button>
                    </div>

                    <NavLink to="/register" className="figma-headline-4 underline text-center mt-2 block">Register</NavLink>
                </form>
                

                <figure className="w-[400px] h-[500px] rounded-box overflow-hidden hidden md:block">
                    <img
                        src={LoginPageDog}
                        alt="Dog puppy; light brown fur; in the car seat; chewing plastic straw"
                        className="w-full h-full object-cover"
                    />
                </figure>  
        </main>
    );
};
