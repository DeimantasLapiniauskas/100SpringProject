import { NavLink } from "react-router";
import { useAuth } from "../../context/AuthContext";
import vetClinicForbidden from "../../assets/images/vet-clinic-forbidden.jpg"

export const AuthGuard = ({ children }) => {
  const { account } = useAuth();

  if (!account) {
    return (
      <div className="flex flex-col items-end pt-[9rem] ps-[9rem] lg:pe-[5rem] md:pe-[3rem] sm:pe-[2rem] pe-[1rem] h-screen bg-center bg-cover rounded-[10px]" style={{ backgroundImage : `url(${vetClinicForbidden})`}}>
        <div>
          <p className="lg:text-2xl md:text-xl sm:text-lg text-base pb-2 text-info-content text-center font-bold p-2">You must be logged<br/> to be able to use this option</p>
          <NavLink to={"/login"}>
            <p type="link" className="text-[#2B89A8] hover:text-info text-center underline lg:text-xl md:text-lx sm:text-base text-sm"><b>Click here to Login</b></p>
          </NavLink>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
