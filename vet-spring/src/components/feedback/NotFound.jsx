import { NavLink } from "react-router";
import vetClinicNotFound from "../../assets/images/vet-clinic-not-found.jpg";
import handHeart from "../../assets/icons/handHeart.svg"

export const NotFound = () => {
  return (
    <div
      className="bg-cover bg-center h-screen"
      style={{ backgroundImage: `url(${vetClinicNotFound})` }}
    >
      <div className="flex justify-center items-center gap-1 px-[5rem] lg:text-[10rem] lg:h-[10rem] md:text-[8rem] md:h-[10rem] sm:text-[7rem] sm:h-[9rem] text-[5rem] h-[7rem]">
        <span className="text-info-content">4</span>
        <img src={handHeart} alt="handHeart" className="lg:w-[128px] md:w-[102px] sm:w-[78px] w-[64px]"/>
        <span className="text-info-content">4</span>
      </div>
      <div className="flex items-center flex-col">
        <p className="font-bold lg:text-3xl md:text-2xl sm:text-xl text-lg pb-2 text-info-content">
          Opps... Page Not Found!
        </p>
        <NavLink to={"/home"}>
          <p
            type="button"
            className="bg-transparent rounded-[5px] p-1 border-2 border-info-content hover:bg-info-content text-info-content hover:text-white transition duration-500 shadow-info-content shadow-md lg:text-lg md:text-base sm:text-sm text-xs"
          >
            <b>Click to Homepage!</b>
          </p>
        </NavLink>
      </div>
    </div>
  );
};
