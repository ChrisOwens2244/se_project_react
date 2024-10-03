import logo from "../assets/Logo.svg";
import avatar from "../assets/AvatarPlaceholder.svg";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img
        className="header__logo"
        src={logo}
        alt="Logo for the website WTWR"
      />
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <button
        className="header__add-clothes-btn"
        type="button"
        onClick={handleAddClick}
      >
        + Add Clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Terry Tegegne</p>
        <img src={avatar} className="header__avatar" alt="Terry Tegegne" />
      </div>
    </header>
  );
}

export default Header;
