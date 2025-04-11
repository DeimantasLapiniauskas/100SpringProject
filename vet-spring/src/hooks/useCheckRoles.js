import { useAuth } from "@/context/AuthContext";

export const useCheckRoles = () => {
    //todo: make this better
const { account } = useAuth();

    return (
      (account !== null &&
        account.scope !== null &&
        account.scope.includes("ROLE_VET")) ||
      (account !== null &&
        account.scope !== null &&
        account?.scope.includes("ROLE_ADMIN"))
    );
  };