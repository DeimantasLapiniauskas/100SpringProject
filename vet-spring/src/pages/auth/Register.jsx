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
  } = useForm({ mode: "OnSubmit" , reValidateMode: "onChange " });
  
  const { login, register: registerUser } = useAuth();

  const [responseError, setResponseError] = useState([]);

  const [visibleFirstNameError, setVisibleFirstNameError] = useState(false);
  const [visibleLastNameError, setVisibleLastNameError] = useState(false);
  const [visiblePhoneNumberError, setVisiblePhoneNumberError] = useState(false);
  const [visibleEmailError, setVisibleEmailError] = useState(false);
  const [visiblePasswordError, setVisiblePasswordError] = useState(false);
  const [visibleRepeatPasswordError, setVisibleRepeatPasswordError] = useState(false);


  const onSubmit = async (data) => {
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
      setResponseError(
        error.response?.data ?? error.message ?? "Something went wrong!"
      );
    }
  };

  const switchErrorVisibility = () => {
    setResponseError([]);
    setVisibleFirstNameError(true);
    setVisibleLastNameError(true);
    setVisiblePhoneNumberError(true);
    setVisibleEmailError(true);
    setVisiblePasswordError(true);
    setVisibleRepeatPasswordError(true);
  }

  return (
    <main className="flex h-screen justify-center gap-8 items-center ml-12 mr-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#FFBD89] border border-[#FFBD89] p-8 rounded-box w-2xl min-h-[500px]"
      >
        <div className="text-2xl text-center mb-4 px-4">
          Join Happy Hearts Community! Register below
        </div>

        <div className="grid grid-cols-2 w-full gap-4">
          <div>
            <label className="text-lg fieldset-label">First Name</label>
            <input
              {...register("firstName", {
                required: {
                  value: true,
                  message: "This field is required",
                },
                minLength: {
                  value: 3,
                  message: "Name must be longer than 3"
                },
                maxLength: {
                  value: 100,
                  message: "Name can't be longer than 100"
                },
                pattern: {
                  value: /^[A-Za-z ]*$/,
                  message: "Name can only contain letters and spaces"
                }
              })}
              type="text"
              className="input p-3 text-lg w-full"
              placeholder="Enter first name"
            />
            {visibleFirstNameError && errors.firstName != null && (
              <Error error={errors.firstName?.message} setVisible={setVisibleFirstNameError}/>
            )}
          </div>
          <div>
            <label className="text-lg fieldset-label">Last Name</label>
            <input
              {...register("lastName", {  
                required: {
                  value: true,
                  message: "This field is required",
                },
                minLength: {
                  value: 3,
                  message: "Last name must be longer than 3"
                },
                maxLength: {
                  value: 100,
                  message: "Last name can't be longer than 100"
                },
                pattern: {
                  value: /^[A-Za-z ]*$/,
                  message: "Last name can only contain letters and spaces"
                }
              })}
              type="text"
              className="input p-3 text-lg w-full"
              placeholder="Enter last name"
            />
            {visibleLastNameError && errors.lastName !=null && (
              <Error error={errors.lastName?.message} setVisible={setVisibleLastNameError}/>
            )}
          </div>

          <div>
            <label className="text-lg fieldset-label">Phone Number</label>
            <input
              {...register("phoneNumber", {
                required: {
                value: true,
                message: "This field is required",
                },
                minLength:{
                  value: 3,
                  message: "Number must be longer than 3"
                },
                maxLength:{
                  value: 17,
                  message: "phone can't be longer 17"
                },
                pattern: {
                  value: /^[0-9\-+]+$/,
                  message: "Phone number has bad symbols"
                }
              })}
              type="text"
              className="input p-3 text-lg w-full"
              placeholder="Enter phone number"
            />
            {visiblePhoneNumberError && errors.phoneNumber != null && (
              <Error error={errors.phoneNumber?.message} setVisible={setVisiblePhoneNumberError}/>
            )}
          </div>

          <div>
            <label className="text-lg fieldset-label">Email</label>
            <input
              {...register("email", {
                required: {
                  value: true,
                  message: "This field is required",
                },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]{4,}@[a-zA-Z0-9.-]{3,}\.[a-zA-Z]{2,}$/,
                  message: "Bad email, must be at least than 4 symbols before @, at least 3 after @, domain must be at least 2 symbols"
                },
                minLength: {
                  value: 3,
                  message: "Email must be longer than 11"
                },
                maxLength: {
                  value: 50,
                  message: "Email can't be longer than 50"
                }
              })}
              type="text"
              className="input p-3 text-lg w-full"
              placeholder="Enter email"
            />
            {visibleEmailError && errors.email && (
              <Error error={errors.email?.message} setVisible={setVisibleEmailError}/>
            )}
          </div>

          <div>
            <label className="text-lg fieldset-label">Password</label>
            <input
              {...register("password", {
                required: {
                  value: true,
                  message: "This field is required",
                },
                minLength: {
                  value: 8,
                  message: "Minimum 8 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Too long"
                },
                pattern: {
                  value: /^(?=(.*[a-zA-Z]))(?=(.*\d))[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@^_`{|}~ ]*$/,
                  message: "Must contain at least one number and one letter"
                }
              })}
              type="password"
              className="input p-3 text-lg w-full"
              placeholder="Enter password"
            />
            {visiblePasswordError && errors.password != null && (
              <Error error={errors.password?.message} setVisible={setVisiblePasswordError}/>
            )}
          </div>

          <div>
            <label className="text-lg fieldset-label">Repeat Password</label>
            <input
              {...register("repeatPassword", {
                required: {
                  value: true,
                  message: "This field is required",
                },
                validate: (value) => {
                  return value === watch("password") || "Passwords must match";
                },
              })}
              type="password"
              className="input p-3 text-lg w-full"
              placeholder="Enter password"
            />
            
            {visibleRepeatPasswordError && errors.repeatPassword != null && (
              <Error error={errors.repeatPassword?.message} setVisible={setVisibleRepeatPasswordError}/>
            )}
          </div>
        </div>
        {(typeof responseError === "string" )&& <Error error={responseError}/>}
        <button type="submit" className="custom-black-btn mt-4" onClick={() => switchErrorVisibility()}>
          Register
        </button>

        <div className="text-center mt-2">
          Already have an account?
          <NavLink to="/login" className="ml-1 underline">
            Login
          </NavLink>
        </div>
      </form>

      <figure className="h-[500px] rounded-box w-[400px] overflow-hidden">
        <img
          src={RegisterPageDog} // This should be the same image used in Login
          alt="Dog puppy; light brown fur; in the car seat; chewing plastic straw"
          className="h-full w-full object-cover"
        />
      </figure>
    </main>
  );
};
