import React from "react";
import { NavLink } from 'react-router-dom';

function LoginRegisterForm({ handleChange, handleSubmit, data, title, buttonText, isRegistrationForm }) {
    return (
        <form
            className="login-form"
            onSubmit={handleSubmit}
        >
            <h2 className="login__title">{title}</h2>
            <fieldset className="login__fieldset">
                <input
                    type="email"
                    onChange={handleChange}
                    value={data.email}
                    className="login__input login__input_type_email"
                    placeholder="Email"
                    name="email"
                    required
                    minLength="6"
                    maxLength="40"
                    id="email" />
                <span className="login__error email-error"></span>
                <input
                    type="password"
                    onChange={handleChange}
                    value={data.password}
                    className="login__input login__input_type_password"
                    placeholder="Пароль"
                    name="password"
                    required
                    minLength="2"
                    maxLength="40"
                    id="password" />
                <span className="login__error password-error"></span>
            </fieldset>
            <button className="login__form-button" type="submit">
                {buttonText}
            </button>
            {isRegistrationForm && <NavLink className="login-form__register-link" to="/sign-in">
                Уже зарегистрированы? Войти
            </NavLink>}
        </form>
    )
}

export default LoginRegisterForm;