import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export const setAuth = (email, password) => {
    api.defaults.auth = {
        email,
        password
    }
}

export const clearAuth = () => {
    delete api.defaults.auth;
}

const maybeUser = localStorage.getItem("user");

if (maybeUser) {
    const user = JSON.parse(maybeUser);
    setAuth(user.email, user.password);
}

export default api;