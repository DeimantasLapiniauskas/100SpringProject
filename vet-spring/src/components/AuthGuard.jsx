import {useNavigate} from "react-router";
import { useEffect } from "react";
// import { useAuth } from "../context/AuthContext";

export const AuthGuard = (props) => {
    const { children } = props;
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem("jwt")) {
            navigate("/login");
        }
    }, [navigate]);

    return <>{children}</>;
}