import { useContext, useState } from "react";
import { createContext } from "react";
import { UIStatus } from "../constants/UIStatus";

const UIContext = createContext({
  status: UIStatus.Idle,
  setStatus: () => {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  isBadRequest: false
});

export const UIProvider = ({ children }) => {
  const [status, setStatus] = useState("idle");

  const isLoading = status === UIStatus.Loading
  const isSuccess = status === UIStatus.Success
  const isError = status === UIStatus.Error
  const isBadRequest = status === UIStatus.BadRequest

  return (
    <UIContext.Provider value={{ status, setStatus, isLoading, isSuccess, isError, isBadRequest }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  return useContext(UIContext);
};
