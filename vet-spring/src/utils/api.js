import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})



export const setAuth = (jwt) => {
    api.defaults.headers = {
       'Authorization': `Bearer ${jwt}`
    }
}

export const clearAuth = () => {
    delete api.defaults.headers;
}

    const maybeJwt = localStorage.getItem("jwt");
    
    console.log(maybeJwt)

    if (maybeJwt) {
      setAuth(maybeJwt);
    }

export default api;