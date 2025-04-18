import { NavLink } from "react-router";
import { DropdownMenu } from "../pages/profile/DropdownMenu";
import menu from "../assets/icons/pawsNav.png";
import defaultProfile from "../assets/icons/user.png";
import { useCheckRoles } from "@/hooks/useCheckRoles";
export const Navbar = () => {
  const hasRoles = useCheckRoles();
  
  return (
    <div>
      <nav className="lg:h-[84px] md:h-[72px] sm:h-[60px] h-[48px] bg-gradient-to-br from-indigo-100 to-blue-100 px-[1rem] sm:px-[3rem] md:px-[5rem] flex justify-between items-center rounded-[100px] border-2 border-white shadow-md shadow-black max-w-[1500px] mx-auto">
        {/* <div>
        <img src={menu} alt="" className="w-15" />
        </div> */}
      
        
        <NavLink to={"/home"}
         className={({ isActive }) => isActive? "text-[#005050] text-decoration-line: underline font-semibold hover:animate-pulse" : "inline-block transform transition duration-400 hover:-translate-y-1 text-black"}>
          <p className="text-xs sm:text-sm md:text-base">Home</p>
        </NavLink>
        <NavLink to={"/posts"}
        className={({ isActive }) => isActive? "text-[#005050] text-decoration-line: underline font-semibold hover:animate-pulse" : "inline-block transform transition duration-400 hover:-translate-y-1 text-black"}>
          <p className="text-xs sm:text-sm md:text-base">News</p>
        </NavLink>
        <NavLink to={"/services"}
         className={({ isActive }) => isActive? "text-[#005050] text-decoration-line: underline font-semibold hover:animate-pulse" : "inline-block transform transition duration-400 hover:-translate-y-1 text-black"}>
          <p className="text-xs sm:text-sm md:text-base">Service List</p>
        </NavLink>
        <NavLink to={"/products"} 
         className={({ isActive }) => isActive? "text-[#005050] text-decoration-line: underline font-semibold hover:animate-pulse" : "inline-block transform transition duration-400 hover:-translate-y-1 text-black"}>
          <p className="text-xs sm:text-sm md:text-base">Products</p>
        </NavLink>
        <div className="dropdown">
          <button className="bg-indigo-300 rounded-full w-12 h-12 shadow-md shadow-white justify-center hover:animate-pulse inline-block transform transition duration-400 hover:-translate-y-1 text-white">
          
          {hasRoles ? (
            <img src={menu} alt="Menu Icon" className="w-15" />
          ) : (
            <img src={defaultProfile} alt="Profile Icon" className="rounded-full w-12 h-12 object-cover" />
          )}
          
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