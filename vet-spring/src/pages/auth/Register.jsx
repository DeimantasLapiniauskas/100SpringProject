import { useForm } from "react-hook-form";
import { NavLink } from "react-router";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { Error } from "../../components/Error.jsx";

import RegisterPageDog from "../../assets/pet.png"; // Assuming you want the same image for Register page

export const Register = () => {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");
    const { login, register: registerUser } = useAuth();

    const onSubmit = async (data) => {
        try {
            await registerUser(data.email, data.password, data.firstName, data.lastName, data.phoneNumber);
            await login(data.email, data.password);
        } catch (error) {
            setError(JSON.stringify(error.response.data) ?? error.message);
        }
    };

    return (
      <main className="h-screen flex justify-center items-center">
        <div className="flex items-center gap-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-[400px] bg-[#FFBD89] border border-[#FFBD89] p-8 rounded-box min-h-[500px] ml-12"
          >
            <div className="text-2xl text-center mb-4 px-4">
              Join Happy Hearts Community! Register below
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

              <label className="fieldset-label text-lg">First Name</label>
              <input
                {...register("firstName")}
                type="text"
                className="input text-lg p-3 w-full"
                placeholder="Enter first name"
              />

              <label className="fieldset-label text-lg">Last Name</label>
              <input
                {...register("lastName")}
                type="text"
                className="input text-lg p-3 w-full"
                placeholder="Enter last name"
              />

              <label className="fieldset-label text-lg">Phone Number</label>
              <input
                {...register("phoneNumber")}
                type="text"
                className="input text-lg p-3 w-full"
                placeholder="Enter phone number"
              />

              <button type="submit" className="custom-black-btn mt-4">
                Register
              </button>
            </div>

            <div className="text-center mt-2">
              Already have an account?
              <NavLink to="/login" className="underline ml-1">
                Login
              </NavLink>
            </div>
            
          </form>
          <Error error={error} isHidden={!error} />

          <figure className="w-[400px] h-[500px] rounded-box overflow-hidden">
            <img
              src={RegisterPageDog} // This should be the same image used in Login
              alt="Dog puppy; light brown fur; in the car seat; chewing plastic straw"
              className="w-full h-full object-cover"
            />
          </figure>
        </div>
      </main>
    );
};