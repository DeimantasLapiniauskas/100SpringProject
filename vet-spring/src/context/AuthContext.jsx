import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";
import api, { setAuth, clearAuth } from "../utils/api.js";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext({
  account: {},
  login: () => {},
  logout: () => {},
  register: () => {},
});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [account, setAccount] = useState(() => {
    const maybeJwt = localStorage.getItem("jwt");

    if (maybeJwt) {
      return jwtDecode(maybeJwt);
    }
  });

  f

  const login = async (email, password) => {
    // Paduodas email ir password axios

    // Pasiimam priskirtas roles iš serverio
    const response = await api.get("/token", {
      auth: { username: email, password },
    });
    const jwt = response.data;
    localStorage.setItem("jwt", jwt)

    setAccount(jwtDecode(jwt))
    setAuth(jwt)
    navigate("/pets")

  };

  const register = async (email, password) => {
    await api.post("/register", { email, password });
    navigate("/login");
  };

  const logout = () => {
    setAccount({});
    // Ištrinam email ir password iš axios
    clearAuth();
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  return (
    // Paduodas sukurtas funkcijas, tam kad jas būtų galima naudoti betkur su useAuth
    <AuthContext.Provider value={{ account, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// Sukuriamas custom hookas, kuris leidžia naudoti AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
