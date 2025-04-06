import { useContext, useState } from "react";
import { createContext } from "react";
import { UIStatus } from "../constants/UIStatus";

const UIContext = createContext({
  status: UIStatus.Idle,
  setStatus: () => {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  isBadPageRequest: false,
  isUnusual: false,
  isRedirecting: false
});

export const UIProvider = ({ children }) => {
  const [status, setStatus] = useState("idle");

  const isLoading = status === UIStatus.Loading
  const isSuccess = status === UIStatus.Success
  const isError = status === UIStatus.Error
  const isBadPageRequest = status === UIStatus.BadPageRequest
  const isUnusual = status === UIStatus.Unusual
  const isRedirecting = status === UIStatus.Redirecting

  return (
    <UIContext.Provider value={{ status, setStatus, isLoading, isSuccess, isError, isBadPageRequest, isUnusual, isRedirecting }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  return useContext(UIContext);
};
