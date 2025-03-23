import { useLocation } from "react-router"

export const useCurrentPath = () => {

    const location = useLocation()
    const path = location.pathname.split("/").filter(Boolean).pop()

    return path === "home" ? "posts" : path 

}