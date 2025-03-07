import {useNavigate} from "react-router";

export const AuthGuard = (props) => {
    const { children } = props;
    const navigate = useNavigate()

    if (!localStorage.getItem("user")) {
        navigate("/login")
    }

    return <>{children}</>;
}