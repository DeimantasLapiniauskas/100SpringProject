import { NavLink } from "react-router";
import { DropdownMenu } from "../pages/profile/DropdownMenu";
import pawsNav from "../assets/icons/pawsNav.svg";
import userIcon from "../assets/icons/userIcon.svg"
import { useAuth } from "@/context/AuthContext";

export const Navbar = () => {

const { account } = useAuth();

  return (
    <div>
      <nav className="lg:h-[85px] md:h-[75px] sm:h-[65px] xs:h-[55px] h-[50px] bg-gradient-to-br from-blue-400 to-indigo-600 px-[1rem] sm:px-[3rem] md:px-[5rem] flex justify-between items-center rounded-full border-2 border-white shadow-lg shadow-white">
        <NavLink
          to={"/home"}
          className={({ isActive }) =>
            isActive
              ? "text-[#005050] font-semibold hover:animate-pulse"
              : "inline-block transform transition duration-400 hover:-translate-y-1 text-white"
          }
        >
          <p className="text-xs sm:text-sm md:text-base">Home</p>
        </NavLink>
        <NavLink
          to={"/posts"}
          className={({ isActive }) =>
            isActive
              ? "text-[#005050] font-semibold hover:animate-pulse"
              : "inline-block transform transition duration-400 hover:-translate-y-1 text-white"
          }
        >
          <p className="text-xs sm:text-sm md:text-base">News</p>
        </NavLink>
        <NavLink
          to={"/services"}
          className={({ isActive }) =>
            isActive
              ? "text-[#005050] font-semibold hover:animate-pulse"
              : "inline-block transform transition duration-400 hover:-translate-y-1 text-white"
          }
        >
          <p className="text-xs sm:text-sm md:text-base">Service List</p>
        </NavLink>
        <NavLink
          to={"/products"}
          className={({ isActive }) =>
            isActive
              ? "text-[#005050] font-semibold hover:animate-pulse"
              : "inline-block transform transition duration-400 hover:-translate-y-1 text-white"
          }
        >
          <p className="text-xs sm:text-sm md:text-base">Products</p>
        </NavLink>
        <div className="dropdown">
          {account ? <button className="hover:scale-110 duration-300">
            <img src={pawsNav} alt="pawsNavigationIcon" className="w-9 xs:w-12 sm:w-15 md:w-18 lg:w-21 " />
          </button> : <button >
            <img src={userIcon} alt="pawsNavigationIcon" className="w-6 xs:w-8 sm:w-10 md:w-12 lg:w-14 " />
          </button>}
          <div
            className="dropdown-content top-4 xs:top-6 sm:top-8 md:top-10 lg:top-12 flex flex-col content-center 
          lg:ml-[-20px] md:ml-[-20px] sm:ml-[-53px] ml-[-98px] 
          "
          >
            <DropdownMenu />
          </div>
        </div>
      </nav>
    </div>
  );
};
