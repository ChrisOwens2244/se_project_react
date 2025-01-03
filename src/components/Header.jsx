import React, { useContext } from "react";
import logo from "../assets/Logo.svg";
import ToggleSwitch from "./ToggleSwitch";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Header({
  handleAddClick,
  handleSignInClick,
  handleSignUpClick,
  weatherData,
  isLoggedIn,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const user = useContext(CurrentUserContext);
  const currentUser = user.currentUser.data;

  return (
    <header className="header">
      <NavLink to="/" className="header__home-link">
        <img
          className="header__logo"
          src={logo}
          alt="Logo for the website WTWR"
        />
      </NavLink>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />

      {isLoggedIn ? (
        <>
          <button
            className="header__add-clothes-btn"
            type="button"
            onClick={handleAddClick}
          >
            + Add Clothes
          </button>
          <NavLink to="/profile" className="header__profile-link">
            <div className="header__user-container">
              <p className="header__username">{currentUser.name}</p>
              {currentUser.avatar === "" ? (
                <p className="header__avatar">{currentUser.name.charAt(0)}</p>
              ) : (
                <img
                  src={currentUser.avatar}
                  className="header__avatar"
                  alt={currentUser.name}
                />
              )}
            </div>
          </NavLink>
        </>
      ) : (
        <div className="header__sign-container">
          <button
            className="header__signup-btn"
            type="button"
            onClick={handleSignUpClick}
          >
            Sign Up
          </button>
          <button
            className="header__signin-btn"
            type="button"
            onClick={handleSignInClick}
          >
            Log In
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
