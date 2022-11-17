import React from "react";
import LoginRegisterForm from "./LoginRegisterForm";

import { useNavigate } from "react-router-dom";

function Register({ handleRegister, isLoggedIn }) {

    const [data, setData] = React.useState({ email: "", password: "" });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = data;
        handleRegister(email, password);
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
        <div className="login__wrapper">
            <LoginRegisterForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                data={data}
                title="Регистрация "
                isValid={false}
                buttonText="Зарегистрироваться"
                isRegistrationForm={true}
            />
        </div>
    )
}

export default Register;