import { useAuth } from "../../context/AuthContext";
import { NavLink } from "react-router";

export const DropdownMenu = () => {
  const { account, logout } = useAuth();

  const checkClient = () => {
    return (
      account !== null &&
      account.scope !== null &&
      account.scope.includes("ROLE_CLIENT")
    );
  };

  const checkAdmin = () => {
    return (
      account !== null &&
      account.scope !== null &&
      account.scope.includes("ROLE_ADMIN")
    );
  };

  return (
    <div className="w-full p-3 bg-[#97a0f1]">
      {account && (
        <NavLink
          to="/profile"
          className="custom-purple-btn cursor-pointer figma-headline-4 !font-bold mb-1"
        >
          Profile
        </NavLink>
      )}

      {checkAdmin() && (
        <NavLink
          to="/adminpage"
          className="custom-red-btn cursor-pointer figma-headline-4 !font-bold mb-1 text-center"
        >
          Admin Page
        </NavLink>
      )}

      {checkClient() && (
        <NavLink
          to="/pets"
          className="custom-purple-btn cursor-pointer figma-headline-4 !font-bold mb-1"
        >
          Your Pets
        </NavLink>
      )}

      {account && (
        <NavLink
          to="/appointments"
          className="custom-purple-btn cursor-pointer figma-headline-4 !font-bold mb-1 text-center"
        >
          Appointments History
        </NavLink>
      )}

      {account ? (
        <button
          onClick={logout}
          className="custom-purple-btn cursor-pointer figma-headline-4 !font-bold mb-1"
        >
          Log Out
        </button>
      ) : (
        <NavLink
          to="/login"
          className="custom-purple-btn cursor-pointer figma-headline-4 !font-bold mb-1"
        >
          Log In
        </NavLink>
      )}
    </div>
  );
};