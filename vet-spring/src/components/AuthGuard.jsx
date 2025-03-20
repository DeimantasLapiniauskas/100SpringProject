import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";
import vetClinicForbidden from "../assets/images/vet-clinic-forbidden.jpg"

export const AuthGuard = ({ children }) => {
  const { account } = useAuth();

  if (!account) {
    return (
      <div className="flex flex-col items-end pt-[9rem] ps-[9rem] lg:pe-[5rem] md:pe-[3rem] pe-[1rem] h-screen bg-center bg-cover rounded-[10px]" style={{ backgroundImage : `url(${vetClinicForbidden})`}}>
        <div>
          <p className="lg:text-3xl md:text-2xl text-lg pb-2 text-info-content text-center p-2">You must be logged<br/> to be able to use this option</p>
          <NavLink to={"/login"}>
            <p type="link" className="text-[#2B89A8] hover:text-info text-center underline lg:text-lg md:text-base text-sm"><b>Click here to Login</b></p>
          </NavLink>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
