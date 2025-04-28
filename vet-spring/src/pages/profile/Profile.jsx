import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import api from "../../utils/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import pawssBackgroundImage from '/src/assets/icons/pawss_for_background_spaced_out_rotated_1536px.png';
export const Profile = () => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const { account } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (
        account !== null &&
        account.scope !== null &&
        account.scope.includes("ROLE_VET")
      ) {
        try {
          const response = await api.get(`/vet/${account.sub}`);
          const data = response.data.data;
          const { email, firstName, lastName, specialty } = data;

          setValue("email", email);
          setValue("firstName", firstName);
          setValue("lastName", lastName);
          setValue("specialty", specialty);
        } catch (error) {
          setError(error.message);
        }
      }

      if (
        account !== null &&
        account.scope !== null &&
        account.scope.includes("ROLE_CLIENT")
      ) {
        try {
          const response = await api.get(`/client/${account.sub}`);
          const data = response.data.data;
          const { email, firstName, lastName } = data;

          setValue("email", email);
          setValue("firstName", firstName);
          setValue("lastName", lastName);
        } catch (error) {
          setError(error.message);
        }
      }

      if (
        account !== null &&
        account.scope !== null &&
        account.scope.includes("ROLE_ADMIN")
      ) {
        try {
          setValue("email", account.sub);
        } catch (error) {
          setError(error.message);
        }
      }
    };
    fetchData();
  }, [data, setValue]);

  const checkVet = () => {
    //todo: make this better
    return (
      account !== null &&
      account.scope !== null &&
      account.scope.includes("ROLE_VET")
    );
  };

  const checkVetClient = () => {
    //todo: make this better
    return (
      (account !== null &&
        account.scope !== null &&
        account.scope.includes("ROLE_VET")) ||
      (account !== null &&
        account.scope !== null &&
        account?.scope.includes("ROLE_CLIENT"))
    );
  };
  const checkAdmin = () => {
    //todo: make this better
    return (
      account !== null &&
      account.scope !== null &&
      account.scope.includes("ROLE_ADMIN")
    );
  };

  return (
    <div className="flex justify-center mt-10 relative w-full">
      <div
            className="absolute min-h-screen inset-0 bg-repeat bg-[length:3rem_3rem] sm:bg-[length:3rem_3rem] md:bg-[length:6rem_6rem] lg:bg-[length:9rem_9rem] bg-center opacity-5 pointer-events-none z-0"
            style={{ backgroundImage: `url(${pawssBackgroundImage})` }}
          ></div>
      <div className="bg-[#97a0f1] rounded-box gap-10 flex flex-col p-5 z-2">
        <h2>
          Email:{" "}
          <input
            {...register("email")}
            type="text"
            readOnly
            className="caret-transparent focus:outline-[0px]"
          />
        </h2>
        {checkVetClient() && (
          <p>
            First Name:{" "}
            <input
              {...register("firstName")}
              type="text"
              readOnly
              className="caret-transparent focus:outline-[0px]"
            />
          </p>
        )}
        {checkVetClient() && (
          <p>
            Last Name:{" "}
            <input
              {...register("lastName")}
              type="text"
              readOnly
              className="caret-transparent focus:outline-[0px]"
            />
          </p>
        )}

        {checkVet() && (
          <p>
            Specialty:{" "}
            <input
              {...register("specialty")}
              type="text"
              readOnly
              className="caret-transparent focus:outline-[0px]"
            />
          </p>
        )}
        {checkAdmin() && (
            <button
            onClick={() => navigate("/adminpage")}
              className="p-1 rounded-lg bg-red-500 hover:bg-red-800 mx-30"
            >
              Admin Page
            </button>
          )}
      </div>
    </div>
  );
};
