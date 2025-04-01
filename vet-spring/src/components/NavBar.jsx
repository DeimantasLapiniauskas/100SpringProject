import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";
import { DropdownMenu } from "../pages/profile/DropdownMenu";
import menu from "../assets/icons/menu.svg";
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
        {account && <NavLink to={"/appointments"}><p className=" text-white md:text-base sm:text-sm text-xs">Appointments history</p></NavLink>}
        <div className="dropdown">
          <button className="dropbtn btn bg-[#97a0f1] w-12">
            <img src={menu} alt="" className="w-10 absolute" />
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


