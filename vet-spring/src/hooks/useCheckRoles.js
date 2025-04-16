import { useAuth } from "@/context/AuthContext";

export const useCheckRoles = () => {

const { account } = useAuth();

    return (
    account?.scope?.includes("ROLE_VET") || account?.scope?.includes("ROLE_ADMIN")
    );
  };


