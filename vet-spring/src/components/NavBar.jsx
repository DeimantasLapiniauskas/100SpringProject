import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const { account, logout } = useAuth();
  return (
    <div>
      <nav className="lg:h-[84px] md:h-[72px] sm:h-[60px] h-[48px] bg-gradient-to-br from-blue-400 to-indigo-600 px-[1rem] sm:px-[3rem] md:px-[5rem] flex justify-between items-center rounded-[10px] border-2 border-white shadow-lg shadow-white">
        <NavLink to={"/home"}
         className={({ isActive }) => isActive? "text-[#005050] font-semibold hover:animate-pulse" : "inline-block transform transition duration-400 hover:-translate-y-1 text-white"}>
          <p className="text-xs sm:text-sm md:text-base">Home</p>
        </NavLink>
        <NavLink to={"/posts"}
        className={({ isActive }) => isActive? "text-[#005050] font-semibold hover:animate-pulse" : "inline-block transform transition duration-400 hover:-translate-y-1 text-white"}>
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
        {account ? (
          <button
            type="button"
            value="logout"
            onClick={logout}
            className="custom-purple-btn cursor-pointer figma-headline-4 !font-bold"
          >
            Log Out
          </button>
        ) : (
          <NavLink to={"/login"}>
            <p>
              <button className="custom-purple-btn cursor-pointer figma-headline-4 !font-bold">
                Log In
              </button>
            </p>
          </NavLink>
        )}
      </nav>
    </div>
  );
};
