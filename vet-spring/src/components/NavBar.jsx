import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const { account, logout } = useAuth();
  return (
    <div>
      <nav className="lg:h-[84px] md:h-[72px] sm:h-[60px] h-auto bg-[#6A7AFF] rounded-[10px] border-2 border-[#CBC5C5]
       flex flex-col sm:flex-row justify-center sm:justify-between items-center px-4 sm:px-[5rem] py-2 gap-2 sm:gap-0">
        <NavLink to={"/home"}>
          <p className="text-white lg:text-lg md:text-base sm:text-sm text-xs">Home</p>
        </NavLink>
        <NavLink to={"/pets"}>
          <p className="text-white lg:text-lg md:text-base sm:text-sm text-xs">Your Pets</p>
        </NavLink>
        <NavLink to={"/services"}>
          <p className="text-white lg:text-lg md:text-base sm:text-sm text-xs">Service list</p>
        </NavLink>
        <NavLink to={"/posts"}>
          <p className="text-white lg:text-lg md:text-base sm:text-sm text-xs">News</p>
        </NavLink>
        {account ? (
          <button
            type="button"
            value="logout"
            onClick={logout}
            className="custom-purple-btn cursor-pointer lg:text-lg md:text-base sm:text-sm text-xs !font-bold"
          >
            Log Out
          </button>
        ) : (
          <NavLink to={"/login"}>
            <p>
              <button className="custom-purple-btn cursor-pointer lg:text-lg md:text-base sm:text-sm text-xs !font-bold">
                Log In
              </button>
            </p>
          </NavLink>
        )}
      </nav>
    </div>
  );
};


