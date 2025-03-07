import PropTypes from 'prop-types';
import {createContext, useContext, useState} from "react";
import { useNavigate } from "react-router";
import api, { setAuth, clearAuth } from "../utils/api.js";


const AuthContext = createContext({
    user: {},
    login: () => {},
    logout: () => {},
    register: () => {},
});

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(() => {
        const maybeUser = localStorage.getItem("user");

        if (maybeUser) {
            return JSON.parse(maybeUser);
        }
    });

    const login = async (email, password) => {
        // Paduodas email ir password axios
        setAuth(email, password);
        // Pasiimam priskirtas roles iš serverio
        const response = await api.get("/account/me");
        const userData = response.data

        // Sujungiam įrašyta email ir password su iš db gaunamomis roles
        // Password iš serverio neteina, nes jis užšifruotas, todėl reikia daryti šį junginį
        const user = {
            email,
            password,
            roles: userData.roles
        }
        // Įšsaugome user info į localStorage, tam kad vėliau galėtu pasiimti axios ir šis context'as
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        navigate("/");
    };

    const register = async (email, password) => {
        await api.post("/account", { email, password });
        navigate("/login");
    };

    const logout = () => {
        setUser({});
        // Ištrinam email ir password iš axios
        clearAuth();
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        // Paduodas sukurtas funkcijas, tam kad jas būtų galima naudoti betkur su useAuth
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

// Sukuriamas custom hookas, kuris leidžia naudoti AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

//PropTypes validation
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

