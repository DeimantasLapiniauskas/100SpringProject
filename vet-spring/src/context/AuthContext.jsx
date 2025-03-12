import { createContext, useContext, useEffect, useState } from "react";
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
      const decodedJwt = jwtDecode(maybeJwt);
      if(decodedJwt.exp * 1000 < Date.now()) {
        localStorage.removeItem("jwt")
        // return {}
      }
      return decodedJwt
    }
    // return {}
  });

  useEffect(() => {
    const checkJwtExpiration = () => {
    const maybeJwt = localStorage.getItem("jwt");
    if (maybeJwt) {
      const decodedJwt = jwtDecode(maybeJwt);
      if(decodedJwt.exp * 1000 < Date.now()) {
        localStorage.removeItem("jwt");
        setAccount({})
        navigate("/login")
      }
    }
  };
  checkJwtExpiration();
  }, [navigate]);

  const login = async (email, password) => {
  
    const response = await api.post("/token", {}, {
      auth: { username: email, password }
    });
    const jwt = response.data;
    localStorage.setItem("jwt", jwt)
    setAccount(jwtDecode(jwt))
    setAuth(jwt)
    navigate("/pets")

  };

  const register = async (email, password, firstName, lastName, phoneNumber) => {
    await api.post("/register", { email, password, firstName, lastName, phoneNumber });
    console.log()
    navigate("/login");
  };

  const logout = () => {
    setAccount({});
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
