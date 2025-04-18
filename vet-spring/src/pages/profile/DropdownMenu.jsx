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
    <div className="custom-dropdown bg-gradient-to-br from-blue-400 to-indigo-600 border-indigo-600">
      {account && (
        <NavLink
          to="/profile"
          className="figma-headline-4 !font-bold"
        >
          Profile
        </NavLink>
      )}

      {checkAdmin() && (
        <NavLink
          to="/adminpage"
          className="figma-headline-4 !font-bold"
        >
          Admin Page
        </NavLink>
      )}

      {account && !checkAdmin() && (
        <NavLink
          to="/appointments"
          className="figma-headline-4 !font-bold"
        >
          Appointments History
        </NavLink>
      )}

      {checkClient() && (
        <NavLink
          to="/pets"
          className="figma-headline-4 !font-bold"
        >
          Your Pets
        </NavLink>
      )}

      {account ? (
        <button
          onClick={logout}
          className="bg-red-400 hover:bg-red-200 figma-headline-4 !font-bold"
        >
          Log Out
        </button>
      ) : (
        <NavLink
          to="/login"
          className="bg-green-400 hover:bg-green-200 figma-headline-4 !font-bold"
        >
          Log In
        </NavLink>
      )}
    </div>
  );
};
