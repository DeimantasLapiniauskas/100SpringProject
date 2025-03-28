import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";
import { DropdownMenu } from "../pages/profile/DropdownMenu";

export const Navbar = () => {
  const { account, logout } = useAuth();
  return (
    <div>
      <nav className="lg:h-[84px] md:h-[72px] sm:h-[60px] h-[48px] bg-[#6A7AFF] px-[5rem] flex justify-between items-center rounded-[10px] border-2 border-[#CBC5C5]">
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


