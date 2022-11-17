import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';

import logo from '../images/logo.png';

function Header({ email, handleLogout }) {

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип mesto" />
      <div className="header__wrapper">
        <h2 className="header__user-email">{email}</h2>
        <Routes>
          <Route
            path="sign-up"
            element={
              <NavLink
                className="header__link"
                to="/sign-in"
              >
                Войти
              </NavLink>
            }
          />
          <Route
            path="/"
            element={
              <NavLink
                className="header__link header__link_color_gray"
                to="/sign-in"
                onClick={() => { handleLogout() }}
              >
                Выйти
              </NavLink>
            }
          />
          <Route
            path="sign-in"
            element={
              <NavLink
                className="header__link"
                to="/sign-up"
              >
                Регистрация
              </NavLink>
            }
          />
        </Routes>

      </div>
    </header>
  );
}

export default Header;