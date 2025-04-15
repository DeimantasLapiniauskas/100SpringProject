import { NavLink } from "react-router";
import { DropdownMenu } from "../pages/profile/DropdownMenu";
import menu from "../assets/icons/cat-paw.png";
export const Navbar = () => {
  
  return (
    <div>
      <nav className="lg:h-[84px] md:h-[72px] sm:h-[60px] h-[48px] bg-gradient-to-br from-blue-400 to-blue-500 px-[1rem] sm:px-[3rem] md:px-[5rem] flex justify-between items-center rounded-[10px] border-2 border-white shadow-lg shadow-white max-w-[1500px] mx-auto">
        <NavLink to={"/home"}
         className={({ isActive }) => isActive? "text-[#005050] font-semibold hover:animate-pulse" : "inline-block transform transition duration-400 hover:-translate-y-1 text-white"}>
          <p className="text-xs sm:text-sm md:text-base">Home</p>
        </NavLink>
        <NavLink to={"/posts"}
        className={({ isActive }) => isActive? " text-[#005050] font-semibold hover:animate-pulse" : "inline-block transform transition duration-400 hover:-translate-y-1 text-white"}>
          <p className="text-xs sm:text-sm md:text-base">News</p>
        </NavLink>
        <NavLink to={"/services"}
         className={({ isActive }) => isActive? "text-[#005050] font-semibold hover:animate-pulse" : "inline-block transform transition duration-400 hover:-translate-y-1 text-white"}>
          <p className="text-xs sm:text-sm md:text-base">Service List</p>
        </NavLink>
        <NavLink 
         className={({ isActive }) => isActive? "text-[#005050] font-semibold hover:animate-pulse" : "inline-block transform transition duration-400 hover:-translate-y-1 text-white"}>
          <p className="text-xs sm:text-sm md:text-base">Products</p>
        </NavLink>
        <div className="dropdown">
          <button className="dropbtn btn w-12 border-0 bg-transparent">
          <div className="z-2 w-10 text-white text-center">MENU</div>
          <img src={menu} alt="Menu" className="w-9 absolute" />
            
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


