import { useForm } from "react-hook-form";
import { NavLink } from "react-router";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { Error } from "../../components/Error.jsx";

import RegisterPageDog from "../../assets/pet.png"; // Assuming you want the same image for Register page

export const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm({ reValidateMode: "onSubmit " });
  const [responseError, setresponseError] = useState([]);
  const { login, register: registerUser } = useAuth();

  const [visibleError, setVisibleError] = useState(false);
  const [visibleFirstNameError, setVisibleFirstNameError] = useState(false);
  const [visibleLastNameError, setVisibleLastNameError] = useState(false);
  const [visiblePhoneNumberError, setVisiblePhoneNumberError] = useState(false);
  const [visibleEmailError, setVisibleEmailError] = useState(false);
  const [visiblePasswordError, setVisiblePasswordError] = useState(false);

  const onSubmit = async (data) => {
    setVisibleError(false);
    try {
      await registerUser(
        data.email,
        data.password,
        data.firstName,
        data.lastName,
        data.phoneNumber
      );
      await login(data.email, data.password);
    } catch (error) {
      setresponseError(
        error.response?.data ?? error.message ?? "Something went wrong!"
      );
      setVisibleError(true);
      setVisibleFirstNameError(true);
      setVisibleLastNameError(true);
      setVisiblePhoneNumberError(true);
      setVisibleEmailError(true);
      setVisiblePasswordError(true);
    }
  };

  return (
    <main className="h-screen flex justify-center items-center gap-8 ml-12 mr-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-2xl bg-[#FFBD89] border border-[#FFBD89] p-8 rounded-box min-h-[500px] "
      >
        <div className="text-2xl text-center mb-4 px-4">
          Join Happy Hearts Community! Register below
        </div>

        <div className="grid grid-cols-2 gap-4 w-full">
          <div>
            <label className="fieldset-label text-lg">First Name</label>
            <input
              {...register("firstName")}
              type="text"
              className="input text-lg p-3 w-full"
              placeholder="Enter first name"
            />
            {visibleFirstNameError && (
              <Error error={responseError.firstName} setVisible={setVisibleFirstNameError} />
            )}
          </div>
          <div>
            <label className="fieldset-label text-lg">Last Name</label>
            <input
              {...register("lastName")}
              type="text"
              className="input text-lg p-3 w-full"
              placeholder="Enter last name"
            />
            {visibleLastNameError && (
              <Error error={responseError.lastName} setVisible={setVisibleLastNameError} />
            )}
          </div>

          <div>
            <label className="fieldset-label text-lg">Phone Number</label>
            <input
              {...register("phoneNumber")}
              type="text"
              className="input text-lg p-3 w-full"
              placeholder="Enter phone number"
            />
            {visiblePhoneNumberError && (
              <Error
                error={responseError.phoneNumber}
                setVisible={setVisiblePhoneNumberError}
              />
            )}
          </div>

          <div>
            <label className="fieldset-label text-lg">Email</label>
            <input
              {...register("email", {
                required: {
                  message: "This field is required",
                },
              })}
              type="text"
              className="input text-lg p-3 w-full"
              placeholder="Enter email"
            />
            {visibleEmailError && (
              <Error error={responseError.email} setVisible={setVisibleEmailError} />
            )}
          </div>

          <div>
            <label className="fieldset-label text-lg">Password</label>
            <input
              {...register("password", {
                required: {
                  message: "This field is required",
                },
              })}
              type="password"
              className="input text-lg p-3 w-full"
              placeholder="Enter password"
            />
            {visiblePasswordError && (
              <Error error={responseError.password} setVisible={setVisiblePasswordError} />
            )}
          </div>

          <div>
            <label className="fieldset-label text-lg">Repeat Password</label>
            <input
              {...register("repeatPassword", {
                required: {
                  message: "This field is required",
                },
                validate: (value) => {
                  return value === watch("password") || "Passwords must match";
                },
              })}
              type="password"
              className="input text-lg p-3 w-full"
              placeholder="Enter password"
            />
            
            {(visibleError && errors.repeatPassword != null) && (
              <Error
                error={errors.repeatPassword?.message}
                setVisible={setVisibleError}
              />
            )}
          </div>
        </div>
        {(visibleError && typeof responseError === "string" )&& <Error error={responseError} setVisible={setVisibleError} />}
        <button type="submit" className="custom-black-btn mt-4">
          Register
        </button>

        <div className="text-center mt-2">
          Already have an account?
          <NavLink to="/login" className="underline ml-1">
            Login
          </NavLink>
        </div>
      </form>

      <figure className="w-[400px] h-[500px] rounded-box overflow-hidden">
        <img
          src={RegisterPageDog} // This should be the same image used in Login
          alt="Dog puppy; light brown fur; in the car seat; chewing plastic straw"
          className="w-full h-full object-cover"
        />
      </figure>
    </main>
  );
};
