import { NavLink } from "react-router";

import { useAuth } from "../context/AuthContext";

export const AuthGuard = ({ children }) => {
  const { account } = useAuth();

  if (!account) {
    return (
      <div className="flex flex-col items-center">
        <p>You must be logged to be able to use this option</p>
        <NavLink to={"/login"}>
          <p>Click here to Login</p>
        </NavLink>
      </div>
    );
  }

  return <>{children}</>;
};
