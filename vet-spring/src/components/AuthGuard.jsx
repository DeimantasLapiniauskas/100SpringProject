import {useNavigate} from "react-router";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export const AuthGuard = (props) => {
    const { children } = props;
    const {account} = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!account && !localStorage.getItem("jwt")) {
            navigate("/login");
        }
    }, [account, navigate]);

    return <>{children}</>;
}