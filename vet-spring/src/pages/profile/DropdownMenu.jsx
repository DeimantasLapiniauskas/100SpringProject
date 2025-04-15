import { useAuth } from "../../context/AuthContext";
import react from "react";
import { NavLink } from "react-router";
import menu from "../../assets/icons/menu.svg";

export const DropdownMenu = () => {
  const { account, logout } = useAuth();
  const [open, setOpen] = react.useState(false);
  const handleOpen = () => setOpen(!open);
  return (
    <>
      {/* <div>
    <button className="btn bg-[#97a0f1] w-12" onClick={handleOpen}>
          <img src={menu} alt="" className="w-10 absolute"/>
        </button>
  </div> */}

      <div className="w-full p-3 rounded bg-blue-500">
        <NavLink
          to={`/profile`}
          className="custom-hamburger-btn cursor-pointer figma-headline-4 !font-bold mb-1"
        >
          Profile
        </NavLink>
        <NavLink to={"/pets"}>
          <p className="custom-hamburger-btn cursor-pointer figma-headline-4 !font-bold mb-1">
            Your Pets
          </p>
        </NavLink>
        {account && (
          <NavLink to={"/appointments"}>
            <p className=" custom-hamburger-btn cursor-pointer figma-headline-4 !font-bold mb-1 text-center">
              Appointments history
            </p>
          </NavLink>
        )}
        {account ? (
          <button
            type="button"
            value="logout"
            onClick={logout}
            className="custom-hamburger-btn cursor-pointer figma-headline-4 !font-bold"
          >
            Log Out
          </button>
        ) : (
          <NavLink to={"/login"}>
            <p>
              <button className="custom-hamburger-btn cursor-pointer figma-headline-4 !font-bold">
                Log In
              </button>
            </p>
          </NavLink>
        )}
      </div>
    </>
  );
};
