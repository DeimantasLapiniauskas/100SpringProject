import { NavLink } from "react-router";
import { DropdownMenu } from "../pages/profile/DropdownMenu";
import menu from "../assets/icons/pawsNav.svg";
import defaultProfile from "../assets/icons/user.svg";

import { useAuth } from "@/context/AuthContext";
import toggle from "daisyui/components/toggle";
export const Navbar = () => {
  const { account } = useAuth();
  const isLoggedeIn = account !== null && account !== undefined;
  return (
    <div>
      <nav className="lg:h-[84px] md:h-[72px] sm:h-[60px] h-[48px] bg-gradient-to-br from-blue-400 to-indigo-600 px-[1rem] sm:px-[3rem] md:px-[5rem] flex justify-between items-center rounded-[100px] border-2 border-white shadow-md shadow-black max-w-[1500px] mx-auto">
        {/* <div>
        <img src={menu} alt="" className="w-15" />
        </div> */}

        <NavLink
          to={"/home"}
          className={({ isActive }) =>
            isActive
              ? "text-[#005050] text-decoration-line: underline font-semibold hover:animate-pulse"
              : "inline-block transform transition duration-400 hover:-translate-y-1 text-white"
          }
        >
          <p className="text-xs sm:text-sm md:text-base">Home</p>
        </NavLink>
        <NavLink
          to={"/posts"}
          className={({ isActive }) =>
            isActive
              ? "text-[#005050] text-decoration-line: underline font-semibold hover:animate-pulse"
              : "inline-block transform transition duration-400 hover:-translate-y-1 text-white"
          }
        >
          <p className="text-xs sm:text-sm md:text-base">News</p>
        </NavLink>
        <NavLink
          to={"/services"}
          className={({ isActive }) =>
            isActive
              ? "text-[#005050] text-decoration-line: underline font-semibold hover:animate-pulse"
              : "inline-block transform transition duration-400 hover:-translate-y-1 text-white"
          }
        >
          <p className="text-xs sm:text-sm md:text-base">Service List</p>
        </NavLink>
        <NavLink
          to={"/products"}
          className={({ isActive }) =>
            isActive
              ? "text-[#005050] text-decoration-line: underline font-semibold hover:animate-pulse"
              : "inline-block transform transition duration-400 hover:-translate-y-1 text-white"
          }
        >
          <p className="text-xs sm:text-sm md:text-base">Products</p>
        </NavLink>
        <div className="dropdown">
          <button className="">
          <img
            src={isLoggedeIn ? menu : defaultProfile}
            alt={isLoggedeIn ? "Menu Icon" : "Profile Icon"}
            className="rounded-full h-12 w-12 p-1 shadow-white text-white shadow-md fill-white object-cover cursor-pointer hover:animate-pulse transform transition duration-400 hover:-translate-y-1 hover:shadow-lg"
          />
          <i className="fa fa-caret-down mb-10"></i>
          </button>
          <div className="dropdown-content flex flex-col ml-[-30px]">
            <DropdownMenu />
          </div>
          
        </div>
      </nav>
    </div>
  );
};
