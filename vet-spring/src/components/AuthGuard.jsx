import {useNavigate} from "react-router";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export const AuthGuard = ({children}) => {
    const navigate = useNavigate()
    const {account} = useAuth();

    useEffect(() => {
        if (!account) {
            navigate("/login"); 
        }
    }, [account, navigate]);

    return <>{children}
    </>;
}
