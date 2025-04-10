import { useLocation } from "react-router"

export const useCurrentPath = () => {

    const location = useLocation()
    const path = location.pathname.split("/").filter(Boolean).pop()

    //I'm using this for adminpage because its path is more complicated
    const segments = location.pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    if (segments[0] === "adminpage") {
        if (lastSegment === "vet" || lastSegment === "vets") return "adminpage/vets";
        if (lastSegment === "client" || lastSegment === "clients") return "adminpage/clients";
        return "adminpage";
    }

    return path === "home" ? "posts" : path 

}

export const useRealPath = () => {

    const location = useLocation()
    const path = location.pathname.split("/").filter(Boolean).pop()

    return path

}