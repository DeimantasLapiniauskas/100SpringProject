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
    <div className="w-full p-3 bg-gradient-to-br from-blue-400 to-indigo-600 border-1 rounded-[10px] border-indigo-600 mt-7">
      {account && (
        <NavLink
          to="/profile"
          className="custom-dropdown-btn figma-headline-4 !font-bold"
        >
          Profile
        </NavLink>
      )}

      {checkAdmin() && (
        <NavLink
          to="/adminpage"
          className="custom-dropdown-btn figma-headline-4 !font-bold"
        >
          Admin Page
        </NavLink>
      )}

      {account && !checkAdmin() && (
        <NavLink
          to="/appointments"
          className="custom-dropdown-btn figma-headline-4 !font-bold"
        >
          Appointments History
        </NavLink>
      )}

      {checkClient() && (
        <NavLink
          to="/pets"
          className="custom-dropdown-btn figma-headline-4 !font-bold"
        >
          Your Pets
        </NavLink>
      )}

      {account ? (
        <button
          onClick={logout}
          className="custom-dropdown-btn custom-dropdown-red-btn figma-headline-4 !font-bold"
        >
          Log Out
        </button>
      ) : (
        <NavLink
          to="/login"
          className="custom-dropdown-btn custom-dropdown-green-btn figma-headline-4 !font-bold"
        >
          Log In
        </NavLink>
      )}
    </div>
  );
};
