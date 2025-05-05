import { useAuth } from "@/context/AuthContext";

export const useCheckAdminAndVetRoles = () => {

const { account } = useAuth();

    return (
    account?.scope?.includes("ROLE_VET") || account?.scope?.includes("ROLE_ADMIN")
    );
  };

export const useCheckClientRole = () => {

  const { account } = useAuth();

  return (
    account?.scope?.includes("ROLE_CLIENT")
  )
}
