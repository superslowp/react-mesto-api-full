import React from "react";
import LoginRegisterForm from "./LoginRegisterForm";

import { useNavigate } from "react-router-dom";

function Login({ handleLogin, isLoggedIn }) {

    const [data, setData] = React.useState({ email: "", password: "" });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = data;
        handleLogin(email, password);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((loginData) => ({ ...loginData, [name]: value }));
    }

    React.useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn]);

    return (
        <LoginRegisterForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            data={data}
            title="Вход"
            buttonText="Войти"
            isRegistrationForm={false}
        />
    )
}

export default Login;