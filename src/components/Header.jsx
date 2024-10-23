import logo from "../assets/Logo.svg";
import avatar from "../assets/AvatarPlaceholder.svg";
import ToggleSwitch from "./ToggleSwitch";
import { NavLink } from "react-router-dom";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

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
      <button
        className="header__add-clothes-btn"
        type="button"
        onClick={handleAddClick}
      >
        + Add Clothes
      </button>
      <NavLink to="/profile" className="header__profile-link">
        <div className="header__user-container">
          <p className="header__username">Terry Tegegne</p>
          <img src={avatar} className="header__avatar" alt="Terry Tegegne" />
        </div>
      </NavLink>
    </header>
  );
}

export default Header;
