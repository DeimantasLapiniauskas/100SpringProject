import { NavLink } from "react-router";
import vetClinicNotFound from "../assets/images/vet-clinic-not-found.jpg";
import handHeart from "../assets/icons/handHeart.svg"
import { useAuth } from "../context/AuthContext";

export const NotFound = () => {

const {account} = useAuth();
console.log(account)

  return (
    <div
      className="bg-cover bg-center h-screen"
      style={{ backgroundImage: `url(${vetClinicNotFound})` }}
    >
      <div className="flex justify-center items-center gap-1 px-[5rem] lg:text-[10rem] lg:h-[12rem] md:text-[8rem] md:h-[10rem] text-[5rem] h-[7rem]">
        <span className="text-amber-900">4</span>
        <img src={handHeart}  className="lg:w-[128px] md:w-[96px] w-[64px]"/>
        <span className="text-amber-900">4</span>
      </div>
      <div className="flex items-center flex-col">
        <p className="font-bold lg:text-3xl md:text-2xl text-lg pb-2 text-amber-900">
          Opps.. Page Not Found!
        </p>
        <NavLink to={"/pets"}>
          <p
            type="button"
            className="bg-transparent rounded-[5px] p-1 border-2 border-amber-900 hover:bg-amber-900 hover:text-white transition duration-500 shadow-amber-900 shadow-md lg:text-lg md:text-sm text-xs"
          >
            <b>{ account ? "Click to Homepage!" : ">>Login<<"}</b>
          </p>
        </NavLink>
      </div>
    </div>
  );
};
